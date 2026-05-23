"use client";

import React from "react";
import { projectProps } from "@/types/project";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PortfolioCard = ({
  title,
  deployURL,
  gitURL,
  content,
  category,
  thumbnail,
  year,
  technologies,
  isListView = false,
}: projectProps) => {
  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "web":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "mobile":
        return "bg-green-50 text-green-600 border-green-200";
      case "desktop":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  if (isListView) {
    return (
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative w-full md:w-64 h-48 md:h-auto">
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        </div>
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(
                category
              )}`}
            >
              {category}
            </span>
            <span className="text-sm text-[var(--text-secondary)] opacity-65">
              {year}
            </span>
          </div>
          <h3 className="text-xl font-bold text-[var(--text-secondary)] mb-2">
            {title}
          </h3>
          <p className="text-[var(--text-secondary)] opacity-75 mb-4 flex-grow">
            {content}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <Link
              href={gitURL}
              target="_blank"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </Link>
            <Link
              href={deployURL}
              target="_blank"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-medium">Live Demo</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
      className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(
              category
            )}`}
          >
            {category}
          </span>
          <span className="text-sm text-[var(--text-secondary)] opacity-65">
            {year}
          </span>
        </div>

        {/* Title and Description */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {title}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] opacity-75 line-clamp-2">
            {content}
          </p>
        </div>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-4">
            <Link
              href={gitURL}
              target="_blank"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </Link>
            <Link
              href={deployURL}
              target="_blank"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-medium">Live Demo</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PortfolioCard;
