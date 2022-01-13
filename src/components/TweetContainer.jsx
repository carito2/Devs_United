import React, {useContext} from "react";
import logoLike from "../resources/images/logoLike.svg"
import { AppContext } from "../contexts/AppContext";

function TweetContainer({ profilePicture, userName, date, tweet, numLike }) {
    
    return(
        <div className="tweetContainer">
            <img src={profilePicture} alt="Foto del perfil de usuario" className="profilePicture"/>
            <div className="tweetBox">
                <div className="headerBox">
                    <h1 className="usernameTitle">{userName}</h1>
                    <p className="tweetDate">{` - ${date}`}</p>
                </div>
                <p className="tweetContent">{tweet}</p>
                <div className="likeBox">
                    <img src={logoLike} alt="Corazón de like" className="logoLike"/>
                    <p className="numberOfLikes">{numLike}</p>
                </div>
            </div>
        </div>
    )
}

export default TweetContainer;