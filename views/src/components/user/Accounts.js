import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RiEditFill } from "react-icons/ri";
import { PiUploadLight } from "react-icons/pi";
import { UserContext } from "../main/Home";
import {  IoMdClose } from "react-icons/io";
function Accounts() {
  const [organizationData, setOrganizationData] = useState({
    address: "",
    GSTIN: "",
    CIN: "",
    PAN: "",
    logo: "",
    _id: "",
    updatedBy: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [logoImg, setLogoImg] = useState(null);
  const [logoUrl, setLogoUrl] = useState(""); // Initialize logoUrl with empty string
  const userName = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organization details
        const response = await axios.post(
          "http://localhost:8000/api/organization/details"
        );
        const fetchedData = response.data[0];
        setOrganizationData(fetchedData);
        console.log(fetchData._id)
        // If logo URL exists in fetched data, set logoUrl state
        if (fetchedData._id) {
          setLogoUrl(`http://localhost:8000/${fetchedData._id}`);
        }
      } catch (error) {
        console.error("Error fetching organization details:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setOrganizationData(prevOrganizationData => ({
      ...prevOrganizationData,
      [fieldName]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      console.log(logoImg)
      if (logoImg) {
        formData.append("logo", logoImg);
      }
      formData.append("updatedBy", userName);
      for (const key in organizationData) {
        formData.append(key, organizationData[key]);
      }

      const response = await axios.put(
        `http://localhost:8000/api/organization/update/${organizationData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("Updated data:", response.data);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating organization details:", error);
    }
  };


  const img = useRef();

  const handleLogo = () => {
    img.current.click();
  };

  const handleLogoChange = e => {
    setLogoImg(e.target.files[0]); // Set the selected logo image
    setLogoUrl(URL.createObjectURL(e.target.files[0])); // Set the logo URL for preview
  };

  return (
    <section className="bg-white h-screen p-10">
      <div className="py-4">
        <div className="flex justify-between">
          <p className="font-bold py-2 text-[15px]">Account Details:</p>
          {isEditMode ?  <button
            className="h-[35px] w-[35px] text-white  bg-gray-500 rounded-full  hover:transition-transform hover:rotate-90 overflow-hidden flex justify-center items-center"
            onClick={handleEditClick}
          >
            <span className="  text-white  text-2xl text-center ">
              <IoMdClose />
            </span>
          </button> :
            <button
              className="px-2  rounded-md bg-red-100 text-[18px]"
              onClick={handleEditClick}
            >
              <RiEditFill />
            </button>}
        </div>
        <div className="flex py-3">
          <div className="flex">
            <span className="p-3 bg-red-200 rounded-full h-[100px] w-[100px] flex justify-center items-center relative">
              {/* Display logo image */}
              <img
                src={logoUrl}
                alt="logo"
                className="absolute w-[100px] h-[100px] rounded-full object-cover aspect-square "
              />
              {isEditMode && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={img}
                    onChange={handleLogoChange} // Handle logo change
                  />
                  <button
                    className="text-white font-bold text-3xl absolute top-0 left-0 bg-black/50 rounded-full h-[100px] w-[100px] flex justify-center items-center"
                    onClick={handleLogo}
                  >
                    <PiUploadLight />
                  </button>
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="flex py-5">
          <div className="flex flex-col m-2 ml-0">
            <label htmlFor="" className="text-[13px]">
              PAN NO.
            </label>
            <input
              type="text"
              className="border-[1px] border-gray-200 bg-blue-100 px-2 py-2 rounded-md h-[50px]"
              value={organizationData.PAN}
              onChange={e => handleChange(e, "PAN")}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col m-2 w-full">
            <label htmlFor="" className="text-[13px]">
              Address
            </label>
            <input
              type="text"
              className="border-[1px] border-blue-100 bg-blue-100 px-2 py-2 rounded-md w-full h-[50px]"
              value={organizationData.address}
              onChange={e => handleChange(e, "address")}
              disabled={!isEditMode}
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col m-2 ml-0">
            <label htmlFor="" className="text-[13px]">
              GSTIN NO.
            </label>
            <input
              type="text"
              className="border-[1px] border-gray-200 bg-blue-100 px-2 py-2 rounded-md w-[300px] h-[50px]"
              value={organizationData.GSTIN}
              onChange={e => handleChange(e, "GSTIN")}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="" className="text-[13px]">
              CIN No.
            </label>
            <input
              type="text"
              className="border-[1px] border-gray-200 bg-blue-100 px-2 py-2 rounded-md w-[250px] h-[50px]"
              value={organizationData.CIN}
              onChange={e => handleChange(e, "CIN")}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="" className="text-[13px]">
              T. No.
            </label>
            <input
              type="text"
              className="border-[1px] border-gray-200 bg-blue-100 px-2 py-2 rounded-md w-[250px] h-[50px]"
              value={organizationData.PAN}
              disabled={!isEditMode}
            />
          </div>
        </div>

        {isEditMode && (
          <div className="py-5">
            <button
              className="hover:bg-blue-500 border-[1px] border-gray-200 bg-black px-5 py-2 text-white rounded-md"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Accounts;
