import React, { useContext } from "react";
import {AppContext} from "../contexts/AppContext";
import TweetContainer from "../components/TweetContainer";

function Favorites () {
    const {
        tweets,
        userProfile
    } = useContext(AppContext);
    return (
        <>
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