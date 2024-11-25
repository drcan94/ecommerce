import React, { type ReactNode } from "react";
import Header from "@/app/(main)/_components/Header";
import Footer from "@/app/(main)/_components/Footer";

interface Props {
  readonly children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
