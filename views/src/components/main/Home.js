import React, { createContext, useState } from "react";
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";

// Create context outside the component
const UserContext = createContext();
const UpdateLevels = createContext();

function Home({user,levels}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <UserContext.Provider value={user}>
    <UpdateLevels.Provider value={levels}>
      <section className="h-screen flex px-3 py-3">
        {isOpen && (
          <div className="w-[15%] bg-[#F1F2F7] h-screen">
            <Nav closeNav={toggleMenu} isOpen={isOpen} user={user} />
          </div>
        )}

        <div className="w-full flex flex-col">
          <div>
            <Outlet toggleMenu={toggleMenu} />
          </div>
        </div>
      </section>
      </UpdateLevels.Provider>
    </UserContext.Provider>
  );
}

export default Home;
export { UserContext,UpdateLevels };
