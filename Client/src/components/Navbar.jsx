import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <div className='relative flex items-center justify-between py-5 font-medium'>

      {/* Logo */}
      <img src={assets.logo} className='w-36' alt="logo" />

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Icons */}
      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="search" />

        {/* Profile Dropdown */}
        <div className='group relative'>
          <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="profile" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Order</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
        </Link>

        {/* Mobile Menu Icon */}
        <img onClick={toggleMenu} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menu" />
      </div>

      {/* Sidebar for Mobile Screens */}
      <div className={`fixed top-0 right-0 h-full bg-white z-50 transition-transform transform ${visible ? 'translate-x-0' : 'translate-x-full'} w-[75%] sm:hidden`}>
        <div className="flex justify-between p-5">
          <img src={assets.logo} className='w-36' alt="logo" />
          <img onClick={toggleMenu} src={assets.close_icon} className='w-5 cursor-pointer' alt="close" />
        </div>
        <ul className='flex flex-col items-center gap-5 mt-10 text-sm text-gray-700'>
          <NavLink to='/' className='text-center' onClick={toggleMenu}>
            <p>HOME</p>
          </NavLink>
          <NavLink to='/collection' className='text-center' onClick={toggleMenu}>
            <p>COLLECTION</p>
          </NavLink>
          <NavLink to='/about' className='text-center' onClick={toggleMenu}>
            <p>ABOUT</p>
          </NavLink>
          <NavLink to='/contact' className='text-center' onClick={toggleMenu}>
            <p>CONTACT</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
