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
    degree: "Bachelor of Technology in Computer Science",
    institution: "APJ Abdul Kalam Technological University",
    year: "2019 - 2023",
    description:
      "Focused on Software Engineering and Web Development. Active member of the Computer Science Club.",
    location: "Kannur, Kerala",
    achievements: [
      "Dean's List for academic excellence",
      "Senior Project: Developed a full-stack web application",
      "Computer Science Club President",
    ],
  },
  {
    degree: "High School",
    institution: "Government Higher Secondary School Khanda",
    year: "2014 - 2018",
    description: "Advanced Placement in Computer Science and Mathematics.",
    location: "Budgam, J&K",
    achievements: [
      "AP Computer Science A: Score 5",
      "National Merit Scholar",
      "Science Club Vice President",
    ],
  },
];
