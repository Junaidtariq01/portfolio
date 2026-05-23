"use client";

import React from "react";
import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "#hero" },
      { name: "Services", href: "#services" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "About", href: "#about" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Web Development", href: "#services" },
      { name: "Mobile Apps", href: "#services" },
      { name: "UI/UX Design", href: "#services" },
      { name: "Consulting", href: "#services" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "LinkedIn", href: "https://linkedin.com/in/meAasifAli" },
      { name: "GitHub", href: "https://github.com/meAasifAli" },
      { name: "Instagram", href: "https://instagram.com/_asif_ali10" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-16 border-t border-gray-200">
      <div className="px-4 md:px-0 w-full sm:w-full md:w-4/5 lg:w-4/5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[var(--text-secondary)]">
                Aasif Ali
              </span>
            </div>
            <p className="text-[var(--text-secondary)] opacity-65 text-sm leading-relaxed">
              Creating seamless, scalable, and user-centric digital experiences,
              from interactive frontends to efficient backend architectures.
            </p>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      target="_blank"
                      href={link.href}
                      className="text-[var(--text-secondary)] opacity-65 hover:opacity-100 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[var(--text-secondary)] opacity-65 text-sm">
              © {currentYear} Aasif Ali. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-[var(--text-secondary)] opacity-65 hover:opacity-100 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[var(--text-secondary)] opacity-65 hover:opacity-100 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
