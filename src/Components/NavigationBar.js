import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavigationBar({ cartcount, cartPrice }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <span>Cart</span>
            <span className="badge">{cartcount}</span>
          </Link>
        </li>
        <span className="nav-link-price">- &#8377;{cartPrice}</span>
      </ul>
      <div className="profile-picture">
        <img
          src={"https://robohash.org/Jeanne.png?set=set4"}
          alt={""}
          onClick={toggleMenu}
        />
        {isOpen && (
          <ul className="menu">
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
