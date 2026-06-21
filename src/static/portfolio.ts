import { projectProps } from "@/types/project";

export const projects: projectProps[] = [

    {
    id: 1,
    title: "Resume Builder Application",
    deployURL: "https://resume-beryl-psi-48.vercel.app",
    gitURL: "https://github.com/Junaidtariq01",
    content:
    "Advanced resume builder platform designed to help users craft professional and ATS-optimized resumes. Includes customizable templates, live editing and preview, dynamic section management, PDF export functionality, and an intuitive user interface for an efficient resume-building experience.",
    category: "Full Stack",
    thumbnail: "/resume2.png",
    // thumbnail:
    //   "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: "February 2026",
    technologies: ["MongoDB","Express","React","Node.js"],
  },
  {
    id: 2,
    title: "Agentic AI Application for Business Growth",
    deployURL: "",
    gitURL: "https://github.com/Junaidtariq01",
    content:
      "AI-driven lead generation platform that identifies, analyzes, and prioritizes potential business opportunities within targeted regions. Uses autonomous agents to evaluate lead quality, market relevance, and growth potential, delivering actionable recommendations for strategic business expansion.",
    category: "Full Stack",
    thumbnail: "/AgenticAI.png",
    // thumbnail:
    //   "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: "April 2026",
    technologies: ["React","Flask", "Supabase", "Python","FastAPI","Google Maps API","Apify", "Pinecone","Groq" ],
  },
  {
    id: 3,
    title: "Java Based Chatting Application",
    deployURL: "",
    gitURL: "https://github.com/Junaidtariq01/Chat-System",
    content:
      "Multi-user messaging platform developed in Java with socket programming and GUI integration. Supports instant messaging, encrypted communication, emoji support, active user lists, and reliable client-server connectivity for real-time conversations.",
    category: "Java Application",
    thumbnail:"/ChatApp.png",
    // thumbnail:
    //   "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: "June 2026",
    technologies: [  "Java","Java Swing","SQL","Socket Programming","AES Encryption","Multithreading"],
  },
    {
    id: 4,
    title: "E-Commerce Platform",
    deployURL: "",
    gitURL: "https://github.com/Junaidtariq01",
    content:
      "A full-featured MERN stack e-commerce platform with product catalog, cart/wishlist functionality, and secure test payment integration. Implemented advanced features including product search/filtering and order tracking system.",
    category: "Full Stack",
    thumbnail:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: "November 2025",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux"],
  },
  {
    id: 5,
    title: "Task Management Application",
    deployURL: "",
    gitURL: "https://github.com/",
    content:
      "Productivity application featuring full CRUD operations for tasks with status tracking. Cloud-synced data ensures accessibility across devices with secure authentication.",
    category: "Full Stack",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: "January 2026",
    technologies: ["TypeScript", "React", "Firebase"],
  },
  {
    id: 6,
    title: "Netflix Interface Clone",
    deployURL: "",
    gitURL: "https://github.com/",
    content:
      "Streaming service UI clone with responsive design and content categorization. Integrated backend services for user authentication and data persistence.",
    category: "Frontend",
    thumbnail:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: "June 2025",
    technologies: ["React", "Tailwind CSS", "Firebase"],
  },
];
