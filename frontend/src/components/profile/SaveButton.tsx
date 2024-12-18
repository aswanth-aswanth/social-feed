import React from "react";

const SaveButton: React.FC<{ onSave: () => void }> = ({ onSave }) => (
  <div className="absolute bottom-8 left-4 right-4">
    <button
      onClick={onSave}
      className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition"
    >
      SAVE
    </button>
  </div>
);

export default SaveButton;
