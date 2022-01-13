import React, {useContext, useState} from "react";
import {useParams, Outlet} from "react-router-dom";
import {firestore} from "../firebase/firebase";
import {AppContext} from "../contexts/AppContext"
import characterCounter from "../helpers/characterCounter";
import profilePicture from "../resources/images/profilePicture.svg";
import logo from "../resources/images/logoSmallDevs.svg";
import devsUnited from "../resources/images/devsUnited.svg";
import TweetContainer from "../components/TweetContainer";
import UserProfile from "./UserProfile";

function FeedPage() {
    const {
        userProfile,
        tweet, 
        tweets,
        setTweet
    } = useContext(AppContext);
    let params = useParams();
    const [character, setCharacter] = useState(0);

    const handleChangeInputTweet = (e) => {
        e.preventDefault();
        const optionDate = {
            day: "numeric",
            month: "short"
        }

        let newTweet = {
            autor: userProfile.userName,
            date: new Date().toLocaleDateString("es-CL", optionDate),
            email: userProfile.email,
            tweet: e.target.value,
            numLike: 0,
            profilePicture: userProfile.profilePicture,
            uid: userProfile.uid
        }
        console.log(newTweet);
        setTweet(newTweet);
        characterCounter(setCharacter);
    }

    const handleButtonPost = (e) => {
        e.preventDefault();
        firestore.collection("tweets").add(tweet);
        setTweet({});
        setCharacter(0);
    }

    

    return (
        <section className="feedPage">
            <header className="headerFeedPage">
                <img src={userProfile.profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <img src={logo} alt="Logo Devs_United" className="logoSmall"/>
                <img src={devsUnited} alt="Título Devs_United" className="titleDevsUnited"/>
            </header>
            <form className="formBox">
                <img src={userProfile.profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <div className="inputContainer">
                    <textarea name="inputTweet" id="inputTweet" cols="30" rows="5" value={tweet.tweet ? tweet.tweet : ""} placeholder="What's happening?" className="inputTweet" onChange={handleChangeInputTweet} maxLength="200">
                        
                    </textarea>
                    <div className="progressBar" id="progressBar">
                        <div className="progress" id="progress"></div>
                    </div>
                    <div className="countingBoxCharacters">
                        <p className="characters">{character}</p>
                        <p className="characters maxCharacters">200 max.</p>
                    </div>
                    <button className="postButton" onClick={handleButtonPost}>POST</button>
                </div>
            </form>
            <article>
                {tweets.length > 0 ? tweets.map((tweet) => {
                    console.log(tweet.date);
                    return (
                        <TweetContainer 
                            key={tweet.id}
                            profilePicture={tweet.profilePicture}
                            userName={tweet.username} 
                            date={tweet.date}
                            tweet={tweet.tweet}
                            numLike={tweet.numLike}
                        />
                    ) 
                }):(<h1>No hay nada</h1>)}
            </article>
            <Outlet/>
        </section>
    )
}

export default FeedPage;