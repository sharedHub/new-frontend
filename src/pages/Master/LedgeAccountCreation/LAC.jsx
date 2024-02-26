import React, { useState, useRef,useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import TabView from "../../../components/Tabview";
import avatar from "../../../assets/Cartoon01.png";
import aadhar from "../../../assets/aadhar.png";
import pan from "../../../assets/pan.png";
import Input from "../../../components/Input";
import TextAreaInput from "../../../components/TextAreaInput";
import BigInput from "../../../components/BigInput";
import BigDropdown from "../../../components/BigDropdown";
import TextAreaInputSmall from "../../../components/TextAreaInputSmall";
import Dropdown from "../../../components/Dropdown";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BsCamera } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { FaRegSave } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { MdOutlineDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { TreeView } from "../../../components/TreeView";
import axios from 'axios';
const LAC = () => {

  const [masterGroup, setMasterGroup] = useState("");
  const [subGroup, setSubGroup] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [data, setData] = useState({ sch_description: "", master: "" });
  const handleMasterGroupChange = (e) => {
    setMasterGroup(e.target.value);
    setData({ sch_description: masterGroup });
  };

  const handleSubGroupChange = (event) => {
    setSubGroup(event.target.value);
    setData({ master: subGroup });
  };
  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.183:3400/api/addSubData",
        data
      );
      // If successfully saved, fetch the updated tree data
      fetchTreeData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTreeData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.183:3100/api/getAllBssList"
      );
      setTreeData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    }
  };

  useEffect(() => {
    fetchTreeData();
  }, []);



  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterButtonClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const [inputFields, setInputFields] = useState([{ id: 1 }]);
  const [accordionStates, setAccordionStates] = useState(
    inputFields.map(() => false)
  ); // Initialize accordion states

  // Function to add a new set of input fields
  const handleAddFields = () => {
    const newInputFields = [...inputFields, { id: inputFields.length + 1 }];
    setInputFields(newInputFields);
    setAccordionStates([...accordionStates, false]); // Add new accordion state
  };

  // Function to toggle the state of an accordion
  const toggleAccordion = (index) => {
    const newAccordionStates = [...accordionStates];
    newAccordionStates[index] = !newAccordionStates[index];
    setAccordionStates(newAccordionStates);
  };

  // Function to add a new set of input fields

  // Define state for selected image
  const handleCameraClick = () => {
    // Check if the browser supports the getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request access to the camera
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          // Display the camera stream in a video element
          const video = document.createElement("video");
          video.srcObject = stream;
          video.play();

          // Create a canvas element to capture the image
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");

          // Capture an image from the video stream after a delay to allow focusing
          setTimeout(function () {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            // Convert the captured image to a data URL
            const imageDataURL = canvas.toDataURL("image/jpeg");

            // Update the selectedImage state with the captured image
            setSelectedImage(imageDataURL);

            // Stop the camera stream
            stream.getTracks().forEach((track) => track.stop());
            // Remove the video and canvas elements
            video.remove();
            canvas.remove();
          }, 1000); // Adjust the delay as needed
        })
        .catch(function (error) {
          console.error("Error accessing the camera:", error);
        });
    } else {
      console.error("PostUserMedia API not supported");
    }
  };

  const [selectedImage, setSelectedImage] = useState(avatar); // Default image
  const [selectedaadharImage, setSelectedaadharImage] = useState(aadhar);
  const [selectedpanImage, setSelectedPanImage] = useState(pan);
  // Ref for file input element
  const fileInputRef = useRef(null);
  const handleFileChangee = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedaadharImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Function to handle file input change
  const handleFileChangeee = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPanImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // Function to open file input when image is clicked
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Prevents the default behavior of the click event on the image
  const handleImageClick = (event) => {
    event.preventDefault();
    handleClick();
  };
  const options = [{ value: "Select", label: "Select" }];

  return (
    <div className="w-full">
      <div>
        <TabView
          className="mt-4 mr-4"
          tabs={[
            {
              id: 1,
              title: "Balance Sheet",
              content: (
                <div className="w-full flex">
                <div className="w-1/3 flex flex-col">
                  <div className="p-3">
                    <h1 className="font-bold text-2xl">New balance sheet</h1>
                  </div>
                  <div className="p-3 relative">
                    <Input type="text" placeholder="Enter Master Group" value={masterGroup} onChange={(e)=>handleMasterGroupChange(e)} />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaPlusCircle className="text-xl text-buttoncolor m-auto p-auto mr-2" />
                    </div>
                  </div>
                  <div className="p-3 relative">
                    <Input type="text" placeholder="Enter Sub Group" value={subGroup} onChange={(event)=>handleSubGroupChange(event)} />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaPlusCircle className="text-xl text-buttoncolor m-auto p-auto mr-2" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-[#F0F2F5] text-black rounded-lg p-4 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                      Cancel
                    </button>
                    <button className="bg-buttoncolor text-white rounded-lg p-4 h-10 font-semibold text-sm flex items-center justify-center mr-4" onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </div>
                <div className="flex w-1/3 justify-end">
                  <div className="p-4">
                  <TreeView treeData={treeData} />
                  </div>
                </div>
              </div>
              ),
            },
            {
              id: 2,
              title: "Primary",
              content: (
                <div className="w-full flex">
                  <div className="flex-initial w-5/6">
                    <div className="grid gap-2 grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
                      <div className="col-span-2">
                        <BigInput type="text" placeholder="Account Name" />
                      </div>
                      <div className="">
                        <Input type="text" placeholder="Account Alias" />
                      </div>
                      <div>
                        <Dropdown options={options} label="Account Group" />
                      </div>
                      <div>
                        <Dropdown options={options} label="Display Group" />
                      </div>
                      <div className="col-span-3">
                        <TextAreaInput placeholder="Address" />
                      </div>
                      <div className="grid grid-rows-2 grid-flow-col gap-2">
                        <div>
                          <Input type="text" placeholder="Country" />
                        </div>
                        <div>
                          <Input type="text" placeholder="State Code" />
                        </div>
                      </div>
                      <div className="grid grid-rows-2 grid-flow-col gap-2">
                        <div>
                          <Input type="text" placeholder="State" />
                        </div>
                        <div>
                          <Input type="text" placeholder="City" />
                        </div>
                      </div>
                      <div>
                        <Input type="text" placeholder="Pin Code" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Phone Number" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Aadhar Number" />
                      </div>
                      <div>
                        <Input type="text" placeholder="PAN" />
                      </div>
                      <div>
                        <Input type="text" placeholder="GSTIN" />
                      </div>
                      <div className="col-span-4"></div>
                      <div>
                        <label className="inline-block mr-10">
                          Is GST Applicable ?
                        </label>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                      <div>
                        <Input type="text" placeholder="Pin Code" />
                      </div>
                      <div className="col-span-3">
                        <TextAreaInput placeholder="Address" />
                      </div>
                      <div className="grid grid-rows-2 grid-flow-col gap-2">
                        <div>
                          <Input type="text" placeholder="Email" />
                        </div>
                        <div>
                          <Input type="text" placeholder="Web-URL" />
                        </div>
                      </div>
                      <div className="col-span-3">
                        <BigDropdown
                          options={options}
                          label="B Sheet Schedule"
                        />
                      </div>
                      <div>
                        <Input type="text" placeholder="Credit Days" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Loss (%)" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Credit on Loss(%)" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Dia Sell Rate" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Cs Sell Rate" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Mfg Touch" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Purity" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Labour Rate" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Pcs | Gms" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Rate On" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Per Pc Labour" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Pc Weight Less" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Worker Category" />
                      </div>
                      <div>
                        <Dropdown options={options} label="Department" />
                      </div>
                      <div className="col-span-3"></div>
                      <div className="col-span-3">
                        <TextAreaInput placeholder="Home Address" />
                      </div>
                      <div className="col-span-2">
                        <TextAreaInputSmall placeholder="Native Address" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Privelage Card No" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Profession" />
                      </div>
                      <div>
                        <Input type="text" placeholder="DOB" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Name of Spouse" />
                      </div>
                      <div>
                        <Input type="text" placeholder="Spouse DOB" />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Wedding Anniversary Date"
                        />
                      </div>
                      <div>
                        <BigInput
                          type="text"
                          placeholder="Last Items Purchased"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-1/6 justify-end">
                    <div className="flex flex-col">
                      <div
                        className="relative cursor-pointer border border-textcolor rounded-[20px] inline-block p-1 justify-self-end mb-4"
                        style={{ width: "180px", height: "200px" }}
                      >
                        <img
                          src={selectedImage}
                          alt="Avatar"
                          onClick={handleImageClick}
                          className="w-[140px] h-[160px] m-4"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: 0,
                            width: "50%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        />
                        <button
                          onClick={handleCameraClick}
                          className="absolute top-0 right-0 p-2 bg-gray-300 rounded-full"
                        >
                          <BsCamera />
                        </button>
                      </div>
                      <div
                        className="relative cursor-pointer border border-textcolor rounded-[20px] inline-block p-1 justify-self-end mb-4"
                        style={{ width: "180px", height: "200px" }}
                      >
                        <img
                          src={selectedaadharImage}
                          alt="Avatar"
                          onClick={handleImageClick}
                          className="w-[140px] h-[160px] m-4"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChangee}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div
                        className="relative cursor-pointer border border-textcolor rounded-[20px] inline-block p-1 justify-self-end"
                        style={{ width: "180px", height: "200px" }}
                      >
                        <img
                          src={selectedpanImage}
                          alt="Avatar"
                          onClick={handleImageClick}
                          className="w-[140px] h-[160px] m-4"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChangeee}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 3,
              title: "Banking",
              content: (
                <>
                  <div className="w-auto">
                    <div className="flex mb-4">
                      <button
                        className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2"
                        onClick={handleAddFields}
                      >
                        Add New <BsFillPlusCircleFill className="ml-1 white" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center">
                        Delete
                        <MdDelete className="ml-1 white text-lg" />
                      </button>
                    </div>
                    {inputFields.map((inputField, index) => (
                      <div key={index}>
                        <div className=" rounded-md overflow-hidden bg-buttoncolor drop-shadow-md">
                          <button
                            className="w-full text-left px-3 py-1 h-9 text-md font-semibold bg-gray-200 hover:bg-gray-300 focus:outline-none text-white"
                            onClick={() => toggleAccordion(index)} // Pass index to toggleAccordion function
                          >
                            Banking Details
                            <span className="float-right">
                              {accordionStates[index] ? "-" : "+"}
                            </span>
                          </button>
                          {accordionStates[index] && (
                            <div className="p-1 bg-white">
                              <div className="grid gap-4 grid-cols-6 p-2 rounded-[7px]">
                                <div className="bg-white rounded-[7px]">
                                  <Input type="text" placeholder="Bank Name" />
                                </div>
                                <div className="bg-white rounded-[7px]">
                                  <Input type="text" placeholder="Branch" />
                                </div>
                                <div className="bg-white rounded-[7px]">
                                  <Input type="text" placeholder="IFSC Code" />
                                </div>
                                <div className="bg-white rounded-[7px]">
                                  <Input
                                    type="text"
                                    placeholder="Account Number"
                                  />
                                </div>
                                <div className="bg-white rounded-[7px]">
                                  <Input
                                    type="text"
                                    placeholder="Account Name"
                                  />
                                </div>
                                <div className="bg-white rounded-[7px]">
                                  <Input
                                    type="text"
                                    placeholder="Account Type"
                                  />
                                </div>
                                <div className="bg-white rounded-[7px] col-span-3">
                                  <TextAreaInput placeholder="Address" />
                                </div>
                                <div className="bg-white h-10 rounded-[7px]">
                                  <Input type="text" placeholder="State" />
                                </div>
                                <div className="bg-white h-10 rounded-[7px]">
                                  <Input type="text" placeholder="City" />
                                </div>
                                <div className="bg-white h-10 rounded-[7px]">
                                  <Input type="text" placeholder="Pin Code" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Add a separator after each set of input fields */}
                        {index !== inputFields.length - 1 && (
                          <hr className="my-4 border-gray-200" />
                        )}
                      </div>
                    ))}
                    <div className="flex flex justify-center mt-4">
                      <button
                        className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2"
                        onClick={handleAddFields}
                      >
                        Save <FaRegSave className="ml-1 white text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center">
                        Cancel
                        <GiCancel className="ml-1 white text-lg" />
                      </button>
                    </div>
                  </div>
                </>
              ),
            },
            {
              id: 4,
              title: "View",
              content: (
                <div className="w-auto">
                  <div className="flex justify-between">
                    <div className="flex-initial mb-4">
                      <button
                        className="bg-buttoncolor text-white rounded-lg p-4 w-fit h-10 font-semibold text-md flex items-center justify-center"
                        onClick={handleFilterButtonClick}
                      >
                        <IoFilter className="ml-1 white text-lg mr-1" />
                        Filter
                      </button>
                      {isFilterOpen && (
                        <div className="absolute z-10 bg-buttoncolor mt-2 shadow-md p-2 rounded-xl">
                          <div className="grid grid-cols-4 gap-4">
                            <ul className="text-white font-semibold text-sm">
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Account Name
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Account Alias
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Account Group
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Display Group
                              </li>
                            </ul>
                            <ul className="text-white font-semibold text-sm">
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Address
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Country
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                State
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                City
                              </li>
                            </ul>
                            <ul className="text-white font-semibold text-sm">
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Pin Code
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                State Code
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Phone No
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Aadhar No
                              </li>
                            </ul>
                            <ul className="text-white font-semibold text-sm">
                              <li>
                                <input type="checkbox" className="mr-1" />
                                GSTIN
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                PAN
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Company Name
                              </li>
                              <li>
                                <input type="checkbox" className="mr-1" />
                                Email
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-self-end">
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Delete
                        <MdOutlineDelete className="ml-1 white text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Print
                        <MdOutlineLocalPrintshop className="ml-1 white text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Export
                        <TiExport className="ml-1 white text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LAC;
