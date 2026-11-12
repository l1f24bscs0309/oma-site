// Process page: reading progress bar and the step you are on.
(() => {
  const bar = document.querySelector(".read-progress span");

  if (bar) {
    let queued = false;

    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      queued = false;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  const steps = document.querySelectorAll(".steps li");
  if (steps.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    steps.forEach((step) => observer.observe(step));
  }
})();
