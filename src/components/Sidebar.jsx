import React from "react";
import { useState } from "react";
import './Sidebar.css';
  const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Company Profile", src: "Chart_fill" },
      { title: "Branch Setup", src: "02" },
      { title: "User Profile", src: "Group"},
      { title: "User Menu Rights ", src: "Group (3)" },
      { title: "System Security", src: "material-symbols_security" },
      { title: "Data Backups", src: "lucide_database-backup" },
    ];
    return (
        <div className="flex">
      <div
        className={` ${
          open ? "w-52" : "w-20 "
        } bg-themecolor h-screen p-5  pt-0 relative duration-400`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          {/* <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          /> */}
          <h1
            className={`text-textcolor origin-left font-medium text-md duration-200  ${
              !open && "scale-0"
            }`}
          >
            
            Administrator
          </h1>
        </div>
        <ul className="pt-0">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
  }
  export default Sidebar;