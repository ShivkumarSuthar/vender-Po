// VenderDetails.js
import React from "react";
import moment from "moment"
function VenderDetails({vender_Data}) {

  const currentDate = moment().format('DD-MM-YYYY');
  const today = currentDate;
  return (
    <section className="w-full">
      {vender_Data && (
        <div className="w-full text-[12px]">
          <div className="w-full border-l-[1px] border-t-[1px] border-black ">
            <div className="border-b-[1px] py-2 border-black px-2 h-[35px]">
              <span className="font-bold">PO No. :</span> <span>PO2324154</span>
            </div>
            <div className="border-b-[1px] py-2 border-black px-2 h-[35px] flex">
              <span className="font-bold">Date:</span>
              <span>{today}</span>
            </div>

            <div className="flex justify-between w-full border-b-[1px] border-black">
              {/* first col */}
              <div className="w-[50%] border-r-[1px] border-black px-2">
                <div className="flex py-2 h-[35px]">
                  <span className="font-bold">Attn. :</span>
                  <span></span>
                </div>
                <div className="flex flex-col py-2 h-[50px]">
                  <span className="font-bold">Email:</span>
                  <span>{vender_Data.Contact_Person_Email}</span>
                </div>
                <div className="flex flex-col py-2 h-[60px]">
                  <span className="font-bold">Phone:</span>
                  <span>{vender_Data.Contact_Person_Phone_No}</span>
                </div>
              </div>

              {/* second col */}
              <div className="w-[50%] px-2 ">
                <div className="py-2">
                  <span className="font-bold">Name:</span>
                  <span>{vender_Data.Name}</span>
                </div>

                <div className="pt-2">
                  <span className="font-bold">Address:</span>
                  <span>{vender_Data.Address}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between  w-full h-[35px]">
              <div className="w-[50%] border-r-[1px] border-black py-2 px-2 ">
                <span className="font-bold">GSTN:</span>
                <span>{vender_Data.GSTN_Number}</span>
              </div>
              <div className="w-[50%]  py-2 px-2 ">
                <span className="font-bold">PAN No.:</span>
                <span>{vender_Data.Pan_Number}</span>
              </div>
            </div>
          </div>
                 </div>
    )}
    </section>
  );
}

export default VenderDetails;
