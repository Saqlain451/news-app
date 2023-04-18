import React from "react";
import { HiMoon } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { useGlobalHook } from "../../Hooks/Context";
import { FaSun, FaSearch } from "react-icons/fa";
import "./navbar.css";
const Navbar = () => {
  const { themeChangeHandle, isDark } = useGlobalHook();
  return (
    <header className="header">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src={logo} alt="logo" />
          SNews
        </NavLink>
      </div>
      <div className="nav-btns">
        <span>
          <NavLink to={"/search"}>
            <FaSearch />
          </NavLink>
        </span>
        <span onClick={themeChangeHandle}>
          {isDark ? <FaSun /> : <HiMoon />}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
