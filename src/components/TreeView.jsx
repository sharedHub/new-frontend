import React, { useState, useEffect } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import axios from "axios"; // Import axios for making HTTP requests

const TreeNode = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="flex items-center">
        {node.children && (
          <button onClick={handleToggle} className="mr-2 p-2">
            {isExpanded ? (
              <BsDashSquare size={24} className="text-[#6F6F6F]" />
            ) : (
              <BsPlusSquare size={24} className="text-[#6F6F6F]" />
            )}
          </button>
        )}
        <div>{node.label}</div>
      </div>
      {isExpanded && node.children && (
        <div className="ml-4">
          {node.children.map((child, index) => (
            <div key={index} className="ml-4">
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    // Fetch data from API when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.183:3100/api/getAllBssList"
      );
      // Assuming the API response data is an array of nodes
      setTreeData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="treeview">
      {treeData.map((node, index) => (
        <div key={index} className="ml-4">
          <TreeNode node={node} />
        </div>
      ))}
    </div>
  );
};
