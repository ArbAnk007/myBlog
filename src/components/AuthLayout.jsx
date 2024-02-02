import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({children, authentication=true}) {

    const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.user.isLoggedIn)
    const navigate = useNavigate()

    useEffect( () => {

        if(authStatus && authentication){
            setLoading(false)
        }else if(!authStatus && authentication){
            setLoading(true)
        }else if(!authentication){
            setLoading(false)
        }

    }, [authStatus, navigate, authentication] )

    return (
        <>
            {loading ? <h1 style={{textAlign: "center", marginTop: "12px", fontSize: "56px"}}>Login to cotinue</h1> : children}
        </>
    )

}

export default Protected;