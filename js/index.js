// Home page: reveal content as it scrolls into view.
(() => {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll("main section, .picks .grid a")
    .forEach((element) => {
      // Leave anything already on screen alone so nothing flashes on load.
      if (element.getBoundingClientRect().top <= window.innerHeight * 0.9) {
        return;
      }

      element.classList.add("reveal");

      if (element.matches(".grid a")) {
        const tileIndex = [...element.parentElement.children].indexOf(element);
        element.style.transitionDelay = `${Math.min(tileIndex, 3) * 70}ms`;
      }

      observer.observe(element);
    });
})();
