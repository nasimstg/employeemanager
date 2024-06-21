import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap p-2">
      <div className="flex items-center flex-shrink-0 text-gray-600 mr-6">
        <span className="font-semibold text-xl tracking-tight">Logo</span>
      </div>
      <div className="block lg:hidden">
        <button onClick={() => setShowMenu(!showMenu)} className="flex items-center px-3 py-2 border rounded text-gray-800 border-teal-400 hover:text-gray-600 hover:border-white">
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`${showMenu ? '' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
        <div className="text-sm lg:flex-grow">
          <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-600 mr-4">
            Home
          </a>
          <Link to="/fav" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-600 mr-4">
            Favorite
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;