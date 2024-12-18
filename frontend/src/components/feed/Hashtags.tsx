import React from "react";
import { HashtagsProps } from "../../types";

const Hashtags: React.FC<HashtagsProps> = ({ text }) => (
  <div className="flex flex-wrap gap-2">
    {text.split(" ").map((word, i) =>
      word.startsWith("#", 0) ? (
        <span key={i} className="text-blue-500">
          {word}
        </span>
      ) : (
        <>{word}</>
      )
    )}
  </div>
);

export default Hashtags;
