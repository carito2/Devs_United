import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

function Home ({user, userProfile}) {

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
            <Loading />
            {render()}
        </>
    )
}

export default Home;