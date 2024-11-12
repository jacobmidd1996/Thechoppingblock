import { Link } from "react-router-dom";
import unnamed from "./Assets/unnamed.png";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>
        The Chopping Block
        <img src={unnamed} style={styles.img} />
      </h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
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
        <li>
          <Link to="/user-login" style={styles.link}>
            Login
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
    backgroundColor: "#0a4f58",
    color: "white",
  },
  title: {
    fontSize: "30px",
    color: "white",
  },
  img: {
    width: "42px",
    height: "auto",
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
