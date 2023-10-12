import Image from "next/image";
import React from "react";
import { VscAccount } from "react-icons/vsc";

type props = {
  src?: string | null;
  className?: string;
};

export default function ProfileImage({ src, className = "" }: props) {
  return (
    <div
      className={`relative h-11 w-11 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? <VscAccount className="h-full w-full"/> : <Image src={src} alt="profile image" quality={100} fill/>}
    </div>
  );
}
