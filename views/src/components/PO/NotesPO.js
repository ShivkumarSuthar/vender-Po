import React from "react";

function NotesPO() {
  return (
    <section className="w-full border-b-[1px] border-black border-l-[1px] border-r-[1px]  px-2 py-2 text-[10px]">
      <div className="flex" >
        <span>1.</span> <p className="pl-1">Lorem.</p>
      </div>
      <div className="flex">
        <span>2.</span>
        <p className="pl-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, omnis
          Lorem ipsum dolor sit amet.
        </p>
      </div>
      <div className="flex">
        <span>3.</span> <p className="pl-1">ipsum dolor.</p>
      </div>
      <div className="flex">
        <span>4.</span> <p className="pl-1">Lorem, ipsum dolor.</p>
      </div>
      <div className="font-bold flex">
        <span className="font-bold">Note:</span>
        <p className="pl-1">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit."{" "}
        </p>
      </div>
      <div className="font-bold flex">
        <span className="font-bold">Note: </span>
        <p className="pl-1">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit."{" "}
        </p>
      </div>
      <div className="font-bold flex">
        <span>Note: </span>
        <p className="pl-1">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit."{" "}
        </p>
      </div>
    </section>
  );
}

export default NotesPO;
