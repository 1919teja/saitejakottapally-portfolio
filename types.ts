
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
    youtube?: string;
  };
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}
