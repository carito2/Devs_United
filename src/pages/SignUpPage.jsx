import React, {useContext} from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import {AppContext} from "../contexts/AppContext";
import { loginWithGoogle } from "../firebase/firebase";
import logo from "../resources/images/logoDevsUnited.svg";
import logoGoogle from "../resources/images/logoGoogle.svg";

function SignUpPage() {
    const {
        user,
        userProfile, 
        usersProfilesList,
        setUserProfile,
    } = useContext(AppContext);
    
    let navigate = useNavigate();

    const handleButtonLogin = () => {
        loginWithGoogle();
        // if(user && userProfile.userName){
        //     console.log("me voy a feed rectm");
        //     navigate("/feed");
        // } else {
        //     console.log("me voy a welcome rectm");
        //     navigate("/welcome");
        // }
    };

    return (
        <section className="welcomePage">
            <header className="logoContainer">
                <img className="logoWelcome" src={logo} alt="Logo Devs_United" />
            </header>
            <article className="containerSignIn">
                <h1>LOREM IPSUM DOLOR</h1>
                <p className="paragraphWelcome">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <button className="boxLogin" onClick={handleButtonLogin}>
                    <img className="logoGoogle" src={logoGoogle} alt="Logo de Google" />
                    <span className="buttonSignIn">Sign in with Google</span>
                </button>
                <footer className="footerWelcomePage">
                    <p className="paragraphFooter">© 2020 Devs_United - <span className="beta">BETA</span></p>
                </footer>
            </article>
            <Outlet/>
        </section>
    )
}

export default SignUpPage;
