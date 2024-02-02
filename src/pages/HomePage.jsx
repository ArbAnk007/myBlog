import "../styles/HomePage.css"
import addBtn from "/add-button.svg"
import { useSelector } from "react-redux";
import { PostCard } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import databaseService from "../lib/database";

function HomePage() {

  const userInfo = useSelector(state => state?.user?.info)
  const navigate = useNavigate()
  const time = new Date()
  const currentHour = time.getHours()
  const [posts, setPosts] = useState([])

  useEffect( () => {
    if(userInfo){
      databaseService.getAllPost()
      .then( (response) => {setPosts(response.documents)} )
    }
  }, [] )

  return ( 
    <div className="home-page-container">
      <div className="home-page-welcome-container">
        <h1>
          Good {
          currentHour>0 && currentHour<12 ? "Morning "
          : currentHour>12 && currentHour<18 ? "Afternoon "
          : currentHour>18 && currentHour<21 ? "Evening "
          : "Night "
          }
          {userInfo?.name}
        </h1>
      </div>
      <div className="home-page-content-container">
          {posts.map( (post) => (
            <div key={post.$id}>
              <PostCard
                title={post.title}
                className="tile"
                featuredImageId={post.featuredImageId}
                $id={post.$id}
                content={post.content}
              />
            </div>
          ) )}
      </div>
      <div className="add-btn" onClick={() => {navigate("/add-post")}}>
        <img src={addBtn} alt="add button" />
      </div>
    </div>
   );
}

export default HomePage;