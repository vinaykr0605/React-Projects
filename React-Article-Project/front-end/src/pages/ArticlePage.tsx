import { useParams, useLoaderData } from "react-router-dom";
import articles from "../types/article-content";
import CommentsList from "../CommentsList";
import axios from "axios";
import { useState } from "react";
import AddCommentForm from "../AddCommentForm";
import { User } from "firebase/auth";
import useUser from "../useUser";



export function ArticlePage() {
    const { name } = useParams();
    const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData() as { upvotes: number; comments: any };
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [comments, setComments] = useState(initialComments);

    const { user } = useUser() as {
        user: User | null;
    };

    const article = articles.find((a: any) => a.name === name);

    async function onUpVoteClicked() {
        const token = user && await user.getIdToken();
        const header = token ? { authtoken: token } : {};
        const response = await axios.post('/api/articles/' + name + '/upvote', null, { headers: header });
        const updatedArticleData = response.data;
        setUpvotes(updatedArticleData.upvotes);
    }

    async function onAddComment(nameText: string, commentText: string) {
        const token = user && await user.getIdToken();
        const header = token ? { authtoken: token } : {};
        const response = await axios.post('/api/articles/' + name + '/comments', { postedBy: nameText, text: commentText }, { headers: header });
        const updatedArticleData = response.data;
        setComments(updatedArticleData.comments);
    }

    return (
        <div>
            <h1>{article.title}</h1>
            {user && <button onClick={() => onUpVoteClicked()}>Upvote</button>}
            <p>This article has {upvotes} upvotes </p>
            {article.content.map((p: any, index: number) => (
                <p key={index}>{p}</p>
            ))}
            {user ? <AddCommentForm onAddComment={onAddComment} />
                : <p><em>Log in to add a comment</em></p>}
            <CommentsList comments={comments} />
        </div>
    )
}

export async function loader({ params }: { params: any }) {
    const response = await axios.get('/api/articles/' + params.name);
    const { upvotes, comments } = response.data;
    return { upvotes, comments };
}