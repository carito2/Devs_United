import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { firestore } from "../firebase/firebase";
import Loading from "../components/Loading";
import BoxColors from "../components/BoxColors"
import HeaderWelcome from "../components/HeaderWelcome";
import FooterWelcome from "../components/FooterWelcome";
import Button from "../components/Button";

function WelcomePage() {
    const {
        user,
        userProfile,
        setUserProfile,
        loading
    } = useContext(AppContext);

    const [userColor, setUserColor] = useState({});
    const [userName, setUserName] = useState({});

    let navigate = useNavigate();

    const handleChangeInputUsername = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
    }

    const handleColorChange = (color) => {
        setUserColor(color.hex);
    }
    
    const handleButton = (e) => {
        e.preventDefault();
        if(userName && userColor) {
            if(userProfile.verifiedUserProfile === true){
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
                setUserProfile({
                    ...newUserProfile,
                    verifiedUserProfile: true
                });
                navigate("/feed");
            }
        }

    }
    return (
        <section className="welcomePage">
            <HeaderWelcome />
            {loading 
                ? (<Loading />)
                :
                    <main className="containerWelcome">
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
            } 
            <Outlet/>
        </section>
    )
}

export default WelcomePage;