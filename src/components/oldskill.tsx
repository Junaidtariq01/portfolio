"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Point3D {
  x: number;
  y: number;
  z: number;
  skill: string;
}

interface Point2D extends Point3D {
  x2d: number;
  y2d: number;
  scale: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const skills: string[] = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Docker",
  "AWS",
  "CI/CD",
  "JavaScript",
  "HTML/CSS",
  "REST API",
  "GraphQL",
  "Java",
  "Spring boot",
  "Python",
  "FastAPI",
  "Django",
  "DNS",
  "Cloudflare",
];

const Skills: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState<MousePosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastMouse, setLastMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const autoRotateRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const updateSize = (): void => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Create 3D points for skills using Fibonacci sphere algorithm
    const radius = 140;
    const points: Point3D[] = skills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;

      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        skill: skill,
      };
    });

    const render = (): void => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Update auto-rotation
      if (!isDragging) {
        autoRotateRef.current += 0.005;
      }

      // Rotate and project points
      const rotatedPoints: Point2D[] = points.map((p) => {
        let x = p.x;
        let y = p.y;
        let z = p.z;

        // Y-axis rotation (horizontal)
        const rotY = rotation.y + autoRotateRef.current;
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const tempX = x * cosY - z * sinY;
        const tempZ = x * sinY + z * cosY;
        x = tempX;
        z = tempZ;

        // X-axis rotation (vertical)
        const rotX = rotation.x;
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const tempY = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
        y = tempY;

        // 3D to 2D projection
        const perspective = 400;
        const scale = perspective / (perspective + z);
        const x2d = x * scale + width / 2;
        const y2d = y * scale + height / 2;

        return {
          x,
          y,
          z,
          x2d,
          y2d,
          scale,
          skill: p.skill,
        };
      });

      // Sort by z (draw far points first)
      rotatedPoints.sort((a, b) => a.z - b.z);

      // Draw connections
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i < rotatedPoints.length; i++) {
        for (let j = i + 1; j < rotatedPoints.length; j++) {
          const p1 = rotatedPoints[i];
          const p2 = rotatedPoints[j];
          const dist = Math.hypot(p1.x2d - p2.x2d, p1.y2d - p2.y2d);
          if (dist < 120) {
            const opacity = 1 - dist / 120;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);
            ctx.stroke();
          }
        }
      }

      // Draw points and labels
      rotatedPoints.forEach((p) => {
        const normalizedZ = (p.z + radius) / (2 * radius);
        const opacity = 0.3 + normalizedZ * 0.7;
        const size = 3 + p.scale * 2;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          p.x2d,
          p.y2d,
          0,
          p.x2d,
          p.y2d,
          size * 3
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw point
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
        ctx.fill();

        // Draw text
        const fontSize = 11 + p.scale * 2;
        ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Add text shadow for better visibility
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 4;
        ctx.fillText(p.skill, p.x2d, p.y2d - 12 * p.scale);
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [rotation, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>): void => {
    setIsDragging(true);
    const touch = e.touches[0];
    setLastMouse({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>): void => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMouse.x;
    const deltaY = touch.clientY - lastMouse.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }));

    setLastMouse({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (): void => {
    setIsDragging(false);
  };

  return (
    <section
      id="skills"
      className="min-h-screen py-4 lg:py-8 flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center items-center bg-[var(--bg-primary)] w-full z-0"
      aria-labelledby="skills-heading"
    >
      <div className="px-4 md:px-0 flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-center sm:justify-between w-full sm:w-full md:w-4/5 lg:w-4/5 mx-auto">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            I specialize in building modern web applications using cutting-edge
            technologies. Drag to rotate the sphere and explore my technical
            skills and expertise.
          </p>
        </motion.div>

        {/* 3D Skills Sphere */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-[580px] h-[400px] lg:h-[500px] relative"
        >
          <div className="border border-gray-700 rounded-md bg-[var(--bg-primary)] w-full h-full flex items-center justify-center relative overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "none" }}
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-40 pointer-events-none">
              Drag to rotate • Scroll to explore
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
