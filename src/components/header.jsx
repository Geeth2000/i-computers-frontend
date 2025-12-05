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
      <img
        src="/logo.png"
        className="h-full lg:flex items-center justify-center"
        alt="logo"
      />
      <div className="w-full h-full hidden lg:flex text-2xl text-primary items-center justify-center gap-[30px]">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/reviews">Reviews</Link>
      </div>

      <div className="absolute right-22 h-full top-0 hidden lg:flex items-center">
        <UserData />
      </div>

      <Link
        to="/cart"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-2xl"
      >
        <BiShoppingBag />
      </Link>
      {sidebarOpen && (
        <div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/50 z-20 transition-all duration-300">
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
              <div className="w-full h-full flex flex-col text-xl text-secondary justify-start items-start  gap-6 mt-10 pl-6">
                <a
                  className="hover:text-secondary transition"
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                >
                  Home
                </a>
                <a
                  className="hover:text-secondary transition"
                  href="/products"
                  onClick={() => setSidebarOpen(false)}
                >
                  Products
                </a>
                <a
                  className="hover:text-secondary transition"
                  href="/about"
                  onClick={() => setSidebarOpen(false)}
                >
                  About
                </a>
                <a
                  className="hover:text-secondary transition"
                  href="/contact"
                  onClick={() => setSidebarOpen(false)}
                >
                  Contact
                </a>
                <a
                  className="hover:text-secondary transition"
                  href="/reviews"
                  onClick={() => setSidebarOpen(false)}
                >
                  Reviews
                </a>
                <div className="flex justify-center items-center bg-accent rounded-4xl p-2">
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
