import React, { useState } from 'react';
import { MdOutlineMenu } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { CgOrganisation } from "react-icons/cg";
import { PiCubeBold } from "react-icons/pi";
import { LuArrowDownUp } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import { Logo } from '../../assets';

function Sidebar() {

  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('Home');
  const Menus = [
    { title: 'Home', icon: <FiHome />},
    { title: 'Organization', icon: <CgOrganisation /> },
    { title: 'Assets', icon: <PiCubeBold /> },
    { title: 'Trade', icon: <LuArrowDownUp /> },
    { title: 'History', icon: <GiSandsOfTime /> },
    { title: 'Wallet', icon: <IoWalletOutline /> }
  ]

  return (
    <aside className={`h-screen bg-heavy-metal`}>
      <nav className='h-full flex flex-col shadow-sm p-4'>
        <div className={`flex justify-between items-center pt-8 duration-300 ${open? "w-72": "w-10"}`}>
         <img src={Logo} alt='logo' className={`overflow-hidden duration-300 ${open? "w-32" : "w-0"}`}/>
         <MdOutlineMenu className='text-white text-3xl cursor-pointer' onClick={() => setOpen(!open)}/>
       </div>  
       <div className='flex items-center rounded-md bg-mine-shaft mt-6 px-4 py-2'>
         <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`}/>
         <input 
          className={`bg-transparent w-full text-white text-base focus:outline-none duration-300 ${!open && "hidden"}`}
          type={'search'} 
          placeholder='Search' />
       </div>
       <ul className='pt-2'>
        {Menus.map((menu, index) => (
          <>
           <li 
             key={index} 
             className={`${active == menu.title ? "text-chateau-green": "text-white"} text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-mine-shaft rounded-md mt-2`}
             onClick={() => setActive(menu.title)}
             >
            <span className='text-xl block float-left'>
                {menu.icon}
            </span>
            <span className={`font-semibold duration-300 ${!open && "hidden"}`}>
                {menu.title}
            </span>
           </li>
          </>
        ))}
       </ul>
      </nav>
    </aside>
  )
}

export default Sidebar