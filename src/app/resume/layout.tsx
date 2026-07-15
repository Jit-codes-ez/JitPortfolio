import type { Metadata } from "next";

import { generateResumeStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Resume - Jit Hazra",
  description:
    "View and download Jit Hazra's professional resume. MCA student and Full Stack Developer with interests in Cybersecurity, Quantum Cryptography, AI, and Web Development.",

  keywords: [
    "Jit Hazra Resume",
    "Jit Hazra CV",
    "Jit Hazra Portfolio",
    "MCA Student Resume",
    "Full Stack Developer Resume",
    "Cybersecurity Resume",
    "Quantum Cryptography",
    "Web Developer India",
  ],

  openGraph: {
    title: "Resume - Jit Hazra",
    description:
      "View and download Jit Hazra's professional resume showcasing projects, technical skills, education, and experience.",

    url: "https://jit.vercel.app/resume",

    siteName: "Jit Hazra",

    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Jit Hazra Resume",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Resume - Jit Hazra",

    description:
      "View Jit Hazra's professional resume featuring his projects, technical skills, and educational background.",

    images: ["/images/thumbnail.png"],
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resumeStructuredData = generateResumeStructuredData();

  return (
    <>
      <link
        rel="preload"
        href="/docs/Jit_resume.pdf"
        as="fetch"
        type="application/pdf"
        crossOrigin="anonymous"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resumeStructuredData),
        }}
      />

      {children}
    </>
  );
}