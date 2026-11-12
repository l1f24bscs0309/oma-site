// Product page: let the visitor preview each glaze.
(() => {
  const swatches = [...document.querySelectorAll(".sw [data-glaze]")];
  const stageVessel = document.querySelector(".stage .vessel");
  const note = document.querySelector("[data-glaze-note]");
  if (!swatches.length || !stageVessel || !note) return;

  const lowerName = (button) => button.dataset.glazeName.toLowerCase();

  const select = (chosen) => {
    swatches.forEach((button) => {
      button.setAttribute("aria-pressed", String(button === chosen));
    });

    [...stageVessel.classList].forEach((className) => {
      if (className.startsWith("g-")) stageVessel.classList.remove(className);
    });
    stageVessel.classList.add(`g-${chosen.dataset.glaze}`);

    const others = swatches
      .filter((button) => button !== chosen)
      .map(lowerName);
    const list =
      others.length > 1
        ? `${others.slice(0, -1).join(", ")} and ${others[others.length - 1]}`
        : others[0] || "";

    note.textContent = `${chosen.dataset.glazeName} shown. Also in ${list}.`;
  };

  swatches.forEach((button) => {
    button.addEventListener("click", () => select(button));
  });
})();
