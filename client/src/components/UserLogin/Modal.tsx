import React from "react";
import "./UserLogin.css";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => (
  <div className="modal">
    <div className="modal-content">
      <button onClick={closeModal}>Close</button>
      {children}
    </div>
  </div>
);

const styles = {
  button: {
    backgroundColor: "#0a4f58",
    color: "white",
    padding: "8px 24px",
  },
};

export default Modal;
