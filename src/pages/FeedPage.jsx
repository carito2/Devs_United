import React, {useContext, useState} from "react";
import {Outlet, Link} from "react-router-dom";
import {firestore} from "../firebase/firebase";
import {AppContext} from "../contexts/AppContext";
import TweetContainer from "../components/TweetContainer";
import Loading from "../components/Loading";
import Button from "../components/Button";
import characterCounter from "../helpers/characterCounter";
import {progressBar} from "../helpers/characterCounter";
import logo from "../resources/images/logoSmallDevs.svg";
import devsUnited from "../resources/images/devsUnited.svg";

function FeedPage() {
    const {
        userProfile,
        tweet, 
        tweets,
        loading,
        setTweet
    } = useContext(AppContext);
    
    const [character, setCharacter] = useState(0);
    const [errorMessage, setErrorMessage] = useState(false);
    
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
        setErrorMessage(false);
        characterCounter(setCharacter);
    }

    const handleButtonPost = (e) => {
        e.preventDefault();
        if(tweet.tweet ){
            firestore.collection("tweets").add(tweet);
            setTweet("");
            setCharacter(0);
            progressBar(1);
        } else {
            setErrorMessage(true)
        }
    }
    console.log(loading);
    return (
        <>
            {loading 
                ? (<Loading />)
                : (<section className="feedPage">
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
                                className={`inputTweet ${errorMessage && "errorMessage"}`}
                                name="inputTweet" 
                                id="inputTweet" 
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
                            {errorMessage && 
                                <p className="errorMessage">Debes escribir un tweet!</p>}
                            <Button 
                                classNameBtn="postButton"
                                onClick={handleButtonPost}
                                content="POST"
                            />
                        </div>
                    </form>
                    {tweets.length > 0 
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
                        : (<h1>No existe ningún tweet!</h1>)}
                </section>) 
            }
            <Outlet/>
        </>
    )
}

export default FeedPage;