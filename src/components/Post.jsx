import "../styles/Post.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import storageService from "../lib/storage";
import databaseService from "../lib/database";

function Post({
  imgURL,
  title,
  content,
  documentId,
  userId,
  featuredImageId
}) {

  const navigate = useNavigate()
  const userData = useSelector(state => state.user.info)

  const deletePost = async () => {
    const storageResponse = await storageService.deleteFile(featuredImageId)
    if(storageResponse){
      const fileResponse = await databaseService.deletePost(documentId)
      if(fileResponse){
        navigate("/")
      }
    }
  }

  return ( 
    <div className="post-container">
      <div className="post-img-container">
        <img src={imgURL} alt={imgURL} />
      </div>
      <div className="post-content-container">
        <h1 className="post-title">{title}</h1>
        <div className="post-content">{content ? parse(content) : null}</div>
      { userData.$id===userId ? <button className="edit-post-btn" onClick={() => {navigate(`/edit-post/${documentId}`)}}>Edit</button> : null }
      { userData.$id===userId ? <button className="delete-post-btn" onClick={deletePost}>Delete</button> : null }
      </div>
    </div>
   );
}

export default Post;