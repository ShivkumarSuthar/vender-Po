import axios from "axios";
import React, { useState } from "react";
import postService from "./postService";

function AddVendor({ onsubmit }) {
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


      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("Contact_Person_Name", CPName);
      formData.append("Contact_Person_Email", CPEmail);
      formData.append("Contact_Person_Phone_No", VPphone);
      formData.append("Vendor_Type", VendorType);
      formData.append("Vendor_Classification", VClassification);
      formData.append("Customer_Currency", Ccurrencly);
      formData.append("GSTN_Number", GSTN);
      formData.append("Pan_Number", Pan);
      formData.append("Ecc_No", Ecc);
      formData.append("St_Reg_Number", St_Reg);
      formData.append("Tin_No", Tin);
      formData.append("Tan_Number", Tan);
      formData.append("Payment_Terms", Payment_Terms);
      formData.append("Inco_Terms", Inco_Terms);
      formData.append("Bank_ACC_No", BAC_No);
      formData.append("Bank_Branch", Bbranch);
      formData.append("Bank_IFSC", BiFSC);
      formData.append("Bank_Name", Bname);
      formData.append("MSME_No", MSME);
      if (formData) {
        const response = await postService(formData);
        console.log(response)
        alert("added successfully!")
        onsubmit()
      }

    } catch (e) {
      throw e;
    }

  };
  return (
    <section className="w-100">
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold pl-[10px] pb-[0px]">
          General Information
        </h1>
        <div className="w-100">
          <div className="w-100">
            <input
              required
              type="text"
              value={name}
              className="input w-[293px]"
              placeholder="Vendor Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              className="input w-[500px]"
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <select
              className="input"
              onChange={(e) => setVendorType(e.target.value)}
            >
              <option disabled hidden>
                Vendor Type
              </option>
              <option value="Domestic">Domestic</option>
              <option value="Regular">Regular</option>
            </select>
          </div>

          <div>
            <input
              required
              className="input "
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
              className="input"
              onChange={(e) => setCPEmail(e.target.value)}
            />
            <input
              required
              placeholder="Contact Person Phone No."
              className="input w-[200px]"
              type="text"
              value={VPphone}
              onChange={(e) => setVPphone(e.target.value)}
            />
            <input
              required
              className="input w-[150px]"
              type="text"
              placeholder="Customer Currency"
              value={Ccurrencly}
              onChange={(e) => setCcurrencly(e.target.value)}
            />
            <select
              required
              className="input w-[210px]"
              onChange={(e) => setVClassification(e.target.value)}
            >
              <option value=""  disabled hidden>
                Vendor Classification
              </option>
              <option value="Micro">Micro</option>
              <option value="Macro">Macro</option>
            </select>
          </div>

          <div>
            <h1 className="text-xl font-bold pl-[10px] pb-[0px] pt-4">
              Registration Information
            </h1>
            <div>
              <input
                required
                type="text"
                value={GSTN}
                className="input"
                placeholder="GSTN Number"
                onChange={(e) => setGSTN(e.target.value)}
              />
              <input
                required
                type="text"
                className="input"
                placeholder="Pan Number"
                value={Pan}
                onChange={(e) => setPan(e.target.value)}
              />
              <input
                required
                placeholder="Ecc No"
                className="input"
                type="text"
                value={Ecc}
                onChange={(e) => setEcc(e.target.value)}
              />
              <input
                required
                className="input"
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
                className="input w-[300px]"
                type="text"
                value={Tin}
                onChange={(e) => setTin(e.target.value)}
              />
              <input
                required
                placeholder="Tan Number"
                className="input"
                type="text"
                value={Tan}
                onChange={(e) => setTan(e.target.value)}
              />
              <input
                required
                placeholder="MSME No"
                className="input"
                type="text"
                value={MSME}
                onChange={(e) => setMSME(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold pl-[10px] pb-[0px] pt-4">
              Payment Information
            </h1>
            <div>
              <input
                required
                className="input"
                placeholder="Payment Terms"
                type="text"
                value={Payment_Terms}
                onChange={(e) => setPayment_Terms(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Inco Terms"
                className="input"
                value={Inco_Terms}
                onChange={(e) => setInco_Terms(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold pl-[10px] pb-[0px] pt-4">
              Bank Information
            </h1>
            <div>
              <input
                required
                placeholder="Bank Name"
                className="input w-[300px]"
                type="text"
                value={Bname}
                onChange={HandleBankNameInput}
              />
              <input
                required
                placeholder="Bank Branch"
                className="input w-[180px]"
                type="text"
                value={Bbranch}
                onChange={(e) => setBbranch(e.target.value)}
              />
              <input
                required
                placeholder="Bank IFSC"
                className="input"
                type="text"
                value={BiFSC}
                onChange={(e) => setBiFSC(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Bank A\C No"
                className="input"
                value={BAC_No}
                onChange={HandleBankAcInput}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 pl-[10px]">
          <button
            type="submit"
            className="w-[150px] bg-blue-500 text-white text-xl rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddVendor;
