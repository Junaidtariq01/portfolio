export interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
  description?: string;
  achievements?: string[];
}

export const education: Education[] = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Islamic University of Science and Technology (IUST)",
    year: "2023 - 2027",
    description:
      "Focused on Software Engineering and Web Development. Completed coursework in AI and Machine Learning, Algorithms, and Database Systems.",
    location: "Awantipora, J&K",
    achievements: [
      "Dean's List for academic excellence",
      "Senior Project: Developed a full-stack web application",
      "Computer Science and IoT Club President",
    ],
  }

];
