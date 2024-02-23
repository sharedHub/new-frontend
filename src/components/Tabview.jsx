import React, { useState, useEffect, useRef } from "react";
import { IoCreateSharp } from "react-icons/io5";
import { RiEditCircleFill } from "react-icons/ri";

const TabView = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter data based on Account_Description when query changes
    const filteredData = userData.filter((item) =>
      item.Account_Description.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredData);
    setFilteredData(filteredData);
  }, [query, userData]);

  useEffect(() => {
    // Set activeTab to the id of the first tab when tabs are available
    if (tabs && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]); // Run this effect whenever tabs change

  const handleSearch = async () => {
    setDropDown(true);
    try {
      const response = await fetch(
        `https://run.mocky.io/v3/841ddf72-6514-41f1-b61b-573b687851f7`
      );
      const data = await response.json();

      setUserData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, so close it
        setDropDown(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Unbind the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Empty dependency array ensures this effect only runs once

  return (
    <div className="m-2">
      <div className="m-2 mt-4">
        <div className="flex justify-between border-gray-200">
          <div className="bg-tabview w-fit  rounded-[10px] h-12">
            {tabs &&
              tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-primary text-primary text-white bg-themecolor rounded-[9px]"
                      : "border-transparent text-textcolor hover:text-gray-700"
                  } py-1.5 px-2 w-fit text-center inline-flex items-center justify-center text-sm font-semibold focus:outline-none m-2`}
                >
                  {tab.title}
                </button>
              ))}
          </div>
          {/* <div className="grid gap-3 grid-cols-6 py-1 px-1">
              <button className="bg-themecolor text-white rounded-lg p-2 h-10 font-semibold text-sm	 flex items-center justify-center">
                  Create <IoCreateSharp className="ml-1" />
              </button>
              <button className="bg-themecolor text-white rounded-lg p-2 h-10 font-semibold text-sm	 flex items-center justify-center">
                  Edit <RiEditCircleFill className="ml-1" />
              </button>          
          </div> */}

          <form className="w-5/12">
            <div className="relative parent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-12 h-7 my-auto text-gray-400 right-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                data-dropdown-toggle="dropdown"
                placeholder="Search"
                className="tracking-wide italic w-full py-1 pl-3 pr-4 h-10 text-lg border rounded-2xl outline-none border-textcolor focus:bg-white focus:border-gray-400 font-medium"
                onClick={handleSearch}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={dropdownRef}
              />
            </div>
            <div className="">
              <>
                <div
                  className={`${
                    !dropDown ? "hidden" : ""
                  }  absolute  bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow mb-4`}
                  id="dropdown"
                >
                  <table>
                    <tbody>
                      {filteredData.length === 0 ? (
                        <tr>
                          <td>No data found.</td>
                        </tr>
                      ) : (
                        filteredData.map((element) => (
                          <tr key={element.id}>
                            <td id={element.id}>
                              {element.Account_Description}
                            </td>
                            <td>{element.Account_Email}</td>
                            <td>{element.Account_Phone}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            </div>
          </form>
        </div>
        <div className="mt-4">
          {tabs &&
            tabs.map((tab) =>
              activeTab === tab.id ? (
                <div key={tab.id}>
                  {tab.content}
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
};

export default TabView;
