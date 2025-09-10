export interface CvData {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    github?: string;
    website?: string;
    summary: string;
  };
  work: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    highlights: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    summary: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  tech_skills: string[];
  soft_skills: string[];
  languages: { language: string; fluency: string }[];
}
