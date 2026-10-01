"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { nasalization } from "@/app/fonts";
import { CertificateCard } from "../Cards";
import { certificatesData } from "@/constant";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

export const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      ref={ref}
      id="certificates"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Subtle separator glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-lg h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="mx-auto px-4 lg:px-8 relative">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className={`${nasalization.className} text-4xl md:text-5xl font-bold text-primary`}
            variants={containerVariants}
          >
            My Certificates
          </motion.h2>
          <motion.p
            className="text-xs text-muted-foreground max-w-2xl mx-auto mt-4"
            variants={containerVariants}
          >
            A collection of certifications and credentials that showcase my skills and expertise
          </motion.p>
        </motion.div>

        {/* Lenticular Carousel CertificateCard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CertificateCard items={certificatesData} />
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
