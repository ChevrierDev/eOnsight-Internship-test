import React, { useEffect } from "react";
import logo from "../assets/logo.svg";

interface HeaderProps {
  onShowTable: () => void;
  onShowForm: () => void;
  onShowChart: () => void;
  activeButton: number;
  setActiveButton: React.Dispatch<React.SetStateAction<number>>;
}


const Header: React.FC<HeaderProps> = ({ onShowTable, onShowForm, onShowChart, activeButton, setActiveButton }) => {
  // handle button click to switch views
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
    if (index === 0) {
      onShowTable();
    } else if (index === 1) {
      onShowForm();
    } else if (index === 2) {
      onShowChart();
    }
  };

  useEffect(() => {
    // handle window resize to reset active button
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActiveButton(0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setActiveButton]);

  return (
    <div className="flex items-center justify-between bg-tableBg pl-5 md:pl-0 md:bg-transparent md:mt-2 md:flex-none md:justify-normal">
      <img src={logo} alt="Logo" className="w-16 h-16 ml-10 md:w-24 md:h-24 bg-red" />

      {/* Mobile nav menu */}
      <div className="flex items-center justify-around w-[60%] md:hidden mx-auto">
        {/* Go to bridges table btn */}
        <button className="group w-10 h-10" onClick={() => handleButtonClick(0)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className={`w-6 h-6 fill-current ${activeButton === 0 ? "text-buttonPrimary" : "text-white"}`}
          >
            <path
              fill={activeButton === 0 ? "var(--buttonPrimary)" : "white"}
              stroke={activeButton === 0 ? "var(--buttonPrimary)" : "white"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.1520"
              d="M4 19v14h8c0-6.627 5.373-12 12-12s12 5.373 12 12h8V19s-12.035-4-20-4-20 4-20 4"
            />
          </svg>
        </button>

        {/* Go to add bridges form btn */}
        <button className="group w-10 h-10" onClick={() => handleButtonClick(1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`w-6 h-6 fill-current ${activeButton === 1 ? "text-buttonPrimary" : "text-white"}`}
          >
            <path
              fill={activeButton === 1 ? "var(--buttonPrimary)" : "white"}
              d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 9h-4V7h-2v4H7v2h4v4h2v-4h4z"
            />
          </svg>
        </button>

        {/* Go to piecharts btn */}
        <button className="group w-10 h-10" onClick={() => handleButtonClick(2)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            className={`w-6 h-6 fill-current ${activeButton === 2 ? "text-buttonPrimary" : "text-white"}`}
          >
            <path
              fill={activeButton === 2 ? "var(--buttonPrimary)" : "white"}
              fillRule="evenodd"
              d="M10 6h3.9A5.01 5.01 0 0 0 10 2.1zm0-4.917A6.005 6.005 0 0 1 15 7H9V1q.511 0 1 .083M7 8l1 1h4.9A5.002 5.002 0 0 1 3 8a5 5 0 0 1 4-4.9zm1 6a6 6 0 0 0 6-6H8V2q-.511 0-1 .083A6.002 6.002 0 0 0 8 14"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
