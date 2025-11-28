import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import Landing from './pages/Landing';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfilePage'; 

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} /> {/* Add this route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;