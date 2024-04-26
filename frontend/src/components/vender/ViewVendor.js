import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import baseUrl from "../../config";
function ViewVendor({ vender_Id, closeView }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const getService = async () => {
      const response = await axios.get(
        `${baseUrl}/api/vender/view/${vender_Id}`
      );
      setData(response.data);
    };
    getService();
  }, [vender_Id]);


  const HandleClose = () => {
    closeView(null)
  }
  return (
    <section className="px-5 pb-5 bg-white">
      <div>
        <div className="w-full flex px-5">
          <div className="w-[25%]"></div>
          <div className="w-[50%] py-3">
            <h1 className="text-sm font-medium text-center px-5 capitalize">
              Vendor All Details</h1>
          </div>

          <div className="w-[25%] flex justify-end  py-1">
            <button className="h-[35px] w-[35px] text-white  bg-gray-500 rounded-full  hover:transition-transform hover:rotate-90 overflow-hidden flex justify-center items-center" onClick={HandleClose}>
              <span className="  text-white  text-3xl text-center ">
                <IoMdClose />
              </span>
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-[15px] font-medium  pb-[5px]">
            General Information
          </h1>
          <table className="flex w-full border-[1px] border-black">
          
            <td className="flex flex-col w-[20%] text-wrap ">
              <th className="text-start px-2 py-1 text-[12px]  border-b-[1px] border-black border-r-[1px] ">Name :</th>
              <th className="text-start px-2 py-1 text-[12px] border-b-[1px] border-black border-r-[1px]">Address:</th>
              <th className="text-start px-2 py-1 text-[12px] border-b-[1px] border-black border-r-[1px]">Vender Classification:</th>
              <th className="text-start px-2 py-1 text-[12px] border-b-[1px] border-black border-r-[1px]" >Customer Currency:</th>
              <th className="text-start px-2 py-1 text-[12px] border-b-[1px] border-black border-r-[1px] ">Contact Person Name:</th>
              <th className="text-start px-2 py-1 text-[12px] border-r-[1px] border-black">Contact Person Phone No:</th>
            </td>
            <div className="flex flex-col w-[80%]">

              <td className="px-2 py-1 text-[12px]  border-black border-b-[1px]">{data.Name}</td>
              <td className="px-2 py-1 text-[12px]  border-black border-b-[1px]">{data.Address}</td>
              <td className="flex w-full  border-black border-b-[1px]">
                <span className="px-2 py-1 text-[12px] w-[40%]">
                  {data.Vendor_Classification}
                </span>
                <div className="w-[60%] h-full flex justify-start items-center border-l-[1px] border-black pl-3">
                  <span className="w-[35%] border-r-[1px] border-black py-1 text-[12px] font-bold">Vendor Type :</span>
                  <span className="text-[12px] pl-3">{data.Vendor_Type}</span>
                </div>
              </td>
              <td className="text-start px-2 py-1 text-[12px]  border-black border-b-[1px]">{data.Customer_Currency}</td>
              <td className="flex w-full px-2  border-black border-b-[1px]">
                <span className="py-1  text-[12px] w-[40%]">
                  {data.Contact_Person_Name}
                </span>
                <div className="w-[60%] flex justify-start border-l-[1px] border-black pl-3">
                  <span className="  text-[12px] w-[35%] border-r-[1px] border-black py-1 font-bold">Contact Person Email:</span>
                  <span className=" text-[12px] pl-3 py-1 ">
                    {data.Contact_Person_Email}
                  </span>
                </div>
              </td>
              <td className="text-start px-2 py-1 text-[12px]">
                {data.Contact_Person_Phone_No}
              </td>
            </div>
          </table>
        </div>
      </div>

      {/* Registration Information section */}
      <div className="pt-5">
        <h1 className="text-[15px] font-medium pb-[5px]">
          Registration Information
        </h1>
        <table className="flex w-full  border-black border-[1px]" >
          <th className="flex flex-col w-[20%] text-[12px] text-md">
            <th className="text-start px-2 py-1 text-[12px]  border-black border-b-[1px] border-r-[1px]">GSTN Number :</th>
            <th className="text-start px-2 py-1 text-[12px] border-black border-b-[1px] border-r-[1px]">ECC No.:</th>
            <th className="text-start px-2 py-1 text-[12px] border-black border-b-[1px] border-r-[1px]">Tin No.</th>
            <th className="text-start px-2 py-1 text-[12px] border-black  border-r-[1px]">MSME No.</th>
          </th>
          <div className="flex flex-col w-[80%]">
            <td className="flex text-start px-2 w-full text-[12px] border-black border-b-[1px] border-r-[0px]">
              <span className="w-[40%]  border-r-[1px] border-black py-1">{data.Contact_Person_Name}</span>
              <div className="w-[60%] flex">
                <span className="w-[35%] px-3 border-r-[1px] border-black py-1 font-bold">Contact Person Email:</span>
                <span className=" px-2 py-1">{data.Contact_Person_Email}</span>
              </div>
            </td>

            <td className="flex text-[12px] border-black border-b-[1px] border-r-[0]">
              <span className="w-[40%] px-2 py-1">{data.Ecc_No}</span>
              <div className="w-[60%] flex ">
                <span className="w-[35%] px-3 border-black border-l-[1px] border-r-[1px] py-1 font-bold">Vendor Type</span>
                <span className="py-1 px-2 border-r-[0]">{data.Vendor_Type}</span>
              </div>
            </td>
            <td className="px-2 text-[12px] border-b-[1px] border-black py-1">
              <span>{data.Tin_No}</span>

            </td>
            <td className="px-2 text-[12px] py-1">{data.MSME_No}</td>
          </div>
        </table>
      </div>

      {/* Payment Information  */}
      <div className="pt-5">
        <h1 className="text-[15px] font-medium pb-[0px]">
          Payment Information
        </h1>
        <table className="flex w-full text-[12px] border-[1px] border-black mt-1">
          <th className="flex flex-col w-[20%]">
            <th className="px-2 text-start py-1 border-r-[1px] border-black border-b-[1px]">Payment Terms :</th>
            <th className="px-2 text-start py-1 border-r-[1px] border-black">Inco Terms</th>
          </th>
          <td className="flex flex-col w-[80%]">
            <td className="px-2 border-b-[1px] border-black py-1">{data.Payment_Terms}</td>
            <td className="px-2">{data.Inco_Terms}</td>
          </td>
        </table>
      </div>

      {/* Bank Information  */}
      <div className="pt-5">
        <h1 className="text-[15px] font-medium pb-[0px] ">
          Bank Information
        </h1>
        <table className="flex w-full text-[12px] border-black border-[1px]">
          <th className="flex flex-col w-[20%] text-md">
            <th className="text-start px-2 border-b-[1px] border-r-[1px] border-black py-1">Bank A/c No. :</th>
            <th className="text-start px-2 border-b-[1px] border-r-[1px] border-black py-1">Bank Branch</th>
            <th className="text-start px-2 py-1 border-r-[1px] border-black">Bank IFSC Code: </th>
          </th>
          <div className="flex flex-col w-[80%]">
            <td className="flex border-black border-b-[1px]">
              <span className="w-[40%] px-2 py-1">{data.Bank_ACC_No}</span>
              <div className="flex w-[60%]">
                <span className="w-[35%] border-l-[1px] border-black py-1 border-r-[1px] px-2 font-bold" >Bank Name:</span>
                <span className="px-2 py-1">{data.Bank_Name}</span>
              </div>
            </td>
            <td className="px-2 border-black border-b-[1px] py-1">{data.Bank_Branch}</td>
            <td className="px-2 border-black  py-1">{data.Bank_IFSC}</td>
          </div>
        </table>
      </div>
    </section>
  );
}

export default ViewVendor;
