import "../styles/Login.css"
import blogLogo from "/my-blog-logo.svg"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../lib/auth";
import { updateUserStatus } from "../features/authSlice"
import { useDispatch } from "react-redux";
import { Input, DefaultBtn } from "./"

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const loginHandler = async ({email, password}) => {
        setError("");
        try {
            const response = await authService.login({email, password})
            if(response){
                const data = await authService.getCurrentUser()
                if(data){
                    dispatch(updateUserStatus({isLoggedIn: true, userInfo: data}))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message);
        }
        
    }

    return ( 
        <div className="login-container">
            <div onClick={() => {navigate("/")}}><img src={blogLogo} alt="blog logo" className="login-blog-logo" /></div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(loginHandler)} className="login-form" >
                <Input 
                    label={"Email"}
                    type={"email"}
                    placeholder={"Enter your email here"}
                    {...register("email", {
                        required: true,
                        pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
                        }
                    )}
                />
                <Input 
                    label={"Password"}
                    type={"password"}
                    placeholder={"Enter your password here"}
                    {...register("password", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
                    })}
                />
                <DefaultBtn type={"submit"}>LogIn</DefaultBtn>
            </form>
            <p>Don't have an account? <Link to={"/signup"}>Create Account</Link></p>
        </div>
     );
}

export default Login;