"use client";

import React, { useEffect, useMemo, useState } from "react";
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
    const nextWidth =
      rowWidth === 0 ? width : rowWidth + carrier.crateGap + width;

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
    ...cargoSkills.map((skill) => skill.x + skill.width + 20),
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

function useDayNightCycle() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, []);

  const data = useMemo(() => {
    const hours =
      now.getHours() +
      now.getMinutes() / 60 +
      now.getSeconds() / 3600;

    const sunrise = 6;
    const sunset = 18;

    const isDay = hours >= sunrise && hours < sunset;

    let progress = 0;

    if (isDay) {
      progress = (hours - sunrise) / (sunset - sunrise);
    } else {
      const nightHours =
        hours >= sunset
          ? hours - sunset
          : hours + (24 - sunset);

      progress = nightHours / 12;
    }

    return {
      isDay,
      progress,
    };
  }, [now]);

  return data;
}

// function useDayNightCycle() {
//   // ===================================================
//   // DEBUG MODE
//   // Set to null to use real local time
//   // Examples:
//   // "06:00" -> Sunrise
//   // "09:30" -> Morning
//   // "12:00" -> Noon
//   // "17:30" -> Sunset
//   // "21:00" -> Night
//   // ===================================================
//   const DEBUG_TIME: string | null = "10:00";
//   // const DEBUG_TIME: string | null = null;

//   const [now, setNow] = useState(() => {
//     if (DEBUG_TIME) {
//       const date = new Date();
//       const [h, m] = DEBUG_TIME.split(":").map(Number);
//       date.setHours(h, m, 0, 0);
//       return date;
//     }

//     return new Date();
//   });

//   useEffect(() => {
//     // Don't update every minute while testing
//     if (DEBUG_TIME) return;

//     const timer = setInterval(() => {
//       setNow(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const data = useMemo(() => {
//     const hours =
//       now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

//     const sunrise = 6;
//     const sunset = 18;

//     const isDay = hours >= sunrise && hours < sunset;

//     let progress = 0;

//     if (isDay) {
//       progress = (hours - sunrise) / (sunset - sunrise);
//     } else {
//       const nightHours =
//         hours >= sunset ? hours - sunset : hours + (24 - sunset);

//       progress = nightHours / 12;
//     }

//     return {
//       now,
//       hours,
//       isDay,
//       progress,
//     };
//   }, [now]);

//   return data;
// }

