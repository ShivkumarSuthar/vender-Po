// VenderList.js
import axios from "axios";
import React, { useEffect, useState } from "react";

function VenderList({ onVendorSelect }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/vendor/vendorList"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (e) => {
    const selectedPAN = e.target.value;
    onVendorSelect(selectedPAN); // Pass selected PAN back to parent component
  };

  return (
    <section>
      <div>
        <select
          className="border-[1px] border-black px-5 py-2"
          onChange={handleSelect}
        >
          <option value="" disabled selected hidden>
            Select Vendor
          </option>
          {data &&
            data.map((item, index) => (
              <option key={index} value={item.Pan_Number}>
                {item.GSTN_Number}
              </option>
            ))}
        </select>
      </div>
    </section>
  );
}

export default VenderList;
