import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineBars } from "react-icons/ai";
import { FaEye, FaEdit } from "react-icons/fa";
import { PiArrowsDownUpBold } from "react-icons/pi";
import AddVendor from "./AddVendor"; // Ensure that AddVendor is properly imported

function Dashboard() {
  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);



 const handleAddVendorSubmit = () => {
   setAddNew(false);
 };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/vendor/vendorList"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return addNew ? (
    <AddVendor onsubmit={handleAddVendorSubmit} />
  ) : (
    <section className="">
      <div className="border-[1px] border-gray-400 h-screen shadow-md shadow-black">
        <div className="h-10 flex justify-between px-5 py-3 items-center bg-gray-200 border-b-[1px] border-black">
          <div>
            <p className="text-lg">Vendor List</p>
          </div>
          <div>
            <button
              className="bg-blue-500 px-5 pt-1 h-[30px] text-white rounded-sm text-lg pb-1"
              onClick={() => setAddNew(true)}
            >
              +Add
            </button>
          </div>
        </div>
        <div className=" px-5">
          <div className="flex h-[50px] items-center justify-between">
            <div className="py-1">
              <label htmlFor="text" className="pr-2">
                Show
              </label>
              <input
                type="text"
                className="border-[1px] w-[50px] px-5 py-1 h-[30px] "
              />
              <label htmlFor="text2">Entries</label>
            </div>
            <div className="flex justify-between py-2">
              <fieldset className="pr-5">
                <label htmlFor="search" className="pr-2">
                  Search:
                </label>
                <input
                  type="text"
                  className="border-[1px] border-black px-5 py-1 bg-gray-100 w-[200px]"
                />
              </fieldset>
              <button className="bg-blue-400 w-[110px] py-1 px-5 h-[35px] flex text-white  items-center font-medium">
                <span className="px-[5px]">
                  <AiOutlineBars />
                </span>
                Action
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th>
                  <div className="flex justify-between pr-2 items-center">
                    <label htmlFor="name">Name</label>
                    <PiArrowsDownUpBold />
                  </div>
                  <div className="pr-2">
                    <input
                      type="text"
                      className="border-[1px] w-[130px] mt-2"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex justify-between pr-2 items-center">
                    <label htmlFor="type">Type</label>
                    <PiArrowsDownUpBold />
                  </div>
                  <div className="pr-2">
                    <input
                      type="text"
                      className="border-[1px] w-[90px] px-2 mt-2"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex justify-between pr-2 items-center">
                    <label htmlFor="code">Code</label>
                    <PiArrowsDownUpBold />
                  </div>
                  <div className="pr-2">
                    <input
                      type="text"
                      className="border-[1px] w-[60px] px-2 mt-2"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex justify-between pr-2 items-center">
                    <label htmlFor="contact">Contact No.</label>
                    <PiArrowsDownUpBold />
                  </div>
                  <div className="pr-2">
                    <input
                      type="text"
                      className="border-[1px] w-[100px] mt-2 px-2"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex justify-between pr-2 items-center">
                    <label htmlFor="email">Email</label>
                    <PiArrowsDownUpBold />
                  </div>
                  <div className="pr-2">
                    <input
                      type="text"
                      className="border-[1px] w-[150px] mt-2"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex justify-between pr-2 items-center">
                    <label htmlFor="createdAt">Created At</label>
                    <PiArrowsDownUpBold />
                  </div>
                  <div className="pr-2">
                    <input
                      type="text"
                      className="border-[1px] w-[120px] mt-2"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex justify-between pr-2 items-center">
                    <label htmlFor="updatedAt">Updated At</label>
                    <PiArrowsDownUpBold />
                  </div>
                  <div className="pr-2">
                    <input
                      type="text"
                      className="border-[1px] w-[100px] mt-2"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex flex-col pl-3">
                    <span>Status</span>
                  </div>
                  <div className="pt-1 pr-2">
                    <PiArrowsDownUpBold />
                  </div>
                </th>
                <th>
                  <div className="flex flex-col pl-3">
                    <span>Action</span>
                  </div>
                  <div className="pt-1 pr-2">
                    <PiArrowsDownUpBold />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-gray-100">
                  <td>{item.Name}</td>
                  <td>{item.Vendor_Type}</td>
                  <td>{item.code}</td>
                  <td>{item.Contact_Person_Phone_No}</td>
                  <td>{item.Contact_Person_Email}</td>
                  <td>{item.Created_At}</td>
                  <td>{item.Updated_At}</td>
                  <td>{item.status}</td>
                  <td>
                    <span
                      title="Click to View Vendor"
                      className="mr-4 cursor-pointer"
                    >
                      <FaEye />
                    </span>
                    <span
                      title="Click to Edit Vendor"
                      className="cursor-pointer"
                    >
                      <FaEdit />
                    </span>
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
