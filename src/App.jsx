import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home';
import FlavorLab from './pages/FlavorLab';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/flavor-lab" element={<FlavorLab />} />
      </Routes>
    </Router>
  );
}

export default App;
