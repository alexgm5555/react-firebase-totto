import React, { FC } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css';
import { LoginPage, GaleryPage, CapturePage } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/galery",
    element: <GaleryPage />,
  },
  {
    path: "/capture",
    element: <CapturePage />,
  }
]);
const App:FC =()=>{
  return (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  );
}

export default App;
