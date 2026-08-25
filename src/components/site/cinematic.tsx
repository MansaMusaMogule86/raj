"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { useLang } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Timecode — small mono metadata text                                */
/* ------------------------------------------------------------------ */
export function Timecode({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`tc ${className}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Chapter number — oversized editorial numeral                       */
/* ------------------------------------------------------------------ */
export function ChapterNumber({ num, className = "" }: { num: string; className?: string }) {
  return <span className={`chapter-num ${className}`}>{num}</span>;
}

/* ------------------------------------------------------------------ */
/* Brass rule — warm divider                                          */
/* ------------------------------------------------------------------ */
export function BrassRule({ className = "" }: { className?: string }) {
  return <div className={`brass-rule ${className}`} role="presentation" />;
}

/* ------------------------------------------------------------------ */
/* Frame marker — corners-only container                              */
/* ------------------------------------------------------------------ */
export function FrameMarker({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`frame-marker ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Section header — chapter-style block                               */
/* ------------------------------------------------------------------ */
export function ChapterHeader({
  chapter,
  kicker,
  title,
  lede,
  align = "start",
}: {
  chapter: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
}) {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-start";
  const reveal: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.1, 1] } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className={`flex flex-col ${alignClass} gap-4`}
    >
      <motion.div variants={reveal} className="flex items-center gap-3">
        <ChapterNumber num={chapter} className="text-brass text-base" />
        <span className="tc">{kicker}</span>
        <motion.span
          className="h-px bg-gradient-to-r from-brass to-ember"
          initial={{ width: reduce ? 40 : 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.2, 0.7, 0.1, 1], delay: reduce ? 0 : 0.2 }}
        />
      </motion.div>
      <motion.h2
        variants={reveal}
        className={`display text-bone text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] sm:leading-[1.0] ${lang === "ar" ? "display-ar" : ""}`}
      >
        {title}
      </motion.h2>
      {lede ? (
        <motion.p variants={reveal} className="max-w-2xl text-base sm:text-lg text-bone/70 leading-relaxed">
          {lede}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Masked text reveal — line by line                                  */
/* ------------------------------------------------------------------ */
export function MaskLine({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={{ y: reduce ? 0 : "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease: [0.2, 0.7, 0.1, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Slow parallax image wrapper                                        */
/* ------------------------------------------------------------------ */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? undefined : "lazy"}
        className={`h-full w-full object-cover ${reduce ? "" : "slow-zoom"} ${imgClassName}`}
        initial={{ scale: reduce ? 1 : 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.1, 1] }}
      />
    </div>
  );
}
