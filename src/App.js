// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;