import { useEffect } from "react";

/**
 * Ajoute la classe reveal-on-scroll--visible aux éléments .reveal-on-scroll
 * lorsqu'ils entrent dans le viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal-on-scroll");
    if (nodes.length === 0) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("reveal-on-scroll--visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-on-scroll--visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
