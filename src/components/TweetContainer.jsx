import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext"
import firebase from 'firebase/app';
import { firestore } from "../firebase/firebase";
import logoLike from "../resources/images/logoLike.svg";
import logoDislike from "../resources/images/logoDislike.svg";
import iconTrash from "../resources/images/iconTrash.png";

function TweetContainer({ 
    profilePicture, 
    dateTweet, 
    tweet, 
    numLike, 
    id,
    uid, 
    userUid, 
    likes }) {

    const { usersProfilesList } = useContext(AppContext);

    const optionDate = {
        day: "numeric",
        month: "short"
    }
    //Se cambia formato de fecha a dd mes (Ejemplo: 15 jun).
    let dateConvert = new Date(dateTweet).toLocaleDateString("es-CL", optionDate);

    //Se traen a userProperty las propiedades de usuario desde lista de perfiles creados.
    let userProperty = usersProfilesList.filter((user) => user.uid === uid).shift();
    
    //Se verifica si usuario le ha dado like a tweet.
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
        <article className="tweetContainer">
            <Link to={userUid === uid 
                ? "/userProfile/posts" 
                : `/userProfileB/${uid}`}
            >
                <img 
                    src={profilePicture} 
                    alt="Foto del perfil de usuario" 
                    className="profilePicture" 
                />
            </Link>
            <div className="tweetBox">
                <div className="headerBox">
                    <div className="containerUserDate">
                        <h1 
                            className="usernameTitle" 
                            style={{backgroundColor: `${userProperty && userProperty.userColor}`}}
                        >
                            {userProperty && userProperty.userName}
                        </h1>
                        <p className="tweetDate">{` - ${dateConvert}`}</p>
                    </div>
                    {userUid === uid && 
                        <img 
                            src={iconTrash} 
                            className="iconTrash" 
                            alt="Icono de eliminar" 
                            onClick={() => deleteTweet(id)} 
                        />}
                </div>
                <p 
                    style={{color: `${userProperty && userProperty.userColor}`}}
                >
                    {userProperty && userProperty.email}
                </p>
                <p className="tweetContent">{tweet}</p>
                <div className="likeBox">
                    <img 
                        src={userLike ? logoLike : logoDislike} 
                        alt="Corazón de like" 
                        className="logoLike" 
                        onClick={updateLike} 
                    />
                    <p className="numberOfLikes">{numLike}</p>
                </div>
            </div>
            <Outlet />
        </article>
    )
}

export default TweetContainer;