import Link from "next/link";
import React from "react";

const Ad = () => {
  return (
    <Link href={"/browse"}>
      <div className="h-[54px] w-full bg-[url('/images/ad.jpg')] bg-cover bg-no-repeat bg-center" />
    </Link>
  );
};

export default Ad;
