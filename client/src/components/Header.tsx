import React from "react";
import logo from "../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-tableBg pl-5 md:pl-0 md:bg-transparent md:mt-2 md:flex-none md:justify-normal">
      <img src={logo} alt="Logo" className="w-16 h-16 ml-10 md:w-24 md:h-24 bg-red" />

      {/* Mobile nav menu */}
      <div className="flex items-center justify-around w-4/5 bg-red-600 md:hidden">
        <button className="group w-10 h-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="w-6 h-6 fill-current svg-hover">
            <path fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1520" d="M4 19v14h8c0-6.627 5.373-12 12-12s12 5.373 12 12h8V19s-12.035-4-20-4-20 4-20 4"/>
          </svg>
        </button>

        <button className="group w-10 h-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6 fill-current svg-hover">
            <path fill="white" d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 9h-4V7h-2v4H7v2h4v4h2v-4h4z"/>
          </svg>
        </button>

        <button className="group w-10 h-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className="w-6 h-6 fill-current svg-hover">
            <g fill="none" stroke="white">
              <path d="M17.5 11A4.501 4.501 0 0 0 13 6.5V11z"/>
              <path d="M11 8.5a4.5 4.5 0 1 0 4.5 4.5H11z"/>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
