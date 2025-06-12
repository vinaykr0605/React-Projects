import articles from "../types/article-content";
import ArticleList from "../ArticleList";

export function ArticleListPage() {
    return (
        <div >
            <h1>Articles</h1>
            <ArticleList articles={articles} />
        </div>
    )
}