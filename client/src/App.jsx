import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

import { Home } from './Routes/Home/Home';
import Layout from './Layout'; // Import the Layout component
import UserProfile from './Routes/UserProfile/UserProfile';
import Poc from './Routes/Poc/Poc'; // Import Poc component
import Donar from './Routes/Donar/Donar'; // Import Donar component

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
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
