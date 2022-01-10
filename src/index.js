import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AppProvider} from "./contexts/AppContext";
import App from './App';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import FeedPage from './pages/FeedPage';
import UserProfile from './pages/UserProfile';
import UserProfileB from './pages/UserProfileB';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/feed/:username" element={<FeedPage />} />
          <Route path="/userProfile/:username" element={<UserProfile />} />
          <Route path="/userProfileB/:username" element={<UserProfileB />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);
