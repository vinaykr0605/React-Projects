export interface Article {
  name: string;
  title: string;
  content: string[];
}

export interface ArticleListProps {
  articles: Article[];
}
