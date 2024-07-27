import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import PropertiesList from './routes/PropertiesList/PropertiesList'
import VerifiedProperty from './routes/VerifiedProperty/VerifiedProperty';
import Home from './routes/Home/Home';
import Donated from './routes/Donated/Donated';
import Served from './routes/Served/Served';
import AdminLogin from './routes/AdminLogin/AdminLogin';
import HomePic from './routes/HomePic/HomePic'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout'; 
import { Protected } from './routes/Protected';


 
function App() {
  const router = createBrowserRouter([
    
    {
      path: "/",
      element:<Protected><Layout> <Home></Home> </Layout> </Protected>
    },
     {
      path: "/login",
      element:<AdminLogin></AdminLogin>
    },
    {
       path: "/donated",
      element: <Protected><Layout><Donated></Donated>  </Layout></Protected>
    },
    {
      path: "/served",
      element: <Protected><Layout><Served></Served>  </Layout></Protected>
    }
   

  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
