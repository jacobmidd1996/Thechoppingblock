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

export default UserLogin;
