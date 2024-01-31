import "../../styles/Header.css"
import myBlogLogo from "/my-blog-logo.svg"
import { LogoutBtn } from "../"
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {

    const authStatus = useSelector(state => state.user.isLoggedIn)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/home",
            active: true
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: true
        },
        {
            name: "Contact",
            slug: "/contact",
            active: true
        }
    ]

    return (
        <nav>
            <div className="header">
                <div className="header-left-section">
                    <NavLink><img src={myBlogLogo} alt="my blog logo" /></NavLink>
                </div>
                <div className="header-center-section">
                    {navItems.map( (item) => (
                        item.active && <div key={item.name} onClick={() => navigate(item.slug)}>{item.name}</div>
                    ) )}
                </div>
                <div className="header-right-section">
                    {authStatus ? <LogoutBtn /> : <button className="login-btn" onClick={() => {navigate("/login")}}>LogIn</button> }
                </div>
            </div>
            <div className="line-bottom"></div>
        </nav>
     );
}

export default Header;