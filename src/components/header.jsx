import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { LuListCollapse } from "react-icons/lu";
import { useState } from "react";
import UserData from "./userdata";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <header className="w-full h-[100px] bg-accent flex relative items-center">
      <LuListCollapse
        className="text-primary my-auto text-2xl lg:hidden ml-2"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <Link to="/" className="h-full flex items-center justify-center ">
        <img
          src="/logo.png"
          className="h-full lg:flex items-center justify-center"
          alt="logo"
        />
      </Link>
      <div className="w-full h-full hidden lg:flex text-2xl text-primary items-center justify-center gap-[30px]">
        {[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
          { href: "/reviews", label: "Reviews" },
        ].map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="relative px-2 py-1 transition duration-300 ease-out hover:text-white group"
          >
            <span className="relative z-10">{item.label}</span>
            <span
              className="absolute inset-0 -z-0 scale-0 rounded-full bg-white/15 blur-sm transition duration-300 group-hover:scale-100"
              aria-hidden="true"
            ></span>
          </Link>
        ))}
      </div>

      <div className="absolute right-22 h-full top-0 hidden lg:flex items-center">
        <UserData />
      </div>

      <Link
        to="/cart"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
      >
        <BiShoppingBag />
      </Link>
      {sidebarOpen && (
        <div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/50 z-20 transition-all duration-6000">
          <div className=" w-[250px] h-screen flex-col relative">
            <div className="absolute w-full h-full bg-white left-[-250px] transform-flat translate-x-[250px] transition-transform duration-1000 flex flex-col">
              <div className="w-full h-[100px] bg-accent flex justify-center items-center">
                <img src="/logo.png" className="h-full" alt="logo" />
                <LuListCollapse
                  onClick={() => {
                    setSidebarOpen(false);
                  }}
                  className="text-white my-auto text-2xl ml-6 lg:hidden rotate-180"
                />
              </div>
              <div className="w-full h-full flex flex-col bg-transparent/40 text-xl text-secondary justify-start items-start gap-6 mt-10 pl-6">
                <a
                  className="relative inline-flex items-center gap-2 px-2 py-1 rounded-lg transition duration-300 hover:text-white hover:bg-accent/20"
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                >
                  Home
                </a>
                <a
                  className="relative inline-flex items-center gap-2 px-2 py-1 rounded-lg transition duration-300 hover:text-white hover:bg-accent/20"
                  href="/products"
                  onClick={() => setSidebarOpen(false)}
                >
                  Products
                </a>
                <a
                  className="relative inline-flex items-center gap-2 px-2 py-1 rounded-lg transition duration-300 hover:text-white hover:bg-accent/20"
                  href="/about"
                  onClick={() => setSidebarOpen(false)}
                >
                  About
                </a>
                <a
                  className="relative inline-flex items-center gap-2 px-2 py-1 rounded-lg transition duration-300 hover:text-white hover:bg-accent/20"
                  href="/contact"
                  onClick={() => setSidebarOpen(false)}
                >
                  Contact
                </a>
                <a
                  className="relative inline-flex items-center gap-2 px-2 py-1 rounded-lg transition duration-300 hover:text-white hover:bg-accent/20"
                  href="/reviews"
                  onClick={() => setSidebarOpen(false)}
                >
                  Reviews
                </a>
                <div className="flex justify-center items-center bg-accent rounded-4xl p-2 shadow-lg shadow-accent/40 transition transform hover:-translate-y-0.5 hover:shadow-xl">
                  <UserData />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
