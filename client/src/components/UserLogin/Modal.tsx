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

export default Modal;
