import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar></Navbar>
      <main className='flex-1 bg-[#f0f6ff] text-[#0f172a]'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;