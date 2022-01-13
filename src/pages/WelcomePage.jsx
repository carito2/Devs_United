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
        setUserProfile
    } = useContext(AppContext);

    let navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e);
        setUser({...user, [e.target.name]: e.target.value});
        console.log(user);
    }

    const handleColorChange = (color) => {
        console.log(color);
        setUser({...user, "userColor": color});
        console.log(user);
    }

    const handleButton = (e) => {
        
        e.preventDefault();
        if(user.userName && user.userColor) {
            let newUserProfile =  {
                email: user.email,
                name: user.displayName,
                profilePicture: user.photoURL,
                userColor: user.userColor,
                userName: user.userName,
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