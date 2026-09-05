import React from "react";

import {
  FaGitAlt,
  FaGithub,
  FaPython,
  FaReact,
  FaRobot,
  FaSquareJs,
  FaJava,
  FaNodeJs
} from "react-icons/fa6";

import {
  SiPhp,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  // SiMongodb,
  SiMysql,
  SiPostman,
  SiTailwindcss,
  SiVercel,
  SiFastapi,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiSpringboot,
  SiVite,
  SiPytorch,
  SiRender,
  SiUpstash,
  SiC, 
  SiCplusplus,
  SiGooglegemini
} from "react-icons/si";

interface LogoProps {
  title: string;
  logoComponent: React.FC;
  color?: string;
}

interface SkillsDataProps {
  title: string;
  data: LogoProps[];
}

export const skillsData: SkillsDataProps[] = [
  {
  title: "Languages",
  data: [
    { title: "JavaScript", logoComponent: FaSquareJs, color: "#F7DF1E" },
    { title: "Python", logoComponent: FaPython, color: "#3776AB" },
    { title: "Java", logoComponent: FaJava, color: "#ED8B00" },
    { title: "PHP", logoComponent: SiPhp, color: "#777BB4" },
    { title: "SQL", logoComponent: SiPostgresql, color: "#4169E1" },
    { title: "C", logoComponent: SiC, color: "#A8B9CC" },
    { title: "C++", logoComponent: SiCplusplus, color: "#00599C" },
  ],
},

  {
    title: "Frameworks & Libraries",
    data: [
      { title: "React", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Vite", logoComponent: SiVite, color: "#646CFF" },
      { title: "Node.js", logoComponent: FaNodeJs, color: "#339933" },
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
      { title: "FastAPI", logoComponent: SiFastapi, color: "#009688" },
      { title: "Spring Boot", logoComponent: SiSpringboot, color: "#6DB33F" },
    ],
  },

  {
    title: "AI & ML",
    data: [
      { title: "PyTorch", logoComponent: SiPytorch, color: "#EE4C2C" },
      { title: "TensorFlow", logoComponent: SiTensorflow, color: "#FF6F00" },
      { title: "Scikit-learn", logoComponent: SiScikitlearn, color: "#F7931E" },
      { title: "NumPy", logoComponent: SiNumpy, color: "#013243" },
      { title: "Pandas", logoComponent: SiPandas, color: "#150458" },
      { title: "RASA", logoComponent: FaRobot, color: "#5A17EE" },
      { title: "Gemini AI", logoComponent: SiGooglegemini, color: "#4285F4" },
    ],
  },

  {
    title: "Databases",
    data: [
      { title: "PostgreSQL", logoComponent: SiPostgresql, color: "#4169E1" },
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
      // { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      { title: "Redis", logoComponent: SiRedis, color: "#DC382D" },
      { title: "Supabase", logoComponent: SiSupabase, color: "#3ECF8E" },
    ],
  },

  {
    title: "Tools & Platforms",
    data: [
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", logoComponent: FaGithub, color: "#d4d4d8" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "Vercel", logoComponent: SiVercel, color: "#d4d4d8" },
      {title: "Render",logoComponent: SiRender,color: "#46E3B7" },
      {title: "Upstash",logoComponent: SiUpstash, color: "#00E9A3",},
    ],
  },
];