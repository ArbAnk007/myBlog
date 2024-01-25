import "../../styles/Header.css"
import myBlogLogo from "/my-blog-logo.svg"
import authService from "../../lib/auth";
import { LogoutBtn } from "../"
import { updateUserStatus } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {

    const authStatus = useSelector(state => state.user.isLoggedIn)
    const dispatch = useDispatch()

    const loginHandler = () => {
        authService.login({email: "test1@gmail.com", password: "123123123"})
        .then( () => {authService.getCurrentUser().then( (response) => {dispatch(updateUserStatus({isLoggedIn: true, userInfo: response}))} )} )
    }

    return (
        <nav>
            <div className="header">
                <div className="header-left-section">
                    <NavLink><img src={myBlogLogo} alt="my blog logo" /></NavLink>
                </div>
                <div className="header-center-section">
                    <NavLink>Home</NavLink>
                    <NavLink>All Posts</NavLink>
                    <NavLink>Contact</NavLink>
                </div>
                <div className="header-right-section">
                    {authStatus ? <LogoutBtn /> : <button className="login-btn" onClick={loginHandler}>LogIn</button> }
                </div>
            </div>
            <div className="line-bottom"></div>
        </nav>
     );
}

export default Header;