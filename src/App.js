import React, {useContext, useEffect} from "react";
import {AppContext} from "./contexts/AppContext";
import {firestore, loginWithGoogle, auth, logout} from "./firebase/firebase"
import UserProfile from './pages/UserProfileB';
import './styles/App.css';

function App() {
  const {
    tweet,
    tweets,
    user,
    setTweet,
    setTweets,
    setUser
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

  return (
    <div className="App">
      <UserProfile />
    </div>
  );
}

export default App;
