import React, { useContext, useEffect } from "react";
import {Navigate} from "react-router-dom";
import Loading from "../components/Loading";
import { AppContext } from "../contexts/AppContext"
import FeedPage from "./FeedPage";
import SignUpPage from "./SignUpPage";
import WelcomePage from "./WelcomePage";
import {firestore, firebase} from "../firebase/firebase";

function Home () {
    const {
        user,
        userProfile,
    } = useContext(AppContext);
    console.log("user");
    console.log(user);

    const render = () => {
        if(user && userProfile){
            if(userProfile.verifiedUserProfile === false){
                return <Navigate replace to="/welcome" />;
            } else if(userProfile.verifiedUserProfile === true) {
                return <Navigate replace to="/feed" />;
            }
        } else {
            return <Navigate to="/signUp" />;
        }
    }

    return (
        <>
            {render()}
        </>
    )
}

export default Home;