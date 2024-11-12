import React, { useState } from "react";
import Modal from "./Modal.tsx";
import LoginForm from "./LoginForm.tsx";
import SignupForm from "./SignupForm.tsx";

const UserLogin: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup forms

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <nav>
      <button
        style={styles.button}
        onClick={() => {
          setIsLogin(true);
          toggleModal();
        }}
      >
        Login
      </button>

      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          {isLogin ? <LoginForm /> : <SignupForm />}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Switch to Signup" : "Switch to Login"}
          </button>
        </Modal>
      )}
    </nav>
  );
};

const styles = {
  button: {
    backgroundColor: "#0a4f58",
    color: "white",
    padding: "8px 32px",
    fontSize: "24px",
    fontFamily: "Arial, Helvetica, sans-serif",
    margin: "100px",
    borderRadius: "10px",
    border: "2px solid rgb(184, 119, 0)",
  },
};

export default UserLogin;
