import React from "react";
import Logo from "../assets/images/logo.svg";
import Search from  "../assets/images/search.svg";
import Store from "../assets/images/store.svg";

const Nav = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="list-styled">
          <li><img src={Logo} alt="Apple logo" /></li>
          <li><a className="list-styled">Store</a></li>
          <li><a className="list-styled">Mac</a></li>
          <li><a className="list-styled">ipad</a></li>
          <li><a className="list-styled">iphone</a></li>
          <li><a className="list-styled">Watch</a></li>
          <li><a className="list-styled">AirPods</a></li>
          <li><a className="list-styled">TV & Home</a></li>
          <li><a className="list-styled">Entertainment</a></li>
          <li><a className="list-styled">Accessories</a></li>
          <li><a className="list-styled">Supports</a></li>
          <li><img src={Search} alt="Search icon"/></li>
          <li><img src={Store} alt="Store icon"/></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
