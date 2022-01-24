import React from "react";
import { Outlet, Link } from "react-router-dom";
import logoDevsUnited from "../resources/images/logoDevsUnited.svg";

function NotFound() {
    return(
        <section className="notFoundPage">
            <h1>NOT FOUND: error 404</h1>
            <article className="containerLinkHome">
                <img src={logoDevsUnited} className="logoHome" alt="logo Devs_United"/>
                <Link to="/">
                    <p>Ir a Devs_United</p>
                </Link>
            </article>
            
            <Outlet/>
        </section>
    )
}

export default NotFound;