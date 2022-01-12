import React from "react";
import {Outlet} from "react-router";
import back from "../resources/images/back.svg";
import logout from "../resources/images/logout.svg";
import profilePicture from "../resources/images/profilePicture.svg";
import TweetContainer from "../components/TweetContainer";

function UserProfileB() {
    return (
        <section className="userProfile">
            <header className="headerUserProfile">
                <div className="returnBox">
                    <img src={back} alt="Boton volver atrás" className="buttonBack"/>
                    <h1 className="username">Username</h1>
                </div>
            </header>
            <article className="userInformation">
                <img src={profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <h1 className="username">Username</h1>
            </article>
            <TweetContainer />
            <TweetContainer />
            <TweetContainer />
            <Outlet />
        </section>
    )
}

export default UserProfileB;