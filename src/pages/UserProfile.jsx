import React from "react";
import back from "../resources/images/back.svg";
import logout from "../resources/images/logout.svg";
import profilePicture from "../resources/images/profilePicture.svg";
import TweetContainer from "../components/TweetContainer";

function UserProfile() {
    return (
        <section className="userProfile">
            <header className="headerUserProfile">
                <div className="returnBox">
                    <img src={back} alt="Boton volver atrás" className="buttonBack"/>
                    <h1 className="username">Username</h1>
                </div>
                <button className="buttonLogout">LOGOUT <img src={logout} alt="Boton cerrar sesión" className="logoLogout"/></button>
            </header>
            <article className="userInformation">
                <img src={profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <h1 className="username">Username</h1>
                <div className="profileTabs">
                    <button className="tab">Posts</button>
                    <button className="tab">Favorites</button>
                </div>
            </article>
            <TweetContainer />
            <TweetContainer />
            <TweetContainer />
        </section>
    )
}

export default UserProfile;