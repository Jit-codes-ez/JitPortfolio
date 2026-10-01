"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CertificateItem } from "@/constant";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FiX, FiMaximize2 } from "react-icons/fi";

interface CertificateCardProps {
  items: CertificateItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  items,
  autoplay = true,
  autoplayInterval = 4500,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [cardAspects, setCardAspects] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when fullscreen modal is open
  useEffect(() => {
    if (fullScreenImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullScreenImage]);

  const totalItems = items.length;

  // Preload and detect intrinsic aspect ratio for each certificate (supports landscape & portrait)
  useEffect(() => {
    items.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setCardAspects((prev) => ({
            ...prev,
            [item.id]: img.naturalWidth / img.naturalHeight,
          }));
        }
      };
    });
  }, [items]);

  const nextSlide = useCallback(() => {
    if (totalItems <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    if (totalItems <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Autoplay loop for multiple items
  useEffect(() => {
    if (!autoplay || isPaused || fullScreenImage || totalItems <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, isPaused, fullScreenImage, totalItems, nextSlide]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullScreenImage) {
        if (e.key === "Escape") setFullScreenImage(null);
        return;
      }
      if (totalItems > 1) {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullScreenImage, totalItems, nextSlide, prevSlide]);

  // Calculate mouse position strictly relative to the static card hitbox
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const rawY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    // Clamp to [-1, 1] to prevent edge jitter
    const x = Math.max(-1, Math.min(1, rawX));
    const y = Math.max(-1, Math.min(1, rawY));
    setMousePos({ x, y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (totalItems <= 1) return;
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (totalItems <= 1 || dragStartX === null) return;
    const diff = dragStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setDragStartX(null);
  };

  // 3D positioning for carousel slot when multiple items exist (stationary slot, no jitter)
  const getMultiCardSlotStyle = (index: number) => {
    const count = totalItems;
    let offset = index - activeIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;

    const isActive = offset === 0;
    const isAdjacent = Math.abs(offset) === 1;
    const isVisible = Math.abs(offset) <= 2;

    if (!isVisible) {
      return {
        display: "none",
        transform: "translate(-50%, -50%) scale(0.5) translateZ(-400px)",
        opacity: 0,
        zIndex: 0,
      };
    }

    const xTranslate = offset * 280;
    const zTranslate = -Math.abs(offset) * 110;
    const rotateY = offset * -18;
    const scale = isActive ? 1 : isAdjacent ? 0.88 : 0.75;
    const opacity = isActive ? 1 : isAdjacent ? 0.65 : 0.3;
    const zIndex = 20 - Math.abs(offset) * 5;

    return {
      transform: `translate(calc(-50% + ${xTranslate}px), -50%) translateZ(${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
    };
  };

  // Render Card Content with Anti-Save Shield and Lenticular Sheen
  const renderCardInner = (item: CertificateItem, isActive: boolean) => {
    const sheenX = isActive && isHovered ? 50 + mousePos.x * 20 : 50;
    const sheenY = isActive && isHovered ? 50 + mousePos.y * 20 : 50;

    return (
      <div
        className="relative w-full h-full rounded-2xl p-[2px] transition-all duration-300 overflow-hidden"
        style={{
          background: isActive
            ? "linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.3) 50%, rgba(255, 255, 255, 0.35) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%)",
          boxShadow: isActive
            ? "0 20px 50px -12px rgba(220, 38, 38, 0.4), 0 0 30px 2px rgba(239, 68, 68, 0.25)"
            : "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden bg-black select-none flex items-center justify-center"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Certificate Image (Object-contain ensures full visibility for both vertical and horizontal) */}
          <Image
            src={item.image}
            alt="Certificate"
            fill
            sizes="(max-width: 640px) 340px, (max-width: 768px) 460px, 560px"
            className="object-contain p-1.5 transition-transform duration-500 pointer-events-none select-none"
            priority={isActive}
            draggable={false}
          />

          {/* Anti-Save Transparent Security Shield Overlay (Blocks right-click save and dragging) */}
          <div
            className="absolute inset-0 z-10 select-none bg-transparent"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />

          {/* Lenticular Ribbed Lens Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15 z-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.08) 2px,
                rgba(255, 255, 255, 0.08) 4px
              )`,
            }}
          />

          {/* Lenticular Specular Sheen */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-10"
            style={{
              opacity: isActive && isHovered ? 0.32 : 0.06,
              background: `radial-gradient(
                circle at ${sheenX}% ${sheenY}%,
                rgba(255, 255, 255, 0.75) 0%,
                rgba(239, 68, 68, 0.35) 35%,
                transparent 70%
              )`,
              mixBlendMode: "color-dodge",
            }}
          />

          {/* Angle Reflection Stripe */}
          <div
            className="absolute -inset-full pointer-events-none transition-transform duration-150 opacity-15 z-10"
            style={{
              background: `linear-gradient(
                ${115 + (isHovered ? mousePos.x * 10 : 0)}deg,
                transparent 40%,
                rgba(255, 255, 255, 0.5) 48%,
                rgba(239, 68, 68, 0.6) 52%,
                transparent 64%
              )`,
              transform: `translateX(${isHovered ? mousePos.x * 15 : 0}px)`,
            }}
          />

          {/* Hover Maximize Overlay Indicator */}
          <div
            className={`absolute inset-0 z-20 flex items-center justify-center bg-black/35 transition-all duration-200 pointer-events-none backdrop-blur-[1px] ${
              isActive && isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 border border-red-500/40 text-white shadow-2xl text-xs font-mono backdrop-blur-md transition-all duration-200 ${
                isActive && isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <FiMaximize2 className="w-4 h-4 text-red-400" />
              <span>Click to Maximize</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative w-full overflow-hidden select-none py-4 ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        WebkitTouchCallout: "none",
        userSelect: "none",
      }}
    >
      {/* CASE 1: Single Certificate */}
      {totalItems === 1 ? (
        <div className="flex items-center justify-center py-2 px-4">
          {(() => {
            const aspect = cardAspects[items[0].id] || 1.414;
            const isPortrait = aspect < 1;

            return (
              <div
                onClick={() => setFullScreenImage(items[0].image)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setMousePos({ x: 0, y: 0 });
                }}
                onMouseMove={handleCardMouseMove}
                style={{
                  perspective: "1000px",
                  aspectRatio: `${aspect}`,
                }}
                className={`group relative w-full ${
                  isPortrait
                    ? "max-w-[340px] sm:max-w-[380px]"
                    : "max-w-[560px]"
                } rounded-2xl cursor-pointer select-none mx-auto`}
                onContextMenu={(e) => e.preventDefault()}
              >
                {/* Visual 3D Tilt Container */}
                <div
                  className="w-full h-full rounded-2xl pointer-events-none"
                  style={{
                    transform: `rotateY(${isHovered ? mousePos.x * 5 : 0}deg) rotateX(${isHovered ? mousePos.y * -4 : 0}deg)`,
                    transformStyle: "preserve-3d",
                    transition: isHovered
                      ? "transform 0.1s ease-out"
                      : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {renderCardInner(items[0], true)}
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* CASE 2: Multiple Certificates (3D Perspective Lenticular Carousel) */
        <>
          <div
            className="relative h-[380px] sm:h-[440px] md:h-[480px] w-full overflow-hidden flex items-center justify-center mx-auto"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const aspect = cardAspects[item.id] || 1.414;
              const isPortrait = aspect < 1;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isActive) {
                      setFullScreenImage(item.image);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  onMouseEnter={() => {
                    if (isActive) setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (isActive) {
                      setIsHovered(false);
                      setMousePos({ x: 0, y: 0 });
                    }
                  }}
                  onMouseMove={(e) => {
                    if (isActive) handleCardMouseMove(e);
                  }}
                  style={{
                    ...getMultiCardSlotStyle(index),
                    aspectRatio: `${aspect}`,
                  }}
                  className={`group absolute top-1/2 left-1/2 ${
                    isPortrait
                      ? "w-[240px] sm:w-[290px] md:w-[330px]"
                      : "w-[320px] sm:w-[440px] md:w-[540px]"
                  } rounded-2xl cursor-pointer select-none`}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {/* Subtle 3D tilt on active carousel card */}
                  <div
                    className="w-full h-full rounded-2xl pointer-events-none"
                    style={{
                      transform:
                        isActive && isHovered
                          ? `rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -4}deg)`
                          : "none",
                      transformStyle: "preserve-3d",
                      transition: isHovered
                        ? "transform 0.1s ease-out"
                        : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {renderCardInner(item, isActive)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-8 relative z-30">
            <button
              onClick={prevSlide}
              aria-label="Previous Certificate"
              className="p-3 rounded-full bg-card/80 border border-glass-border hover:border-red-500/60 hover:bg-red-600/10 text-foreground/80 hover:text-red-400 transition-all duration-200 shadow-lg backdrop-blur-md hover:scale-105 active:scale-95"
            >
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to certificate ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_12px_rgba(239,68,68,0.7)]"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next Certificate"
              className="p-3 rounded-full bg-card/80 border border-glass-border hover:border-red-500/60 hover:bg-red-600/10 text-foreground/80 hover:text-red-400 transition-all duration-200 shadow-lg backdrop-blur-md hover:scale-105 active:scale-95"
            >
              <HiOutlineChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      {/* Full-Screen Maximize Modal Lightbox (Rendered via Portal directly into document.body to bypass section overflow & transforms) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {fullScreenImage && (
              <motion.div
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/92 backdrop-blur-xl select-none cursor-zoom-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullScreenImage(null)}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  WebkitTouchCallout: "none",
                  userSelect: "none",
                }}
              >
                {/* Floating Close Button in Screen Corner - Completely Clear of Certificate */}
                <button
                  onClick={() => setFullScreenImage(null)}
                  className="fixed top-5 right-5 sm:top-7 sm:right-7 z-[100000] flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/95 border border-white/20 text-white hover:text-red-400 hover:border-red-500/70 hover:bg-neutral-800 transition-all duration-200 shadow-2xl backdrop-blur-md text-xs font-mono cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Close Fullscreen"
                >
                  <FiX className="w-4 h-4 text-red-400" />
                  <span>Close</span>
                  <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-white/60 ml-0.5">
                    ESC
                  </kbd>
                </button>

                {/* ESC Key & Backdrop Hint (Subtle bottom floating indicator) */}
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100000] px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-white/50 pointer-events-none backdrop-blur-md hidden sm:block">
                  Click anywhere outside or press <span className="text-white/80">ESC</span> to close
                </div>

                {/* Certificate Frame: Perfectly Centered, Intrinsic Size, Never Overflows, Supports Portrait & Landscape */}
                <motion.div
                  className="relative flex items-center justify-center cursor-default select-none max-w-full max-h-full"
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src={fullScreenImage}
                    alt="Certificate Fullscreen"
                    style={{
                      maxHeight: "78vh",
                      maxWidth: "84vw",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    className="rounded-2xl shadow-[0_0_90px_rgba(0,0,0,0.95),0_0_40px_rgba(239,68,68,0.25)] border border-white/25 block pointer-events-none select-none"
                    draggable={false}
                  />

                  {/* Anti-Save Transparent Security Shield Overlay */}
                  <div
                    className="absolute inset-0 z-30 select-none bg-transparent rounded-2xl"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default CertificateCard;
