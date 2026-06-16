import React from "react";

const Title = ({ title }) => {
  return (
    <div className="relative pl-3 text-xl font-bold text-[#333333] before:absolute before:-left-0 before:h-full before:w-[4px] before:bg-[#5271ff]">
      {title}
    </div>
  );
};

export default Title;
