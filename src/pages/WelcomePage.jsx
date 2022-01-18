import React, {useContext, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {AppContext} from "../contexts/AppContext";
import {firestore} from "../firebase/firebase";
import getIdUser from "../helpers/getIdUser";
import logo from "../resources/images/logoDevsUnited.svg";
import BoxColors from "../components/BoxColors"

function WelcomePage() {
    const {
        user,
        userProfile,
        setUserProfile,
        usersProfilesList
    } = useContext(AppContext);

    let navigate = useNavigate();
    const [id, setId] = useState();
    let userName;
    let userColor;


    const handleChange = (e) => {
        userName = e.target.value;
    }

    const handleColorChange = (color) => {
        userColor = color;
    }
    let verifiedUserProfile = usersProfilesList.find((userProfile) => userProfile.uid === user.uid) ? "true" : "false";
    console.log(verifiedUserProfile);
    firestore
        .collection("usersProfile").where("uid", "==", userProfile.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {setId(doc.id)});                    
        })
                

    const handleButton = (e) => {
        e.preventDefault();
        if(userName && userColor) {
            if(verifiedUserProfile){
                const modifiedUser = firestore.doc(`usersProfile/${id}`);
                modifiedUser
                .update({
                    userColor: userColor,
                    userName: userName
                })
                .then(() => {
                    let newUser = {
                        ...userProfile,
                        userName: userName,
                        userColor: userColor
                    }
                    setUserProfile(newUser);
                })
                .catch((error) => {
                    console.error("Error de actualización de doumento", error);
                });	
                navigate("/feed");
            } else {
                let newUserProfile =  {
                    email: user.email,
                    name: user.displayName,
                    profilePicture: user.photoURL,
                    userColor: userColor,
                    userName: userName,
                    uid: user.uid
                }
                firestore.collection("usersProfile").add(newUserProfile);
                setUserProfile(newUserProfile);
                navigate("/feed");
            }
        }
    }
    return (
        <section className="welcomePage">
            <header className="logoContainer">
                <img className="logoWelcome" src={logo} alt="Logo Devs_United" />
            </header>
            <article className="containerSignIn">
                <h1>Welcome <span className="betaName">{user.displayName}!</span></h1>
                <input className="inputUsername" type="text" name="userName" placeholder="Type your username" onChange={handleChange}/>
                <p>Select your favorite color</p>
                <BoxColors handleChange={handleColorChange}/>
                <button className="buttonWelcome" onClick={handleButton}>Continue</button>
                <footer className="footerWelcomePage">
                    <p className="paragraphFooter">© 2020 Devs_United - <span className="beta">BETA</span></p>
                </footer>
            </article>
            <Outlet/>
        </section>
    )
}

export default WelcomePage;