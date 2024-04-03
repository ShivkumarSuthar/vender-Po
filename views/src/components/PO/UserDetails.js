import React from 'react'
import VenderDetails from '../vender/venderDetails';
import logo from "../../assets/images/images.jpg";

function UserDetails({vender_Data,organizationData,invoice_address}) {
   
  return (
    <section className='bg-white'>
    
        <div className="flex flex-col items-center w-100 "  >
          <img src={logo} alt="Logo" className="w-[180px] py-2" />
          <p className="text-[12px] font-bold capitalize">{organizationData.address}</p>
          <p className="text-[12px] uppercase">
            <span className="uppercase">cargo</span> - from To
          </p>

          <div className="flex flex-col py-2 w-full">
           
            <div className="w-full flex justify-center pt-3">
              <p className="uppercase text-[15px]">Purchase Order</p>
            </div>
            <div className="w-full justify-end flex">
              <h1 className="font-bold text-[12px]">
                T.No. : <span>126499</span>
              </h1>
            </div>
           
          </div>

          <div className="flex justify-between w-full">
            <div className="w-[50%]">
              <VenderDetails vender_Data={vender_Data}/>
            </div>
            <div className="w-[50%]">
              <div className="border-r-[1px] border-t-[1px] border-black border-l-[1px] text-[12px]">
                <div className="border-b-[1px] border-black py-2 px-2 h-[35px]">
                  <span className="font-bold">GSTIN:</span>
                  <span>{organizationData.GSTIN}</span>
                </div>
                <div className="border-b-[1px] border-black py-2 px-2 h-[35px]">
                  <span className="font-bold">CIN:</span>
                  <span>{organizationData.CIN}</span>
                </div>
                <div className="border-b-[1px] border-black py-2 px-2 h-[35px]">
                  <span className="font-bold">PAN No.:</span>
                  <span>{organizationData.PAN}</span>
                </div>
                <div className="flex flex-col h-[70px] border-b-[1px] border-black ">
                  <span className="uppercase text-center font-bold py-2">
                    INVOICE Address
                  </span>
                  <span className="px-2 pb-2">{organizationData.address}</span>
                </div>
                <div className="flex flex-col h-[77px] ">
                  <span className="uppercase text-center font-bold py-2">
                    Material Delivery Address
                  </span>
                  <span className="px-2 pb-2 pt-1">{invoice_address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
 
    </section>
  );
}

export default UserDetails