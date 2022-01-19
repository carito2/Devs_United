import React, { useContext } from "react";
import {Outlet, NavLink} from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import UserProfileInformation from "../components/UserProfileInformation";


function UserProfile() {
    const {
        userProfile,
    } = useContext(AppContext);

    return (
        <section className="userProfile">
            <UserProfileInformation userProperty={userProfile} />
            <nav className="profileTabs">
                <NavLink 
                    to="posts" 
                    className="tab" 
                >
                    Posts
                </NavLink>
                <NavLink 
                    to="favorites" 
                    className={`tab ${({ isActive }) => (isActive && 'active')}`}
                >
                    Favorites
                </NavLink>
            </nav>
            <Outlet />
        </section>
    )
}

export default UserProfile;