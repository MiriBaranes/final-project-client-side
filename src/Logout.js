import {useEffect} from "react";
import {setCookie} from "./apiFunc";

function  Logout({navigate}){
    useEffect(() => {
        setCookie("userId",null,1);
        setCookie("token",null,1);
        navigate('/');
    }, [navigate]);

    return (
        <div>
            Navigate to Logout
        </div>
    )
}
export default Logout;