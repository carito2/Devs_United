import React, {useContext, useEffect} from "react";
import {Routes, Route, useNavigate, useParams, Navigate} from "react-router-dom";
import {AppContext} from "./contexts/AppContext";
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import FeedPage from './pages/FeedPage';
import UserProfile from './pages/UserProfile';
import UserProfileB from './pages/UserProfileB';
import NotFound from "./pages/NotFound";
import {firestore, loginWithGoogle, auth, logout} from "./firebase/firebase";
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

  let navigate = useNavigate();
  let params = useParams();
  

  useEffect(() => {
    const unsubscribe = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            profilePicture: doc.data().profilePicture,
            tweet: doc.data().tweet,
            username: doc.data().autor,
            email: doc.data().email,
            numLike: doc.data().numLike,
            date: doc.data().date,
            uid: doc.data().uid,
            id: doc.id
          }
        })
        setTweets(tweets);
        console.log(tweets);
      });
    auth.onAuthStateChanged((user) => {
      if(user) {
        console.log(user);
        setUser(user);
        firestore
        .collection("usersProfile").where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserProfile(doc.data());
          })
      })
      }
    });
    return () => unsubscribe();
  },[])
  

  return (
    <div className="App">
      <Routes>
          <Route path="/">
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="userProfile/:username" element={<UserProfile />} />
            <Route path="userProfileB/:username" element={<UserProfileB />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate replace to="/signUp" />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;