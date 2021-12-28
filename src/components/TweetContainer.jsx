import React from "react";
import profilePicture from "../resources/images/profilePicture.svg"
import logoLike from "../resources/images/logoLike.svg"

function TweetContainer() {
    return(
        <div className="tweetContainer">
            <img src={profilePicture} alt="Foto del perfil de usuario" />
            <div className="tweetBox">
                <h1 className="usernameTitle">Username <span className="tweetDate">- 5 jun.</span></h1>
                <p className="tweetContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                <div className="likeBox">
                    <img src={logoLike} alt="Corazón de like" className="logoLike"/>
                    <p className="numberOfLikes">100</p>
                </div>
            </div>
        </div>
    )
}

export default TweetContainer;