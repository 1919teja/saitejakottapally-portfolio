
import { Experience, SkillCategory, Project, Education } from './types';

export const PERSONAL_INFO = {
  name: "Saiteja Kottapally",
  title: "DevOps / Site Reliability Engineer",
  email: "kottapallysaiteja@gmail.com",
  phone: "9581876090",
  linkedin: "https://linkedin.com/in/1919teja",
  github: "https://github.com/1919teja",
  website: "https://thesaiteja.loopout.in",
  summary: "Experienced DevOps/Site Reliability Engineer with a strong background in cloud infrastructure, DevOps automation, and full-stack observability. Proficient in AWS, Azure, Kubernetes, Docker, and GitOps tools like Helm and FluxCD. Skilled in building robust CI/CD pipelines and automating infrastructure with Python/Bash. Proven track record in incident management and on-call operations for distributed microservices."
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Cloud & Containers",
    skills: ["Amazon AWS (EKS, EC2, S3)", "Azure (AKS)", "Google Cloud Platform", "Docker", "Kubernetes", "Helm", "FluxCD"]
  },
  {
    category: "Infrastructure & Automation",
    skills: ["Terraform", "Ansible", "CloudFormation", "Bash Scripting", "Python", "Jenkins", "GitHub Actions", "GitLab CI"]
  },
  {
    category: "Observability & Security",
    skills: ["New Relic", "Dynatrace", "Prometheus", "Grafana", "ELK Stack", "DataDog", "Cloudflare WAF", "SSL/TLS", "VPN"]
  },
  {
    category: "Databases & Dev",
    skills: ["MySQL", "Redis", "MongoDB", "DynamoDB", "JavaScript", "React", "Django", "Postman"]
  },
  {
    category: "AI & Future Tech",
    skills: ["GenAI (ChatGPT)", "New Relic AI", "Datadog AIOps", "Quantum Computing Simulation"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "GlobalLogic",
    role: "DevOps/Site Reliability Engineer",
    period: "August 2024 – Present",
    description: [
      "Designed and optimized AWS EKS clusters including upgrades, node group management, and scaling.",
      "Built multi-service AWS infrastructure using Terraform (VPC, RDS, ALB, SQS, SNS, IAM, etc.).",
      "Implemented CI/CD pipelines using GitHub Actions, Bitbucket, and CircleCI for automated builds.",
      "Managed Azure Kubernetes Service (AKS) using Helm and FluxCD-driven GitOps workflows.",
      "Implemented AI-driven anomaly detection using New Relic Lookout AIOPS for faster MTTR.",
      "Designed and maintained GitLab pipelines for automated container builds and Helm packaging."
    ]
  },
  {
    company: "Tech Mahindra",
    role: "Site Reliability Engineer",
    period: "May 2024 – August 2024",
    description: [
      "Delivered high-quality Infrastructure as Code (IaC) solutions using Terraform and Ansible on AWS.",
      "Built and managed Jenkins CI/CD pipelines to automate provisioning and deployment processes.",
      "Resolved complex issues in production environments, improving overall system stability.",
      "Ensured SLAs and KPIs were consistently met through transparent risk management."
    ]
  },
  {
    company: "Lotuswave Software Solutions",
    role: "DevOps/SRE Engineer",
    period: "April 2021 – May 2024",
    description: [
      "Managed high-availability workloads in AWS, ensuring disaster recovery and resiliency.",
      "Implemented full-stack observability with New Relic and Dynatrace to improve system reliability.",
      "Automated routine tasks with Python, significantly reducing manual effort and latency.",
      "Configured Cloudflare for WAF and DDoS protection, reducing latency by 30%.",
      "Designed HA architectures achieving 99.99% uptime through performance testing and capacity planning."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "DevOps Automation QA-Portal",
    description: "Developed an internal website for QA teams to automate functional and regression testing on target websites. Integrated with Python, Shell, Jenkins, and Ansible.",
    technologies: ["Python", "Shell", "Jenkins", "Ansible", "DevOps"],
    links: { github: "https://github.com/lotuswave/qaporta" }
  },
  {
    title: "AI Based Assistant System for Blind",
    description: "Smart India Hackathon finalist. AI-powered assistant using voice-enabled bot and smart cameras as a self-learning companion for visually impaired users.",
    technologies: ["Python", "AI", "Voice Assistant"],
    links: { youtube: "https://www.youtube.com/watch?v=Rcc5g07ppsI" }
  },
  {
    title: "Quantum Computing Simulation",
    description: "Designed a 8-bit Qubit simulated chip prototype simulating multiple quantum algorithms using IBM Quantum at JNTU.",
    technologies: ["Quantum Computing", "IBM Quantum", "Algorithm Simulation"]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Jawaharlal Nehru Technological University",
    degree: "Bachelor of Technology, Electronics and Communication",
    period: "2017-2021",
    grade: "7.5 CGPA"
  },
  {
    institution: "Kendriya Vidyalaya Sangathan, Warangal",
    degree: "Senior Secondary (+2), MPC Computer Science",
    period: "2015-2017",
    grade: "7.0 CGPA"
  }
];
