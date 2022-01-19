import React from "react";
import { Outlet} from "react-router";
import { loginWithGoogle } from "../firebase/firebase";
import HeaderWelcome from "../components/HeaderWelcome";
import FooterWelcome from "../components/FooterWelcome";
import Button from "../components/Button";
import logoGoogle from "../resources/images/logoGoogle.svg";

function SignUpPage() {

    const handleButtonLogin = () => {
        loginWithGoogle();
    };

    return (
        <section className="welcomePage">
            <HeaderWelcome />
            <main className="containerSignIn">
                <h1>LOREM IPSUM DOLOR</h1>
                <p className="paragraphWelcome">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                {/* <button className="boxLogin" onClick={handleButtonLogin}>
                    <img className="logoGoogle" src={logoGoogle} alt="Logo de Google" />
                    <span className="buttonSignIn">Sign in with Google</span>
                </button> */}
                <Button 
                    classNameBtn={"boxLogin"}
                    onClick={handleButtonLogin}
                    imgClassName={"logoGoogle"}
                    imgSrc={logoGoogle}
                    imgTextAlt={"Logo de Google"}
                    content={"Sign in with Google"}
                    contentClassName={"buttonSignIn"}
                />
                <FooterWelcome />
            </main>
            <Outlet/>
        </section>
    )
}

export default SignUpPage;
