import React, {useState, useContext, useEffect} from "react";
import {AppContext} from "../contexts/AppContext";
import {firestore} from "../firebase/firebase";
import TweetContainer from "../components/TweetContainer";

function Favorites () {
    const {
        tweets,
        userProfile
    } = useContext(AppContext);
    return (
        <>
            <h1>Soy fav</h1>
            {tweets.filter((post) => post.likes && post.likes.find(( uidLike ) => userProfile.uid === uidLike)).map((fav) => {
                return(
                    <TweetContainer 
                                key={fav.id}
                                profilePicture={fav.profilePicture}
                                userName={fav.username} 
                                dateTweet={fav.date}
                                tweet={fav.tweet}
                                likes={fav.likes}
                                numLike={fav.numLike}
                                userUid={userProfile.uid}
                                uid={fav.uid}
                                id={fav.id}
                            />
                )
            })}
        </>
    );
};

export default Favorites;