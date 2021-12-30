import React, { useState, createContext } from "react";
import UserProfile from "../pages/UserProfile";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [tweets, setTweets] = useState([]);
    const [tweet, setTweet] = useState({});
    const [user, setUser] =useState(null);
    return (
        <AppContext.Provider value={{
            tweet, 
            tweets, 
            user, 
            setTweet, 
            setTweets, 
            setUser
        }}>
            {children}
        </AppContext.Provider>
    );
}