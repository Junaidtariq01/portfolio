"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { motion } from "framer-motion";
import { SquareMenu, CircleX } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  // { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  return (
    <header className="w-full bg-[var(--bg-primary)] pt-4 px-4 lg:px-0 relative">
      <div className="flex flex-row items-center justify-between w-full lg:w-4/5 mx-auto">
        <div>
          <Logo />
        </div>
        <nav className="hidden md:block w-full">
          <ul className="flex flex-row items-center justify-center md:gap-12 w-full">
            {navLinks.map((link) => (
              <li key={link.name} className="text-base font-normal text-white">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="tel:+916005852514" className="hidden md:block">
          <motion.button
            initial={{ backgroundColor: "var(--bg-primary)" }}
            whileHover={{ backgroundColor: "var(--text-primary)" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-[48px] w-[138px] rounded-md border border-gray-700 text-sm font-black text-white"
          >
            CONTACT
          </motion.button>
        </a>
        <div className="block md:hidden">
          {isOpenNav ? (
            <CircleX
              onClick={() => setIsOpenNav((pre) => !pre)}
              className="h-12 w-12 text-white"
            />
          ) : (
            <SquareMenu
              onClick={() => setIsOpenNav((pre) => !pre)}
              className="h-12 w-12 text-white"
            />
          )}
        </div>
        {isOpenNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="z-10 absolute top-20 right-0 w-64 rounded-lg overflow-hidden bg-[var(--bg-primary)]/95 backdrop-blur-md shadow-lg md:hidden"
          >
            <div className="p-4">
              <nav className="w-full">
                <ul className="flex flex-col items-start justify-center gap-2 w-full">
                  {navLinks.map((link) => (
                    <li key={link.name} className="w-full">
                      <a
                        href={link.href}
                        onClick={() => setIsOpenNav(false)}
                        className="block w-full text-left px-4 py-2 text-base font-medium text-white hover:text-[var(--text-primary)] transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <a href="tel:+916005852514" onClick={() => setIsOpenNav(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-[40px] rounded-md bg-[var(--text-primary)] text-sm font-black text-white hover:bg-[var(--text-primary)]/90 transition-colors duration-300"
                  >
                    CONTACT
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
