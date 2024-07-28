import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      <div className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Track the Clothes</Link>
        <Link to='/donated' onClick={() => setMenu("donated")} className={menu === "donated" ? "active" : ""}>Donated Section</Link>
        <Link to='/served' onClick={() => setMenu("served")} className={menu === "served" ? "active" : ""}>Served Section</Link>
      </div>
    </div>
  );
};

export default Navbar;
