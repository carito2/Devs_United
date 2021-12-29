import React from "react";
import logo from "../resources/images/logoDevsUnited.svg";
import logoGoogle from "../resources/images/logoGoogle.svg";

function SignUpPage() {
    return (
        <section className="welcomePage">
            <header className="logoContainer">
                <img className="logoWelcome" src={logo} alt="Logo Devs_United" />
            </header>
            <article className="containerSignIn">
                <h1>LOREM IPSUM DOLOR</h1>
                <p className="paragraphWelcome">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <button className="boxLogin">
                    <img className="logoGoogle" src={logoGoogle} alt="Logo de Google" />
                    <span className="buttonSignIn">Sign in with Google</span>
                </button>
                <footer className="footerWelcomePage">
                    <p className="paragraphFooter">© 2020 Devs_United - <span className="beta">BETA</span></p>
                </footer>
            </article>
        </section>
    )
}

export default SignUpPage;
