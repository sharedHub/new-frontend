import React, { useState, useRef } from "react";
import Sidebar from "../../../components/Sidebar";
import TabView from '../../../components/Tabview';
import avatar from "../../../assets/Cartoon01.png";
import aadhar from "../../../assets/aadhar.png";
import pan from "../../../assets/pan.png";
import Input from '../../../components/Input';
import TextAreaInput from "../../../components/TextAreaInput";
import BigInput from "../../../components/BigInput";
import BigDropdown from "../../../components/BigDropdown";
import TextAreaInputSmall from "../../../components/TextAreaInputSmall";
import Dropdown from "../../../components/Dropdown";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BsCamera } from "react-icons/bs";


const LAC = () => {
  const [inputFields, setInputFields] = useState([{ id: 1 }]);

  // Function to add a new set of input fields
  const handleAddFields = () => {
    const newInputFields = [...inputFields, { id: inputFields.length + 1 }];
    setInputFields(newInputFields);
  };
  // Define state for selected image
  const handleCameraClick = () => {
    // Check if the browser supports the getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request access to the camera
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        // Display the camera stream in a video element
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
  
        // Create a canvas element to capture the image
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
  
        // Capture an image from the video stream after a delay to allow focusing
        setTimeout(function () {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Convert the captured image to a data URL
          const imageDataURL = canvas.toDataURL('image/jpeg');
  
          // Update the selectedImage state with the captured image
          setSelectedImage(imageDataURL);
  
          // Stop the camera stream
          stream.getTracks().forEach(track => track.stop());
          // Remove the video and canvas elements
          video.remove();
          canvas.remove();
        }, 1000); // Adjust the delay as needed
      }).catch(function (error) {
        console.error('Error accessing the camera:', error);
      });
    } else {
      console.error('getUserMedia API not supported');
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
    const [message, setMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
  
    const handleMessageChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);}
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
    <div className='w-full'>
      <div>
        <TabView className="mt-4 mr-4" tabs={[
          {
            id: 1,
            title: 'Primary',
            content: (
              <div className="w-full flex">
               <div className='flex-initial w-5/6'>
                 <div className='grid gap-2 grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5'>
                  
                  <div className="col-span-2"><BigInput type="text" placeholder="Account Name"/></div>
                  <div className=""><Input type="text" placeholder="Account Alias"/></div>
                  <Dropdown options={options} label="Account Group" />
                  <Dropdown options={options} label="Display Group" />
                <div className="col-span-3"><TextAreaInput placeholder="Address"/></div>
                <div className="grid grid-rows-2 grid-flow-col gap-2"><div><Input type="text" placeholder="Country"/></div><div><Input type="text" placeholder="State Code"/></div></div>
                <div className="grid grid-rows-2 grid-flow-col gap-2"><div><Input type="text" placeholder="State"/></div><div><Input type="text" placeholder="City"/></div></div>
                  <div><Input type="text" placeholder="Pin Code"/></div>
                  <div><Input type="text" placeholder="Phone Number"/></div>
                  <div><Input type="text" placeholder="Aadhar Number"/></div>
                  <div><Input type="text" placeholder="PAN"/></div>
                  <div><Input type="text" placeholder="GSTIN"/></div>
                  <div className="col-span-4"></div>
                  <div><label className="inline-block mr-10">Is GST Applicable ?</label><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /></div>
                  <div><Input type="text" placeholder="Pin Code"/></div>
                  <div className="col-span-3"><TextAreaInput placeholder="Address"/></div>
                  <div className="grid grid-rows-2 grid-flow-col gap-2"><div><Input type="text" placeholder="Email"/></div><div><Input type="text" placeholder="Web-URL"/></div></div>
                  <div className="col-span-3"><BigDropdown options={options} label="B Sheet Schedule" /></div>
                  <div><Input type="text" placeholder="Credit Days"/></div>
                  <div><Input type="text" placeholder="Loss (%)"/></div>
                  <div><Input type="text" placeholder="Credit on Loss(%)"/></div>
                  <div><Input type="text" placeholder="Dia Sell Rate"/></div>
                  <div><Input type="text" placeholder="Cs Sell Rate"/></div>
                  <div><Input type="text" placeholder="Mfg Touch"/></div>
                  <div><Input type="text" placeholder="Purity"/></div>
                  <div><Input type="text" placeholder="Labour Rate"/></div>
                  <div><Input type="text" placeholder="Pcs | Gms"/></div>
                  <div><Input type="text" placeholder="Rate On"/></div>
                  <div><Input type="text" placeholder="Per Pc Labour"/></div>
                  <div><Input type="text" placeholder="Pc Weight Less"/></div>
                  <div><Input type="text" placeholder="Worker Category"/></div>
                  <div><Dropdown options={options} label="Department" /></div>
                  <div className="col-span-3"></div>
                  <div className="col-span-3"><TextAreaInput placeholder="Home Address"/></div>
                  <div className="col-span-2"><TextAreaInputSmall placeholder="Native Address"/></div>
                  <div><Input type="text" placeholder="Privelage Card No"/></div>
                  <div><Input type="text" placeholder="Profession"/></div>
                  <div><Input type="text" placeholder="DOB"/></div>
                  <div><Input type="text" placeholder="Name of Spouse"/></div>
                  <div><Input type="text" placeholder="Spouse DOB"/></div>
                  <div><Input type="text" placeholder="Wedding Anniversary Date"/></div>
                  <div><BigInput type="text" placeholder="Last Items Purchased"/></div>
            </div>   
          </div>
          <div className="flex w-1/6 justify-end">
            <div className="flex flex-col">
            <div className="relative cursor-pointer border border-textcolor rounded-[20px] inline-block p-1 justify-self-end mb-4" style={{ width: "180px", height: "200px" }}>
                <img src={selectedImage} alt="Avatar" onClick={handleImageClick} className="w-[140px] h-[160px] m-4" />
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ position: "absolute", top: 0, left: 0, opacity: 0, width: "50%", height: "100%", cursor: "pointer" }} />
                <button onClick={handleCameraClick} className="absolute top-0 right-0 p-2 bg-gray-300 rounded-full">
                  <BsCamera />
                </button>
              </div>
              <div className="relative cursor-pointer border border-textcolor rounded-[20px] inline-block p-1 justify-self-end mb-4" style={{ width: "180px", height: "200px" }}>
                <img src={selectedaadharImage} alt="Avatar" onClick={handleImageClick}  className="w-[140px] h-[160px] m-4"  />
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChangee} style={{ position: "absolute", top: 0, left: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer" }} />
              </div>  
              <div className="relative cursor-pointer border border-textcolor rounded-[20px] inline-block p-1 justify-self-end" style={{ width: "180px", height: "200px" }}>
                <img src={selectedpanImage} alt="Avatar" onClick={handleImageClick}  className="w-[140px] h-[160px] m-4"  />
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChangeee} style={{ position: "absolute", top: 0, left: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer" }} />
              </div>  
            </div>
          </div>
          </div>
            )
          },
          {
            id: 2,
            title: 'Banking',
            content: (
              <>
                <div className="w-auto">
                <div className="w-auto mb-4">
        <button 
          className="bg-themecolor text-white rounded-lg p-2 h-10 font-semibold text-sm	 flex items-center justify-center"
          onClick={handleAddFields}
        >
          Add <BsFillPlusCircleFill className="ml-1 white" />
        </button>
      </div>{inputFields.map((inputField, index) => (
        <div key={index} className='grid gap-4 grid-cols-6'>
          <div className=""><Input type="text" placeholder="Bank Name"/></div>
          <div className=""><Input type="text" placeholder="Branch"/></div>
          <div className=""><Input type="text" placeholder="IFSC Code"/></div>
          <div className=""><Input type="text" placeholder="Account Number"/></div>
          <div className=""><Input type="text" placeholder="Account Name"/></div>
          <div className=""><Input type="text" placeholder="Account Type"/></div>
          <div className="col-span-3"><TextAreaInput placeholder="Address"/></div>
          <div className=""><Input type="text" placeholder="State"/></div>
          <div className=""><Input type="text" placeholder="City"/></div>
          <div className=""><Input type="text" placeholder="Pin Code"/></div>                    
        </div>
        
        ))} 
              </div>
              </>
            )
          },
          {
            id: 3,
            title: 'View',
            content: (
              <div className="w-auto">
              <div className='grid gap-4 grid-cols-6'>
                 
      </div>   
        </div>
            )
          }
        ]} />
      </div>
    </div>
  );
};

export default LAC;
    