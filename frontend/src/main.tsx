import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Items from './pages/Items/Items.tsx';
import Users from './pages/Users/Users.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Items />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/items",
    element: <Items />,
  },
  {
    path: "/users",
    element: <Users />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
