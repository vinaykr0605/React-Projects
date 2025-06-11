import articles from "../article-content";
import ArticleList from "../ArticleList";

export function ArticleListPage() {
    return (
        <div>
            <h1>Article </h1>
            <ArticleList articles={articles} />
        </div>
    )
}