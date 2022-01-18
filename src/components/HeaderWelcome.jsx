import React from "react";
import logo from "../resources/images/logoDevsUnited.svg";

function HeaderWelcome () {
    return  (
        <header className="logoContainer">
                <img className="logoWelcome" src={logo} alt="Logo Devs_United" />
        </header>
    )
};

export default HeaderWelcome;