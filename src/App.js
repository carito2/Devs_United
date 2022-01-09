import React, {useContext, useEffect} from "react";
import {AppContext} from "./contexts/AppContext";
import {firestore, loginWithGoogle, auth, logout} from "./firebase/firebase"
import FeedPage from './pages/FeedPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import './styles/App.css';

function App() {
  const {
    tweet,
    tweets,
    user,
    usersProfiles,
    setTweet,
    setTweets,
    setUser,
    setUsersProfiles
  } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            tweet: doc.data().tweet,
            username: doc.data().username,
            email: doc.data().email,
            numLike: doc.data().numLike,
            date: doc.data().date,
            uid: doc.data().uid
          }
        })
        setTweets(tweets);
      });
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  },[])

  useEffect(() => {
    const unsubscribe = firestore
      .collection("usersProfile")
      .onSnapshot((snapshot) => {
        const users = snapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            email: doc.data().email,
            profilePicture: doc.data().profilePicture,
            userColor: doc.data().userColor,
            userName: doc.data().userName,
            uid: doc.data().uid,
          }
        })
        setUsersProfiles(users);
      });
    return () => unsubscribe();
  },[])



  return (
    <div className="App">
      {user ? (user.username ? (<FeedPage />) : (<WelcomePage />)
      ) : (
        <SignUpPage />
      )}
    </div>
  );
}

export default App;
