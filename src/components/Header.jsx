import React from "react";
  
const Header = () => {
    const isOnline = true;
  return (
    <>
      <div className="flex justify-between items-center bg-themecolor h-[70px]">
        <div className="flex-initial flex items-center">
          <h1 className="text-4xl font-normal text-white ml-3">NAME</h1>        
        </div>
        <div className="flex-auto flex justify-center">
        </div>
        <div className="flex-initial flex flex-col items-end">
        <div className="grid grid-cols-2 grid-rows-2 gap-0 mr-3">
          <div className="text-md font-sm text-white mb-1">
            USER
          </div>
          <div className="text-md font-sm text-white mb-1">
            : ADMIN
          </div>
          <div className="text-md font-sm text-white mb-1">
            STATUS
          </div>
          <div className="text-md font-sm text-whtie flex items-center">
            <span className="ml-0 text-white">{isOnline ? ': ONLINE' : ': OFFLINE'}</span>
            <span className={`h-0 w-0 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>
        </div>
        </div>
      </div>
      <div className=""></div>
       </>
  );
};

export default Header;
