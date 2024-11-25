import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserMenu = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <div className="absolute top-full right-0 bg-[#fff] z-[99] flex flex-col gap-4 px-4 py-0 w-[280px] h-full shadow-sm shadow-slate-200 {/* styles.menu */}">
      <h4 className="text-center">Welcome to Shop Center</h4>
      {loggedIn ? (
        <div className="flex gap-[10px] w-full px-0 py-4 {/* styles.flex */}">
          <Image
            src={
              "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
            }
            className="max-h-8 max-w-12  {/* styles.menu__img */}"
            width={40}
            height={40}
            alt="User"
          />
          <div className="  {/* styles.col */}">
            <span>Welcome Back,</span>
            <h3>M234234</h3>
            <span>Sign Out</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-[10px] w-full px-0 py-4 justify-center items-center {/* styles.flex */}">
          <Button className="bg-blue-600">Register</Button>
          <Button variant={"outline"}>Log In</Button>
        </div>
      )}
      <ul className="[&>li]:rounded-md [&>li:hover]:text-white [&>li:hover]:bg-blue-600">
        <li className="h-7 flex items-center">
          <Link className="w-full pl-4" href={"/profile"}>
            Account
          </Link>
        </li>
        <li className="h-7 flex items-center">
          <Link className="w-full pl-4" href={"/profile/orders"}>
            My Orders
          </Link>
        </li>
        <li className="h-7 flex items-center">
          <Link className="w-full pl-4" href={"/profile/messages"}>
            Message Center
          </Link>
        </li>
        <li className="h-7 flex items-center">
          <Link className="w-full pl-4" href={"profile/address"}>
            Address
          </Link>
        </li>
        <li className="h-7 flex items-center">
          <Link className="w-full pl-4" href={"profile/wishlist"}>
            Wishlist
          </Link>
        </li>
        <li className="h-7 flex items-center">
          <Link className="w-full pl-4" href={"profile/address"}>
            Address
          </Link>
        </li>
        <li className="h-7 flex items-center">
          <Link className="w-full pl-4" href={"profile/address"}>
            Address
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
