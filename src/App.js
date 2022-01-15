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
import Posts from "./components/Posts";
import Favorites from "./components/Favorites";

function App() {
  const {
    tweet,
    tweets,
    user,
    userProfile,
    setLoading,
    setTweet,
    setTweets,
    setUser,
    setUserProfile
  } = useContext(AppContext);

  let navigate = useNavigate();
  const params = useParams();
  

  useEffect(() => {
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
    auth.onAuthStateChanged((user) => {
      if(user) {
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
            <Route path="userProfile" element={<UserProfile />}>
              <Route path="posts" element={<Posts />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
            <Route path="userProfileB/:username" element={<UserProfileB />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate replace to="/signUp" />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;