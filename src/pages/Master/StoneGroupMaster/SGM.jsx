import React, { useState, useRef } from "react";
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
import { FaFileImport, FaRegSave } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { MdOutlineDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit, TbFileImport } from "react-icons/tb";
import { BiSolidFileImport } from "react-icons/bi";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";


const SGM = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const data = [
    { name: "Rect" },
    { name: "Rect" },
    { name: "Rect" },
    { name: "Rect" },
    { name: "Rect" },
  ];
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
      console.error("getUserMedia API not supported");
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
  const options = [
    { value: "Select", label: "Select" },
    // { value: "bucharest", label: "Bucharest" },
    // { value: "london", label: "London" },
    // { value: "washington", label: "Washington" }
  ];

  return (
    <div className="w-full">
      <div>
        <TabView
          className="mt-4 mr-4"
          tabs={[
            {
              id: 1,
              title: "Master",
              content: (
                <div className="w-full">
                  <div className="grid gap-3 grid-cols-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6">
                    <div>
                      <Input type="text" placeholder="Record No" />
                    </div>
                    <div className="col-span-2">
                      <BigInput type="text" placeholder="Group Name" />
                    </div>
                    <div>
                      <Dropdown options={options} label="Alias" />
                    </div>
                    <div>
                      <Dropdown options={options} label="UOM" />
                    </div>
                    <div>
                      <Dropdown options={options} label="Product" />
                    </div>
                    <div className="col-span-3">
                      <BigInput type="text" placeholder="Sales A/C" />
                    </div>
                    <div className="col-span-3">
                      <BigInput type="text" placeholder="Purchase A/C" />
                    </div>
                    <div>
                      <Input type="text" placeholder="CGST File" />
                    </div>
                    <div>
                      <Input type="text" placeholder="SGST File" />
                    </div>
                    <div>
                      <Input type="text" placeholder="IGST File" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex-initial mt-4">
                      <button
                        className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2"
                        onClick={handleAddFields}
                      >
                        Add New <BsFillPlusCircleFill className="ml-1 white" />
                      </button>
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
            {
              id: 2,
              title: "Q/S/C",
              content: (
                <>
                  <div className="flex w-auto">
                    <div className="w-1/3 flex flex-col">
                      <div className="p-3">
                        <h1 className="font-bold text-2xl">New shape record</h1>
                      </div>
                      <div className="p-3">
                        <Input type="text" placeholder="Enter shape Name" />
                      </div>
                      <div className="flex justify-end">
                        <button className="bg-[#F0F2F5] text-black rounded-lg p-4 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                          Cancel
                        </button>
                        <button className="bg-buttoncolor text-white rounded-lg p-4 h-10 font-semibold text-sm flex items-center justify-center mr-4">
                          Save
                        </button>
                      </div>
                      <div className="p-3">
                        <h1 className="font-bold text-2xl">
                          New quality record
                        </h1>
                      </div>
                      <div className="p-3">
                        <Input type="text" placeholder="Enter quality Name" />
                      </div>
                      <div className="flex justify-end">
                        <button className="bg-[#F0F2F5] text-black rounded-lg p-4 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                          Cancel
                        </button>
                        <button className="bg-buttoncolor text-white rounded-lg p-4 h-10 font-semibold text-sm flex items-center justify-center mr-4">
                          Save
                        </button>
                      </div>
                      <div className="p-3">
                        <h1 className="font-bold text-2xl">New color record</h1>
                      </div>
                      <div className="p-3">
                        <Input type="text" placeholder="Enter color Name" />
                      </div>
                      <div className="flex justify-end">
                        <button className="bg-[#F0F2F5] text-black rounded-lg p-4 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                          Cancel
                        </button>
                        <button className="bg-buttoncolor text-white rounded-lg p-4 h-10 font-semibold text-sm flex items-center justify-center mr-4">
                          Save
                        </button>
                      </div>
                    </div>
                    <div className=" flex w-auto flex-row">
                      <div className="py-3 px-6">
                        <h1 className="font-semibold text-2xl p-2">Shapes</h1>
                        <table className="min-w-full border border-[#E5E8EB] border-collapse rounded-xl">
                          <thead className="border border-[#E5E8EB]">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-[#E5E8EB] text-black">
                            {data.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                                  <RiDeleteBin6Line />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="border-l border-[#6C757D] h-auto"></div>
                      <div className="py-3 px-6">
                        <h1 className="font-semibold text-2xl p-2">Colors</h1>
                        <table className="min-w-full border border-[#E5E8EB] border-collapse rounded-xl">
                          <thead className="border border-[#E5E8EB]">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-[#E5E8EB] text-black">
                            {data.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                                  <RiDeleteBin6Line />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="border-l border-[#6C757D] h-auto"></div>
                      <div className="py-3 px-6">
                        <h1 className="font-semibold text-2xl p-2">Quality</h1>
                        <table className="min-w-full border border-[#E5E8EB] border-collapse rounded-xl">
                          <thead className="border border-[#E5E8EB]">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-[#E5E8EB] text-black">
                            {data.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                                  <RiDeleteBin6Line />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ),
            },
            {
              id: 3,
              title: "Sieve",
              content: (
                <div className="w-auto">
                  <div className="grid gap-3 grid-cols-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
                      <div>
                        <Dropdown options={options} label="Group" />
                      </div>
                      <div>
                        <Dropdown options={options} label="Shape" />
                      </div>
                      <div>
                      <button
                        className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2"
                       >
                        New Shape <BsFillPlusCircleFill className="ml-1 white" />
                      </button>
                      </div>
                      <div className="col-span-3"></div>
                      <div>
                          <Input type="text" placeholder="Sieve" />
                        </div>
                        <div>
                          <Input type="text" placeholder="MM" />
                        </div>
                        <div>
                          <Input type="text" placeholder="Cts/Pc" />
                        </div>
                        <div>
                          <Input type="text" placeholder="Gms" />
                        </div>
                        <div>
                      <button
                        className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2"
                       >
                        Add New <BsFillPlusCircleFill className="ml-1 white" />
                      </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                    <div className="flex-initial mt-4">
                      <button
                        className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2"
                        onClick={handleAddFields}
                      >
                        Add New <BsFillPlusCircleFill className="ml-1 white" />
                      </button>
                    </div>
                    <div className="flex justify-self-end">
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Delete
                        <MdOutlineDelete className="ml-1 white text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Edit
                        <TbEdit className="ml-1 white text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Import
                        <CiImport className="ml-1 white font-medium text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Export
                        <CiExport className="ml-1 white font-medium text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 4,
              title: "Stone Lot",
              content: (
                <div className="w-auto">
                  <div className="grid gap-3 grid-cols-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
                         <div>
                          <Input type="text" placeholder="Master Group" />
                        </div>
                        <div>
                          <Input type="text" placeholder="Shape" />
                        </div>
                        <div>
                          <Input type="text" placeholder="Quality" />
                        </div>
                        <div>
                          <Input type="text" placeholder="Colour" />
                        </div>
                        <div>

                      </div>
                    </div>
                    <div className="flex justify-between">
                    <div className="flex-initial mt-4">
                      <button
                        className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2"
                        onClick={handleAddFields}
                      >
                        Create <BsFillPlusCircleFill className="ml-1 white" />
                      </button>
                    </div>
                    <div className="flex justify-self-end">
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Delete
                        <MdOutlineDelete className="ml-1 white text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Edit
                        <TbEdit className="ml-1 white text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Import
                        <CiImport className="ml-1 white font-medium text-lg" />
                      </button>
                      <button className="bg-buttoncolor text-white rounded-lg p-2 h-10 font-semibold text-sm flex items-center justify-center mr-2">
                        Export
                        <CiExport className="ml-1 white font-medium text-lg" />
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

export default SGM;
