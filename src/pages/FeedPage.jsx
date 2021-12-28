import React from "react";
import profilePicture from "../resources/images/profilePicture.svg";
import logo from "../resources/images/logoSmallDevs.svg";
import devsUnited from "../resources/images/devsUnited.svg";
import TweetContainer from "../components/TweetContainer";

function FeedPage() {
    return (
        <section className="feedPage">
            <header className="headerFeedPage">
                <img src={profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <img src={logo} alt="Logo Devs_United" className="logoSmall"/>
                <img src={devsUnited} alt="Título Devs_United" className="titleDevsUnited"/>
            </header>
            <form className="formBox">
                <img src={profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <div className="inputContainer">
                    <textarea name="inputTweet" cols="30" rows="5" placeholder="What's happening?" className="inputTweet"></textarea>
                    <div className="countingBoxCharacters">
                        <p className="characters">Cantidad Caracteres</p>
                        <p className="characters maxCharacters">200 max.</p>
                    </div>
                    <button className="postButton">POST</button>
                </div>
            </form>
            <article>
                <TweetContainer />
            </article>
        </section>
    )
}

export default FeedPage;