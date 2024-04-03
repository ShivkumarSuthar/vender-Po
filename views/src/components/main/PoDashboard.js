import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import ViewPO from "../PO/ViewPO";
import PoEdit from "../PO/PoEdit";
import AddPo from "../PO/AddPo";
import moment from "moment";
import { CiSearch } from "react-icons/ci";
import { UserContext } from "../main/Home";
import { UpdateLevels } from "../main/Home";
function PoDashboard({ toggleMenu }) {
  const [data, setData] = useState([]);
  const [ViewPo, setViewPo] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState({});
  const [editPo, seteditPo] = useState(false);
  const [Po_id, setPo_id] = useState("")
  const [vender_id, setVender_Id] = useState("")
  const userName = useContext(UserContext);
  const level = useContext(UpdateLevels)

  const handleViewVendor = (ID) => {
    setSelectedVendor(ID);
    setPo_id(ID)
    setViewPo(true);
  };

  const handleEditVendor = (ID) => {
    setPo_id(ID)
    seteditPo(true);
    console.log(Po_id)
  };



  const handleEditClose = () => {
    seteditPo(false);
  };
  console.log(level)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/Po/PoList");
        setData(response.data);
        console.log(response.data)
        setVender_Id(response.data.vender_id)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

  }, []);

  const handleCloseNav = () => {
    toggleMenu();
  };
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
          `http://localhost:8000/api/Po/edit/${_id}`,
          updatedData
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
          UppdatedByHODL:userName
        };

        const confirm = window.confirm(
          "Are you sure, You want to change the status"
        );
        if (confirm) {
          const response = await axios.put(
            `http://localhost:8000/api/Po/edit/${id}`,
            updatedData
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
          `http://localhost:8000/api/Po/edit/${_id}`,
          updatedData
        );
        console.log(response);
        alert("status updated successfully!");
      }
    } catch (error) {
      alert("Internal Server Error!");
      console.error("Error updating data:", error);
    }
  };

  return ViewPo ? (
    <ViewPO onClose={() => setViewPo(false)} PO_ID={Po_id} vender_id={vender_id} />
  ) : addNew ? (
    <AddPo onSubmit={handleAddVendorSubmit} addClose={handleAddClose} userName={userName} />
  ) : editPo ? ( // Render edit form if editVendor state is true
    <PoEdit
      PoId={Po_id}
      onSubmit={() => seteditPo(false)}
      // editClose={handleEditClose}
      // addClose={handleEditClose} 
      userName={userName}
    />
  ) : (
    <section className="w-full bg-white">
      <div className=" min-h-screen pt-2">
        <div className="h-[59.6px] flex justify-between px-2  items-center bg-white border-b-[1px] border-[#C8CBD9]">
          <div>

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
              {data.map((item, index) => (
                <tr key={index} className=" text-center border-none bg-gray-200 text-[12px] h-min-[35px]">
                  <td className="border-none ">{index + 1}</td>
                  <td className="border-none ">{item.Po_no}</td>

                  <td className="border-none">{item.DOC}</td>
                  <td className="border-none">{item.vender_name}</td>
                  <td className="border-none">
                    {item.buyyer_status ? (
                      <span className="bg-green-500 px-2 py-1 text-white ">
                        Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBuyerStatus(item._id)} disabled={(level === "1") ? false : true}
                        className="px-2 py-1 rounded-sm bg-blue-500 text-xs text-white"
                      >
                        Pending
                      </button>
                    )}
                  </td>

                  <td className="border-none">
                    {item.HOD_status ? (
                      <span className="bg-green-500 px-2 py-1 text-white">Approved</span>
                    ) : (
                      !item.buyyer_status ? (
                        <span className="">-</span>
                      ) : (
                        <button
                          onClick={() => handleHODStatus(item)} disabled={(level === "2") ? false : true}
                          className="px-2 py-1 rounded-sm bg-blue-500 text-xs text-white"
                        >
                          Pending
                        </button>
                      )
                    )}
                  </td>
                  <td className="border-none">
                    {item.MD_status ? (
                      <span className="bg-green-500 px-2 py-1 text-white ">
                        Approved
                      </span>
                    ) : (!item.HOD_status ? (<span>-</span>) :
                      <button
                        className="px-2 py-1 rounded-sm bg-blue-500 text-xs text-white"
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
