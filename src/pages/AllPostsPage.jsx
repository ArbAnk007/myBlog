import "../styles/AllPostsPage.css"
import { PostCard } from "../components";

function AllPostsPage() {

  const testArr = [0,1,2,3,4,5,6,7,8,9]

  return ( 
    <div className="all-posts-container">
      {testArr.map( (val) => (
        <div key={val}>
          <PostCard 
            title="Sample text"
            className={"grid"}
          />
        </div>
      ) )}
    </div>
   );
}

export default AllPostsPage;