import React from "react";
import Image from "next/image";

function Avatar({image}) {
  return <div>
    <Image style={{borderRadius:"50%"}} src={image || "default.png"} alt="avatar" width={40} height={40} />
  </div>;
}

export default Avatar;
