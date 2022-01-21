import React, { useState, useEffect, createContext } from "react";
import {firestore, auth} from "../firebase/firebase";
import sortByDates from "../helpers/sortByDates";

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
    const [usersProfilesList, setUsersProfilesList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    //Se realiza llamada a firebase para traernos data y autenticación.
    useEffect(() => {
        setLoading(true);
        if(user) {
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
                    //Se ordena la colección de tweets por fecha.
                    sortByDates(tweets);
                    setTweets(tweets);
                });

            const unsubscribeUsers = firestore
                .collection("usersProfile")
                .onSnapshot((snapshot) => {
                    const users = snapshot.docs.map((doc) => {
                        return {
                            profilePicture: doc.data().profilePicture,
                            name: doc.data().name,
                            userName: doc.data().userName,
                            userColor: doc.data().userColor,
                            email: doc.data().email,
                            uid: doc.data().uid,
                            id: doc.id
                        }
                    })
                    setUsersProfilesList(users); 
                    setLoading(false);
                }); 

            return () => {   
                unsubscribe(); 
                unsubscribeUsers();
            }
        }
        
        auth.onAuthStateChanged((userAuth) => {
            setUser(userAuth);
            // Si se recibe usuario atenticado(userAuth), iremos a firebase para trernos la data de usuario logueado.
            userAuth && firestore
                .collection("usersProfile").where("uid", "==", userAuth.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setUserProfile(doc.data());                 
                    })
                })
            
        })
        
    },[user]);

    return (
        <AppContext.Provider value={{
            tweet, 
            tweets, 
            user,
            userProfile,
            usersProfilesList,
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