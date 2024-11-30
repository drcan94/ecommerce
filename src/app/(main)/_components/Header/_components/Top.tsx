"use client";
import {
  ChevronDown,
  CircleUserIcon,
  HeartIcon,
  RefreshCw,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";

import { useGeo } from "@/components/providers/GeoProvider";
import { CountryFlag } from "@/components/CountryFlag";

const Top = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const { geoData, refreshLocation, isRefreshing } = useGeo();
  console.log("geoData", geoData);

  return (
    <div className="relative flex flex-col justify-center h-10 bg-[#f8f8f8] dark:bg-gray-900 border-t border-b border-slate-200 border-solid {/* styles.top  */}">
      <div className="mx-0 my-auto px-4 flex items-center justify-between min-h-full {/* styles.top__container */}">
        <div className="min-h-full flex justify-center items-center">
          {<ModeToggle />}
        </div>
        <div className="flex gap-[15px] min-h-full [&>div]:min-h-full [&>li]:cursor-pointer {/* styles.top__list */}">
          <div className="flex items-center justify-center gap-1 relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <CountryFlag countryCode={geoData!.country?.isoCode as string} />
            <Link className="flex items-center" href={"/"}>
              <span className="text-[12px]">
                {geoData!.country?.names.en} / USD
              </span>
            </Link>
          </div>
          <div className="hidden sm:flex items-center justify-center gap-1 relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <ShieldCheckIcon size={15} />
            <Link className="flex items-center" href={"/buyer-protection"}>
              <span className="text-[12px]">Buyer Protection</span>
            </Link>
          </div>
          <div className="hidden sm:flex items-center justify-center gap-1 relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <Link className="flex items-center" href={"/customer-service"}>
              <span className="text-[12px]">Customer Service</span>
            </Link>
          </div>
          <div className="hidden sm:flex items-center justify-center gap-1 relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <Link className="flex items-center" href={"/help"}>
              <span className="text-[12px]">Help</span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-1 relative after:content-[''] after:absolute after:-right-2 after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[20px] after:bg-[#ccc]">
            <HeartIcon size={15} />
            <Link className="flex items-center" href={"/profile/wishlist"}>
              <span className="text-[12px]">Wishlist</span>
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              {loggedIn ? (
                <div className="flex items-center gap-[3px]">
                  <Image
                    src={
                      "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
                    }
                    width={30}
                    height={30}
                    alt="User"
                  />
                  <span className="text-[12px]">Name</span>
                  <ChevronDown size={10} />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-[2px]">
                    <CircleUserIcon size={20} fill="#ccc" />
                    <span className="text-[12px]">Account</span>
                    <ChevronDown size={12} />
                  </div>
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[280px] rounded-xl shadow-md p-3 shadow-gray-400 border-x border-y border-gray-300 text-center"
              sideOffset={0}
              align="end"
            >
              <DropdownMenuLabel>Welcome to Shop Center</DropdownMenuLabel>
              <DropdownMenuGroup>
                {loggedIn ? (
                  <DropdownMenuItem
                    style={{ background: "none" }}
                    className="flex justify-center w-full px-0 py-3 bg-opacity-0"
                  >
                    <Image
                      className=""
                      src={
                        "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
                      }
                      width={80}
                      height={80}
                      alt="User"
                    />
                    <div className="flex flex-col -ml-3 {/* styles.col */}">
                      <span className="text-xs">Welcome Back,</span>
                      <h3>M234234</h3>
                      <span className="text-sm text-blue-700 underline cursor-pointer">
                        Sign Out
                      </span>
                    </div>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    style={{ background: "none" }}
                    className="flex gap-[10px] w-full px-0 py-3 justify-center items-center {/* styles.flex */}"
                  >
                    <Button className="bg-blue-600">Register</Button>
                    <Button variant={"outline"}>Log In</Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>

              <DropdownMenuGroup className="space-y-1 [&>*:hover]:!text-white">
                <DropdownMenuItem className="hover:!bg-blue-600">
                  <Link className="w-full" href={"/profile"}>
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-300 h-[1px]" />
                <DropdownMenuItem className="hover:!bg-blue-600">
                  <Link className="w-full" href={"/profile/orders"}>
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-300 h-[0.8px]" />

                <DropdownMenuItem className="hover:!bg-blue-600">
                  <Link className="w-full" href={"/profile/messages"}>
                    Message Center
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-300 h-[0.8px]" />

                <DropdownMenuItem className="hover:!bg-blue-600">
                  <Link className="w-full" href={"profile/address"}>
                    Address
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-300 h-[0.6px]" />

                <DropdownMenuItem className="hover:!bg-blue-600">
                  <Link className="w-full" href={"profile/wishlist"}>
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-300 h-[0.6px]" />
              </DropdownMenuGroup>
              <DropdownMenuGroup className="pt-2">
                {geoData && (
                  <DropdownMenuItem
                    className="flex items-center justify-center gap-4"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <CountryFlag
                      countryCode={geoData!.country?.isoCode as string}
                    />

                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {geoData!.city?.names.en}, {geoData!.country?.isoCode}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {geoData!.location?.timeZone}
                      </span>
                    </div>
                    <Button
                      onClick={refreshLocation}
                      className="p-1 w-7 h-7 hover:bg-blue-500 rounded-full transition-all"
                      disabled={isRefreshing}
                    >
                      <RefreshCw
                        className={`!text-gray-100  ${
                          isRefreshing ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Top;
