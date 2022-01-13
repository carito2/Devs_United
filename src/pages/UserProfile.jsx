import React from "react";
import {Outlet} from "react-router";
import back from "../resources/images/back.svg";
import logoutIcon from "../resources/images/logout.svg";
import profilePicture from "../resources/images/profilePicture.svg";
import TweetContainer from "../components/TweetContainer";
import { NavLink } from "react-router-dom";

function UserProfile() {
    return (
        <section className="userProfile">
            <header className="headerUserProfile">
                <div className="returnBox">
                    <img src={back} alt="Boton volver atrás" className="buttonBack"/>
                    <h1 className="username">Username</h1>
                </div>
                <button className="buttonLogout" >LOGOUT <img src={logoutIcon} alt="Boton cerrar sesión" className="logoLogout"/></button>
            </header>
            <article className="userInformation">
                <img src={profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <h1 className="username">Username</h1>
                <div className="profileTabs">
                    <NavLink to="userProfile/posts" className="tab">Posts</NavLink>
                    <NavLink to="userProfile/favorites" className="tab">Favorites</NavLink>
                </div>
            </article>
            <TweetContainer />
            <TweetContainer />
            <TweetContainer />
            <Outlet />
        </section>
    )
}

export default UserProfile;