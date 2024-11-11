// const UserLogin = () => {
//   return (
//     <div className="form-container">
//       <div className="header">
//         <div className="text">Sign Up</div>
//         <div className="underline"></div>
//       </div>
//       <div className="inputs">
//         <div className="input">
//           <input type="text"></input>
//           <label htmlFor="username">Username</label>
//         </div>
//       </div>
//       <div className="inputs">
//         <div className="input">
//           <input type="email"></input>
//           <label htmlFor="email">E-mail</label>
//         </div>
//       </div>
//       <div className="inputs">
//         <div className="input">
//           <input type="password"></input>
//           <label htmlFor="password">Password</label>
//         </div>
//       </div>
//       <div className="forgot-password">
//         Forgot Password? <span>Click Here!</span>
//       </div>
//       <div className="submit-container">
//         <div className="submit">Sign Up</div>
//         <div className="submit">Login</div>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required by React Modal for accessibility

function UserLogin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div>
      {/* Trigger Button */}
      <button onClick={openModal}>{isLogin ? "Login" : "Sign Up"}</button>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login or Signup"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {/* Form */}
        <form>
          {isLogin ? (
            <>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
            </>
          ) : (
            <>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
            </>
          )}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        {/* Toggle Link */}
        <p onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </p>

        {/* Close Button */}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default UserLogin;
