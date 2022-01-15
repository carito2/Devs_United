import React, { useState, useEffect, createContext } from "react";
import {firestore, auth} from "../firebase/firebase";

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

    useEffect(() => {
        if(user) {
            setLoading(true);
            const unsubscribe = firestore
                .collection("tweets")
                .onSnapshot((snapshot) => {
                    const tweets = snapshot.docs.map((doc) => {
                    return {
                        profilePicture: doc.data().profilePicture,
                        tweet: doc.data().tweet,
                        username: doc.data().autor,
                        email: doc.data().email,
                        likes: doc.data().likes,
                        numLike: doc.data().numLike,
                        date: doc.data().date,
                        uid: doc.data().uid,
                        id: doc.id
                    }
                    })
                    setTweets(tweets);
                    setLoading(false);
                });
                return () => unsubscribe();
            }
        auth.onAuthStateChanged((user) => {
            setUser(user);
            firestore
            .collection("usersProfile").where("uid", "==", user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setUserProfile(doc.data());
                })
            })
        });
    },[user]);

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