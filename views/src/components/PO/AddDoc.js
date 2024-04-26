import React from "react";
  import { FaTrash } from "react-icons/fa";
  import { LuUpload } from "react-icons/lu";

  function AddDoc({handleFileChange,handleFileUploads,handleFilesDelete,fileNames,uploadRef }) {
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
                            onClick={() => handleFilesDelete(index)}
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
            onChange={(e)=>handleFileChange(e)}
            multiple
            ref={uploadRef}
          />
        </div>
      </section>
    );
  }

  export default AddDoc;
