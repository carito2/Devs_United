import React, {useContext, useState} from "react";
import {Outlet, Link} from "react-router-dom";
import {firestore} from "../firebase/firebase";
import {AppContext} from "../contexts/AppContext";
import TweetContainer from "../components/TweetContainer";
import Button from "../components/Button";
import characterCounter from "../helpers/characterCounter";
import logo from "../resources/images/logoSmallDevs.svg";
import devsUnited from "../resources/images/devsUnited.svg";
import Loading from "../components/Loading";


function FeedPage() {
    const {
        userProfile,
        tweet, 
        tweets,
        loading,
        setTweet
    } = useContext(AppContext);
    
    const [character, setCharacter] = useState(0);
    
    const handleChangeInputTweet = (e) => {
        e.preventDefault();

        let newTweet = {
            autor: userProfile.userName,
            date: Date.now(),
            email: userProfile.email,
            tweet: e.target.value,
            numLike: 0,
            profilePicture: userProfile.profilePicture,
            uid: userProfile.uid
        }
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
                <Link to="/userProfile/posts">
                    <img 
                        src={userProfile.profilePicture} 
                        alt="Foto de perfil" 
                        className="profilePicture" 
                        style={{border: `2px solid ${userProfile.userColor}`}}
                    />
                </Link>
                <Link to="/welcome">
                    <img 
                        src={logo} 
                        alt="Logo Devs_United" 
                        className="logoSmall"
                    />
                </Link>
                <img 
                    src={devsUnited} 
                    alt="Título Devs_United" 
                    className="titleDevsUnited"
                />
            </header>
            <form className="formBox">
                <img 
                    className="profilePicture"
                    src={userProfile.profilePicture} 
                    alt="Foto de perfil" 
                />
                <div className="inputContainer">
                    <textarea 
                        className="inputTweet"
                        name="inputTweet" 
                        id="inputTweet" 
                        cols="30" 
                        rows="5" 
                        value={tweet.tweet ? tweet.tweet : ""} 
                        placeholder="What's happening?"  
                        onChange={handleChangeInputTweet} 
                        maxLength="200"
                    />
                    <div className="progressBar" id="progressBar">
                        <div className="progress" id="progress"></div>
                    </div>
                    <div className="countingBoxCharacters">
                        <p className="characters">{character}</p>
                        <p className="characters maxCharacters">200 max.</p>
                    </div>
                    <Button 
                        classNameBtn="postButton"
                        onClick={handleButtonPost}
                        content="POST"
                    />
                </div>
            </form>
            {!loading 
                ? (tweets.length > 0 
                    ? (tweets.map((tweet) => {
                        return (
                            <TweetContainer 
                                key={tweet.id}
                                profilePicture={tweet.profilePicture}
                                dateTweet={tweet.date}
                                tweet={tweet.tweet}
                                likes={tweet.likes}
                                numLike={tweet.numLike}
                                userUid={userProfile.uid}
                                id={tweet.id}
                                uid={tweet.uid}
                            />
                        )}) 
                    ) 
                    : (<h1>No existe ningún tweet!</h1>)
                ) 
                : (<Loading />)}
            <Outlet/>
        </section>
    )
}

export default FeedPage;