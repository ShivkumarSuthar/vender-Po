import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RiEditFill } from "react-icons/ri";
import { PiUploadLight } from "react-icons/pi";
import { UserContext } from "../main/Home";
import { UpdateUser } from "../main/Home";
import { IoMdClose } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import baseUrl from "../../config";
import logo from "../../assets/images/images.png"

function Accounts() {
  const [organizationData, setOrganizationData] = useState({
    address: "",
    GSTIN: "",
    CIN: "",
    PAN: "",
    logo: null,
    _id: "",
    updatedBy: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  // const [logoUrl, setLogoUrl] = useState("");
  const userName = useContext(UserContext);
  const userId = useContext(UpdateUser);
  const [pass, setPass] = useState(false);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/organization/details`);
        const fetchedData = response.data[0];
        setOrganizationData(fetchedData);
        // setLogoUrl(fetchedData.logo);
      } catch (error) {
        console.error("Error fetching organization details:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    setPass(false);
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setOrganizationData((prevOrganizationData) => ({
      ...prevOrganizationData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(organizationData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios.put(
        `${baseUrl}/api/organization/update/${organizationData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Data Updated successfully!")
    } catch (error) {
      alert("Error updating organization details:", error);
    }
    setPass(false);
    setIsEditMode(!isEditMode);
  };

  const img = useRef();

  const handleLogo = () => {
    img.current.click();
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setOrganizationData((prevOrganizationData) => ({
      ...prevOrganizationData,
      logo: file,
    }));
    // setLogoUrl(URL.createObjectURL(file));
  };

  const handlePassword = () => {
    setPass(!pass);
    setIsEditMode(true);
  };

  const handleShowPass = () => {
    setShow(!show);
    if (ref.current) {
      ref.current.type = show ? "password" : "text";
    }
  };

  return (
    <section className="bg-white h-screen p-10 fixed left-[15%] right-0">
      <div className="py-4">
        <div className="flex justify-between">
          <p className="font-bold py-2 text-[15px]">Account Details:</p>
          {isEditMode ? (
            <button
              className="h-[35px] w-[35px] text-white  bg-gray-500 rounded-full  hover:transition-transform hover:rotate-90 overflow-hidden flex justify-center items-center"
              onClick={handleEditClick}
            >
              <span className="  text-white  text-2xl text-center ">
                <IoMdClose />
              </span>
            </button>
          ) : (
            <button
              className="px-2  rounded-md bg-red-100 text-[18px]"
              onClick={handleEditClick}
            >
              <RiEditFill />
            </button>
          )}
        </div>
        <div className="flex py-3">
          <div className="flex">
            <span className="p-3 bg-white rounded-full h-[100px] w-[100px] flex justify-center items-center relative">
              <img
                src={logo}
                alt="logo"
                className="absolute w-[100px] h-[100px] rounded-full object-cover aspect-square shadow-sm shadow-black/50 border-[2px] border-gray p-5" 
              />
              {isEditMode && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={img}
                    onChange={handleLogoChange}
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
            <div className="flex ml-10">
              <div className="flex flex-col">
                <label className="text-[12px]">UserId</label>
                <input
                  type="text"
                  className="input"
                  disabled={!isEditMode}
                  value={userId}
                  onChange={(e) => handleChange(e, "_id")}
                />
              </div>
              <div className="flex flex-col ml-5">
                <label className="text-[12px]">UserName</label>
                <input
                  type="text"
                  className="input"
                  disabled={!isEditMode}
                  value={userName}
                  onChange={(e) => handleChange(e, "updatedBy")}
                />
              </div>
              <div className="flex">
                {!pass ? (
                  <button
                    type="button"
                    onClick={handlePassword}
                    className="text-white text-[12px] border-[1px] border-red px-5 py-2 bg-red-400 rounded-md h-[40px] mt-5 ml-5 flex items-center"
                  >
                    Reset Password
                  </button>
                ) : (
                  <div className="ml-5 flex ">
                    <input
                      type="password"
                      className="border-[1px] border-blue-100 bg-blue-100 px-2 py-2 rounded-md  h-[50px] mt-4 absolute"
                      placeholder="Enter New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={!isEditMode}
                      ref={ref}
                    />
                    <span className="relative top-[32px] left-[190px]">
                      {show ? (
                        <button className=" cursor-pointer" onClick={handleShowPass}>
                          <FaEyeSlash />
                        </button>
                      ) : (
                        <button className=" cursor-pointer" onClick={handleShowPass}>
                          <FaEye />
                        </button>
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
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
              value={organizationData?.PAN}
              onChange={(e) => handleChange(e, "PAN")}
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
              value={organizationData?.address}
              onChange={(e) => handleChange(e, "address")}
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
              value={organizationData?.GSTIN}
              onChange={(e) => handleChange(e, "GSTIN")}
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
              value={organizationData?.CIN}
              onChange={(e) => handleChange(e, "CIN")}
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
