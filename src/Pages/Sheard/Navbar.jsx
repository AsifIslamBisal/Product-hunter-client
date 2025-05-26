import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authContext } from '../../Provider/AuthProvider';
// import { FaCartShopping } from "react-icons/fa6";
// import useCart from '../../../Hooks/useCart';
// import useAdmin from '../../../Hooks/useAdmin';

const Navbar = () => {
  const { user, logOut } = useContext(authContext);
  // const [isAdmin] = useAdmin();
  // const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(error => console.error(error));
  };

  const navOption = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/menu">Products</Link></li>
      <li><Link to="/order/salad">About</Link></li>

      {/* {
        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
      }
      {
        user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
      } */}

      {/* <li>
        <Link to="/dashboard/cart">
          <button className="btn">
            <FaCartShopping className='mr2'></FaCartShopping>
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li> */}
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-[1520px] mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOption}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <h3 className="text-3xl">Product Hunt</h3>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOption}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={user.photoURL || "https://ibb.co/ZzDnYRsq"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-black"
            >
              <li><span className="justify-between">{user.displayName}</span></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogOut}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn">Sign In</NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
