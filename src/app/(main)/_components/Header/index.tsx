import React from "react";
import Ad from "./_components/Ad";
import Top from "./_components/Top";
import Search from "./_components/Search";

const Header = () => {
  return (
    <header className="h-full shadow-sm shadow-slate-200">
      <Ad />
      <Top />
      <Search />
    </header>
  );
};

export default Header;
