import React, { useState } from "react";
import axios from "axios";

const BalanceSheet = () => {
    const [schDescription, setSchDescription] = useState("");
    const [master, setMaster] = useState("");
    
    const handleSchDescriptionChange = (e) => {
        setSchDescription(e.target.value);
    };

    const handleMasterChange = (e) => {
        setMaster(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://192.168.0.183:3400/api/addSubData",
                { sch_description: schDescription, master: master }
            );
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={schDescription}
                onChange={handleSchDescriptionChange}
                placeholder="Enter sch_description"
            />
            <input
                type="text"
                value={master}
                onChange={handleMasterChange}
                placeholder="Enter master"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default BalanceSheet;
