"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { SearchIcon } from "lucide-react";
interface link {
  name: string;
  href: string;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");

  const links: link[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Ai",
      href: "/#ai",
    },
    {
      name: "Products",
      href: "/#products",
    },
    {
      name: "Blog",
      href: "/#blog",
    },
    {
      name: "Shop",
      href: "/#shop",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
  ];
  return (
    <div className="relative">
      <div className="flex relative bg-white justify-between items-center md:mt-4 min-w-full py-2 shadow-aceternity px-[10%] ">
        <h1 className="font-josefin text-[34px] font-bold">Hekto</h1>

        <div className="hidden md:flex items-center text-base font-lato font-normal mr-10 w-5/12 justify-between">
          {links.map((link, index) => (
            <motion.button
              initial={false}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              key={index}
            >
              <Link
                className={`hover:text-[#FB2E86] px-4 py-2 rounded-lg hover:bg-neutral-100 ${active === link.name ? `text-[#FB2E86]` : ``}`}
                href={link.href}
                onClick={() => setActive(link.name)}
              >
                {link.name}
              </Link>
            </motion.button>
          ))}
        </div>

        <div className="w-3/12  border-2 h-10 border-[#E7E6EF] flex">
          <input type="text" className="w-full h-full outline-none pl-5"/>
          <div className="h-full cursor-pointer w-[50px] bg-[#FB2E86] flex self-end items-center justify-center">
            <SearchIcon className="h-5 w-5 text-[#F1F0FF]  " />
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <Menu />
        </button>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 md:hidden top-15 bg-white rounded-2xl shadow-aceternity max-w-[95%] mx-auto"
          >
            <div className="flex flex-col  items-center gap-4 text-sm text-neutral-500  p-4">
              {links.map((link, index) => (
                <Link
                  className="hover:text-neutral-900 "
                  href={link.href}
                  key={index}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
