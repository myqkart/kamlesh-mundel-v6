import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { siteConfig } from "@/lib/site";

const BLOG_DIR = path.join(process.cwd(), "content/blogs");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CANONICAL_PATTERN = /^https:\/\/kamlesh\.tech\//;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const WORDS_PER_MINUTE = 200;

export interface BlogFrontmatter {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  canonical: string;
  featured?: boolean;
  draft?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  /** Raw markdown body (no frontmatter). */
  content: string;
  /** Source file path relative to project root. */
  sourceFile: string;
  readingTimeMinutes: number;
  readingTimeLabel: string;
  categorySlug: string;
  tagSlugs: string[];
}

export interface BlogAdjacentPosts {
  previous: BlogPost | null;
  next: BlogPost | null;
}

type RawFrontmatter = Record<string, unknown>;

let cachedPosts: BlogPost[] | null = null;

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function formatValidationError(filePath: string, field: string, message: string): string {
  return `[content/blogs/${filePath}] Invalid frontmatter field "${field}": ${message}`;
}

function assertString(
  filePath: string,
  field: string,
  value: unknown,
): asserts value is string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(formatValidationError(filePath, field, "must be a non-empty string"));
  }
}

function parseDate(filePath: string, field: string, value: string): string {
  if (!DATE_PATTERN.test(value)) {
    throw new Error(
      formatValidationError(filePath, field, 'must be a valid date in "YYYY-MM-DD" format'),
    );
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(formatValidationError(filePath, field, "must be a valid calendar date"));
  }

  return value;
}

function validateCover(filePath: string, cover: string): void {
  if (!cover.startsWith("/")) {
    throw new Error(
      formatValidationError(filePath, "cover", 'must be an absolute path starting with "/"'),
    );
  }

  const coverPath = path.join(PUBLIC_DIR, cover.replace(/^\//, ""));
  if (!fs.existsSync(coverPath)) {
    throw new Error(
      formatValidationError(
        filePath,
        "cover",
        `referenced file does not exist at public${cover}`,
      ),
    );
  }
}

function validateCanonical(filePath: string, canonical: string, slug: string): void {
  if (!CANONICAL_PATTERN.test(canonical)) {
    throw new Error(
      formatValidationError(
        filePath,
        "canonical",
        `must be an absolute URL on https://${siteConfig.domain}`,
      ),
    );
  }

  const expected = `https://${siteConfig.domain}/blog/${slug}`;
  if (canonical !== expected) {
    throw new Error(
      formatValidationError(
        filePath,
        "canonical",
        `must equal "${expected}" for slug "${slug}"`,
      ),
    );
  }
}

function validateTags(filePath: string, tags: unknown): string[] {
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new Error(
      formatValidationError(filePath, "tags", "must be a non-empty array of strings"),
    );
  }

  return tags.map((tag, index) => {
    if (typeof tag !== "string" || tag.trim() === "") {
      throw new Error(
        formatValidationError(filePath, `tags[${index}]`, "must be a non-empty string"),
      );
    }
    return tag.trim();
  });
}

function validateSlug(filePath: string, slug: string, filename: string): void {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      formatValidationError(
        filePath,
        "slug",
        'must contain only lowercase letters, numbers, and hyphens (e.g. "my-post-title")',
      ),
    );
  }

  const baseName = path.basename(filename, ".md");
  if (baseName !== slug) {
    throw new Error(
      formatValidationError(
        filePath,
        "slug",
        `must match the Markdown filename "${baseName}.md"`,
      ),
    );
  }
}

