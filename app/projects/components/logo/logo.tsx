import Image from "next/image";
import { FC } from "react";
import LogoImg from "../../../../public/logo.png";

interface LogoProps {
  width: string;
  height: string;
}

const Logo: FC<LogoProps> = ({ width, height }) => {
  return (
    <div style={{ width: width, height: height }}>
      <Image
        src={LogoImg}
        alt="e-commerce logo"
        className="h-full w-full overflow-visible object-cover"
      />
    </div>
  );
};

export default Logo;
