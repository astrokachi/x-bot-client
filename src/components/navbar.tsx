import React from "react";
import "../styles/components/navbar.scss";
import logoutIcon from "../assets/logout.svg";

const Navbar = () => {
  return (
    <div className="nav-con">
      <div className="nav">
        <header>Twitter Bot Manager</header>

        <button className="logout">
          <img src={logoutIcon} alt="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
