export interface CvData {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
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
  skills: string[];
}
