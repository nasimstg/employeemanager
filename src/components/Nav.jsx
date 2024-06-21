import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md mb-4">
      <div className="text-gray-800">
        <Link to="/" className="text-lg lg:text-2xl font-semibold hover:text-gray-600">
          EmployeeManager
        </Link>
        
      </div>
      <div className="">
      <Link to="/fav" className="text-gray-800 hover:text-gray-600 block lg:p-2 text-base lg:text-lg">
              fav
            </Link>
      </div>
    </nav>
  );
};

export default Nav;