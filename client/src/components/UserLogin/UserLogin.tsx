import React from "react";

const UserLogin = () => {
  return (
    <div className="form-container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text"></input>
          <label htmlFor="username">Username</label>
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="email"></input>
          <label htmlFor="email">E-mail</label>
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="password"></input>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="forgot-password">
        Forgot Password? <span>Click Here!</span>
      </div>
      <div className="submit-container">
        <div className="submit">Sign Up</div>
        <div className="submit">Login</div>
      </div>
    </div>
  );
};

export default UserLogin;
