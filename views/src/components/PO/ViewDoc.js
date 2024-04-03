import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";

function AddDoc({ POId }) {
  const [files, setFiles] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [docId, setDocId]=useState("")
  const uploadRef = useRef();

  const handleFileUploads = () => {
    uploadRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles, // Append actual file objects
    ]);
  };
  

  const handleDelete = async (docId, index) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/PoItems/files/deleteDoc/${docId}`
      );
      const updatedData = [...apiData];
      updatedData.splice(index, 1);
      setApiData(updatedData);
    } catch (error) {
      setError("Error deleting document. Please try again.");
      console.error("Error deleting document:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
  
      // Only proceed if files are provided
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file); // Append file directly to FormData
        });
  
        // Use PUT request with the POId in the URL
        await axios.put(
          `http://localhost:8000/api/PoItems/files/uploadDocs/${POId}`,
          formData, // Send FormData containing files
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
  
        // Fetch updated data after upload
        const updatedResponse = await axios.get(
          `http://localhost:8000/api/PoItems/files/getDocs/${POId}`
        );
        setApiData(updatedResponse.data);
        setError(null); // Reset error state upon successful upload
      } else {
        setError("No files selected.");
      }
    } catch (error) {
      setError("Error uploading files. Please try again.");
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };
  
  

  useEffect(() => {
    const getDocs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/PoItems/files/getDocs/${POId}`
        );
        setApiData(response.data);
        let filesArray = [];
        response.data.forEach((item) => {
          if (item.files && Array.isArray(item.files)) {
            filesArray = filesArray.concat(item.files);
          }
        });
        setFiles(filesArray);
      } catch (error) {
        setError("Error fetching documents. Please try again.");
        console.error("Error fetching documents:", error);
      }
    };
    getDocs();
  }, [POId]);

  return (
    <section className="w-full pt-5">
      <div className="w-full flex justify-between">
        <div>
          <button
            className="w-100 px-20 rounded-md h-[50px] flex bg-blue-300 justify-center items-center text-[15px]"
            onClick={handleFileUploads}
            type="button"
          >
            <LuUpload className="pr-3 text-3xl" />
            Upload files
          </button>
        </div>
        <div className="w-[50%] flex flex-col justify-end">
          {apiData.length > 0 && (
            <>
              <span className="uppercase font-bold text-[12px]">FileNames</span>
              <div>
                <ul>
                  {/* {files.map((file, index) => (
                    <li key={index}>
                      <div>
                        <a
                          href={`http://localhost:8000/uploads/${file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file}
                        </a>
                        <button
                          type="button"
                          className="px-2 py-1 bg-red-500 text-white text-[10px] h-[25px]"
                          onClick={() => handleDelete(file._id, index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))} */}
                </ul>
              </div>
            </>
          )}

          {uploading && <p>Uploading files...</p>}
          {error && <p className="text-red-500">{error}</p>}
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
        <button onClick={handleSubmit} type="button">
          Submit
        </button>
      </div>
    </section>
  );
}

export default AddDoc;
