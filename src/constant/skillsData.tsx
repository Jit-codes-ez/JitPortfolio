import React from "react";

import {
  FaGitAlt,
  FaGithub,
  FaMobile,
  FaPython,
  FaReact,
  FaCodeBranch,
  FaRobot,
  FaSquareJs,
} from "react-icons/fa6";

import { SiPhp, SiTensorflow, SiScikitlearn, SiFirebase, SiNumpy } from "react-icons/si";

import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostman,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import { GiBrain } from "react-icons/gi";
import { GrOracle } from "react-icons/gr";

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
      { title: "TypeScript", logoComponent: SiTypescript, color: "#3178C6" },
      { title: "JavaScript", logoComponent: FaSquareJs, color: "#F7DF1E" },
      { title: "Python", logoComponent: FaPython, color: "#3776AB" },
      { title: "Php", logoComponent: SiPhp, color: "#777BB4" }, 
      { title: "SQL", logoComponent: GrOracle, color: "#F80000" },
      { title: "C / C++", logoComponent: FaCodeBranch, color: "#00599C" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    data: [
      { title: "React", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Next.js", logoComponent: SiNextdotjs, color: "#d4d4d8" },
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
      { title: "Express.js", logoComponent: SiExpress, color: "#d4d4d8" },
      { title: "Node.js", logoComponent: FaMobile, color: "#339933" },
    ],
  },
  {
    title: "AI & ML",
    data: [
      { title: "PyTorch", logoComponent: GiBrain, color: "#EE4C2C" },
      { title: "Tensorflow", logoComponent: SiTensorflow, color: "##FF6F00" },
      { title: "RASA", logoComponent: FaRobot, color: "#5A17EE" },
      { title: "Scikit-learn", logoComponent: SiScikitlearn, color: "#F7931E" },
      { title: "NumPy / Pandas", logoComponent: SiNumpy, color: "#013243" },
    ],
  },
  {
    title: "Databases",
    data: [
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      { title: "Firebase", logoComponent: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "Tools & Platforms",
    data: [
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", logoComponent: FaGithub, color: "#d4d4d8" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "Vercel", logoComponent: SiVercel, color: "#d4d4d8" },
    ],
  },
];
