import type { CvData } from "./types";

export const CV: CvData = {
  basics: {
    name: "Sageeth Himachala",
    email: "sageethhimachala@gmail.com",
    phone: "+94702367194",
    location: "165/A, Elegoda East, Mamadala, Ambalantota",
    github: "https://github.com/sageethhimachala",
    summary:
      "Final-year Computer Science and Engineering undergraduate at the University of Moratuwa. Strong foundation in software development and full-stack web/mobile applications. Passionate about scalable, user-friendly systems. Completed internship at SenzMate AIoT Intelligence.",
  },
  work: [
    {
      company: "SenzMate AIoT Intelligence",
      position: "Intern Software Engineer",
      startDate: "2024-12",
      endDate: "2025-06",
      technologies: [
        "Next.js",
        "React",
        "Redux",
        "Material UI",
        "Node.js",
        "MongoDB",
        "WordPress",
      ],
      highlights: [
        "Developed SenzMate and SenzAgro websites using Material UI and Next.js with focus on performance, SEO, and responsive design.",
        "Built the SenzMate website admin portal with React and Redux for content management.",
        "Contributed to CliniclIQ project: customized WordPress themes and functionality.",
        "Worked with Node.js for backend services and MongoDB for database management.",
      ],
    },
  ],
  education: [
    {
      institution: "University of Moratuwa",
      degree: "BSc in Computer Science and Engineering",
      startDate: "2021",
      endDate: "Present",
      summary: "CGPA: 3.29 / 4.0",
    },
    {
      institution: "H/Vijayaba National School",
      degree: "GCE Advanced Level",
      startDate: "2016",
      endDate: "2020",
      summary: "Z-Score: 2.4724, District Rank: 6, Island Rank: 186",
    },
    {
      institution: "H/Vijayaba National School",
      degree: "GCE Ordinary Level",
      startDate: "2010",
      endDate: "2015",
      summary: "A-7, B-2",
    },
  ],
  projects: [
    {
      name: "Interactive Library Management System",
      description:
        "This is the semester 5 project. I contributed for the frontend and backend development of the web application and database design",
      technologies: ["React.js", "Node.js", "Express", "MySQL", "Tailwind CSS"],
      link: "https://github.com/KalpanaYehan/ILMS",
    },
    {
      name: "Hotel Booking App",
      description:
        " The system is designed for managing hotel reservations using the web application.",
      technologies: ["React.js", "MongoDB", "Node.js", "Express", "Redux"],
      link: "https://github.com/sageethhimachala/Booking-App",
    },
  ],
  tech_skills: [
    "JavaScript",
    "React.js",
    "Node.js",
    "Next.js",
    "Redux",
    "MySQL",
    "MongoDB",
    "Python",
    "WordPress",
    "Tailwind CSS",
    "Material UI",
    "Figma",
  ],
  soft_skills: ["Problem Solving", "Fast Learner", "Teamwork", "Communication"],
  languages: [
    { language: "Sinhala", fluency: "Native" },
    { language: "English", fluency: "Fluent" },
  ],
};
