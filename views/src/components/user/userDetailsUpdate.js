import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../assets/images/images.jpg";
import { RiEditFill } from "react-icons/ri";
import baseUrl from "../../config";
function Accounts() {
  const [userData, setUserData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false); // State to manage edit mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/user/getUserDetails`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...userData];
    updatedData[index][field] = value;
    setUserData(updatedData);
  };

  const handleSubmit = async (index) => {
    try {
      await axios.put(
        `${baseUrl}/api/user/updateUserDetails/${userData[index]._id}`,
        userData[index]
      );
      setIsEditMode(false);
      // Optionally, you can fetch data again to ensure you have the latest changes
    } catch (error) {
      console.error("Error updating user details:", error);
      // Handle error
    }
  };

  return (
    <section className="bg-white h-screen p-10">
      <div className="py-4">
        {userData.map((user, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <p className="font-bold py-4 text-[15px]">Account Details:</p>
              {!isEditMode && (
                <button
                  className="px-3 rounded-md  bg-red-100 text-[18px]"
                  onClick={() => handleEditClick()}
                >
                  <RiEditFill />
                </button>
              )}
            </div>
            <div className="flex">
              <div className="flex">
                <span className="p-1 bg-red-200 rounded-full h-[100px] w-[100px] flex justify-center items-center">
                  <img src={logo} alt="logo" />
                </span>
              </div>
              
              <div className="flex flex-col ml-4 pt-2">
                <label htmlFor="" className="text-[13px]">
                  User Name
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    className="border-[1px] border-gray-200 bg-blue-100 px-2 py-2 rounded-md h-[50px]"
                    value={userData[index].username}
                    onChange={(e) =>
                      handleInputChange(index, "username", e.target.value)
                    }
                  />
                ) : (
                  <div>{userData[index].username}</div>
                )}
              </div>

              <div>
                {isEditMode && (
                  <button onClick={() => handleSubmit(index)}>Submit</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Accounts;
