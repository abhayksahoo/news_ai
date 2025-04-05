import React from "react";

function Toggle({ pressed, onPressedChange, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={() => onPressedChange(!pressed)}
      className={`${className} ${
        pressed ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
      } transition-all px-3 py-2 rounded-md focus:outline-none`}
    >
      {children}
    </button>
  );
}

export default Toggle;
