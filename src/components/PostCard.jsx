import "../styles/PostCard.css"
import { Link } from "react-router-dom";
import storageService from "../lib/storage";

function PostCard({
    $id,
    featuredImageId,
    className,
    title,
}) {
    const imgURL = storageService.getFilePreview(featuredImageId)

    return ( 
        <Link to={`/post/${$id}`}>
            <div className={`postcard-container ${className==="tile" ? "tile" : "grid"}`}>
                <div className="postcard-img">
                    <img src={imgURL} alt={featuredImageId} />
                </div>
                <div className="postcard-content">
                    <h2 className="postcard-title">{title}</h2>
                </div>
            </div>
        </Link>
     );
}

export default PostCard;