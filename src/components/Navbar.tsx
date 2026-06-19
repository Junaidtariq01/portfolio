"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { motion } from "framer-motion";
import { SquareMenu, CircleX } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  return (
    <header className="w-full bg-[var(--bg-primary)] pt-4 px-4 lg:px-0 relative">
      <div className="flex items-center justify-between w-full lg:w-4/5 mx-auto ">
        {/* Logo + Name */}
        <div >
          <Link href="/" className="flex items-center gap-1 shrink-0">
          <Logo />
          <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap cursor-pointer">
            Junaid Tariq
          </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-base font-normal text-white hover:text-[var(--text-primary)] transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Contact Button */}
        <div className="hidden md:block shrink-0">
          <a href="#contact">
            <motion.button
              initial={{ backgroundColor: "var(--bg-primary)" }}
              whileHover={{
                backgroundColor: "var(--text-primary)",
              }}
              transition={{ duration: 0.4 }}
              className="h-12 w-[138px] rounded-md border border-gray-500 text-sm font-black text-white"
            >
              CONTACT
            </motion.button>
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {isOpenNav ? (
            <CircleX
              onClick={() => setIsOpenNav(false)}
              className="h-10 w-10 text-white cursor-pointer"
            />
          ) : (
            <SquareMenu
              onClick={() => setIsOpenNav(true)}
              className="h-10 w-10 text-white cursor-pointer"
            />
          )}
        </div>

        {/* Mobile Menu */}
        {isOpenNav && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full right-4 mt-4 w-64 rounded-xl overflow-hidden bg-[var(--bg-primary)]/95 backdrop-blur-md shadow-xl border border-gray-800 z-50 md:hidden"
          >
            <div className="p-4">
              <nav>
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={() => setIsOpenNav(false)}
                        className="block rounded-md px-4 py-3 text-white hover:bg-white/5 hover:text-[var(--text-primary)] transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <a
                  href="#contact"
                  onClick={() => setIsOpenNav(false)}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-11 rounded-md bg-[var(--text-primary)] text-white text-sm font-black"
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