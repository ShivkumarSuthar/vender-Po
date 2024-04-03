import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { FaUserTie, FaBars } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosPeople, IoIosChatbubbles, IoMdImages } from "react-icons/io";
import { CgOptions } from "react-icons/cg";
import { FaTableColumns } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Nav() {





  return (
    <section className="h-screen w-100">
      <div>
        <div className="pt-4 pb-[7px] border-b-[1px] border-slate-200 flex justify-between pl-0 pr-5 items-center">
          <div className="flex justify-start items-center pl-3 ">
            <span>
              <FaUserTie className="bg-slate-400 w-8 h-8 p-2 rounded-full text-white text-2xl" />
            </span>
            <span className="ml-2 font-Montserrat  font-medium text-slate-200 text-xl">
              Admin
            </span>
          </div>
        </div>

        <div>
          <nav className="pt-0">
            <ul className="font-Montserrat font-thin text-slate-200 text-lg">
              <li className="p-3 hover:bg-blue-600">
                <Link to="/Dashboard" className="flex items-center">
                  <AiOutlineDashboard />
                  <span className="text-base pl-1">Dashboard</span>
                </Link>
              </li>
              <li className="p-3 hover:bg-blue-600">
                <Link to="/Every" className="flex items-center">
                  <IoIosPeople />
                  <span className="text-base pl-1">Everyone</span>
                </Link>
              </li>
              <li className="p-3 hover:bg-blue-600">
                <Link to="/Dashboard" className="flex items-center">
                  <IoIosPeople />
                  <span className="text-base pl-1">Visitors</span>
                </Link>
              </li>
              <li className="p-3 hover:bg-blue-600">
                <Link to="/Dashboard" className="flex items-center">
                  <IoIosChatbubbles />
                  <span className="text-base pl-1">Feedbacks</span>
                </Link>
              </li>
              <li className="p-3 hover:bg-blue-600">
                <Link to="/Dashboard" className="flex items-center">
                  <CgOptions />
                  <span className="text-base pl-1">Categories</span>
                </Link>
              </li>
              <li className="p-3 hover:bg-blue-600">
                <Link to="/Dashboard" className="flex items-center">
                  <IoMdImages />
                  <span className="text-base pl-1">Time Wall</span>
                </Link>
              </li>
              <li className="p-3 hover:bg-blue-600">
                <Link to="/Dashboard" className="flex items-center">
                  <CgOptions />
                  <span className="text-base pl-1">Large Categories</span>
                </Link>
              </li>
              <li className="p-3 hover:bg-blue-600">
                <Link to="/Dashboard" className="flex items-center">
                  <FaTableColumns />
                  <span className="text-base pl-1">Large Video Wall</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Nav;
