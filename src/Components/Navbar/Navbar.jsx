import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import userImg from '/user.png'
import { IoLogOut } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleSignOut = () => {
    logOut().then(() => {
      toast.success('Log out successfully')
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="navbar border-b border-[#cbd5e1] px-1 md:px-9 bg-[#e2e8ff] text-[#0f172a] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content border border-[#cbd5e1] bg-[#e2ebff] rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li className='font-bold text-[#2563eb]'><NavLink to='/'>Home</NavLink></li>

            <li className='font-bold text-[#2563eb]'><NavLink to='/all-contest'>All Contest</NavLink></li>
            <li className='font-bold text-[#2563eb]'><NavLink to='/blog'>Blog</NavLink></li>

          </ul>
        </div>
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        <Link to='/' className="text-xl md:text-2xl font-bold tracking-tight">

          <span className="text-[#1e3a8a]">Contest </span>
          <span className="text-[#2563eb]">Hub</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className='font-bold text-[#2563eb]'><NavLink to='/'>Home</NavLink></li>

          <li className='font-bold text-[#2563eb]'><NavLink to='/all-contest'>All Contest</NavLink></li>

          <li className='font-bold text-[#2563eb]'><NavLink to='/blog'>Blog</NavLink></li>


        </ul>
      </div>
      <div className="navbar-end">
        <div className='flex gap-1.5'>
          {
            user ? (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 border-2 border-blue-300 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      referrerPolicy="no-referrer"
                      className='w-10 h-10'
                      src={user.photoURL || userImg}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu  menu-sm dropdown-content text-white bg-[#0f1f3d] rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <div className=" pb-3 border-b border-b-gray-200">
                    <li className="text-sm font-bold">{user.displayName}</li>
                    <li className="text-xs">{user.email}</li>
                  </div>


                  <li className="mt-3">
                    <Link to={"/dashboard"}>
                      Dashboard
                    </Link>
                  </li>


                  <li>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-primary hover:bg-[#1e40af] text-white font-semibold px-5 mt-1.5 py-2 rounded-lg shadow-md"
                    >
                      <IoLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (<>
              <Link to='/register' className="btn btn-primary hover:bg-[#1e40af] text-white font-semibold px-5 py-2 rounded-lg shadow-md">
                Register
              </Link>
              <Link to='/login' className="btn btn-primary hover:bg-[#1e40af] text-white font-semibold px-5 py-2 rounded-lg shadow-md">
                Login
              </Link>

            </>

            )
          }
        </div>
      </div>
    </div>

  );
};

export default Navbar;