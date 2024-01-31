import "../styles/Signup.css"
import blogLogo from "/my-blog-logo.svg"
import { useState } from "react";
import { DefaultBtn, Input } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../lib/auth";
import { updateUserStatus } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async ({name, email, password}) => {
        setError("");
        try {
            const response = await authService.signUp({name, email, password});
            if(response) {
                await authService.login({email, password})
                const data = await authService.getCurrentUser();
                if(data) {
                    dispatch(updateUserStatus({isLoggedIn: true, userInfo: data}));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return ( 
        <div className="signup-container">
            <div onClick={() => {navigate("/")}}><img src={blogLogo} alt="blog logo" className="signup-blog-logo" /></div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(handleSignup)} className="signup-form">
                <Input 
                    label={"Name"}
                    type={"text"}
                    placeholder={"Enter your name here"}
                    {...register("name", {
                        required: true
                    })}
                />
                <Input 
                    label={"Email"}
                    type={"email"}
                    placeholder={"Enter your email here"}
                    {...register("email", {
                        required: true,
                        pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
                    })}
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
                <DefaultBtn type={"submit"}>SignUp</DefaultBtn>
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
     );
}

export default Signup;