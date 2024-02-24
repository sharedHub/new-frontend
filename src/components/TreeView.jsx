import React, { useState } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

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
              <BsDashSquare size={24} className="text-[#6F6F6F]"/>
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
              <div className="connector"></div>
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView = ({ data }) => {
  return (
    <div className="treeview">
      {data.map((node, index) => (
        <div key={index} className="ml-4">
          <TreeNode node={node} />
        </div>
      ))}
    </div>
  );
};
