import axios from "axios";
import React, { useState } from "react";
import postService from "../../postService";
import { IoMdClose } from "react-icons/io";

function AddVendor({ onSubmit, addClose,userName }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [CPName, setCPName] = useState("");
  const [CPEmail, setCPEmail] = useState("");
  const [VPphone, setVPphone] = useState("");
  const [VClassification, setVClassification] = useState("");
  const [Ccurrencly, setCcurrencly] = useState("");
  const [VendorType, setVendorType] = useState("");
  const [GSTN, setGSTN] = useState("");
  const [Pan, setPan] = useState("");
  const [Ecc, setEcc] = useState("");
  const [St_Reg, setSt_Reg] = useState("");
  const [Tin, setTin] = useState("");
  const [Tan, setTan] = useState("");
  const [MSME, setMSME] = useState("");
  const [Payment_Terms, setPayment_Terms] = useState("");
  const [Inco_Terms, setInco_Terms] = useState("");
  const [Bname, setBname] = useState("");
  const [Bbranch, setBbranch] = useState("");
  const [BiFSC, setBiFSC] = useState("");
  const [BAC_No, setBAC_No] = useState("");


  //input validation for Bank account Numbers
const HandleBankAcInput=(e)=>{
const userInput=e.target.value;
  const regex = /^[0-9]*$/;
     if (regex.test(userInput) || userInput === "") {
       // Allow empty string
       setBAC_No(userInput);
     } else {
       // If the input contains non-numeric characters, remove them
       const numericValue = userInput.replace(/[^0-9]/g, ""); 
       
       setBAC_No(numericValue);
     }
}


const HandleBankNameInput = (e) => {
  const userInput = e.target.value;
 const regex = /^[A-Za-z]+$/;
  if (regex.test(userInput) || userInput === "") {
    // Allow empty string
    setBname(userInput);
  } else {
    // If the input contains non-numeric characters, remove them
    const numericValue = userInput.replace(/[^A-Za-z]/g, "");

    setBname(numericValue);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = {
      name,
      address,
      Contact_Person_Name: CPName,
      Contact_Person_Email: CPEmail,
      Contact_Person_Phone_No: VPphone,
      Vendor_Type:VendorType,
      Vendor_Classification: VClassification,
      Customer_Currency: Ccurrencly,
      GSTN_Number: GSTN,
      Pan_Number: Pan,
      Ecc_No: Ecc,
      St_Reg_Number: St_Reg,
      Tin_No: Tin,
      Tan_Number: Tan,
      Payment_Terms,
      Inco_Terms,
      Bank_ACC_No: BAC_No,
      Bank_Branch: Bbranch,
      Bank_IFSC: BiFSC,
      Bank_Name: Bname,
      MSME_No:MSME,
      createdBy: userName,
    };

    // Send POST request using axios
    const response = await axios.post("http://localhost:8000/api/vender/add", formData);
    
    console.log(response);
    alert("Added successfully!");
    onSubmit()  //closing the addVender
  } catch (error) {
    console.error(error);
    // Handle error appropriately, e.g., show error message to the user
  }
};


  const HandleClose=()=>{
    addClose()
  }
  return (
    <section className="w-100 h-screen bg-white">
      <div className="flex  px-5">
        <div className="w-[25%]"></div>
        <div className="w-[50%] py-4">
          <h1 className="text-xl font-bold text-center px-5  tracking-wider uppercase">
            Add Vender Details
          </h1>
        </div>
        <div className="w-[25%] flex justify-end py-2">
          <button
            className="h-[35px] w-[35px] text-white  bg-gray-500 rounded-full  hover:transition-transform hover:rotate-90 overflow-hidden flex justify-center items-center"
            onClick={HandleClose}
          >
            <span className="  text-white  text-2xl text-center ">
              <IoMdClose />
            </span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-5">
        <h1 className="text-md tracking-wider font-bold pb-[0px]">
          General Information
        </h1>
        <div className="w-100">
          <div className="w-100">
            <input
              required
              type="text"
              value={name}
              className="input w-[293px] ml-0 m-2"
              placeholder="Vendor Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              className="input w-[500px] m-2"
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <select
              className="input m-2"
              onChange={(e) => setVendorType(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Vendor Type
              </option>
              <option value="Domestic">Domestic</option>
              <option value="Regular">Regular</option>
            </select>
          </div>

          <div>
            <input
              required
              className="input ml-0 m-2"
              placeholder="Contact Person Name"
              type="text"
              value={CPName}
              onChange={(e) => setCPName(e.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Contact Person Email"
              value={CPEmail}
              className="input m-2"
              onChange={(e) => setCPEmail(e.target.value)}
            />
            <input
              required
              placeholder="Contact Person Phone No."
              className="input w-[250px] m-2"
              type="text"
              value={VPphone}
              onChange={(e) => setVPphone(e.target.value)}
            />
            
            <select
              required
              className="input w-[210px] m-2"
              onChange={(e) => setVClassification(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Vendor Classification
              </option>
              <option value="Micro">Micro</option>
              <option value="Macro">Macro</option>
            </select>
          </div>

          <div>
            <h1 className="text-md tracking-wider font-bold pb-[0px] pt-2">
              Registration Information
            </h1>
            <div>
              <input
                required
                type="text"
                value={GSTN}
                className="input ml-0 m-2"
                placeholder="GSTN Number"
                onChange={(e) => setGSTN(e.target.value)}
              />
              <input
                required
                type="text"
                className="input m-2"
                placeholder="Pan Number"
                value={Pan}
                onChange={(e) => setPan(e.target.value)}
              />
              <input
                required
                placeholder="Ecc No"
                className="input m-2"
                type="text"
                value={Ecc}
                onChange={(e) => setEcc(e.target.value)}
              />
              <input
                required
                className="input m-2"
                placeholder="St Reg Number"
                type="text"
                value={St_Reg}
                onChange={(e) => setSt_Reg(e.target.value)}
              />
            </div>

            <div>
              <input
                required
                placeholder="Tin No"
                className="input w-[300px] m-2 ml-0"
                type="text"
                value={Tin}
                onChange={(e) => setTin(e.target.value)}
              />
              <input
                required
                placeholder="Tan Number"
                className="input m-2"
                type="text"
                value={Tan}
                onChange={(e) => setTan(e.target.value)}
              />
              <input
                required
                placeholder="MSME No"
                className="input m-2"
                type="text"
                value={MSME}
                onChange={(e) => setMSME(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h1 className="text-md tracking-wider font-bold pb-[0] pt-2">
              Payment Information
            </h1>
            <div>
              <input
                required
                className="input w-[180px] ml-0 m-2"
                type="text"
                placeholder="Customer Currency"
                value={Ccurrencly}
                onChange={(e) => setCcurrencly(e.target.value)}
              />
              <input
                required
                className="input m-2"
                placeholder="Payment Terms"
                type="text"
                value={Payment_Terms}
                onChange={(e) => setPayment_Terms(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Inco Terms"
                className="input m-2"
                value={Inco_Terms}
                onChange={(e) => setInco_Terms(e.target.value)}
              />
    
            </div>
          </div>

          <div>
            <h1 className="text-md tracking-wider font-bold pb-[0px] pt-2">
              Bank Information
            </h1>
            <div>
              <input
                required
                placeholder="Bank Name"
                className="input w-[300px] m-2 ml-0"
                type="text"
                value={Bname}
                onChange={HandleBankNameInput}
              />
              <input
                required
                placeholder="Bank Branch"
                className="input w-[180px] m-2"
                type="text"
                value={Bbranch}
                onChange={(e) => setBbranch(e.target.value)}
              />
              <input
                required
                placeholder="Bank IFSC"
                className="input m-2"
                type="text"
                value={BiFSC}
                onChange={(e) => setBiFSC(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Bank A\C No"
                className="input m-2"
                value={BAC_No}
                onChange={HandleBankAcInput}
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-[120px] h-[40px] bg-gray-500 text-white text-xl rounded-md hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddVendor;
