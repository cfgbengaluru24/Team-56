import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

import { Home } from "./Routes/Home/Home";
import Layout from "./Layout"; // Import the Layout component
import UserProfile from "./Routes/UserProfile/UserProfile";
import Poc from "./Routes/Poc/Poc"; // Import Poc component
import PocDashboard from "./Routes/PocDashboard/PocDashboard";
import Donor from "./Routes/Donar/Donor";
import Reports from "./Routes/Donar/Reports";
import Donate from "./Routes/Donate/Donate";
import DonorDashboard from "./Routes/Donar/DonorDashboard";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/home",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/profile/:id",
      element: (
        <Layout>
          <UserProfile />
        </Layout>
      ),
    },
    {
      path: "/loc",
      element: (
        <Layout>
          <Poc />
        </Layout>
      ),
    },
    {
      path: "/donor",
      element: (
        <Layout>
          <Donor />
        </Layout>
      ),
    },
    {
      path: "/PocDashboard",
      element: (
        <Layout>
          <PocDashboard />
        </Layout>
      ),
    },
    {
      path: "/donor/reports",
      element: (
        <Layout>
          <Reports />
        </Layout>
      ),
    },
    {
      path: "/donor/dashboard",
      element: (
        <Layout>
          <DonorDashboard />
        </Layout>
      ),
    },
    {
      path: "/Donate",
      element: (
        <Layout>
          <Donate />
        </Layout>
      ),
    },
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
