import React, { useState } from "react";

export default function UserProfile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Toggle login status for demonstration purposes    
    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <div>
            <h1>{isLoggedIn ? "Welcome back!" : "Please log in."}</h1>
            <button onClick={toggleLogin}>
                {isLoggedIn ? "Log out" : "Log in"}
            </button>
        </div>
    );
}
//hey this is testing