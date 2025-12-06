import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import Landing from './pages/Landing';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfilePage'; 
import GalleryPage from './pages/GalleryPage';
import MainLayout from './pages/MainLayout';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} /> 
          <Route element={<MainLayout />}>
            <Route path="/landing" element={<Landing />} />
            <Route path="/create" element={<CreatePostPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;