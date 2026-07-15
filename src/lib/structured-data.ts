import { selfData, skillsData } from "@/constant";

export function generatePersonStructuredData() {
  const skills = skillsData.flatMap((category) =>
    category.data.map((skill) => skill.title)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: selfData.name,
    givenName: selfData.first_name,
    familyName: selfData.last_name,
    jobTitle: selfData.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: selfData.workFor,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Kalyani",
    },
    email: selfData.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: selfData.current_location.city,
      addressRegion: selfData.current_location.state,
      addressCountry: selfData.current_location.country,
    },
    sameAs: [
      `https://github.com/${selfData.socials_username.github}`,
      `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
    ],
    url: "https://jit.vercel.app",
    description: selfData.bio,
    knowsAbout: skills,
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jit Hazra - Portfolio",
    url: "https://jit.vercel.app",
    description:
      "Jit Hazra's portfolio featuring full-stack web projects, AI research, and developer tools built with Next.js, React, Python, and more",
    author: {
      "@type": "Person",
      name: selfData.name,
    },
    publisher: {
      "@type": "Person",
      name: selfData.name,
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: selfData.name,
    },
  };
}

export function generateProfilePageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: selfData.name,
      url: "https://jit.vercel.app",
      jobTitle: selfData.jobTitle,
      description: selfData.bio,
      sameAs: [
        `https://github.com/${selfData.socials_username.github}`,
        `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
      ],
    },
    dateCreated: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

export function generateFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Jit Hazra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jit Hazra is a Full Stack Developer and MCA student at Techno College Hooghly, West Bengal, India. He completed his B.Sc (Hons) in Computer Science from University of Kalyani in 2025 with 82.43%. He specializes in building web applications with Next.js, React, PHP, and Python, and has conducted research on CGAN-based trace augmentation for side-channel attacks on ML-KEM (CRYSTALS-Kyber).",
        },
      },
      {
        "@type": "Question",
        name: "What projects has Jit Hazra built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jit Hazra has built an Online Tutor Finder — a full-stack platform with PHP backend, RASA chatbot, location-based search, and email OTP authentication. He has also conducted AI/ML research on CGAN-based power trace augmentation for side-channel attacks on ML-KEM (CRYSTALS-Kyber) using PyTorch and TensorFlow, with a manuscript under review for book publication.",
        },
      },
      {
        "@type": "Question",
        name: "How to contact Jit Hazra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Jit Hazra via email at jithazra.professional@gmail.com, through the contact form on his portfolio at jit.vercel.app, or connect with him on LinkedIn at linkedin.com/in/jit-hazra and GitHub at github.com/Jit-codes-ez.",
        },
      },
      {
        "@type": "Question",
        name: "What is Jit Hazra's educational background?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jit Hazra completed his B.Sc (Hons) in Computer Science from University of Kalyani in 2025 with 82.43%. He is currently pursuing MCA at Techno College Hooghly (2025-2027) with a CGPA of 9.16.",
        },
      },
    ],
  };
}

export function generateResumeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "Jit Hazra Resume",
    description:
      "Professional resume of Jit Hazra - Full Stack Developer and MCA Student specializing in web development and AI research",
    url: "https://jit.vercel.app/resume",
    author: {
      "@type": "Person",
      name: selfData.name,
      email: selfData.email,
      jobTitle: selfData.jobTitle,
      address: {
        "@type": "PostalAddress",
        addressLocality: selfData.current_location.city,
        addressRegion: selfData.current_location.state,
        addressCountry: selfData.current_location.country,
      },
      sameAs: [
        `https://github.com/${selfData.socials_username.github}`,
        `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
      ],
    },
    dateModified: new Date().toISOString(),
    fileFormat: "application/pdf",
    contentUrl: "https://jit.vercel.app/docs/Jit_Resume.pdf",
    downloadUrl: "https://jit.vercel.app/docs/Jit_Resume.pdf",
    keywords: [
      "Full Stack Developer",
      "MCA Student",
      "React Developer",
      "Next.js Developer",
      "Python Developer",
      "PHP Developer",
      "AI ML Research",
      "Computer Science",
      "Techno College Hooghly",
      "University of Kalyani",
      "West Bengal",
      "India",
    ],
  };
}