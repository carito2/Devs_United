import React from "react";
import logo from "../resources/images/logoDevsUnited.svg";
import BoxColors from "../components/BoxColors"

function FeedPage() {
    return (
        <section className="welcomePage">
            <header className="logoContainer">
                <img className="logoWelcome" src={logo} alt="Logo Devs_United" />
            </header>
            <article className="containerSignIn">
                
            </article>
        </section>
    )
}

export default FeedPage;