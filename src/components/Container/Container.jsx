import "../../styles/Container.css"

function container({children}) {
  return ( 
    <div className="container">
      {children}
    </div>
   );
}

export default container;