import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Protected({children, authentication=true}) {

    const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.user.isLoggedIn)
    const navigate = useNavigate()

    useEffect( () => {

        if(authStatus && authentication){
            navigate("/")
        }else if(!authStatus && authentication){
            navigate("/login")
        }
        setLoading(false)

    }, [authStatus, navigate, authentication] )

    return (
        <div>{loading ? <h1>Loading</h1> : {children}}</div>
     );
}

export default Protected;