import React from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
export const CodeToolbar = ({ lang, onCopy, tooltipVisible, }) => (React.createElement("div", { className: "code-toolbar bg-gray-800 text-white px-4 py-2 lg:rounded-t-xl text-sm font-semibold flex justify-between items-center" },
    React.createElement("span", { className: "font-tuner" }, lang || 'Unknown'),
    React.createElement("div", { className: "flex items-center ml-4 space-x-4 relative overflow-visible" },
        React.createElement("button", { onClick: onCopy, className: `flex items-center px-2 py-1 bg-gray-800 rounded-md text-sm transition-colors duration-200 space-x-1 relative ${tooltipVisible
                ? 'text-white bg-gray-700 rounded-md ml-1'
                : 'hover:bg-gray-700 text-white'}` },
            !tooltipVisible && React.createElement(MdOutlineContentCopy, { className: "w-4 h-4" }),
            React.createElement("span", null, !tooltipVisible ? 'Copy' : 'Copied!')))));
