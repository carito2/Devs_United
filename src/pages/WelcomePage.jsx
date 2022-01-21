import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { firestore } from "../firebase/firebase";
import BoxColors from "../components/BoxColors"
import HeaderWelcome from "../components/HeaderWelcome";
import FooterWelcome from "../components/FooterWelcome";
import Button from "../components/Button";

function WelcomePage() {
    const {
        user,
        userProfile,
        setUserProfile,
        usersProfilesList,
        Loading
    } = useContext(AppContext);

    let navigate = useNavigate();

    let userName;
    let userColor;


    const handleChangeInputUsername = (e) => {
        userName = e.target.value;
    }

    const handleColorChange = (color) => {
        userColor = color.hex;
    }

    //Se crea variable para verificar si existe o no el usuario dentro de la lista de perfiles creados
    let verifiedUserProfile = usersProfilesList.find((userProfile) => userProfile.uid === user.uid) 
        ? true 
        : false;

    const handleButton = (e) => {
        e.preventDefault();
        if(userName && userColor) {
            if(verifiedUserProfile){
                firestore.collection("usersProfile").where("uid", "==", userProfile.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        firestore.doc(`usersProfile/${doc.id}`)
                        .update({
                            userColor: userColor,
                            userName: userName
                        })
                    })
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
            <HeaderWelcome />
            {!Loading 
                ?
                    <main className="containerSignIn">
                        <h1>Welcome <span className="betaName">{user && user.displayName}!</span></h1>
                        <p>{user && user.email}</p>
                        <input 
                            className="inputUsername" 
                            type="text" 
                            name="userName" 
                            placeholder="Type your username" 
                            onChange={handleChangeInputUsername}
                        />
                        <p>Select your favorite color</p>
                        <BoxColors 
                            handleChange={handleColorChange}
                        />
                        <Button 
                            classNameBtn={"buttonWelcome"}
                            onClick={handleButton}
                            content={"Continue"}
                        />
                        <FooterWelcome />
                    </main>
                : <Loading />
            } 
            
            <Outlet/>
        </section>
    )
}

export default WelcomePage;