import { Navigate } from "react-router-dom";

export default function CreatePostHeader() {
  return (
    <div className="flex items-center p-4">
      <button onClick={() => Navigate(-1)} className="flex items-center gap-2">
        <img src="/HiArrowSmLeftBlack.png" alt="Back" className="w-8 h-6" />
        <h3 className="font-bold text-xl">New post</h3>
      </button>
    </div>
  );
}
