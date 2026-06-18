"use client";

import PortfolioCard from "@/components/cards/portfolio";
import { projects } from "@/static/portfolio";
import React, { useState, useMemo } from "react";
import { Search, Grid, List, X } from "lucide-react";

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      projects.map((project) => project.category)
    );
    return Array.from(uniqueCategories);
  }, []);

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="flex min-h-screen justify-center items-center py-4 md:py-6 lg:py-8 z-0 w-full"
    >
      <div className="w-full px-4 lg:px-0">
        <div className="flex flex-col md:flex-row md:justify-between items-center justify-center gap-4 w-full lg:w-4/5 mx-auto">
          <div>
            <span
              className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]"
              id="service-heading"
            >
              Portfolio
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--text-secondary)] leading-tight tracking-tighter max-w-sm">
              Latest Work
            </h1>
          </div>
          {/* <a href="tel:+91" className="hidden md:block">
            <button className="h-[48px] w-[138px] rounded-md bg-[var(--text-primary)] text-sm font-black text-white">
              CONTACT
            </button>
          </a> */}
        </div>

        {/* Search and Filters */}
        <div className="mt-8 w-full lg:w-4/5 mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--text-primary)]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-[var(--text-primary)]" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-[var(--text-primary)] text-white"
                    : "bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[var(--text-primary)] text-white"
                      : "bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-lg transition-colors ${
                  isGridView
                    ? "bg-[var(--text-primary)] text-white"
                    : "bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200"
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-lg transition-colors ${
                  !isGridView
                    ? "bg-[var(--text-primary)] text-white"
                    : "bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200"
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        <div
          className={`mt-8 ${
            isGridView
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "flex flex-col gap-4"
          } w-full lg:w-4/5 mx-auto`}
        >
          {filteredProjects.map((item, id) => (
            <PortfolioCard key={id} {...item} isListView={!isGridView} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center mt-8 text-[var(--text-secondary)] opacity-75">
            No projects found matching your search criteria.
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
