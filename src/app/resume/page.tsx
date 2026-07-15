"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar, Footer, Background } from "@/components/common";
import { nasalization } from "@/app/fonts";
import { PDFErrorBoundary } from "@/components/PDFErrorBoundary";
import {
  HiDownload,
  HiOutlineArrowsExpand,
  HiExternalLink,
  HiX,
} from "react-icons/hi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Resume() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const PDF_URL = "/docs/Jit_Resume.pdf";

  // Lock body scroll when fullscreen overlay is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen selection:bg-primary/20 ${nasalization.className}`}>
      <Background />
      <Navbar />

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-black/80 border-b border-white/10">
              <span className="text-white font-medium text-sm">Resume — Fullscreen</span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors text-sm"
              >
                <HiX className="w-4 h-4" />
                Exit Fullscreen
              </button>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 w-full">
              <iframe
                src={`${PDF_URL}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
                width="100%"
                height="100%"
                className="border-0"
                title="Resume PDF Fullscreen"
                style={{ background: "#ffffff" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-400 to-red-200 mb-2">
              Resume
            </h1>
            <p className="text-muted-foreground">
              Explore my resume showcasing education, projects, technical skills, and experience.
            </p>
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
            <motion.button
              onClick={() => setIsFullscreen(true)}
              className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-colors duration-200 border border-red-600/40 bg-card/30 hover:bg-red-600/10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <HiOutlineArrowsExpand className="w-4 h-4 text-red-500 relative z-10 pointer-events-none" />
              <span className="text-foreground font-medium relative z-10 pointer-events-none">
                Fullscreen
              </span>
            </motion.button>

            <motion.a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-colors duration-200 border border-red-600/40 bg-card/30 hover:bg-red-600/10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <HiExternalLink className="w-4 h-4 text-red-500 pointer-events-none" />
              <span className="text-foreground font-medium pointer-events-none">
                Open in New Tab
              </span>
            </motion.a>

            <motion.a
              href={PDF_URL}
              download="Jit_Resume.pdf"
              className="group relative flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden transition-colors duration-200 font-medium text-primary-foreground"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                boxShadow: "0 8px 25px hsl(var(--primary) / 0.3)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <HiDownload className="w-4 h-4 relative z-10 pointer-events-none" />
              <span className="relative z-10 pointer-events-none">Download PDF</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl shadow-xl z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-card/30 via-card/20 to-card/30 backdrop-blur-xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-3xl pointer-events-none" />
          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-3xl bg-clip-border pointer-events-none" />

        <PDFErrorBoundary pdfUrl={PDF_URL}>
  <div className="relative w-full rounded-3xl overflow-hidden"
    style={{
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--glass-border))",
      boxShadow: "var(--glass-glow)",
    }}
  >
    {/* Red gradient top accent line */}
    <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
      style={{
        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
      }}
    />

    {/* Corner decorations */}
    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-red-500/50 rounded-tl-sm" />
    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-red-500/50 rounded-tr-sm" />
    <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-red-500/50 rounded-bl-sm" />
    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-red-500/50 rounded-br-sm" />

    <div className="p-3">
      <iframe
        src={`${PDF_URL}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
        width="100%"
        className="border-0 block rounded-2xl shadow-lg"
        title="Resume PDF"
        style={{
          height: "1020px",
          background: "#ffffff",
          display: "block",
        }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  </div>
</PDFErrorBoundary>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}