import Image from "next/image";
import { FC } from "react";

export const Loading: FC = () => {
  return (
    <Image
      src="/3-dots-bounce.svg"
      alt="Loading"
      className="inline text-white"
      width={24}
      height={24}
    />
  );
};
