"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, ShoppingBag } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const About = () => {
  const [isDesktopLoaded, setDesktopLoaded] = useState(false);
  const [isMobileLoaded, setMobileLoaded] = useState(false);
  return (
    <section
      id="about"
      className="min-h-screen py-4 lg:py-8 flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center items-center  w-full z-0"
      aria-labelledby="about-heading"
    >
      <div className="px-4 md:px-0 flex flex-col gap-8 lg:gap-0 lg:flex-row-reverse items-center justify-center sm:justify-between w-full sm:w-full md:w-4/5 lg:w-4/5 mx-auto">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
          aria-live="polite"
        >
          <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
            Aasif Ali
          </span>

          <h1
            id="about-heading"
            className="lg:text-5xl text-3xl sm:text-4xl md:text-4xl font-bold text-[var(--text-secondary)] leading-snug tracking-tight max-w-lg"
          >
            Full Stack Engineer
          </h1>

          <p className="text-sm font-normal leading-6 opacity-65 text-[var(--text-secodary)] max-w-lg">
            From UI/UX design to server logic and databases, I architect and
            develop end-to-end solutions that are performant, maintainable, and
            user-focused—bridging creativity with technical precision.
          </p>

          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[154px] h-[48px] bg-[var(--text-primary)] uppercase text-sm text-white font-black rounded-md"
            aria-label="See my portfolio work"
          >
            About me
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex lg:justify-start justify-center items-center"
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
              src="/images/about-desktop.png"
              alt="Aasif Ali - Full Stack Developer, standing with laptop and code snippets in the background"
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
              src="/images/about-mobile.png"
              alt="Aasif Ali - Mobile Developer, working on a smartphone UI"
              className={`h-[320px] w-[330px] object-contain transition-opacity duration-500 ${
                isMobileLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setMobileLoaded(true)}
            />
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center px-4 lg:px-0 w-full">
        <motion.div
          className="lg:w-[580px]  w-full  flex flex-col justify-center gap-8 items-start border border-gray-200 rounded-md p-4 md:p-6 lg:p-8 "
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="region"
          aria-labelledby={`years of experience`}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-[#EF6C57]" aria-hidden="true">
              <Calendar className="text-white h-8 w-8" />
            </div>
            <div>
              <h2
                id={`years of experiene`}
                className="text-4xl font-bold text-[var(--text-secondary)]"
              >
                <AnimatedCounter targetValue={2} />+
              </h2>
              <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
                Years of experience
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-[580px] w-full  flex flex-col justify-center gap-8 items-start border border-gray-200 rounded-md p-4 md:p-6 lg:p-8 "
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="region"
          aria-labelledby={`projects done`}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-[#EF6C57]" aria-hidden="true">
              <ShoppingBag className="text-white h-8 w-8" />
            </div>
            <div>
              <h2
                id={`projects done`}
                className="text-4xl font-bold text-[var(--text-secondary)]"
              >
                <AnimatedCounter targetValue={10} />+
              </h2>
              <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
                Projects done
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
