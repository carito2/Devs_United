import React, {useContext, useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {AppContext} from "./contexts/AppContext";
import Home from "./pages/Home";
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import FeedPage from './pages/FeedPage';
import UserProfile from './pages/UserProfile';
import UserProfileB from './pages/UserProfileB';
import NotFound from "./pages/NotFound";
import Posts from "./components/Posts";
import Favorites from "./components/Favorites";
import './styles/App.css';



function App() {
  const {user, userProfile} = useContext(AppContext);
  console.log("user");
  console.log(user);
  console.log("userProfile");
  console.log(userProfile);

  return (
    <div className="App">
      <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="userProfile" element={<UserProfile />}>
              <Route path="posts" element={<Posts />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
            <Route path="userProfileB/:username" element={<UserProfileB />} />
            <Route path="*" element={<NotFound />} />
            
          </Route>
      </Routes>
    </div>
  );
}

export default App;