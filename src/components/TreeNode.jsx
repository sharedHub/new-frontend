import React, { useState } from "react";

const TreeNode = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="flex items-center">
        {node.children && (
          <button onClick={handleToggle} className="mr-2">
            {isExpanded ? "-" : "+"}
          </button>
        )}
        <div>{node.label}</div>
      </div>
      {isExpanded && node.children && (
        <div className="ml-4">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
