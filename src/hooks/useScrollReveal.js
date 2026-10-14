import {useEffect} from "react";

// Adds the `in` class to any .reveal element once it scrolls into view.
// Re-run (via the `deps` param) whenever new .reveal nodes mount, e.g. after a tab switch.
export const useScrollReveal = (deps = []) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.15}
    );

    const nodes = document.querySelectorAll(".reveal:not(.in)");
    nodes.forEach(node => observer.observe(node));

    const fallback = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach(node => node.classList.add("in"));
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
