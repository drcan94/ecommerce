import React, { type ReactNode } from "react";
import Header from "@/app/(main)/_components/Header";
import Footer from "@/app/(main)/_components/Footer";

interface Props {
  readonly children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
