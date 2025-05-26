import {
  createBrowserRouter,
  
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/signup/SignUp";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/',
            element:<Home></Home>,
        },
        {
            path: '/login',
            element:<Login></Login>,
        },
        {
            path: '/signUp',
            element:<SignUp></SignUp>,
        },
    ]
  },
]);