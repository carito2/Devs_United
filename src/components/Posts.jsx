import React, {useState, useContext, useEffect} from "react";
import {firestore} from "../firebase/firebase";
import {AppContext} from "../contexts/AppContext";
import TweetContainer from "./TweetContainer";

function Posts () {
    const {
        tweets,
        userProfile
    } = useContext(AppContext);

    return (
        <>
            <h1>Esto es Post</h1>
            {tweets.filter((tweet) => tweet.uid === userProfile.uid).map((post) => {
                return(
                    <TweetContainer 
                                key={post.id}
                                profilePicture={post.profilePicture}
                                userName={post.username} 
                                dateTweet={post.date}
                                tweet={post.tweet}
                                likes={post.likes}
                                numLike={post.numLike}
                                userUid={userProfile.uid}
                                uid={post.uid}
                                id={post.id}
                            />
                )
            })}
        </>
    );
}

export default Posts;