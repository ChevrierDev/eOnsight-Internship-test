import React from "react";
import logo from "../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <div className="mt-2">
      <img src={logo} alt="Logo" className="w-24 ml-7" />
    </div>
  );
};

export default Header;