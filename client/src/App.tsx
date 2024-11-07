// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../client/public/src/pages/Home";
import Favorites from "../client/public/src/pages/Favorites";
import Navbar from "../client/public/src/components/nav";
import ExploreRecipes from "../client/public/src/pages/ExploreRecipes";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-recipes" element={<ExploreRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
