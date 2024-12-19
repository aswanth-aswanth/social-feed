import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-slate-200 animate-pulse rounded"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
