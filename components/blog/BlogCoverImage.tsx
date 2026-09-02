import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import { SketchFrame } from "./BlogSketchDecor";

interface BlogCoverImageProps {
  post: Pick<BlogPost, "cover" | "coverAlt" | "title">;
  priority?: boolean;
  variant?: "hero" | "thumb";
}

export function BlogCoverImage({
  post,
  priority = false,
  variant = "hero",
}: BlogCoverImageProps) {
  const frameClass =
    variant === "hero"
      ? "blog-cover-frame blog-cover-frame--hero"
      : "blog-cover-frame blog-cover-frame--thumb";

  return (
    <figure className={`${frameClass} group relative w-full overflow-hidden`}>
      <SketchFrame />
      <div className="relative aspect-[1200/630] w-full">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes={
            variant === "hero"
              ? "(max-width: 768px) 100vw, 52rem"
              : "(max-width: 1024px) 100vw, 22rem"
          }
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          priority={priority}
        />
      </div>
      {variant === "hero" ? (
        <figcaption className="mt-2 font-sketch text-[1.15rem] text-teal-700/70">
          {post.coverAlt}
        </figcaption>
      ) : null}
    </figure>
  );
}
