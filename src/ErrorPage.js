import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {getCookie} from "./apiFunc";

export default function ErrorPage() {
    const navigate = useNavigate();
    const [remainingTime, setRemainingTime] = useState(5);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000); // Update every second

        // Navigate to other component after 5 seconds
        const timeoutId = setTimeout(() => {
            if (getCookie("token")!==null){
                navigate('/user');
            }else navigate('/');
        }, 5000);

        // Cleanup functions
        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, [navigate]);


    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
            </p>
            <p>Redirecting in {remainingTime} seconds...</p>
        </div>
    );
}
