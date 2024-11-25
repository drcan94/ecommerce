import React from "react";
import Ad from "./_components/Ad";
import Top from "./_components/Top";

const Header = () => {
  return (
    <header className="h-full shadow-sm shadow-slate-200">
      <Ad />
      <Top />
    </header>
  );
};

export default Header;
