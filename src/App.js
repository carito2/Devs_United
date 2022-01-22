import React, {useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./contexts/AppContext";
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
import "./styles/AppMobile.css"

function App() {

  const{ user } = useContext(AppContext);

  return (
    <div className="App">
          <Routes>
            <Route path="/" >
              <Route index element={<Home />}/> 
              <Route path="signUp" element={!user ? <SignUpPage /> : <Navigate replace to="/" />} />
              <Route path="welcome" element={user  ? <WelcomePage /> : <Navigate replace to="/" />} />
              <Route path="feed" element={user ? <FeedPage /> : <Navigate replace to="/" />} />
              <Route path="userProfile" element={user ? <UserProfile /> : <Navigate replace to="/" />}>
                <Route path="posts" element={<Posts />} />
                <Route path="favorites" element={<Favorites />} />
              </Route>
              <Route path="userProfileB/:uid" element={user ? <UserProfileB /> :  <Navigate replace to="/" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
    </div>
  );
}

export default App;