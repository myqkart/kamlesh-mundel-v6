import { CodeBlockEnhancer } from "./CodeBlockEnhancer";

interface BlogPostBodyProps {
  html: string;
}

export function BlogPostBody({ html }: BlogPostBodyProps) {
  return (
    <>
      <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
      <CodeBlockEnhancer />
    </>
  );
}
