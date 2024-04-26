import React from "react";
import { FaTrash } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import baseUrl from "../../config";

function EditDoc({ filesLists = [], uploadRef, handleDelete, handleFileChange, handleFileUploads }) {
  // if (!filesLists || !Array.isArray(filesLists)) {
  //   return null; // or a loading indicator or any default content
  // }

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
        {filesLists &&
          <>
            <span className="uppercase font-bold text-[12px]">FileNames</span>
            <div>
              <ul>
               {filesLists.map((data, index) => (
                  <li key={index}>
                    <div>
                      <a
                        href={`${baseUrl}/uploads/${data.filename}`} // Adjust the URL based on your server configuration
                        target="_blank" // Open link in a new tab
                        rel="noopener noreferrer"
                      >
                        {data.filename}
                      </a>
                      <button
                        type="button"
                        className="px-2 py-1 bg-red-500 text-white text-[10px] h-[25px]"
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        }
        </div>
      </div>
      <div className="w-full flex px-2 ">
        <input
          type="file"
          className="w-full py-1 px-2 cursor-pointer hidden"
          onChange={(e) => handleFileChange(e)}
          multiple
          ref={uploadRef}
        />
      </div>
    </section>
  );
}

export default EditDoc;
