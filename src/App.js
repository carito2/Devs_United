import React, {useContext, useEffect} from "react";
import {AppContext} from "./contexts/AppContext";
import {firestore, loginWithGoogle, auth, logout} from "./firebase/firebase"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import FeedPage from './pages/FeedPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import './styles/App.css';

function App() {
  const {
    tweet,
    tweets,
    user,
    userProfile,
    setTweet,
    setTweets,
    setUser,
    setUserProfile
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
      firestore
      .collection("usersProfile").where("uid", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserProfile(doc.data());
        })
      })
    });
    return () => unsubscribe();
  },[])

  return (
    <div className="App">
      {user ? (userProfile.userName ? (<FeedPage />) : (<WelcomePage />)
      ) : (
        <SignUpPage />
      )}
    </div>
  );
}

export default App;
