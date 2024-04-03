import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import PoViewTable from "./PoViewTable";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { AiFillPrinter } from "react-icons/ai";

function PO({ onClick, PO_ID, onClose }) {
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/Po/Po_combined",
          { PO_ID: PO_ID  }
        );
        setCombinedData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [PO_ID]);

  const Print = () => {     
    let printContents = document.getElementById('print').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents; 
  }

  return (
    <section className="h-min-screen p-4 bg-white">
      {combinedData && (
        <>
          <div className="flex justify-end">
            <button
              className="h-[35px] w-[35px] text-white  bg-gray-500 rounded-full  hover:transition-transform hover:rotate-90 overflow-hidden flex justify-center items-center"
              onClick={onClose}
            >
              <span className="  text-white  text-2xl text-center ">
                <IoMdClose />
              </span>
            </button>
          </div>
          <section className="py-3" id="print">
            <div>
              <UserDetails
                vender_Data={combinedData.venderData}
                organizationData={combinedData.organizationData}
                invoice_address={
                  combinedData.organizationData.Material_delivery_address
                }
              />
            </div>
            <div className="border-[1px]  border-black py-5 px-2 w-full">
              <p className="text-[15px]">
                We Hereby Place an order for the supply of following items.
              </p>
            </div>
            <div className="w-full h-full">
              <PoViewTable
                POId={PO_ID}
                poData={combinedData.PoData}
                vender_code={combinedData.organizationData.vender_code}
                remark={combinedData.PoData.remark}
                userData={combinedData.organizationData}
                poItemData={combinedData.PoItemData}
              />
            </div>
            <div className="flex justify-end py-5">
              <button
                title="print"
                className="h-[35px] w-[80px] text-white text-[12px]  bg-gray-500 rounded-sm hover:bg-black   flex justify-center items-center"
                onClick={Print}
              >
                <span className="  text-white  text-2xl text-center ">
                  <AiFillPrinter />
                </span>
              </button>
            </div>
          </section>
        </>
      )}
    </section>
  );
}

export default PO;
