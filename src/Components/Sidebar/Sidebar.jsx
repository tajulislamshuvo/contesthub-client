import { useState } from 'react'
import { Link } from 'react-router'
// import useAuth from '../../../hooks/useAuth'
// import logo from '../../../assets/images/logo-flat.png'
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars, AiOutlineTransaction } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import useAuth from '../../hooks/useAuth'
import MenuItem from '../Dashboard/MenuItem'
import { MdOutlineAddTask, MdOutlineTask } from 'react-icons/md'
import { GoTasklist } from 'react-icons/go'
import { FaPushed, FaUserCog } from 'react-icons/fa'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import useRole from '../../hooks/useRole'
import Spinner from '../Spinner/Spinner'

// User Menu
// import MenuItem from './Menu/MenuItem'
// import AdminMenu from './Menu/AdminMenu'
// import SellerMenu from './Menu/SellerMenu'
// import CustomerMenu from './Menu/CustomerMenu'

const Sidebar = () => {
  const { logOut } = useAuth();
  const { role, roleLoading } = useRole();
  const [isActive, setActive] = useState(false)
  // const [role, isRoleLoading] = useRole()

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  if (roleLoading) {
    return <Spinner></Spinner>
  }

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">

                <span className="text-[#1e3a8a]">Contest </span>
                <span className="text-[#2563eb]">Hub</span>
              </h1>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className='flex flex-col h-full'>
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#caebfa] mx-auto'>
              <Link to='/'>
                <h1 className="text-xl md:text-xl font-bold tracking-tight">

                  <span className="text-[#1e3a8a]">Contest </span>
                  <span className="text-[#2563eb]">Hub</span>
                </h1>
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <h2 className='md:hidden text-xl font-bold'>Dashboard</h2>
          <div className='flex flex-col justify-between flex-1 mt-6'>

            {/*  Menu Items */}
            <nav>
              {/* Common Menu */}
              <MenuItem

                icon={BsGraphUp}
                label='Dashboard overview'
                address='/dashboard'
              />

              {
                role === 'creator' && <>
                  <MenuItem

                    icon={MdOutlineAddTask}
                    label='Add contest'
                    address='add-contest'
                  />
                  <MenuItem

                    icon={MdOutlineTask}
                    label='My contests'
                    address='my-contest'
                  />

                </>
              }


              {
                role === 'admin' && <>
                  <MenuItem

                    icon={GoTasklist}
                    label='Manage contest'
                    address='manage-contest'
                  />


                  <MenuItem

                    icon={FaUserCog}
                    label='Manage users'
                    address='manage-users'
                  />
                </>
              }




              {
                role === 'user' && <>
                  <MenuItem

                    icon={AiOutlineTransaction}
                    label='Transections'
                    address='my-transaction'
                  />
                  <MenuItem

                    icon={FaPushed}
                    label='My submissions'
                    address='my-submission'
                  />
                </>
              }









              {/* Role-Based Menu */}
              {/* {role === 'customer' && <CustomerMenu />}
              {role === 'seller' && <SellerMenu />}
              {role === 'admin' && <AdminMenu />} */}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr />


            <button
              onClick={logOut}
              className='flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />

              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar