import React from "react";
import { HashtagsProps } from "../../types";

const Hashtags: React.FC<HashtagsProps> = ({ text }) => (
  <div className="flex flex-wrap gap-2">
    {text.split(" ").map((word, i) =>
      word.startsWith("#") ? (
        <span key={i} className="text-blue-500">
          {word}
        </span>
      ) : null
    )}
  </div>
);

export default Hashtags;
