import { visit } from "unist-util-visit";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import type { Heading, Root } from "mdast";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface RenderedMarkdown {
  html: string;
  toc: TocItem[];
}

function extractText(node: Heading): string {
  return node.children
    .map((child) => {
      if (child.type === "text") return child.value;
      if ("children" in child && Array.isArray(child.children)) {
        return child.children
          .map((nested) => (nested.type === "text" ? nested.value : ""))
          .join("");
      }
      return "";
    })
    .join("")
    .trim();
}

function createMarkdownProcessor(collectToc: TocItem[]) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree: Root) => {
      visit(tree, "heading", (node: Heading) => {
        if (node.depth !== 2 && node.depth !== 3) return;
        const text = extractText(node);
        if (!text) return;
        collectToc.push({ id: "", text, level: node.depth as 2 | 3 });
      });
      return tree;
    })
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["blog-heading-anchor"],
        ariaLabel: "Link to section",
      },
    })
    .use(rehypePrettyCode, {
      theme: "github-light",
      keepBackground: false,
      defaultLang: "plaintext",
    })
    .use(rehypeStringify, { allowDangerousHtml: false });
}

export async function renderMarkdown(content: string): Promise<RenderedMarkdown> {
  const tocDraft: TocItem[] = [];
  const processor = createMarkdownProcessor(tocDraft);
  const file = await processor.process(content);
  const html = String(file);

  const headingMatches = [...html.matchAll(/<h([23])[^>]*id="([^"]+)"[^>]*>/g)];
  const toc: TocItem[] = tocDraft.map((item, index) => ({
    ...item,
    id: headingMatches[index]?.[2] ?? item.id,
  }));

  return { html, toc };
}
