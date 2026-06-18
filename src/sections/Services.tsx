"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Lightbulb, Laptop } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "Building responsive, performant, and scalable web applications using modern technologies and best practices.",
    icon: <Code2 className="w-8 h-8" />,
    features: [
      "Full-stack Development",
      "Progressive Web Apps",
      "E-commerce Solutions",
      "API Development",
    ],
  },
  {
    title: "IoT and AI Intergration",
    description:
      "This Integration combines connected smart devices with artificial intelligence to collect, analyze, and act on real-time data, enabling intelligent automation and decision-making.",
    icon: <Laptop className="w-8 h-8" />,
    features: [
      "Intelligent automation of tasks and processes",
      "Integration of chatbots",
      "Custom Trained AI Models for work ease",
      "Works in Mobile and Laptop",
    ],
  },
  {
    title: "UI/UX Design",
    description:
      "Designing intuitive and engaging user interfaces that enhance user experience and drive engagement.",
    icon: <Palette className="w-8 h-8" />,
    features: [
      "User Interface Design",
      "User Experience Design",
      "Wireframing",
      "Prototyping",
    ],
  },
  {
    title: "Technical Consulting",
    description:
      "Providing expert guidance on technology solutions, architecture, and digital transformation.",
    icon: <Lightbulb className="w-8 h-8" />,
    features: [
      "Architecture Planning",
      "Technology Stack Selection",
      "Performance Optimization",
      "Best Practices Implementation",
    ],
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen bg-[var(--bg-primary)] py-4 lg:py-8 flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center items-center w-full z-0"
      aria-labelledby="services-heading"
    >
      <div className="px-4 md:px-0 flex flex-col gap-8 lg:gap-12 w-full sm:w-full md:w-4/5 lg:w-4/5 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
          aria-live="polite"
        >
          <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
            Services
          </span>

          <h2
            id="services-heading"
            className="lg:text-5xl text-3xl sm:text-4xl md:text-4xl font-bold text-white leading-snug tracking-tight max-w-lg"
          >
            What I Can Do For You
          </h2>

          <p className="text-sm font-normal leading-6 text-white opacity-65 max-w-lg">
            From concept to deployment, I offer comprehensive solutions to help
            bring your digital ideas to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-700 rounded-md p-6 md:p-8 flex flex-col gap-6 bg-[var(--bg-primary)]"
            >
              <div className="p-4 rounded-full bg-[var(--text-primary)] w-fit">
                {service.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-sm font-normal leading-6 text-white opacity-65">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <svg
                        className="w-4 h-4 text-[var(--text-primary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
