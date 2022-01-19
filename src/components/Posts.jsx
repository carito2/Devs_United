import React, { useContext } from "react";
import {AppContext} from "../contexts/AppContext";
import TweetContainer from "./TweetContainer";

function Posts () {
    const {
        tweets,
        userProfile
    } = useContext(AppContext);

    return (
        <div className="postUserProfile">
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
        </div>
    );
}

export default Posts;