const Skills: React.FC = () => {
  const stars = React.useMemo(
    () =>
      Array.from({ length: 260 }).map(() => {
        const type = Math.random();

        return {
          left: Math.random() * 100,
          top: Math.random() * 75, // only upper 75% of section
          size: type > 0.97 ? 3 : type > 0.9 ? 2 : 1,
          opacity: type > 0.97 ? 1 : type > 0.9 ? 0.8 : 0.45,
          twinkle: Math.random() < 0.02,
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 8,
        };
      }),
    [],
  );

  const shootingStars = React.useMemo(
    () =>
      Array.from({ length: 5 }).map(() => ({
        top: 5 + Math.random() * 45,
        left: -20,
        angle: 10 + Math.random() * 25,
        travelX: 100 + Math.random() * 40, // vw
        travelY: 120 + Math.random() * 80, // px
        duration: 1.8 + Math.random() * 0.7,
        delay: Math.random() * 15,
        length: 90 + Math.random() * 70,
      })),
    [],
  );
  const clouds = React.useMemo(
    () =>
      Array.from({ length: 4 }).map(() => ({
        top: 5 + Math.random() * 30, // 5% -> 42%
        duration: 190 + Math.random() * 30,
        delay: Math.random() * 40,
        scale: 0.9 + Math.random() * 0.3,
      })),
    [],
  );
  const meteors = React.useMemo(
    () =>
      Array.from({ length: 3 }).map(() => ({
        x: Math.random() * 70 + 10,
        y: Math.random() * 20 + 5,
        length: 120 + Math.random() * 80,
        delay: Math.random() * 15,
        duration: 2 + Math.random(),
        rotate: 25 + Math.random() * 15,
      })),
    [],
  );

  const { cargoSkills, bedTop, bedRight, middleWheelX, rearWheelX } =
    createCargoLayout(skills);

  const { isDay, progress } = useDayNightCycle();
  const startX = 50;
  const endX = 680;

  const x = startX + (endX - startX) * progress;

  // Horizon level (where sunrise/sunset occur)
  const horizonY = 200;

  // Arc height (radius)
  const arcHeight = 200;

  // semicircle
  const y = horizonY - Math.sin(progress * Math.PI) * arcHeight;

  const chassisWidth = bedRight - 224 + 2;
  const bedCornerStart = bedRight - 36;

  return (
    <section
      id="skills"
      className="relative min-h-screen py-4 lg:py-8 flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center items-center bg-[var(--bg-primary)] w-full z-0 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* stars */}
      {!isDay && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                boxShadow:
                  star.size > 2
                    ? "0 0 8px rgba(255,255,255,.9)"
                    : "0 0 3px rgba(255,255,255,.5)",
              }}
              animate={
                star.twinkle
                  ? {
                      scale: [1, 1.8, 1],
                      opacity: [
                        star.opacity,
                        Math.min(1, star.opacity + 0.35),
                        star.opacity,
                      ],
                    }
                  : {}
              }
              transition={
                star.twinkle
                  ? {
                      duration: star.duration,
                      repeat: Infinity,
                      repeatDelay: 5 + Math.random() * 8,
                      delay: star.delay,
                    }
                  : undefined
              }
            />
          ))}
        </div>
      )}
      {/* clouds */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {!isDay &&
          clouds.map((cloud, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${cloud.top}%`,
                left: "-30%",
              }}
              animate={{
                x: ["0vw", "160vw"],
              }}
              transition={{
                duration: cloud.duration,
                repeat: Infinity,
                ease: "linear",
                delay: cloud.delay,
              }}
            >
              <svg width="220" height="90" viewBox="0 0 220 90" opacity="0.58">
                <ellipse cx="55" cy="45" rx="42" ry="18" fill="#334155" />
                <ellipse cx="105" cy="35" rx="50" ry="22" fill="#334155" />
                <ellipse cx="165" cy="48" rx="45" ry="18" fill="#334155" />
                <ellipse cx="110" cy="55" rx="80" ry="18" fill="#334155" />
              </svg>
            </motion.div>
          ))}
      </div>

      {/* meteors */}
      {!isDay &&
        meteors.map((meteor, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none z-0"
            style={{
              left: `${meteor.x}%`,
              top: `${meteor.y}%`,
              rotate: `${meteor.rotate}deg`,
            }}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, 180],
              y: [0, 100],
            }}
            transition={{
              duration: meteor.duration,
              repeat: Infinity,
              repeatDelay: 10 + Math.random() * 12,
              delay: meteor.delay,
              ease: "easeOut",
            }}
          >
            <svg width={meteor.length} height="40" overflow="visible">
              <defs>
                <linearGradient id={`meteor-${i}`}>
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="70%" stopColor="#ffffff66" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>

              {/* Tail */}
              <line
                x1="0"
                y1="20"
                x2={meteor.length - 10}
                y2="20"
                stroke={`url(#meteor-${i})`}
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Glow */}
              <circle
                cx={meteor.length}
                cy="20"
                r="5"
                fill="white"
                opacity="0.35"
              />

              {/* Head */}
              <circle cx={meteor.length} cy="20" r="2.5" fill="white" />
            </svg>
          </motion.div>
        ))}

      {!isDay &&
        shootingStars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none z-0"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              rotate: `${star.angle}deg`,
            }}
            initial={{
              x: "-10vw",
              opacity: 0,
            }}
            animate={{
              x: ["0vw", `${star.travelX}vw`],
              y: [0, star.travelY],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              repeatDelay: 8 + Math.random() * 10,
              delay: star.delay,
              ease: "easeOut",
            }}
          >
            <svg width={star.length + 20} height="30" overflow="visible">
              <defs>
                <linearGradient id={`meteor-${i}`}>
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>

              {/* Tail */}
              <line
                x1="0"
                y1="15"
                x2={star.length}
                y2="15"
                stroke={`url(#meteor-${i})`}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Glow */}
              <circle
                cx={star.length}
                cy="15"
                r="5"
                fill="white"
                opacity="0.25"
              />

              {/* Head */}
              <circle cx={star.length} cy="15" r="2.5" fill="white" />
            </svg>
          </motion.div>
        ))}

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
                <filter
                  id="sunGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <clipPath id="skyClip">
                  <rect x="0" y="0" width="720" height="220" />
                </clipPath>
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
                <filter
                  id="softShadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="150%"
                >
                  <feDropShadow
                    dx="0"
                    dy="18"
                    stdDeviation="12"
                    floodColor="#020617"
                    floodOpacity="0.45"
                  />
                </filter>
              </defs>

              {/* SUN */}

              {isDay && (
                <motion.g
                  opacity="0.95"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  transform={`translate(${x} ${y})`}
                >
                  {/* Outer Glow */}
                  <circle cx={x} cy={y} r="65" fill="#FACC15" opacity="0.05" />

                  {/* Middle Glow */}
                  <circle cx={x} cy={y} r="52" fill="#FACC15" opacity="0.12" />

                  {/* Inner Glow */}
                  <circle cx={x} cy={y} r="40" fill="#FACC15" opacity="0.20" />

                  {/* Sun */}
                  <circle cx={x} cy={y} r="28" fill="#FACC15" />
                </motion.g>
              )}

              {isDay && (
                <motion.g
                  opacity="0.95"
                  filter="url(#sunGlow)"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  transform={`translate(${x} ${y})`}
                >
                  <circle cx={x} cy={y} r="45" fill="#FACC15" opacity="0.18" />

                  <circle cx={x} cy={y} r="30" fill="#FACC15" />
                </motion.g>
              )}

              {/* ================= DAY CLOUDS ================= */}
              {isDay &&
                [
                  { x: 80, y: 70 },
                  { x: 260, y: 45 },
                  { x: 480, y: 85 },
                ].map((cloud, i) => (
                  <motion.g
                    key={i}
                    animate={{
                      x: [-20, 20, -20], // gentle drifting
                    }}
                    transition={{
                      duration: 12 + i * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    opacity={0.9}
                  >
                    <ellipse
                      cx={cloud.x}
                      cy={cloud.y}
                      rx="24"
                      ry="14"
                      fill="white"
                    />
                    <ellipse
                      cx={cloud.x + 20}
                      cy={cloud.y}
                      rx="22"
                      ry="13"
                      fill="white"
                    />
                    <ellipse
                      cx={cloud.x + 10}
                      cy={cloud.y - 10}
                      rx="20"
                      ry="12"
                      fill="white"
                    />
                  </motion.g>
                ))}

              {/* moon */}

              {!isDay && (
                <g>
                  <circle cx={x} cy={y} r="24" fill="#F8FAFC" />

                  <circle
                    cx={x + 10}
                    cy={y - 6}
                    r="20"
                    fill="var(--bg-primary)"
                  />
                </g>
              )}

              {/* stars */}

              <g clipPath="url(#skyClip)">
                {/* shooting star */}

                {!isDay && (
                  <motion.g
                    initial={{
                      x: -120,
                      y: 20,
                      opacity: 0,
                    }}
                    animate={{
                      x: 820,
                      y: 260,
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatDelay: 8,
                      ease: "easeOut",
                    }}
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="-80"
                      y2="-20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.4"
                    />

                    <circle cx="0" cy="0" r="4" fill="white" />
                  </motion.g>
                )}

                {/* fireflies */}
                {!isDay &&
                  Array.from({ length: 18 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-yellow-300"
                      style={{
                        width: 4 + Math.random() * 3,
                        height: 4 + Math.random() * 3,
                        left: `${5 + i * 6}%`,
                        bottom: `${15 + Math.random() * 35}px`,
                        filter: "blur(.4px)",
                        boxShadow: "0 0 12px #fde047",
                      }}
                      animate={{
                        y: [0, -15, 0],
                        x: [0, 6, -6, 0],
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                      }}
                    />
                  ))}
              </g>

              <motion.g
                animate={{ x: [-24, 24, -24] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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

              {/* truck */}

              <motion.g
                filter="url(#softShadow)"
                animate={{ y: [0, -2, 0, 1.5, 0] }}
                transition={{
                  duration: 1.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <g transform="translate(34 140) scale(0.9)">
                  <ellipse
                    cx="310"
                    cy="364"
                    rx="312"
                    ry="24"
                    fill="#020617"
                    opacity="0.72"
                  />
                  <ellipse
                    cx="168"
                    cy="366"
                    rx="58"
                    ry="10"
                    fill="#020617"
                    opacity="0.72"
                  />
                  <ellipse
                    cx={middleWheelX}
                    cy="366"
                    rx="58"
                    ry="10"
                    fill="#020617"
                    opacity="0.72"
                  />
                  <ellipse
                    cx={rearWheelX}
                    cy="366"
                    rx="58"
                    ry="6"
                    fill="#020617"
                    opacity="0.72"
                  />

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
                    fill={isDay ? "#C2410C" : "#EA580C"}
                  />
                  <path
                    d="M76 226 H252 V252 H88 C80 252 76 244 76 226 Z"
                    fill={isDay ? "#FB923C" : "#F97316"}
                    opacity="0.45"
                  />
                  <rect
                    x="66"
                    y="294"
                    width="126"
                    height="22"
                    rx="7"
                    fill="#111827"
                  />
                  <rect
                    x="224"
                    y="292"
                    width={chassisWidth}
                    height="28"
                    rx="7"
                    fill="#111827"
                  />
                  <rect
                    x="78"
                    y="258"
                    width="22"
                    height="18"
                    rx="5"
                    fill={isDay ? "#FDE68A" : "#FFF8B5"}
                  />
                  <motion.ellipse
                    cx="82"
                    cy="267"
                    rx={isDay ? 40 : 65}
                    ry={isDay ? 24 : 38}
                    fill="url(#headlightGlow)"
                    animate={{ opacity: isDay ? 0.42 : [0.45, 0.85, 0.45] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
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
                    <path
                      d="M168 287 V349 M137 318 H199 M146 296 L190 340 M190 296 L146 340"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      opacity="0.65"
                    />
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
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
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
