import "../../styles/LogoutBtn.css"
import authService from "../../lib/auth";
import { useDispatch } from "react-redux";
import { updateUserStatus } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        authService.logOut()
        .then( () => {dispatch(updateUserStatus({isLoggedIn: false, userInfo: null}))} )
        .then( () => {navigate("/login")})
    }

    return ( 
        <button className="logout-btn" onClick={logoutHandler}>LogOut</button>
     );
}

export default LogoutBtn;