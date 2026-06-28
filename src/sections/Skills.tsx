"use client";

import React from "react";
import { motion } from "framer-motion";

// interface CargoSkill {
//   name: string;
//   x: number;
//   y: number;
//   width: number;
//   color: string;
// }

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "Django",
  "FastAPI",
  "AWS",
  "Docker",
  "REST API",
  "IoT",
  "Git",
  "Cloudflare",
];

const skillColors = [
  "#38BDF8",
  "#86EFAC",
  "#CBD5E1",
  "#4ADE80",
  "#93C5FD",
  "#FDE68A",
  "#34D399",
  "#Feee24",
  "#F472B6",
  "#C4B5FD",
  "#FB3CCC",
  "#FF6B00",
  "#FF7F00",
  "#FFFF00",
  "#DFFFFF",
  "#32FF00",
  "#00BFFF",
  "#007BFF",
  "#1F51FF",
  "#BF00FF",
  "#8F00FF",
  "#FF10F0",
  "#FF1493",
  "#FF00FF",
  "#00FFA3",
  "#00FFD5",
  "#00FFB3",
  "#FFD700",
];

const carrier = {
  x: 210,
  bottom: 292,
  cargoX: 236,
  maxCargoWidth: 452,
  rowGap: 40,
  crateHeight: 34,
  crateGap: 8,
  bottomPadding: 26,
  topPadding: 14,
};

const getCrateWidth = (skill: string) =>
  Math.max(54, Math.min(118, skill.length * 9 + 28));

const createCargoLayout = (skillList: string[]) => {
  const rows: { name: string; width: number; color: string }[][] = [[]];
  let rowWidth = 0;

  skillList.forEach((name, index) => {
    const width = getCrateWidth(name);
    const nextWidth = rowWidth === 0 ? width : rowWidth + carrier.crateGap + width;

    if (nextWidth > carrier.maxCargoWidth && rows[rows.length - 1].length > 0) {
      rows.push([]);
      rowWidth = 0;
    }

    rows[rows.length - 1].push({
      name,
      width,
      color: skillColors[index % skillColors.length],
    });
    rowWidth = rowWidth === 0 ? width : rowWidth + carrier.crateGap + width;
  });

  const cargoTop =
    carrier.bottom -
    carrier.bottomPadding -
    carrier.crateHeight -
    (rows.length - 1) * carrier.rowGap;
  const bedTop = cargoTop - carrier.topPadding;
  const cargoSkills = rows.flatMap((row, rowIndex) => {
    const totalWidth =
      row.reduce((sum, skill) => sum + skill.width, 0) +
      Math.max(0, row.length - 1) * carrier.crateGap;
    let x = carrier.cargoX + (carrier.maxCargoWidth - totalWidth) / 2;

    return row.map((skill) => {
      const cargoSkill = {
        ...skill,
        x,
        y: cargoTop + rowIndex * carrier.rowGap,
      };
      x += skill.width + carrier.crateGap;
      return cargoSkill;
    });
  });
  const cargoRight = Math.max(
    carrier.x + 436,
    ...cargoSkills.map((skill) => skill.x + skill.width + 20)
  );
  const bedRight = Math.min(708, cargoRight);
  const rearWheelX = Math.min(bedRight - 82, 626);
  const middleWheelX = rearWheelX - 106;

  return { cargoSkills, bedTop, bedRight, middleWheelX, rearWheelX };
};

const textVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const Skills: React.FC = () => {
  const { cargoSkills, bedTop, bedRight, middleWheelX, rearWheelX } =
    createCargoLayout(skills);
  const chassisWidth = bedRight - 224 + 2;
  const bedCornerStart = bedRight - 36;

  return (
    <section
      id="skills"
      className="relative min-h-screen py-4 lg:py-8 flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center items-center bg-[var(--bg-primary)] w-full z-0 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[31%] min-h-[180px] overflow-hidden">
        <div className="absolute inset-0 bg-[#111827]/75" />
        <div className="absolute inset-x-0 top-0 h-5 bg-[#374151]/35" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--bg-primary)] to-transparent" />
        <motion.div
          className="absolute inset-x-0 top-[45%] h-2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 96px, transparent 96px 168px)",
            backgroundSize: "168px 8px",
          }}
          animate={{ backgroundPositionX: ["0px", "168px"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 px-4 md:px-0 flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-center sm:justify-between w-full sm:w-full md:w-4/5 lg:w-4/5 mx-auto">
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
          aria-live="polite"
        >
          <span className="text-base font-normal uppercase leading-8 text-[var(--text-primary)]">
            Technical Expertise
          </span>

          <h1
            id="skills-heading"
            className="lg:text-5xl text-3xl sm:text-4xl md:text-4xl font-bold text-white leading-snug tracking-tight max-w-lg"
          >
            Skills & Technologies
          </h1>

          <p className="text-sm font-normal leading-6 text-white opacity-65 max-w-lg">
            I build reliable full-stack products with modern frontend systems,
            production-ready APIs, cloud deployment workflows, and thoughtful
            performance practices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-[620px] h-[430px] lg:h-[500px] relative translate-y-8 lg:translate-y-14"
          aria-label="Animated truck carrying skills"
        >
          <div className="w-full h-full relative overflow-hidden">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 720 500"
              fill="none"
              role="img"
              aria-labelledby="skills-truck-title"
              preserveAspectRatio="xMidYMid meet"
            >
              <title id="skills-truck-title">
                {/* A delivery truck carrying web development skills on a road */}
                 Mastering Skills, One Step at a Time
              </title>

              <defs>
                <linearGradient id="truckRed" x1="0" x2="1">
                  <stop offset="0%" stopColor="#E94F37" />
                  <stop offset="45%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#B91C1C" />
                </linearGradient>
                <linearGradient id="bedMetal" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="52%" stopColor="#1F2937" />
                  <stop offset="100%" stopColor="#111827" />
                </linearGradient>
                <linearGradient id="windowGlass" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.95" />
                  <stop offset="48%" stopColor="#38BDF8" stopOpacity="0.66" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
                </linearGradient>
                <radialGradient id="headlightGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>
                <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
                  <feDropShadow
                    dx="0"
                    dy="18"
                    stdDeviation="12"
                    floodColor="#020617"
                    floodOpacity="0.45"
                  />
                </filter>
              </defs>

              {/* ================= SUN ================= */}
              <g opacity="0.95">
                <circle cx="635" cy="70" r="30" fill="#FACC15" />
                <circle cx="635" cy="70" r="45" fill="#FACC15" opacity="0.18" />
              </g>

              {/* ================= CLOUDS ================= */}
              {[
                { x: 80, y: 70 },
                { x: 260, y: 45 },
                { x: 480, y: 85 },
              ].map((cloud, i) => (
                <motion.g
                  key={i}
                  animate={{ x: [-15, 15, -15] }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  opacity={0.9}
                >
                  <ellipse cx={cloud.x} cy={cloud.y} rx="24" ry="14" fill="white" />
                  <ellipse cx={cloud.x + 20} cy={cloud.y} rx="22" ry="13" fill="white" />
                  <ellipse cx={cloud.x + 10} cy={cloud.y - 10} rx="20" ry="12" fill="white" />
                </motion.g>
              ))}

              <motion.g
                animate={{ x: [-24, 24, -24] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                opacity="0.28"
              >
                <path
                  d="M-30 276 C70 230 150 248 226 218 C306 186 378 206 446 178 C540 140 632 158 760 112"
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                />
                <path
                  d="M-20 326 C96 284 172 300 266 268 C352 238 418 260 500 226 C594 188 650 204 760 164"
                  stroke="#FB923C"
                  strokeWidth="1.2"
                />
              </motion.g>

              <motion.g
                filter="url(#softShadow)"
                animate={{ y: [0, -2, 0, 1.5, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              >
                <g transform="translate(34 140) scale(0.9)">
                <ellipse cx="310" cy="364" rx="312" ry="24" fill="#020617" opacity="0.72" />
                <ellipse cx="168" cy="366" rx="58" ry="10" fill="#020617" opacity="0.72" />
                <ellipse cx={middleWheelX} cy="366" rx="58" ry="10" fill="#020617" opacity="0.72" />
                <ellipse cx={rearWheelX} cy="366" rx="58" ry="6" fill="#020617" opacity="0.72" />

                <path
                  d={`M210 ${bedTop} H${bedCornerStart} C${bedRight - 16} ${bedTop} ${bedRight} ${
                    bedTop + 16
                  } ${bedRight} ${bedTop + 38} V292 H210 Z`}
                  fill="url(#bedMetal)"
                />
                <path
                  d={`M224 ${bedTop + 18} H${bedRight - 20} V${bedTop + 46} H224 Z`}
                  fill="#94A3B8"
                  opacity="0.2"
                />
                <path
                  d={`M210 292 H${bedRight - 2} V318 H210 Z`}
                  fill="#0F172A"
                />
                <path
                  d={`M212 ${bedTop} H${bedRight - 4}`}
                  stroke="#CBD5E1"
                  strokeWidth="3"
                  opacity="0.35"
                />

                {cargoSkills.map((skill, index) => (
                  <motion.g
                    key={skill.name}
                    animate={{
                      y: [0, index % 2 === 0 ? -4 : 4, 0],
                      rotate: [0, index % 2 === 0 ? 0.7 : -0.7, 0],
                    }}
                    transition={{
                      duration: 2.4 + index * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.08,
                    }}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                  >
                    <rect
                      x={skill.x}
                      y={skill.y}
                      width={skill.width}
                      height="34"
                      rx="6"
                      fill="#0F172A"
                      stroke={skill.color}
                      strokeWidth="1.5"
                    />
                    <rect
                      x={skill.x + 5}
                      y={skill.y + 5}
                      width={skill.width - 10}
                      height="7"
                      rx="3.5"
                      fill={skill.color}
                      opacity="0.25"
                    />
                    <text
                      x={skill.x + skill.width / 2}
                      y={skill.y + 23}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="700"
                      fill={skill.color}
                      style={{ letterSpacing: 0 }}
                    >
                      {skill.name}
                    </text>
                  </motion.g>
                ))}

                <path
                  d="M76 226 C76 185 103 150 145 143 L205 132 C230 127 252 146 252 172 V292 H76 Z"
                  fill="url(#truckRed)"
                />
                <path
                  d="M116 168 C124 158 141 151 158 150 L199 145 C215 143 228 155 228 171 V213 H104 V195 C104 184 108 174 116 168 Z"
                  fill="url(#windowGlass)"
                />
                <path
                  d="M162 151 L162 213"
                  stroke="#0F172A"
                  strokeWidth="5"
                  opacity="0.55"
                />
                <path
                  d="M88 248 H252 V318 H72 V278 C72 262 76 252 88 248 Z"
                  fill="#C2410C"
                />
                <path
                  d="M76 226 H252 V252 H88 C80 252 76 244 76 226 Z"
                  fill="#FB923C"
                  opacity="0.45"
                />
                <rect x="66" y="294" width="126" height="22" rx="7" fill="#111827" />
                <rect x="224" y="292" width={chassisWidth} height="28" rx="7" fill="#111827" />
                <rect x="78" y="258" width="22" height="18" rx="5" fill="#FDE68A" />
                <ellipse cx="82" cy="267" rx="40" ry="24" fill="url(#headlightGlow)" opacity="0.42" />

                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 168 318"
                    to="-360 168 318"
                    dur="1.7s"
                    repeatCount="indefinite"
                  />
                  <circle cx="168" cy="318" r="48" fill="#020617" />
                  <circle
                    cx="168"
                    cy="318"
                    r="42"
                    fill="none"
                    stroke="#1F2937"
                    strokeWidth="8"
                    strokeDasharray="10 9"
                  />
                  <circle cx="168" cy="318" r="31" fill="#475569" />
                  <circle cx="168" cy="318" r="11" fill="#CBD5E1" />
                  <path d="M168 287 V349 M137 318 H199 M146 296 L190 340 M190 296 L146 340" stroke="#E5E7EB" strokeWidth="3" opacity="0.65" />
                </g>
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${rearWheelX} 318`}
                    to={`-360 ${rearWheelX} 318`}
                    dur="1.7s"
                    repeatCount="indefinite"
                  />
                  <circle cx={rearWheelX} cy="318" r="48" fill="#020617" />
                  <circle
                    cx={rearWheelX}
                    cy="318"
                    r="42"
                    fill="none"
                    stroke="#1F2937"
                    strokeWidth="8"
                    strokeDasharray="10 9"
                  />
                  <circle cx={rearWheelX} cy="318" r="31" fill="#475569" />
                  <circle cx={rearWheelX} cy="318" r="11" fill="#CBD5E1" />
                  <path
                    d={`M${rearWheelX} 287 V349 M${rearWheelX - 31} 318 H${
                      rearWheelX + 31
                    } M${rearWheelX - 22} 296 L${rearWheelX + 22} 340 M${
                      rearWheelX + 22
                    } 296 L${rearWheelX - 22} 340`}
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    opacity="0.65"
                  />
                </g>
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${middleWheelX} 318`}
                    to={`-360 ${middleWheelX} 318`}
                    dur="1.7s"
                    repeatCount="indefinite"
                  />
                  <circle cx={middleWheelX} cy="318" r="48" fill="#020617" />
                  <circle
                    cx={middleWheelX}
                    cy="318"
                    r="42"
                    fill="none"
                    stroke="#1F2937"
                    strokeWidth="8"
                    strokeDasharray="10 9"
                  />
                  <circle cx={middleWheelX} cy="318" r="31" fill="#475569" />
                  <circle cx={middleWheelX} cy="318" r="11" fill="#CBD5E1" />
                  <path
                    d={`M${middleWheelX} 287 V349 M${middleWheelX - 31} 318 H${
                      middleWheelX + 31
                    } M${middleWheelX - 22} 296 L${middleWheelX + 22} 340 M${
                      middleWheelX + 22
                    } 296 L${middleWheelX - 22} 340`}
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    opacity="0.65"
                  />
                </g>
                </g>
              </motion.g>

              <motion.g
                animate={{ x: [16, 126], opacity: [0, 0.36, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                transform="translate(34 140) scale(0.9)"
              >
                <path
                  d="M82 284 C44 278 18 270 -20 260"
                  stroke="#CBD5E1"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M120 304 C78 308 44 316 -6 334"
                  stroke="#CBD5E1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.g>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
