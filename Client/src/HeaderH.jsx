import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from './Auth/AuthContext';
import userPic from './assets/Icons/user.png';

const HeaderH = () => {
  const { signOutUser, user, theme, setTheme } = useContext(AuthContext);

  const themeController = (event) => setTheme(event.target.checked);

  // Theme-based styling
  const headerBg = theme 
    ? "bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl border-white/10" 
    : "bg-gradient-to-r from-white/90 via-gray-50/90 to-white/90 backdrop-blur-xl border-black/10";
  
  const textColor = theme ? "text-white" : "text-gray-900";
  const linkColor = theme ? "text-gray-300" : "text-gray-700";
  const linkHover = theme ? "hover:text-white" : "hover:text-black";
  const menuBg = theme ? "bg-black/95" : "bg-white/95";
  const buttonBg = theme ? "bg-gradient-to-r from-blue-600 to-blue-700" : "bg-gradient-to-r from-blue-500 to-blue-600";

  // Smooth theme toggle
  const gifTheme = (
    <motion.label 
      className="swap swap-rotate cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <input
        onChange={themeController}
        type="checkbox"
        checked={theme}
        className="hidden"
      />
      {/* Sun icon */}
      <motion.svg
        className={`swap-off w-6 h-6 ${theme ? 'hidden' : 'block'} fill-current text-yellow-500`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        initial={{ rotate: 0 }}
        animate={{ rotate: theme ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </motion.svg>
      {/* Moon icon */}
      <motion.svg
        className={`swap-on w-6 h-6 ${theme ? 'block' : 'hidden'} fill-current text-blue-300`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        initial={{ rotate: 0 }}
        animate={{ rotate: theme ? 0 : -180 }}
        transition={{ duration: 0.3 }}
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </motion.svg>
    </motion.label>
  );

  // Navigation items
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/find-tutors", label: "Courses" },
    { to: "/add-tutorials", label: "Add Course" },
    { to: "/my-tutorials", label: "My Tutorials" },
    { to: "/my-booked-tutors", label: "Dashboard" }
  ];

  const headerItems = (
    <>
      {navItems.map((item, index) => (
        <motion.li 
          key={item.to}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl font-light tracking-wide text-sm transition-all duration-300 relative group
              ${linkColor} ${linkHover}
              ${isActive ? 'text-blue-500' : ''}`
            }
          >
            {item.label}
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${theme ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-300 group-hover:w-full`}></span>
          </NavLink>
        </motion.li>
      ))}
      {user ? (
        <motion.li
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={signOutUser}
            className={`px-6 py-2 ${buttonBg} text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </motion.li>
      ) : (
        <motion.li
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <NavLink
            to="/login"
            className={`px-6 py-2 ${buttonBg} text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 inline-block`}
          >
            Login
          </NavLink>
        </motion.li>
      )}
    </>
  );

  return (
    <motion.div
      className={`mx-auto my-4 w-[95%] max-w-7xl ${headerBg} ${textColor} border rounded-3xl shadow-2xl transition-all duration-500`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Logo Section */}
        <motion.div 
          className="flex items-center space-x-2 md:space-x-3 flex-shrink-0"
          whileHover={{ scale: 1.02 }}
        >
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${theme ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'} flex items-center justify-center`}>
            <span className="text-white font-bold text-sm md:text-lg">I</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-thin tracking-widest text-sm md:text-lg">IIUC ACADEMY</h1>
            <p className={`text-xs ${theme ? 'text-gray-400' : 'text-gray-600'} tracking-wider`}>Portal</p>
          </div>
        </motion.div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center space-x-1">{headerItems}</ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          {/* Theme Toggle */}
          <div className="hidden lg:block">{gifTheme}</div>

          {/* User Avatar */}
          <motion.div 
            className="dropdown dropdown-end"
            whileHover={{ scale: 1.05 }}
          >
            <div tabIndex={0} className="cursor-pointer">
              <div className="relative">
                <img
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white/20 shadow-lg"
                  src={user ? user.photoURL : userPic}
                  alt="User Avatar"
                />
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 ${theme ? 'bg-green-400' : 'bg-green-500'} rounded-full border-2 ${theme ? 'border-black' : 'border-white'}`}></div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`dropdown-content mt-3 ${menuBg} backdrop-blur-xl rounded-2xl shadow-2xl w-56 p-4 border ${theme ? 'border-white/10' : 'border-black/10'}`}
            >
              <li className="px-4 py-3 border-b border-gray-700">
                <p className="font-medium text-sm">{user ? user.displayName : "Guest User"}</p>
                <p className={`text-xs ${theme ? 'text-gray-400' : 'text-gray-600'}`}>{user ? user.email : "guest@example.com"}</p>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors mt-2">
                <a className="text-sm">Profile Settings</a>
              </li>
            </ul>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <div className="dropdown dropdown-end">
              <motion.div 
                tabIndex={0} 
                role="button" 
                className="btn btn-ghost btn-sm px-2"
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.div>
              <ul
                tabIndex={0}
                className={`menu dropdown-content ${menuBg} backdrop-blur-xl rounded-2xl shadow-2xl w-64 p-4 mt-3 border ${theme ? 'border-white/10' : 'border-black/10'}`}
              >
                {headerItems}
                <li className="mt-4 flex justify-center">{gifTheme}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderH;
