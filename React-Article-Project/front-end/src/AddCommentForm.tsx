import { useState } from "react";

export default function AddCommentForm({
    onAddComment,
}: {
    onAddComment: (nameText: string, commentText: string) => void;
}) {
    const [nameText, setNameText] = useState("");
    const [commentText, setCommentText] = useState("");

    return (
        <div style={{ overflowX: "auto" }}>
            <h3>Add a comment</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onAddComment(nameText, commentText);
                    setNameText("");
                    setCommentText("");
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap", 
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="name" style={{ marginRight: "5px" }}>Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={nameText}
                        onChange={(e) => setNameText(e.target.value)}
                        style={{
                            padding: "6px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            width: "150px",
                        }}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="comment" style={{ marginRight: "5px" }}>Comment:</label>
                    <input
                        id="comment"
                        type="text"
                        name="comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        style={{
                            padding: "6px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            width: "300px",
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: "#000000",
                        color: "#fff",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                    }}
                >
                    Add Comment
                </button>
            </form>
        </div>
    );
}
