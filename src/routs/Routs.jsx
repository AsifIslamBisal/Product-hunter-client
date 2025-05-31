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
import MyProfile from "../Pages/Dashboard/AdminView/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AdminView/Allusers";
import AdminRoute from "./AdminRoute";
import AllReviews from "../Pages/Dashboard/AdminView/AllReviews";
import DashboardInfo from "../Pages/Dashboard/AdminView/DashboardInfo";
import UserProfile from "../Pages/Dashboard/UserView/UserProfile";
import AddProduct from "../Pages/Dashboard/UserView/AddProduct";
import MyProduct from "../Pages/Dashboard/UserView/MyProduct";
import UserProducts from "../Pages/Dashboard/AdminView/UserProducts";
import About from "../Pages/About/About";


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
          path:'about',
          element:<About></About>
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
        path: 'dashboardInfo',
        errorElement: <AdminRoute><DashboardInfo></DashboardInfo></AdminRoute>
      },
      {
        path: 'Users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'reviews',
        element: <AdminRoute><AllReviews></AllReviews></AdminRoute>
      },
      {
        path: 'Profile',
        element: <UserProfile></UserProfile>
      },
      {
        path: 'addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: 'MyProduct',
        element: <MyProduct></MyProduct>
      },
      {
        path: 'userProducts',
        element: <AdminRoute><UserProducts></UserProducts></AdminRoute>
      },
    ]
  }
]);