"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
// import Link from "next/link";

const Hero = () => {
  const [isDesktopLoaded, setDesktopLoaded] = useState(false);
  const [isMobileLoaded, setMobileLoaded] = useState(false);

    const portfolio = ()=>{
      document.getElementById("portfolio") 
      ?.scrollIntoView({ behavior: "smooth" }); }


  return (
    <section
      id="hero"
      className="sm:min-h-screen min-h-[80vh] py-4 lg:py-0 flex justify-center items-center bg-[var(--bg-primary)] sm:w-full z-0"
      aria-labelledby="hero-heading"
    >
      <div className="px-4 md:px-0 flex flex-col-reverse lg:flex-row items-center justify-center sm:justify-between w-full sm:w-full md:w-4/5 lg:w-4/5 mx-auto">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
          aria-live="polite"
        >
          <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
            Junaid Tariq
          </span>

          <h1
            id="hero-heading"
            className="lg:text-7xl text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-14 sm:leading-16 md:leading-16 lg:leading-20 tracking-tighter max-w-md"
          >
            Full Stack Developer
          </h1>

          <p className="text-base font-normal leading-8 text-white mx-w-md">
            I create seamless, scalable, and user-centric digital experiences,
            from interactive frontends to efficient backend architectures.
          </p>

          <motion.button
            onClick={portfolio}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[154px] h-[48px] bg-[var(--text-primary)] text-sm text-white font-black rounded-md"
            aria-label="See my portfolio work"
            >
            See My Work
          </motion.button>

        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex justify-center items-center"
        >
          {/* Desktop Image */}
          <div className="hidden md:block relative">
            {!isDesktopLoaded && (
              <div className="h-[554px] w-[568px] bg-gray-200 animate-pulse rounded-lg" />
            )}
            <Image
              loading="lazy"
              width={2000}
              height={2000}
              src="/images/hero-desktop.png"
              alt="Junaid Tariq - Full Stack Developer, standing with laptop and code snippets in the background"
              className={`h-[554px] w-[568px] object-contain transition-opacity duration-500 ${
                isDesktopLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setDesktopLoaded(true)}
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden relative">
            {!isMobileLoaded && (
              <div className="h-[320px] w-[330px] bg-gray-200 animate-pulse rounded-lg" />
            )}
            <Image
              loading="lazy"
              width={2000}
              height={2000}
              src="/images/hero-mobile.png"
              alt="Junaid Tariq - Mobile Developer, working on a smartphone UI"
              className={`h-[320px] w-[330px] object-contain transition-opacity duration-500 ${
                isMobileLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setMobileLoaded(true)}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
