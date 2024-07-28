import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { LanguageProvider } from './Context/LanguageContext'; // Import the LanguageProvider

import { Home } from './Routes/Home/Home';
import Layout from './Layout'; 
import UserProfile from './Routes/UserProfile/UserProfile';
import Poc from './Routes/Poc/Poc';
import Donar from './Routes/Donar/Donar';
import PocDashboard from './Routes/PocDashboard/PocDashboard';
import './i18n'; // Ensure i18n is imported and initialized

function App() {
  const router = createBrowserRouter([
    {
      path: "/",  
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/home",
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/profile/:id",
      element: <Layout><UserProfile /></Layout>,
    },
    {
      path: "/loc",
      element: <Layout><Poc /></Layout>,
    },
    {
      path: "/donar",
      element: <Layout><Donar /></Layout>,
    },
    {
      path: "/PocDashboard",
      element: <Layout><PocDashboard /></Layout>,
    },
  ]);

  return (
    <AuthContext>
      <LanguageProvider>
        <RouterProvider router={router}></RouterProvider>
      </LanguageProvider>
    </AuthContext>
  );
}

export default App;
