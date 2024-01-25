import "../../styles/LogoutBtn.css"
import authService from "../../lib/auth";
import { useDispatch } from "react-redux";
import { updateUserStatus } from "../../features/authSlice";

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logOut()
        .then( () => {dispatch(updateUserStatus({isLoggedIn: false, userInfo: null}))} )
    }

    return ( 
        <button className="logout-btn" onClick={logoutHandler}>LogOut</button>
     );
}

export default LogoutBtn;