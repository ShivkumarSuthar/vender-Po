import React from "react";

import { FaUserTie } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Nav({ closeNav, isOpen,user }) {
  const handleCloseNav = () => {
    closeNav(!isOpen);
  };

  return (
    <section className="h-screen w-100">
      <div>
        <div className="pb-[7px] border-b-[1px] border-[#C8CBD9] flex justify-between pl-0 pr-5 items-center">
          <div className="flex justify-start items-center pl-3 h-[60px] pt-2">
            <span className="p-1 bg-[#5A67BA] rounded-full w-[20px] h-[20px] mr-2 flex justify-center">
              <FaUserTie className="text-white text-[10px]" />
            </span>
            <span className="font-Montserrat  font-medium text-[#5A67BA] text-sm">
             {user}
            </span>
          </div>
          {/* <div className="w-[25%] flex justify-end">
            <button
              className="h-[30px] w-[30px] text-white flex justify-center items-center"
              onClick={handleCloseNav}
            >
              <span className="  text-white  text-md text-center ">
                <FaBarsStaggered />
              </span>
            </button>
          </div> */}
        </div>

        <div className="py-2 px-3 h-full">
          <nav className="pt-0 text-white">
            <span className="text-[#082431] text-[10px] uppercase">Menu</span>
            <ul className="py-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "bg-[#707fdd2f] text-[#5A6ACF]"
                      : "bg-none text-[#273240]"
                  } flex rounded-lg `
                }
              >
                <li className="flex items-center  px-2 py-3">
                  <AiOutlineDashboard className="text-[15px]" />
                  <span className=" pl-1 text-[12px]">Vender List</span>
                </li>
              </NavLink>
              <NavLink
                to="/po"
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "bg-[#707fdd2f] text-[#5A6ACF]"
                      : "bg-none text-[#273240]"
                  } flex rounded-lg`
                }
              >
                <li className="flex items-center px-2 py-3 ">
                  <IoIosPeople />
                  <span className=" pl-1  text-[12px]">Manual PO</span>
                </li>
              </NavLink>
            </ul>

            <span className="text-[#082431] text-[10px] uppercase">others</span>
            <ul>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "bg-[#707fdd2f] text-[#5A6ACF]"
                      : "bg-none text-[#273240]"
                  } flex rounded-lg`
                }
              >
                <li className="flex items-center px-2 py-3 ">
                  <IoIosPeople />
                  <span className=" pl-1  text-[12px]">Settings</span>
                </li>
              </NavLink>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Nav;
