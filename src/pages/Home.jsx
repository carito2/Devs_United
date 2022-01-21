import React, { useContext } from "react";
import {Navigate} from "react-router-dom";
import { AppContext } from "../contexts/AppContext"
import FeedPage from "./FeedPage";
import SignUpPage from "./SignUpPage";
import WelcomePage from "./WelcomePage";

function Home () {
    const {
        user,
        userProfile
    } = useContext(AppContext);

    //Se crea variable que retorna si userProfile se recibe vacío o no.
    let verifiedUserProfile = Object.keys(userProfile).length > 0 ? true : false;
    console.log(user);
    console.log(userProfile);
    console.log(verifiedUserProfile);
    return (
        <>
            {user  ? (verifiedUserProfile !== false 
                        ? <Navigate  replace to="/feed" />
                        : <Navigate replace to="/welcome" />)
                    : (<Navigate to="/signUp" />) }
        </>
    )
}

export default Home;