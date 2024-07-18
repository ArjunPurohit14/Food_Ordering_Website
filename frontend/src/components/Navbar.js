import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img4.png';
// 

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
  
      <nav className="bg-black p-2">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-2xl font-italic" to="/">
            <img src={logo} alt="Zoop Logo" className="h-12 mr-4" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link className="text-white text-lg" to="/">Home</Link>
            {isLoggedIn ? (
              <button
                className="bg-white text-green-700 px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  className="bg-white text-red-700 px-4 py-2 rounded"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="bg-white text-green-700 px-4 py-2 rounded"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link
              className="bg-white text-green-700 px-4 py-2 rounded"
              to="/cart"
            >
              Cart
            </Link>
          </div>
        </div>
      </nav>
    
  );
};

export default Navbar;
