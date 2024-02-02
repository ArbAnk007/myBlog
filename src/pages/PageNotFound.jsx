import "../styles/PageNotFound.css"
import pageNotFoundImg from "/404-page-not-found.svg"

function PageNotFound() {
  return ( 
    <div className="page-not-found-container">
      <img src={pageNotFoundImg} alt="" />
      <h1>Page not found!</h1>
    </div>
   );
}

export default PageNotFound;