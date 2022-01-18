import React, { useContext } from "react";
import {Outlet, useNavigate, useParams} from "react-router";
import { AppContext } from "../contexts/AppContext";
import { logout } from "../firebase/firebase";
import TweetContainer from "../components/TweetContainer";
import back from "../resources/images/back.svg";
import logoutIcon from "../resources/images/logout.svg";

function UserProfileB() {
    let navigate = useNavigate();
    const {uid} = useParams();
    const {
        userProfile, usersProfilesList, tweets
    } = useContext(AppContext);
    
    let userProperty = usersProfilesList.filter((user) => user.uid === uid).shift();

    const logoutHandler = () => {
        logout();
        navigate("/");
    }
    return (
        <section className="userProfile">
            <header className="headerUserProfile">
                <div className="returnBox">
                    <img src={back} alt="Boton volver atrás" className="buttonBack" onClick={() => navigate("/feed")} />
                    <h1 className="username" >{userProperty.userName}</h1>
                </div>
                <button className="buttonLogout" onClick={logoutHandler} >LOGOUT <img src={logoutIcon} alt="Boton cerrar sesión" className="logoLogout"/></button>
            </header>
            <article className="userInformation">
                <img src={userProperty.profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <h1 className="username" style={{backgroundColor: `${userProperty && userProperty.userColor}`}}>{userProperty.userName}</h1>
            </article>
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
            <Outlet />
        </section>
    )
}

export default UserProfileB;