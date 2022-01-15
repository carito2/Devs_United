import React, { useEffect } from "react";
import {Outlet, useNavigate, useParams} from "react-router";
import back from "../resources/images/back.svg";
import logout from "../resources/images/logout.svg";
import profilePicture from "../resources/images/profilePicture.svg";
import TweetContainer from "../components/TweetContainer";
import { firestore } from "../firebase/firebase";

function UserProfileB() {
    let navigate = useNavigate();
    const {userName} = useParams();

    // useEffect(() => {
    //     if(userName) {
    //         var output = firestore.collection("usersProfile").where("userName", "==", userName)
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 // doc.data() is never undefined for query doc snapshots
    //                 console.log(doc.id, " => ", doc.data());
    //             });
    //         })
    //         .catch((error) => {
    //             console.log("Error getting documents: ", error);
    //         });
    //         return output;
    //     }
        
    // }),[];

    // let x = firestore.collection("usersProfile").where("userName", "==", userName);
    // x.map((user) => {
    //     return {
    //         profilePicture: user.profilePicture,
    //         userName: user.userName,
    //         userColor: user.userColor,
    //         uid: user.uid
    //     }
    // })
    // console.log(x);
    return (
        <section className="userProfile">
            <header className="headerUserProfile">
                <div className="returnBox">
                    <img src={back} alt="Boton volver atrás" className="buttonBack" onClick={() => navigate("/feed")} />
                    <h1 className="username">{userName}</h1>
                </div>
            </header>
            <article className="userInformation">
                <img src={profilePicture} alt="Foto de perfil" className="profilePicture"/>
                <h1 className="username">Username</h1>
            </article>
            <TweetContainer />
            <TweetContainer />
            <TweetContainer />
            <Outlet />
        </section>
    )
}

export default UserProfileB;