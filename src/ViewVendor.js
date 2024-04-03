import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewVendor() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getService = async () => {
      const response = await axios.get(
        "http://localhost:8000/vendor/viewVendor"
      );
      console.log(response);
      setData(response.data);
    };
    getService();
  }, []);
  return (
    <section>
      <div>
        <h1 className="text-2xl font-medium text-end px-5">
          Vendor All Details
        </h1>
        <div>
          <h1 className="text-xl font-medium  pb-[10px]">
            General Information
          </h1>
          <table className="flex">
            <div className="flex flex-col">
              <th className="text-start px-2 py-1">Name :</th>
              <th className="text-start px-2 py-1">Address:</th>
              <th className="text-start px-2 py-1">Vender Classification:</th>
              <th className="text-start px-2 py-1">Customer Currency:</th>
              <th className="text-start px-2 py-1">Contact Person Name:</th>
              <th className="text-start px-2 py-1">Contact Person Phone No:</th>
            </div>
            <div className="flex flex-col">
              <td className="px-2 py-1">{data.Name}</td>
              <td className="px-2 py-1">{data.Address}</td>
              <td className="flex">
                <span className="px-2 py-1 w-[300px]">
                  {data.Vendor_Classification}
                </span>
                <div className="pl-[20px]">
                  <th className="px-2 py-1 w-[180px]">Vendor Type</th>
                  <td className="px-2 py-1 w-[200px]">{data.Vendor_Type}</td>
                </div>
              </td>
              <td className="text-start px-2 py-1">{data.Customer_Currency}</td>
              <td className="flex">
                <span className="px-2 py-1 w-[280px]">
                  {data.Contact_Person_Name}
                </span>
                <div>
                  <th className="px-2 py-1 w-[220px]">Contact Person Email:</th>
                  <td className="px-2 py-1 w-[200px]">
                    {data.Contact_Person_Email}
                  </td>
                </div>
              </td>
              <td className="text-start px-2 py-1">
                {data.Contact_Person_Phone_No}
              </td>
            </div>
          </table>
        </div>
      </div>

      {/* Registration Information section */}
      <div>
        <h1 className="text-xl font-medium pl-[10px] pb-[0px]">
          Registration Information
        </h1>
        <table className="flex">
          <div className="flex flex-col">
            <th className="text-start px-2 py-1">GSTN Number :</th>
            <th>ECC No.:</th>
            <th>Tin No.</th>
            <th>MSME No.</th>
          </div>
          <div className="flex flex-col">
            <td className="flex text-start px-2 py-1">
              <span>{data.Contact_Person_Name}</span>
              <div>
                <th>Contact Person Email:</th>
                <td>{data.Contact_Person_Email}</td>
              </div>
            </td>

            <td className="flex">
              <span>{data.Ecc_No}</span>
              <div>
                <th>Vendor Type</th>
                <td>{data.Vendor_Type}</td>
              </div>
            </td>
            <td></td>
            <td className="flex">
              <span>{data.Tin_No}</span>
              <div>
                <th>Contact Person Email:</th>
                <td>{data.Contact_Person_Email}</td>
              </div>
            </td>
            <td>{data.MSME_No}</td>
          </div>
        </table>
      </div>

      {/* Payment Information  */}
      <div>
        <h1 className="text-xl font-medium pl-[10px] pb-[0px]">
          Payment Information
        </h1>
        <table className="flex">
          <div className="flex flex-col">
            <th>Payment Terms :</th>
            <th>Inco Terms</th>
          </div>
          <div className="flex flex-col">
            <td>{data.Payment_Terms}</td>
            <td>{data.Inco_Terms}</td>
          </div>
        </table>
      </div>

      {/* Bank Information  */}
      <div>
        <h1 className="text-xl font-medium pl-[10px] pb-[0px]">
          Payment Information
        </h1>
        <table className="flex">
          <div className="flex flex-col">
            <th>Bank A/c No. :</th>
            <th>Bank Branch</th>
            <th>Bank IFSC Code: </th>
          </div>
          <div className="flex flex-col">
            <td className="flex">
              <span>{data.Bank_ACC_No}</span>
              <div>
                <th>Bank Name:</th>
                <td>{data.Bank_Name}</td>
              </div>
            </td>
            <td>{data.Bank_Branch}</td>
            <td>{data.Bank_IFSC}</td>
          </div>
        </table>
      </div>
    </section>
  );
}

export default ViewVendor;
