"use client";

import { motion } from "framer-motion";
import { education } from "@/static/education";
import type { Education } from "@/static/education";
import { GraduationCap } from "lucide-react";

const Education = () => {
  return (
    <section
      id="education"
      className="min-h-screen py-4 lg:py-8 flex justify-center items-center bg-[var(--bg-primary)] w-full z-0"
      aria-labelledby="education-heading"
    >
      <div className="px-4 md:px-0 flex flex-col-reverse lg:flex-row items-center justify-center sm:justify-between w-full sm:w-full md:w-4/5 lg:w-4/5 mx-auto">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
            Education
          </span>

          <h1
            id="education-heading"
            className="lg:text-7xl text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-14 sm:leading-16 md:leading-16 lg:leading-20 tracking-tighter max-w-md"
          >
            My Journey
          </h1>

          <p className="text-base font-normal leading-8 text-white mx-w-md">
            My educational background and continuous learning journey in
            technology and development.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-[580px] relative mt-8 lg:mt-0"
        >
          {/* Timeline line */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-0.5 bg-white/10" />

          <div className="space-y-6">
            {education.map((edu: Education, index: number) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-[2.25rem] top-6 w-3 h-3 rounded-full bg-[var(--text-primary)] transform -translate-x-1/2" />

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 ml-12">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-full bg-[var(--text-primary)]">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {edu.degree}
                      </h3>
                      <h4 className="text-[var(--text-primary)] font-medium mb-2">
                        {edu.institution}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-white/65 mb-3">
                        <span>{edu.location}</span>
                        <span>•</span>
                        <span>{edu.year}</span>
                      </div>
                      <p className="text-sm text-white/65 mb-3">
                        {edu.description}
                      </p>
                      {edu.achievements && edu.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1">
                          {edu.achievements.map(
                            (achievement: string, idx: number) => (
                              <li key={idx} className="text-sm text-white/65">
                                {achievement}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
