// Home.js

import React, { createContext, useState } from "react";
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";

// Create context outside the component
const UserContext = createContext();
const UpdateLevels = createContext();
const UpdateUser = createContext();

function Home({ user, levels, userID }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <UserContext.Provider value={user}>
      <UpdateLevels.Provider value={levels}>
        <UpdateUser.Provider value={userID}>
          <section className="h-screen flex px-3 py-3">
            <div className="w-[15%] bg-[#F1F2F7] h-screen fixed">
              <Nav closeNav={toggleMenu} isOpen={isOpen} user={user} />
            </div>

            <div className="w-full flex flex-col relative ml-[15%]">
              <div>
                <Outlet toggleMenu={toggleMenu} />
              </div>
            </div>
          </section>
        </UpdateUser.Provider>
      </UpdateLevels.Provider>
    </UserContext.Provider>
  );
}

export default Home;
export { UserContext, UpdateLevels, UpdateUser };
