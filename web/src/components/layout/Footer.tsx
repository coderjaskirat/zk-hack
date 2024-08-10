import Image from "next/image";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="w-full max-w-5xl mt-16 text-center text-md text-black">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Created with ❤️ at{" "}
        <Image
          src="/zk-hack.svg"
          alt="ZK Hack Logo"
          className="inline"
          width={48}
          height={48}
        />
      </a>
    </footer>
  );
};
