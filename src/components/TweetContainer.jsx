import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext"
import firebase from 'firebase/app';
import {firestore} from "../firebase/firebase";
import logoLike from "../resources/images/logoLike.svg";
import logoDislike from "../resources/images/logoDislike.svg";
import iconTrash from "../resources/images/iconTrash.png";
import { Outlet, useParams } from "react-router";
import UserProfile from "../pages/UserProfile";
import { Link } from "react-router-dom";

function TweetContainer({ 
    profilePicture, 
    userName, 
    date, 
    tweet, 
    numLike, 
    id,
    uid, 
    userUid, 
    likes }) {


    let userLike = likes && likes.includes(userUid);

    const updateLike = () => {
        const tweetToModifies = firestore.doc(`tweets/${id}`)
            if(userLike) {
                tweetToModifies
                .update({
                    numLike: numLike - 1,
                    likes: firebase.firestore.FieldValue.arrayRemove(userUid)
                })
                .catch((error) => {
                    console.error("Error de actualización de documento", error);
                });	
            } else {
                tweetToModifies
                .update({
                    numLike: numLike + 1,
                    likes: firebase.firestore.FieldValue.arrayUnion(userUid)
                })
                .catch((error) => {
                    console.error("Error de actualización de documento", error);
                });	
            }
    }

    const deleteTweet = (id) => {
        let confirmTweet = window.confirm("¿Estás seguro de querer eliminar este Tweet?")
        confirmTweet && firestore.doc(`tweets/${id}`).delete();
    }


    return(
        <div className="tweetContainer">
            <Link to={userUid === uid ? "/userProfile" : `/userProfileB/${userName}`}>
                <img src={profilePicture} alt="Foto del perfil de usuario" className="profilePicture" />
            </Link>

            <div className="tweetBox">
                <div className="headerBox">
                    <h1 className="usernameTitle">{userName}</h1>
                    <p className="tweetDate">{` - ${date}`}</p>
                    {userUid === uid && <img src={iconTrash} className="iconTrash" alt="Icono de eliminar" onClick={() => deleteTweet(id)} />}
                    
                </div>
                <p className="tweetContent">{tweet}</p>
                <div className="likeBox">
                    <img src={userLike ? logoLike : logoDislike} alt="Corazón de like" className="logoLike" onClick={updateLike} />
                    <p className="numberOfLikes">{numLike}</p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default TweetContainer;