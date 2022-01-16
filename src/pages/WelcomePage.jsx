import React, {useContext} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {AppContext} from "../contexts/AppContext";
import {firestore} from "../firebase/firebase"
import logo from "../resources/images/logoDevsUnited.svg";
import BoxColors from "../components/BoxColors"

function WelcomePage() {
    const {
        user,
        setUser,
        userProfile,
        usersProfilesList,
        setUserProfile
    } = useContext(AppContext);

    let navigate = useNavigate();
    let userName;
    let userColor;

    const handleChange = (e) => {
        userName = e.target.value;
    }

    const handleColorChange = (color) => {
        userColor = color;
    }

    const handleButton = (e) => {
        
        e.preventDefault();
        console.log("Entre al boton");
        if(userName && userColor) {
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
            navigate("/feed")
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