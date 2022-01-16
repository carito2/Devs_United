import React, {useContext} from "react";
import  {useNavigate, Navigate, Outlet} from "react-router-dom";
import {AppContext} from "../contexts/AppContext"
import FeedPage from "./FeedPage";
import SignUpPage from "./SignUpPage";
import WelcomePage from "./WelcomePage";

function Home () {
    const {
        user,
        userProfile
    } = useContext(AppContext);
    let verifiedUserProfile = Object.keys(userProfile).length > 0 ? "true" : "false";
    return (
        <>
            { user  ? (verifiedUserProfile) 
                        ? <FeedPage />
                        : <WelcomePage />
                    : <SignUpPage />} 
        </>
    )
}

export default Home;