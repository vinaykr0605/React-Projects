export interface Article {
  name: string;
  title: string;
  content: string[];
}

export interface ArticleListProps {
  articles: Article[];
}

export interface Comment {
  text: string;
  postedBy: string;
}

export interface CommentsListProps {
  comments: Comment[];
}
