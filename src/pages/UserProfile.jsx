import React, { useContext } from "react";
import {Outlet, Link, useNavigate} from "react-router-dom";
import {logout} from "../firebase/firebase";
import back from "../resources/images/back.svg";
import logoutIcon from "../resources/images/logout.svg";
import profilePicture from "../resources/images/profilePicture.svg";
import TweetContainer from "../components/TweetContainer";
import { NavLink } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Favorites from "../components/Favorites";
import Posts from "../components/Posts"

function UserProfile() {
    const {
        userProfile,
        setUser,
        setUserProfile
    } = useContext(AppContext);

    let navigate = useNavigate();

    const logoutHandler = () => {
        console.log("se activo logout");
        logout();
        setUser("");
        setUserProfile("");
        navigate("/");
    }
    return (
        <section className="userProfile">
            <header className="headerUserProfile">
                <div className="returnBox">
                    <Link to="/feed">
                        <img src={back} alt="Boton volver atrás" className="buttonBack" />
                    </Link>
                    <h1 className="username">{userProfile.userName}</h1>
                </div>
                <button className="buttonLogout" onClick={logoutHandler} >LOGOUT <img src={logoutIcon} alt="Boton cerrar sesión" className="logoLogout"/></button>
            </header>
            <article className="userInformation">
                <img src={userProfile.profilePicture} alt="Foto de perfil" className="profilePicture" style={{border: `5px solid ${userProfile.userColor}`}}/>
                <h1 className="username" style={{backgroundColor: `${userProfile.userColor}`}}>{userProfile.userName}</h1>
                <nav className="profileTabs">
                    <NavLink to="posts" className="tab" >Posts</NavLink>
                    <NavLink to="favorites" className="tab">Favorites</NavLink>
                </nav>
            </article>
            <Outlet />
        </section>
    )
}

export default UserProfile;