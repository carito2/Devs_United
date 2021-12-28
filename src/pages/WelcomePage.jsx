import React from "react";
import logo from "../resources/images/logoDevsUnited.svg";
import BoxColors from "../components/BoxColors"

function WelcomePage() {
    return (
        <section className="welcomePage">
            <header className="logoContainer">
                <img className="logoWelcome" src={logo} alt="Logo Devs_United" />
            </header>
            <article className="containerSignIn">
                <h1>Welcome <span className="betaName">Name!</span></h1>
                <input className="inputUsername" type="text" placeholder="Type your username" />
                <p>Select your favorite color</p>
                <BoxColors />
                <button className="buttonWelcome">Continue</button>
                <footer className="footerWelcomePage">
                    <p className="paragraphFooter">© 2020 Devs_United - <span className="beta">BETA</span></p>
                </footer>
            </article>
        </section>
    )
}

export default WelcomePage;