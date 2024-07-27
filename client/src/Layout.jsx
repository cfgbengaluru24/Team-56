import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'; // If you want a common footer as well
import Login from './components/Login/Login'
import SignUp from './components/Signup/Signup'

const Layout = ({ children }) => {
  const [showLogin, setshowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  const switchToSignUp = () => setIsLogin(false);

  return (
    <>
      {showLogin && (
        isLogin ?
          <Login setshowLogin={setshowLogin} switchToSignUp={switchToSignUp} /> :
          <SignUp setshowLogin={setshowLogin} switchToLogin={switchToLogin} />
      )}
      <div className="layout">
        <Navbar setshowLogin={setshowLogin} />
        <main className="content">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
