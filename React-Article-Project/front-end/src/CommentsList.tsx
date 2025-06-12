import { Comment, CommentsListProps } from "./types/articles.interface";

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <div>
      <h3>Comments:</h3>
      {comments.map((comment: Comment, index: number) => (
        <div key={index}>
          <h5>{comment.postedBy}</h5>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
