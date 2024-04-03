  import axios from "axios";
  import React, { useEffect, useRef, useState } from "react";
  import { FaTrash, FaPlus } from "react-icons/fa";
  import { LuUpload } from "react-icons/lu";

  function AddDoc({ isSubmit, PO_Id }) {
    const [files, setFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const uploadRef = useRef();

    const handleFileUploads = () => {
      uploadRef.current.click();
    };

    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      const names = selectedFiles.map((file) => file.name);
      setFileNames((prevNames) => [...prevNames, ...names]);
    };

    const handleDelete = (index) => {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });

      setFileNames((prevNames) => {
        const updatedNames = [...prevNames];
        updatedNames.splice(index, 1);
        return updatedNames;
      });
    };

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file); // Make sure the key is "files"
        });
    
        formData.append("PO_Id", PO_Id); // Append PO_Id as well
    
        const response = await axios.post(
          "http://localhost:8000/api/PoItems/files/addFiles",
          formData, // Send the FormData object directly
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        alert("Files uploaded successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while uploading files.");
      }
    };
    
    useEffect(() => {
      if (isSubmit && files.length > 0) { // Only proceed if form is submitted and there are new files
        handleSubmit();
      }

      console.log("addDOc" + isSubmit)
    }, [isSubmit]);


    return (
      <section className="w-full pt-5">
        <div className="w-full flex justify-between">
          <button
            className="w-100 px-20 rounded-md h-[50px] flex bg-blue-300 justify-center items-center text-[15px]"
            onClick={handleFileUploads} type="button"
          >
            <LuUpload className="pr-3 text-3xl" />
            Upload files
          </button>
          <div className="w-[50%] py-5 flex justify-end">
            {fileNames.length > 0 && (
              <>
                <span className="uppercase font-bold text-[12px]">FileNames</span>
                <table>
                  <tbody>
                    {fileNames.map((name, index) => (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>
                          <button type="button"
                            className="px-2 py-1 bg-red-500 text-white text-[10px] h-[25px]"
                            onClick={() => handleDelete(index)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
        <div className="w-full flex px-2 ">
          <input
            type="file"
            className="w-full py-1 px-2 cursor-pointer hidden"
            onChange={handleFileChange}
            multiple
            ref={uploadRef}
          />
        </div>
      </section>
    );
  }

  export default AddDoc;
