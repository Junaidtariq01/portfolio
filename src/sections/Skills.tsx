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
  proximity: number;
  pulsePhase: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  lifetime: number;
  color: string;
}

interface RippleWave {
  age: number;
  lifetime: number;
  radius: number;
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
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const autoRotateRef = useRef<number>(0);
  const velocityRef = useRef<MousePosition>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rippleRef = useRef<RippleWave | null>(null);
  const timeRef = useRef<number>(0);
  const zoomRef = useRef<number>(1);

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

    // Helper function to create particles
    const createParticles = (x: number, y: number, color: string): void => {
      for (let i = 0; i < 4; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const velocity = 2 + Math.random() * 2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          age: 0,
          lifetime: 0.6 + Math.random() * 0.4,
          color,
        });
      }
    };

    const render = (): void => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.016;

      // Update auto-rotation
      if (!isDragging) {
        velocityRef.current.x *= 0.92; // Friction
        velocityRef.current.y *= 0.92;
        autoRotateRef.current += 0.005;
        
        setRotation((prev) => ({
          x: prev.x + velocityRef.current.x,
          y: prev.y + velocityRef.current.y,
        }));
      }

      // Rotate and project points
      const rotatedPoints: Point2D[] = points.map((p, idx) => {
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

        // 3D to 2D projection with zoom
        const perspective = 400;
        const scale = (perspective / (perspective + z)) * zoomRef.current;
        const x2d = x * scale + width / 2;
        const y2d = y * scale + height / 2;

        // Calculate proximity to cursor
        const dx = x2d - mousePos.x;
        const dy = y2d - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - distance / 150);

        // Pulse phase for animation
        const pulsePhase = Math.sin(timeRef.current * 3 + idx * 0.5) * 0.5 + 0.5;

        return {
          x,
          y,
          z,
          x2d,
          y2d,
          scale,
          skill: p.skill,
          proximity,
          pulsePhase,
        };
      });

      // Sort by z (draw far points first)
      rotatedPoints.sort((a, b) => a.z - b.z);

      // Draw connections with energy flow
      ctx.lineWidth = 1;
      for (let i = 0; i < rotatedPoints.length; i++) {
        for (let j = i + 1; j < rotatedPoints.length; j++) {
          const p1 = rotatedPoints[i];
          const p2 = rotatedPoints[j];
          const dist = Math.hypot(p1.x2d - p2.x2d, p1.y2d - p2.y2d);
          if (dist < 120) {
            const opacity = 1 - dist / 120;
            const energyGlow = Math.max(p1.proximity, p2.proximity) * 0.3;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * (0.15 + energyGlow)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);
            ctx.stroke();
          }
        }
      }

      // Draw ripple effect
      if (rippleRef.current) {
        rippleRef.current.age += 0.016;
        if (rippleRef.current.age > rippleRef.current.lifetime) {
          rippleRef.current = null;
        } else {
          const progress = rippleRef.current.age / rippleRef.current.lifetime;
          const rippleRadius = Math.max(0, progress * 300);
          const alpha = Math.max(0, (1 - progress) * 0.5);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, rippleRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw points and labels with enhanced effects
      rotatedPoints.forEach((p) => {
        const normalizedZ = (p.z + 140) / 280;
        const baseOpacity = 0.3 + normalizedZ * 0.7;
        const proximityBoost = p.proximity * 0.5;
        const opacity = Math.min(1, baseOpacity + proximityBoost);
        
        // Size with proximity effect
        const baseSize = 3 + p.scale * 2;
        const sizeWithProximity = Math.max(0.5, baseSize + p.proximity * 3);
        
        // Color gradient: purple (back) → cyan (front)
        const cyanAmount = normalizedZ;
        const red = Math.round(139 * (1 - cyanAmount) + 0 * cyanAmount);
        const green = Math.round(92 * (1 - cyanAmount) + 255 * cyanAmount);
        const blue = Math.round(246 * (1 - cyanAmount) + 255 * cyanAmount);

        // Draw enhanced glow
        const glowSize = Math.max(1, sizeWithProximity * (3 + p.pulsePhase));
        const gradient = ctx.createRadialGradient(
          p.x2d,
          p.y2d,
          0,
          p.x2d,
          p.y2d,
          glowSize
        );
        gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw point
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, Math.max(0.5, sizeWithProximity), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        ctx.fill();

        // Draw highlight ring when proximity is high
        if (p.proximity > 0.3) {
          ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${p.proximity * 0.6})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, Math.max(2, sizeWithProximity + 5), 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw text with pulse
        const fontSize = 11 + p.scale * 2;
        const textScale = 1 + p.proximity * 0.2 + p.pulsePhase * 0.1;
        ctx.font = `600 ${fontSize * textScale}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Enhanced text shadow
        ctx.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.6)`;
        ctx.shadowBlur = Math.max(2, 8 + p.proximity * 4);
        ctx.fillText(p.skill, p.x2d, p.y2d - 12 * p.scale);
        ctx.shadowBlur = 0;

        // Create particles when skills are highlighted
        if (p.proximity > 0.7 && Math.random() < 0.1) {
          createParticles(p.x2d, p.y2d, `rgba(${red}, ${green}, ${blue}, 0.8)`);
        }
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => p.age < p.lifetime);
      particlesRef.current.forEach((p) => {
        p.age += 0.016;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity
        const progress = p.age / p.lifetime;
        const size = Math.max(0, 2 * (1 - progress));
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - progress);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
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
  }, [rotation, isDragging, mousePos]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    if (!isDragging) return;

    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    velocityRef.current = { x: deltaX * 0.01, y: deltaY * 0.01 };

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
    // Create ripple effect on release
    rippleRef.current = { age: 0, lifetime: 0.6, radius: 0 };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>): void => {
    setIsDragging(true);
    const touch = e.touches[0];
    setLastMouse({ x: touch.clientX, y: touch.clientY });
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>): void => {
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    }

    if (!isDragging) return;

    const deltaX = touch.clientX - lastMouse.x;
    const deltaY = touch.clientY - lastMouse.y;

    velocityRef.current = { x: deltaX * 0.01, y: deltaY * 0.01 };

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }));

    setLastMouse({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (): void => {
    setIsDragging(false);
    rippleRef.current = { age: 0, lifetime: 0.6, radius: 0 };
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>): void => {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
    zoomRef.current = Math.max(0.5, Math.min(2, zoomRef.current * zoomDelta));
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
            technologies. Drag to rotate the sphere and scroll to zoom in and explore my technical
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
              onWheel={handleWheel}
              style={{ touchAction: "none" }}
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-40 pointer-events-none">
              Drag to rotate • Scroll to zoom
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
