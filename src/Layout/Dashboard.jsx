import { FaAd, FaBook, FaHome, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendar, FaEnvelope, FaList,} from "react-icons/fa6";
import { RiMenuSearchFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { authContext } from "../Provider/AuthProvider";


 
const Dashboard = () => {
    const [cart] = useCart()
    const [isAdmin] = useAdmin();
    const user = useContext(authContext);
    // TODO: get inAdmin value from the database
    
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-gray-900 text-white">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                         <li>
                        <NavLink to="/dashboard/dashboard">
                        <FaHome></FaHome>
                        Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myProfile">
                        <FaUtensils></FaUtensils>
                        My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/Users">
                        <FaList></FaList>
                        Manage users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/products">
                        <FaBook></FaBook>
                        Manage Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reviews">
                        <FaUsers></FaUsers>
                        All Reviews</NavLink>
                    </li>
                        </> : <>
                        
                        <li>
                        <NavLink to="/dashboard/MyProfile">
                        <FaHome></FaHome>
                        My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addProducts">
                        <FaCalendar></FaCalendar>
                        Add Product</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/MyProducts">
                        <FaShoppingCart></FaShoppingCart>
                        My Products  ({cart.length})</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/review">
                        <FaAd></FaAd>
                        Add a Review</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/PaymentHistory">
                        <FaList></FaList>
                         Real Payment History</NavLink>
                    </li> */}
                        
                         </>
                    }
                    
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                        <FaHome></FaHome>
                        Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                        <RiMenuSearchFill></RiMenuSearchFill>
                        Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                        <FaEnvelope></FaEnvelope>
                        Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;