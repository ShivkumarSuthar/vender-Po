import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import ViewPO from "../PO/ViewPO";
import PoEdit from "../PO/PoEdit";
import AddPo from "../PO/AddPo";
import moment from "moment";
import { UserContext } from "./Home";
import { UpdateLevels } from "./Home";
import baseUrl from "../../config";
function PoDashboard() {
  const [data, setData] = useState([]);
  const [ViewPo, setViewPo] = useState(false);
  const [addNew, setAddNew] = useState(false);
const [editPo, seteditPo] = useState(false);
  const [Po_id, setPo_id] = useState("")
  const [poData, setPoData] = useState([]);
const userName = useContext(UserContext);
  const level = useContext(UpdateLevels)
const handleViewVendor = (ID) => {
     setPo_id(ID)
    setViewPo(true);
  };

  const handleEditVendor = (ID) => {
    setPo_id(ID)
    seteditPo(true);
    console.log(Po_id)
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/Po/PoList`);
        setData(response.data);
        setPoData(response.data);
        } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

  }, []);

const handleAddVendorSubmit = () => {
    setAddNew(false);
  };
  const handleAddClose = () => {
    setAddNew(false);
  };




  const handleBuyerStatus = async (_id) => {
    try {
      // Update the buyyer_status to true directly
      const updatedData = {
        buyyer_status: true,
        PO_status: "Pending from HOD",
        UppdatedBybuyer:userName
      };

      const confirm = window.confirm(
        "Are you sure, You want to change the status"
      );
      if (confirm) {
        const response = await axios.put(
          `${baseUrl}/api/Po/updateAll/${_id}`,
          {poData:updatedData}
        );
        console.log(response);
        alert("status updated successfully!");
      }
    } catch (error) {
      alert("Internal Server Error!");
      console.error("Error updating data:", error);
    }
  };
  const handleHODStatus = async (item) => {
    const id = item._id;
    if (item.buyyer_status) {
      try {
        const updatedData = {
          HOD_status: true,
          PO_status: "Pending from MD",
          UppdatedByHOD:userName
        };

        const confirm = window.confirm(
          "Are you sure, You want to change the status"
        );
        if (confirm) {
          const response = await axios.put(
             `${baseUrl}/api/Po/updateAll/${id}`,
          {poData:updatedData}
          );
          console.log(response);
          alert("status updated successfully!");
        }
      } catch (error) {
        alert("Internal Server Error!");
        console.error("Error updating data:", error);
      }
    } else {
      alert("sorry!, it's buyer approval is pending.. ");
    }
  };
  const handleMDStatus = async (_id) => {
    try {
      // Get current date and time using Moment.js
      const current = moment().format("DD-MM-YYYY HH:mm:ss");
      // Update the buyyer_status to true directly

      // Update the buyyer_status to true directly
      const updatedData = {
        MD_status: true,
        PO_status: "Approved",
        Final_Approved_at: current,
        UppdatedByMD:userName
      };

      const confirm = window.confirm(
        "Are you sure, You want to change the status"
      );
      if (confirm) {     
        const response = await axios.put(
          `${baseUrl}/api/Po/updateAll/${_id}`,
          {poData:updatedData}
        );
        console.log(response);
        alert("status updated successfully!");
      }
    } catch (error) {
      alert("Internal Server Error!");
      console.error("Error updating data:", error);
    }
  };


  const handleVenderList = (selectedFilter) => {
    if (selectedFilter !== "All") {
      const limit = parseInt(selectedFilter);
      const filteredData = data.slice(0, limit);
      setPoData(filteredData);
    } else {
      setPoData(data);
    }
  };
  return ViewPo ? (
    <ViewPO onClose={() => setViewPo(false)} PO_ID={Po_id} />
  ) : addNew ? (
    <AddPo onSubmit={handleAddVendorSubmit} addClose={handleAddClose} userName={userName} />
  ) : editPo ? ( 
    <PoEdit
      PoId={Po_id}
      onSubmit={() => seteditPo(false)}
      userName={userName}
    />
  ) : (
    <section className="w-full bg-white">
      <div className=" min-h-screen pt-2">
        <div className="h-[59.6px] flex justify-between px-2  items-center bg-white border-b-[1px] border-[#C8CBD9]">
          <div>

          <div>
          <span className="text-[12px]">Show</span>
            <select onChange={(e) => handleVenderList(e.target.value)} className="border-black border-[1px] px-2 py-1 mx-2 text-[12px]">
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="All">All</option>
            </select>
            <span className="text-[12px]">Entries</span>
          </div>

          </div>
          {(level !== "3") &&
            <div className="h-[40px] overflow-hidden">
              <button
                className="bg-[#F1F2F7] px-4 py-2 border-[1px]   text-black rounded-md w-[100px] border-[#DDE4F0s] text-[12px] flex justify-center items-center"
                onClick={() => setAddNew(true)}
              >
                <FaPlus className="" /> <span>Add</span>
              </button>
            </div>}
        </div>
        <div className="px-2">
          <table className="w-full border-none">
            <thead className="text-md">
              <tr className=" border-none">
                <th className=" text-[12px] py-2 font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>Sr. No.</span>

                </th>
                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>PO No.</span>

                </th>

                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>DOC</span>

                </th>
                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>Vender Name</span>

                </th>
                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>Buyer Status</span>

                </th>
                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>HOD Status</span>

                </th>
                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>MD Status</span>
                </th>
                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>PO Status</span>

                </th>
                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>Final Approved Date</span>

                </th>

                <th className=" text-[12px] font-bold  uppercase  bg-[#b0b7dc] border-r-[1px] border-white text-wrap">
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm px-2">
              {poData.map((item, index) => (
                <tr key={index} className="data-model text-center border-none  text-[12px] h-min-[35px]">
                  <td className="border-none text-start px-2">{index + 1}</td>
                  <td className="border-none ">{item.Po_no}</td>

                  <td className="border-none">{item.DOC}</td>
                  <td className="border-none">{item.vender_name}</td>
                  <td className="border-none">
                    {item.buyyer_status ? (
                      <span className="bg-green-500 px-2 py-1 text-black ">
                        Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBuyerStatus(item._id)} disabled={(level === "1") ? false : true}
                        className="px-3  rounded-sm bg-blue-300 text-[12px] text-black"
                      >
                        Pending
                      </button>
                    )}
                  </td>

                  <td className="border-none">
                    {item.HOD_status ? (
                      <span className="bg-green-500 px-2 py-1 text-black ">
                        Approved
                      </span>
                    ) : (
                      !item.buyyer_status ? (
                        <span className="">-</span>
                      ) : (
                        <button
                          onClick={() => handleHODStatus(item)} disabled={(level === "2") ? false : true}
                          className="px-3  rounded-sm bg-blue-300 text-[12px] text-black"
                        >
                          Pending
                        </button>
                      )
                    )}
                  </td>
                  <td className="border-none">
                    {item.MD_status ? (
                      <span className="bg-green-500 px-2 py-1 text-black ">
                        Approved
                      </span>
                    ) : (!item.HOD_status ? (<span>-</span>) :
                      <button
                        className="px-3  rounded-sm bg-blue-300 text-[12px] text-black"
                        onClick={() => handleMDStatus(item._id)} disabled={(level === "3") ? false : true}
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td className="border-none">{item.PO_status}</td>
                  <td className="border-none">{item.Final_Approved_at}</td>
                  <td className="flex justify-end  py-2 border-none">
                    <span
                      title="Click to View Vendor"
                      className=" cursor-pointer mr-3"
                      onClick={() => handleViewVendor(item._id)}
                    >
                      <FaEye />
                    </span>
                    {(level !== "3") &&
                      <span
                        title="Click to Edit Vendor"
                        className=" cursor-pointer mr-3"
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

export default PoDashboard;
