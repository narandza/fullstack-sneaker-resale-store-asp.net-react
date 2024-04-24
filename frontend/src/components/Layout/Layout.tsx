import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout(props: ILayoutProps) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
