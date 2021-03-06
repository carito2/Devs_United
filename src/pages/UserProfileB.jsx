import React, { useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import TweetContainer from "../components/TweetContainer";
import UserProfileInformation from "../components/UserProfileInformation";
import Loading from "../components/Loading";

function UserProfileB() {

    const { uid } = useParams();

    const {
        userProfile, 
        usersProfilesList, 
        tweets
    } = useContext(AppContext);
    
    //Se traen a userProperty las propiedades de usuario desde lista de perfiles creados.
    let userProperty = usersProfilesList.filter((user) => user.uid === uid).shift();

    
    return (
        <>
            {usersProfilesList && usersProfilesList.length > 0 
                ? 
                <section className="userProfile">
                    <UserProfileInformation  userProperty={userProperty} />
                    <article className="tweetsUserProfileB">
                        { tweets.filter((tweet) => tweet.uid === userProperty.uid).map((post) => {
                            return (
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
                        })
                        }
                    </article>
                    <Outlet />
                </section>
                : <Loading />
            }
        </>
        
    )
}

export default UserProfileB;