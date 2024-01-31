import "../styles/HomePage.css"
import { useSelector } from "react-redux";
import { PostCard } from "../components";

function HomePage() {

  const userInfo = useSelector(state => state?.user?.info)
  const time = new Date()
  const currentHour = time.getHours()
  const testArr = [1,2,3,4,5]

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
          {testArr.map( (val) => (
            <div key={val}>
              <PostCard
                title="Just a sample text to check the styling"
                className="tile"
              />
            </div>
          ) )}
      </div>
    </div>
   );
}

export default HomePage;