function parseFrontmatter(filePath: string, data: RawFrontmatter): BlogFrontmatter {
  assertString(filePath, "title", data.title);
  assertString(filePath, "description", data.description);
  assertString(filePath, "slug", data.slug);
  assertString(filePath, "date", data.date);
  assertString(filePath, "updated", data.updated);
  assertString(filePath, "author", data.author);
  assertString(filePath, "category", data.category);
  assertString(filePath, "cover", data.cover);
  assertString(filePath, "coverAlt", data.coverAlt);
  assertString(filePath, "canonical", data.canonical);

  validateSlug(filePath, data.slug, filePath);
  const date = parseDate(filePath, "date", data.date);
  const updated = parseDate(filePath, "updated", data.updated);
  const tags = validateTags(filePath, data.tags);
  validateCover(filePath, data.cover);
  validateCanonical(filePath, data.canonical, data.slug);

  const featured = data.featured === true;
  const draft = data.draft === true;

  return {
    title: data.title.trim(),
    description: data.description.trim(),
    slug: data.slug.trim(),
    date,
    updated,
    author: data.author.trim(),
    category: data.category.trim(),
    tags,
    cover: data.cover.trim(),
    coverAlt: data.coverAlt.trim(),
    canonical: data.canonical.trim(),
    ...(featured ? { featured: true } : {}),
    ...(draft ? { draft: true } : {}),
  };
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripMarkdownForReadingTime(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/[*_~>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function calculateReadingTime(content: string): {
  readingTimeMinutes: number;
  readingTimeLabel: string;
} {
  const text = stripMarkdownForReadingTime(content);
  const words = text.length === 0 ? 0 : text.split(" ").length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return {
    readingTimeMinutes: minutes,
    readingTimeLabel: `${minutes} min read`,
  };
}

function readMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function loadAllPostsUncached(): BlogPost[] {
  const files = readMarkdownFiles();
  const posts: BlogPost[] = [];
  const slugIndex = new Map<string, string>();

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");

    let parsed: matter.GrayMatterFile<string>;
    try {
      parsed = matter(raw);
    } catch {
      throw new Error(`[content/blogs/${file}] Failed to parse YAML frontmatter`);
    }

    const frontmatter = parseFrontmatter(file, parsed.data as RawFrontmatter);
    const duplicateSource = slugIndex.get(frontmatter.slug);
    if (duplicateSource) {
      throw new Error(
        `[content/blogs/${file}] Duplicate slug "${frontmatter.slug}" (also used in ${duplicateSource})`,
      );
    }
    slugIndex.set(frontmatter.slug, file);

    const { readingTimeMinutes, readingTimeLabel } = calculateReadingTime(parsed.content);

    posts.push({
      ...frontmatter,
      content: parsed.content,
      sourceFile: `content/blogs/${file}`,
      readingTimeMinutes,
      readingTimeLabel,
      categorySlug: slugify(frontmatter.category),
      tagSlugs: frontmatter.tags.map(slugify),
    });
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

function getAllPostsInternal(): BlogPost[] {
  if (!cachedPosts) {
    cachedPosts = loadAllPostsUncached();
  }
  return cachedPosts;
}

/** Invalidate cached posts — useful in tests or dev hot reload edge cases. */
export function clearBlogCache(): void {
  cachedPosts = null;
}

export function getAllPosts(): BlogPost[] {
  return getAllPostsInternal();
}

export function getPublishedPosts(): BlogPost[] {
  const posts = getAllPostsInternal();
  if (!isProduction()) {
    return posts;
  }
  return posts.filter((post) => !post.draft);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = getAllPostsInternal().find((item) => item.slug === slug);
  if (!post) return undefined;
  if (isProduction() && post.draft) return undefined;
  return post;
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getPublishedPosts().filter((post) => post.categorySlug === categorySlug);
}

export function getPostsByTag(tagSlug: string): BlogPost[] {
  return getPublishedPosts().filter((post) => post.tagSlugs.includes(tagSlug));
}

export function getFeaturedPosts(): BlogPost[] {
  return getPublishedPosts().filter((post) => post.featured);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const candidates = getPublishedPosts().filter((post) => post.slug !== slug);

  const scored = candidates.map((post) => {
    const sharedTags = post.tags.filter((tag) => current.tags.includes(tag)).length;
    const sameCategory = post.category === current.category ? 1 : 0;
    const recencyScore = post.date;
    return { post, score: sharedTags * 10 + sameCategory * 5, recencyScore };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.recencyScore.localeCompare(a.recencyScore);
  });

  return scored.slice(0, limit).map((item) => item.post);
}

export function getAdjacentPosts(slug: string): BlogAdjacentPosts {
  const published = getPublishedPosts();
  const index = published.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: published[index + 1] ?? null,
    next: published[index - 1] ?? null,
  };
}

export function getCategories(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, { name: string; slug: string; count: number }>();

  for (const post of getPublishedPosts()) {
    const existing = map.get(post.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(post.categorySlug, {
        name: post.category,
        slug: post.categorySlug,
        count: 1,
      });
    }
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getTags(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, { name: string; slug: string; count: number }>();

  for (const post of getPublishedPosts()) {
    post.tags.forEach((tag, index) => {
      const tagSlug = post.tagSlugs[index]!;
      const existing = map.get(tagSlug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(tagSlug, { name: tag, slug: tagSlug, count: 1 });
      }
    });
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function searchPosts(query: string): BlogPost[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getPublishedPosts();

  return getPublishedPosts().filter((post) => {
    const haystack = [
      post.title,
      post.description,
      post.category,
      post.tags.join(" "),
      post.content,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export function getCategoryBySlug(categorySlug: string) {
  return getCategories().find((category) => category.slug === categorySlug);
}

export function getTagBySlug(tagSlug: string) {
  return getTags().find((tag) => tag.slug === tagSlug);
}

export function getPostIndex(slug: string): number {
  return getPublishedPosts().findIndex((post) => post.slug === slug);
}

export function getPublishedPostCount(): number {
  return getPublishedPosts().length;
}
