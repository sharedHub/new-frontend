import React from "react";
  
const BigInput = ({ type, placeholder }) => {
  return (
    <>
      
        <div className="relative w-full h-10">
          <input
            type={type}
            placeholder={placeholder}
            className="peer w-full h-full bg-transparent text-textcolor font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-inputcolor border border-gray-200 focus:border-2 focus:border-gray-900 text-sm px-3 py-2.5 rounded-[7px] border-inputcolor"
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t before:border-l before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t after:border-r after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900"
          >
            {placeholder}
          </label>
        </div>
    </>
  );
};

export default BigInput;
