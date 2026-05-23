"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/static/testimonials";
import type { Testimonial } from "@/static/testimonials";
import { Star } from "lucide-react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="min-h-screen py-4 lg:py-8 flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center items-center w-full z-0"
      aria-labelledby="testimonials-heading"
    >
      <div className="px-4 md:px-0 flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-center sm:justify-between w-full sm:w-full md:w-4/5 lg:w-4/5 mx-auto">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
            Testimonials
          </span>

          <h1
            id="testimonials-heading"
            className="lg:text-5xl text-3xl sm:text-4xl md:text-4xl font-bold text-[var(--text-secondary)] leading-snug tracking-tight max-w-lg"
          >
            What Clients Say
          </h1>

          <p className="text-sm font-normal leading-6 opacity-65 text-[var(--text-secondary)] max-w-lg">
            Hear from the people I&apos;ve worked with and the impact we&apos;ve
            created together.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-[580px]"
        >
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={300}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-all duration-300 h-full mx-2"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[var(--text-primary)] fill-[var(--text-primary)]"
                      />
                    ))}
                  </div>
                  <p className="text-[var(--text-secondary)] opacity-75">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-secondary)]">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] opacity-65">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
