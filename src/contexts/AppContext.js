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
    const [loading, setLoading] = useState(true);
    return (
        <AppContext.Provider value={{
            tweet, 
            tweets, 
            user,
            userProfile,
            loading,
            setTweet, 
            setTweets, 
            setUser,
            setUserProfile,
            setLoading
        }}>
            {children}
        </AppContext.Provider>
    );
}