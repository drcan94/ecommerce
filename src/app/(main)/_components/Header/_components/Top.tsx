"use client";
import {
  ChevronDown,
  CircleUserIcon,
  HeartIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserMenu from "./UserMenu";

const Top = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="bg-[#f8f8f8] border-t border-b border-[#eee] border-solid {/* styles.top  */}">
      <div className="max-w-[95%] mx-0 my-auto p-[5px] flex items-center justify-between {/* styles.top__container */}">
        <div />
        <ul className="flex gap-[15px] [&>li]:cursor-pointer {/* styles.top__list */}">
          <li className="hover:text-gray-950 flex items-center justify-center gap-1 text-[#666] relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <Image
              className="object-cover rounded-[50%]"
              src={
                "https://www.seekpng.com/png/full/323-3232715_morocco-flag-png-angel-tube-station.png"
              }
              alt="Morocco"
              width={20}
              height={20}
            />
            <span className="text-[12px] w-[88px]">Morocco / USD</span>
          </li>
          <li className="hidden sm:flex hover:text-gray-950 items-center justify-center gap-1 text-[#666] relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <ShieldCheckIcon size={20} fill="#ccc" />
            <span className="text-[12px]">Buyer Protection</span>
          </li>
          <li className="hidden sm:flex hover:text-gray-950 items-center justify-center gap-1 text-[#666] relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <span className="text-[12px]">Customer Service</span>
          </li>
          <li className="hidden sm:flex hover:text-gray-950 items-center justify-center gap-1 text-[#666] relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <span className="text-[12px]">Help</span>
          </li>
          <li className="hover:text-gray-950 flex items-center justify-center gap-1 text-[#666] relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <HeartIcon size={20} fill="#ccc" />
            <Link href={"/profile/wishlist"}>
              <span className="text-[12px]">Wishlist</span>
            </Link>
          </li>
          <div className="relative">
            {loggedIn ? (
              <li className="hover:text-gray-950 flex items-center justify-center gap-1 text-[#666]">
                <div className="flex items-center gap-[2px] {/* styles.flex */}">
                  <Image
                    src={
                      "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
                    }
                    className="mr-[3px]"
                    width={30}
                    height={30}
                    alt="User"
                  />
                  <span className="text-[12px]">Name</span>
                  <ChevronDown size={12} className="mr-[3px]" />
                </div>
              </li>
            ) : (
              <li className="hover:text-gray-950 flex items-center justify-center gap-1 text-[#666]">
                <div className="flex items-center gap-[2px] {/* styles.flex */}">
                  <CircleUserIcon size={20} fill="#ccc" className="mr-[3px]" />
                  <span className="text-[12px]">Account</span>
                  <ChevronDown size={12} className="mr-[3px]" />
                </div>
              </li>
            )}
            <UserMenu loggedIn={loggedIn} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Top;
