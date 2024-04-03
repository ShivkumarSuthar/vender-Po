import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit } from "react-icons/fa";

import AddVendor from "../vender/AddVendor";
import ViewVendor from "../vender/ViewVendor";
import VendorEdit from "../vender/VendorEdit";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import {UserContext} from "../main/Home"; 
import {UpdateLevels} from "../main/Home"; 

function Dashboard({ toggleMenu }) {
  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [viewVendor, setViewVendor] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState({});
  const [editVendor, setEditVendor] = useState(false);
  const [selectedEditVendor, setSelectedEditVendor] = useState({});
  const userName = useContext(UserContext);
  const level = useContext(UpdateLevels)
  const handleAddVendorSubmit = () => {
    setAddNew(false);
  };

  const handleViewVendor = (vendorId) => {
    setSelectedVendor(vendorId);
    setViewVendor(true);
  };

  const handleEditVendor = (vendorId) => {
    setSelectedEditVendor(vendorId);
    setEditVendor(true);
  };

  const handleCloseView = () => {
    setViewVendor(false);
  };

  const handleEditClose = () => {
    setEditVendor(false);
  };

  const handleAddClose = () => {
    setAddNew(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/vender/venderList"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCloseNav = () => {
    toggleMenu();
  };

  return viewVendor ? (
    <ViewVendor vender_Id={selectedVendor} closeView={handleCloseView} />
  ) : addNew ? (
    <AddVendor onSubmit={handleAddVendorSubmit} addClose={handleAddClose} userName={userName}/>
  ) : editVendor ? ( // Render edit form if editVendor state is true
    <VendorEdit  userName={userName}
      vender_id={selectedEditVendor}
      onSubmit={() => setEditVendor(!editVendor)}
      editClose={handleEditClose}
    />
  ) : (
    <section className="w-full bg-white py-2 h-screen">
      <div className="h-full">
        <div className="h-[59.5px] flex justify-between  items-center  border-b-[1px] border-[#C8CBD9]  px-3">
          <div>
            {/* <span className="text-xl text-black" onClick={handleCloseNav}>
                    <FaBars  />
                  </span> */}
            <fieldset className="bg-[#F1F2F7] w-[250px] h-[40px] flex justify-center items-center rounded-md">
              <input
                type="text"
                className=" px-3 py-1 bg-none bg-[#F1F2F7] visited:outline-none search"
                placeholder="search"
              />
              <button>
                <CiSearch />
              </button>
            </fieldset>
          </div>
          <div>{/* <p className="text-lg">Vendor List Collection</p> */}</div>
          <div className="h-full flex items-center">
            <button
              className="bg-[#F1F2F7] px-4 py-2 border-[1px]   text-black rounded-md w-[100px] border-[#DDE4F0s] text-[12px] flex justify-center items-center"
              onClick={() => setAddNew(true)}
            >
              <FaPlus className="" /> <span>Add</span>
            </button>
          </div>
        </div>
        <div className="px-2">
          <table className="w-full border-none">
            <thead className="">
              <tr  className=" border-none "> 
              <th className=" text-[12px] py-2 font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white">
                <span>Sr. No.</span>
                  
                </th>
                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white">
                <span>Name</span>
                  
                </th>
                <th className="bg-[#b0b7dc] border-r-[1px] border-white text-[12px]  font-bold uppercase ">
                  <span>Type</span>
               </th>
                <th className="text-[12px]   font-bold uppercase bg-[#b0b7dc] border-r-[1px] border-white">
                <span>Vender Code</span>
                </th>
                <th className="text-[12px]   font-bold uppercase bg-[#b0b7dc] border-r-[1px] border-white">
                <span>Contact No.</span>
                 </th>
                <th className="text-[12px]   font-bold uppercase bg-[#b0b7dc] border-r-[1px] border-white">
                <span>Email</span>
                 </th>
                <th className="text-[12px]   font-bold uppercase bg-[#b0b7dc] border-r-[1px] border-white">
                <span>Created At</span>
                 </th>
                <th className="text-[12px]   font-bold uppercase bg-[#b0b7dc] border-r-[1px] border-white">
                <span>Updated At</span>
                 </th>
                <th className="text-[12px]   font-bold uppercase bg-[#b0b7dc] border-r-[1px] border-white">
                    <span>Status</span>
                </th>
                <th className="text-[12px]   font-bold  uppercase bg-[#b0b7dc] border-white">
                    <span>Action</span>
                 </th>
              </tr>
            </thead>
            <tbody className="text-sm px-2 border-none">
              {data.map((item, index) => (
                <tr key={index} className="table-data text-center border-none bg-gray-200">
                  <td className="text-[12px] text-black px-2 border-none">{index+1}</td>
                  <td className="text-[12px] text-black px-2 border-none">{item.Name}</td>
                  <td className="text-[12px] text-black px-2 border-none">{item.Vendor_Type}</td>
                  <td className="text-[12px] text-black px-2 border-none">{item.Vender_code}</td>
                  <td className="text-[12px] text-black px-2 border-none">{item.Contact_Person_Phone_No}</td>
                  <td className="text-[12px] text-black px-2 border-none">{item.Contact_Person_Email}</td>
                  <td className="text-[12px] text-black px-2 border-none">{item.Created_at}</td>
                  <td className="text-[12px] text-black px-2 border-none">{item.Updated_at}</td>
                  <td className="text-[12px] text-black px-2 border-none">{item.status}</td>
                  <td className="flex justify-evenly items-center py-2 text-[12px] border-none text-black">
                    <span
                      title="Click to View Vendor"
                      className=" cursor-pointer"
                      onClick={() => handleViewVendor(item.Vender_code)}
                    >
                      <FaEye />
                    </span>
                    {(level !=="3")&&
                    <span
                      title="Click to Edit Vendor"
                      className=" cursor-pointer"
                      onClick={() => handleEditVendor(item._id)}
                    >
                      <FaEdit />
                    </span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
