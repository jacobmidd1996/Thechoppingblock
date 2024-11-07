import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>Recipe App</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/home" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/explore-recipes" style={styles.link}>
            Explore Recipes
          </Link>
        </li>
        <li>
          <Link to="/favorites" style={styles.link}>
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
  },
  title: {
    fontSize: "24px",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Navbar;
