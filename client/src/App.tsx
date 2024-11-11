// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/nav";
import ExploreRecipes from "./pages/ExploreRecipes";
import UserLogin from "./components/UserLogin/index";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-recipes" element={<ExploreRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/user-login" element={<UserLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
