import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [tweets, setTweets] = useState([]);
    const [tweet, setTweet] = useState({
        tweet: "",
        username: "",
        email: "",
        numLike: 0,
        date: "", 
        uid: "",
    });
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState([]);
    return (
        <AppContext.Provider value={{
            tweet, 
            tweets, 
            user,
            userProfile,
            setTweet, 
            setTweets, 
            setUser,
            setUserProfile
        }}>
            {children}
        </AppContext.Provider>
    );
}