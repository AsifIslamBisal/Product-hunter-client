import {
  createBrowserRouter,
  
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/signup/SignUp";
import Products from "../Pages/Products/Products";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import ProductDetails from "../Pages/Products/ProductDetails";
import MyProfile from "../Pages/Dashboard/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AdminView/Allusers";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/',
            element:<Home></Home>,
            errorElement: <ErrorPage></ErrorPage>,
        },
        {
            path: 'products',
            element:<Products></Products>,
        },
        {
            path: 'product/:id',
            element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
        },
        {
            path: 'login',
            element:<Login></Login>,
        },
        {
            path: 'signUp',
            element:<SignUp></SignUp>,
        },
    ]
  },
  // Dashboard routs
  {
    path:'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>,
      },
      {
        path: '/dashboard/Users',
        element: <AllUsers></AllUsers>
      }
    ]
  }
]);