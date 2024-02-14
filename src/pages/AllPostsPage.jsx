import "../styles/AllPostsPage.css"
import { PostCard } from "../components";
import { useEffect, useState } from "react";
import databaseService from "../lib/database";
import { useSelector } from "react-redux";

function AllPostsPage() {

  const [allPosts, setAllPosts] = useState([])
  const userInfo = useSelector(state => state?.user?.info)
  const authStatus = useSelector(state => state.user.isLoggedIn)

  useEffect( () => {
    if(authStatus){
      databaseService.getAllPost(userInfo.$id).then((response)=>{setAllPosts(response)})
    }
  }, [] )

  return ( 
    <div className="all-posts-container">
      {allPosts.map( (post) => (
        <div key={post.$id}>
          <PostCard 
            title={post.title}
            featuredImageId={post.featuredImageId}
            $id={post.$id}
            className={"grid"}
          />
        </div>
      ) )}
    </div>
   );
}

export default AllPostsPage;