import { useParams } from "react-router-dom";
import articles from "../article-content";


export function ArticlePage() {
    const {name} = useParams();

    const article = articles.find((a : any) => a.name === name);

    return (
        <div>
            <h1>{ article.name}</h1>
            {article.content.map((p:any, index:number)=>(
                <p key={index}>{p}</p>
            ))}
        </div>
    )
}