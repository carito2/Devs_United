import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../firebase/firebase";
import Button from "../components/Button";
import back from "../resources/images/back.svg";
import logoutIcon from "../resources/images/logout.svg";

function UserProfileInformation ({ userProperty }) {

    let navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate("/");
    }
    
    return(
        <>
            <header className="headerUserProfile">
                <div className="returnBox">
                    <Link to="/feed">
                        <img 
                            src={back} 
                            alt="Boton volver atrás" 
                            className="buttonBack" 
                        />
                    </Link>
                    <h1 className="username" >{userProperty.userName}</h1>
                </div>
                <Button 
                    classNameBtn={"buttonLogout"}
                    onClick={logoutHandler}
                    imgClassName="logoLogout"
                    imgSrc={logoutIcon}
                    imgTextAlt={"Boton cerrar sesión"}
                    content={"LOGOUT"}
                />
                {/* <button className="buttonLogout" onClick={logoutHandler} >LOGOUT <img src={logoutIcon} alt="Boton cerrar sesión" className="logoLogout"/></button> */}
            </header>
            <article className="userInformation">
                <img 
                    src={userProperty.profilePicture} 
                    alt="Foto de perfil" 
                    className="profilePicture"
                    style={{border: `5px solid ${userProperty.userColor}`}}
                />
                <h1 
                    className="username" 
                    style={{backgroundColor: `${userProperty && userProperty.userColor}`}}
                >
                    {userProperty.userName}
                </h1>
            </article>
        </>
    )
}

export default UserProfileInformation;