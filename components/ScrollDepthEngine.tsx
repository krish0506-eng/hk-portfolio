"use client";

import { useEffect } from "react";

// ─── 2D Scroll Reveal Engine ─────────────────────────────────────────────────
// Replaces the 3D perspective depth engine with impressive 2D scroll-driven
// reveal animations: fade + slide-up, stagger for children, parallax on
// decorative blobs — zero 3D transforms.

export default function ScrollDepthEngine() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Tag all sections with the reveal class ──────────────────────────────
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    sections.forEach((section) => {
      section.classList.add("sr-section");
      if (reducedMotion) {
        section.classList.add("sr-visible");
      }
    });

    if (reducedMotion) return;

    // ── Intersection Observer — reveal on enter ─────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            // Stagger direct children tagged with data-sr-child
            const children = entry.target.querySelectorAll<HTMLElement>("[data-sr-child]");
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * 80}ms`;
              child.classList.add("sr-visible");
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.10, rootMargin: "0px 0px -60px 0px" },
    );

    sections.forEach((s) => observer.observe(s));

    // ── Parallax on decorative blobs (translateY only) ─────────────────────
    let raf = 0;
    const blobs = Array.from(document.querySelectorAll<HTMLElement>(".parallax-blob"));

    const updateParallax = () => {
      const scrollY = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = i % 2 === 0 ? 0.12 : -0.09;
        blob.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateParallax();
      });
    };

    updateParallax();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // No visible UI — pure behaviour engine
  return null;
}