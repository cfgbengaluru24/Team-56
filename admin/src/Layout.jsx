import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';



const Layout = ({ children }) => {


  return (
    <>
    
      <div className="layout">
        <Navbar  />
        <main className="content">
          {children}
        </main>
        
      </div>
    </>
  );
};

export default Layout;
