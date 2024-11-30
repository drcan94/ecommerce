"use client";

import { Input } from "@/components/ui/input";
import { selectCartTotal } from "@/lib/features/cart/cartSlice";
import { useAppSelector } from "@/lib/hooks";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Search = () => {
  const cartTotal = useAppSelector(selectCartTotal);
  return (
    <div className="relative h-[70px] flex items-center justify-center">
      <div className="flex items-center justify-between w-full gap-4 max-w-[1000px] mx-0 my-auto p-4 styles.main__container">
        <Link href={"/"}>
          <Image width={120} height={120} alt="Logo" src={"/logo.png"} />
        </Link>
        <div className="flex items-center flex-1 h-10 rounded-md styles.search">
          <Input
            className="border-none bg-slate-100 rounded-sm rounded-tr-none rounded-br-none focus-visible:ring-transparent w-full h-full"
            type="text"
            placeholder="Search..."
          />
          <div className="text-white cursor-pointer rounded-tr-sm rounded-br-sm grid place-items-center bg-blue-400 w-10 h-10   styles.search__icon">
            <SearchIcon size={20} />
          </div>
        </div>
        <Link href={"/cart"}>
          <div className="relative styles.cart">
            <ShoppingCartIcon size={25} className="hover:fill-blue-200" />
            <span className="font-semibold text-[10px] text-white absolute -top-[5px] -right-2 bg-blue-400 px-[6px] rounded-full flex items-center justify-center">
              {cartTotal}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Search;
