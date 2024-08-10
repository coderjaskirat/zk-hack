import Image from "next/image";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <div className="p-2 bg-white rounded-full shadow-lg mb-12">
      <Image
        src="/logo.png"
        alt="Pictionary Proof Logo"
        className="mb-10"
        width={300}
        height={300}
      />
    </div>
  );
};
