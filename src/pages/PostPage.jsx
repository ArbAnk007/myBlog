import { useParams } from "react-router-dom";
import { Post } from "../components";
import databaseService from "../lib/database";
import storageService from "../lib/storage";
import { useEffect, useState } from "react";
import { PageNotFound } from "../pages"

function PostPage() {

  const {slug} = useParams()
  const [imgURL, setImgURL] = useState("")
  const [postInfo, setPostInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    databaseService.getPost(slug)
    .then((response)=>{
      if(response!==undefined && response!==false){
        setImgURL(storageService.getFile(response.featuredImageId));
        setPostInfo(response)
        setLoading(false)
      }else {
        setLoading(false)
      }
    })
  }, [] )

  
  if(!loading){
    if(postInfo){
      return (
        <Post
          imgURL={imgURL}
          featuredImageId={postInfo.featuredImageId}
          title={postInfo.title}
          content={postInfo.content}
          documentId={postInfo.$id}
          userId={postInfo.userId}
        />
      )
    }else {
      return (
        <PageNotFound />
      )
    }
  }
    
}

export default PostPage;