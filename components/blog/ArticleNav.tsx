interface ArticleFooterProps {
  author: string;
}

export function ArticleFooter({ author }: ArticleFooterProps) {
  return (
    <footer className="article-end">
      <p className="font-sketch text-[1.15rem] text-teal-700">
        End of article — {author}
      </p>
    </footer>
  );
}
