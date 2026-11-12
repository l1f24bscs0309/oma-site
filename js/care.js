// Care page: accessible accordion for the questions.
(() => {
  const root = document.querySelector("[data-accordion]");
  if (!root) return;

  const items = [...root.querySelectorAll(".acc-item")];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const parts = (item) => ({
    button: item.querySelector(".acc-btn"),
    panel: item.querySelector(".acc-panel"),
  });

  const isOpen = (button) => button.getAttribute("aria-expanded") === "true";

  const open = (item) => {
    const { button, panel } = parts(item);
    button.setAttribute("aria-expanded", "true");
    panel.hidden = false;

    if (reduceMotion) {
      panel.style.height = "auto";
      return;
    }

    const height = panel.scrollHeight;
    panel.style.height = "0px";
    panel.offsetHeight; // register the starting height before animating
    panel.style.height = `${height}px`;

    panel.addEventListener("transitionend", function settle(event) {
      if (event.propertyName !== "height") return;
      panel.removeEventListener("transitionend", settle);
      if (isOpen(button)) panel.style.height = "auto";
    });
  };

  const close = (item) => {
    const { button, panel } = parts(item);
    button.setAttribute("aria-expanded", "false");

    if (reduceMotion) {
      panel.hidden = true;
      panel.style.height = "0px";
      return;
    }

    panel.style.height = `${panel.scrollHeight}px`;
    panel.offsetHeight;
    panel.style.height = "0px";

    panel.addEventListener("transitionend", function settle(event) {
      if (event.propertyName !== "height") return;
      panel.removeEventListener("transitionend", settle);
      if (!isOpen(button)) {
        panel.hidden = true;
        panel.style.height = "0px";
      }
    });
  };

  items.forEach((item) => {
    const { button, panel } = parts(item);
    const expanded = isOpen(button);

    panel.hidden = !expanded;
    panel.style.height = expanded ? "auto" : "0px";

    button.addEventListener("click", () => {
      if (isOpen(button)) {
        close(item);
        return;
      }

      // Accordion behaviour: only one answer open at a time.
      items.forEach((other) => {
        if (other !== item && isOpen(parts(other).button)) close(other);
      });
      open(item);
    });
  });
})();
