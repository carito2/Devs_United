import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext"

function Home () {
    const {
        user,
        userProfile,
        loading
    } = useContext(AppContext);

    const render = () => {
        if(user && userProfile){
            if(loading){
                if(userProfile.verifiedUserProfile === false){
                    return <Navigate replace to="/welcome" />;
                } else if(userProfile.verifiedUserProfile === true) {
                    return <Navigate replace to="/feed" />;
                }
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