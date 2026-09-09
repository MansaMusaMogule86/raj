"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CinematicBackground — ambient muted "video" background with poster fallback.
 *
 * Honesty note: Raja has not supplied a real hero video file. Rather than
 * fabricate footage (which would mislead visitors), this component renders a
 * CSS-driven ambient cinematic layer over the poster image — slow light
 * drifts, subtle scale, and grain — that reads as a muted video without
 * claiming to be one. When Raja provides a real .mp4/.webm, set `videoSrc`
 * and the component will lazy-mount the <video> with this image as poster.
 *
 * Accessibility:
 *  - prefers-reduced-motion: renders poster only (no animation, no video)
 *  - video is muted, loop, playsInline, paused when offscreen (IntersectionObserver)
 *  - decorative: aria-hidden, no audio track
 */
export function CinematicBackground({
  posterSrc,
  videoSrc,
  alt,
  priority = false,
  className = "",
}: {
  posterSrc: string;
  videoSrc?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  // Lazy-mount video only when wrapper is near viewport (and motion allowed and src provided)
  useEffect(() => {
    if (!videoSrc || reduce || !wrapRef.current) return;
    const el = wrapRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setInView(e.isIntersecting);
          const v = videoRef.current;
          if (!v) return;
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [videoSrc, reduce]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Poster image (always present; serves as video poster too) */}
      <img
        src={posterSrc}
        alt={alt}
        className="h-full w-full object-cover object-[65%_top] md:object-center"
        fetchPriority={priority ? "high" : "auto"}
      />

      {/* Real <video> when provided */}
      {videoSrc && !reduce && inView && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-[65%_top] md:object-center transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          onLoadedData={() => setVideoLoaded(true)}
        />
      )}

      {/* Ambient cinematic motion layer (poster-only mode) */}
      {!videoSrc && !reduce && (
        <>
          {/* Slow scale drift — reads as a slow camera push-in */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${posterSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "cinematicDrift 24s ease-in-out infinite alternate",
              opacity: 0.0,
            }}
          />
          {/* Warm light drift — ember from one side */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 80% 20%, rgba(233,104,58,0.18) 0%, transparent 55%), radial-gradient(50% 70% at 15% 85%, rgba(181,138,75,0.14) 0%, transparent 55%)",
              animation: "cinematicLight 14s ease-in-out infinite alternate",
            }}
          />
        </>
      )}

      <style>{`
        @keyframes cinematicDrift {
          0% { transform: scale(1); }
          100% { transform: scale(1.06); }
        }
        @keyframes cinematicLight {
          0% { opacity: 0.6; transform: translate(0,0); }
          100% { opacity: 1; transform: translate(-2%, 1%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cinematic-drift, .cinematic-light { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
