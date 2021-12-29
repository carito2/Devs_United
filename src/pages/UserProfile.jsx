import React from "react";
import back from "../resources/images/back.svg";
import logout from "../resources/images/logout.svg";

function UserProfile() {
    return (
        <section className="userProfile">
            <header>
                <button className="buttonBack"><img src={back} alt="Boton volver atrás" /></button>
                <h1 className="username">Username</h1>
                <button className="buttonLogout">LOGOUT <img src={logout} alt="Boton cerrar sesión" /></button>
            </header>
        </section>
    )
}

export default UserProfile;