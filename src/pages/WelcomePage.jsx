import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import {firestore} from "../firebase/firebase"
import logo from "../resources/images/logoDevsUnited.svg";
import BoxColors from "../components/BoxColors"

function WelcomePage() {
    const {
        user,
        setUser,
        usersProfiles,
        setUsersProfiles
    } = useContext(AppContext);
    let userName, userColor;
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        console.log("user");
        console.log(user)
    }

    const handleButton = (e) => {
        e.preventDefault();
    //Paso 1 Enviar a la base de datos
        let sendUser = firestore.collection("usersProfile").add(user);
    //Paso 2 Traernos nuevamente
        let requestDoc = sendUser.then((docRef) => {
        return docRef.get()
        })
    //Paso 3
        requestDoc.then((doc) => {
        let newUserProfile = {
            email: doc.data().email,
            profilePicture: doc.data().photoURL,
            userColor: doc.data().userColor,
            userName: doc.data().userName,
            uid: doc.data().uid,
        }
    //Paso 4 Seteamos Tweets
        setUsersProfiles([newUserProfile, ...usersProfiles]);
        console.log("usersProfiles");
        console.log(usersProfiles);
        })
    }

    return (
        <section className="welcomePage">
            <header className="logoContainer">
                <img className="logoWelcome" src={logo} alt="Logo Devs_United" />
            </header>
            <article className="containerSignIn">
                <h1>Welcome <span className="betaName">Name!</span></h1>
                <input className="inputUsername" type="text" name="userName" placeholder="Type your username" onChange={handleChange}/>
                <p>Select your favorite color</p>
                <BoxColors />
                <button className="buttonWelcome" onClick={handleButton}>Continue</button>
                <footer className="footerWelcomePage">
                    <p className="paragraphFooter">© 2020 Devs_United - <span className="beta">BETA</span></p>
                </footer>
            </article>
        </section>
    )
}

export default WelcomePage;