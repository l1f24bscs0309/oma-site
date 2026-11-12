// Shop page: filter the product list with the chips.
(() => {
  const chips = [...document.querySelectorAll(".chips [data-filter]")];
  const cards = [...document.querySelectorAll(".list a[data-category]")];
  const count = document.querySelector("[data-count]");
  if (!chips.length || !cards.length) return;

  const apply = (filter) => {
    let shown = 0;

    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.hidden = !match;
      if (match) shown += 1;
    });

    chips.forEach((chip) => {
      const active = chip.dataset.filter === filter;
      chip.classList.toggle("on", active);
      chip.setAttribute("aria-pressed", String(active));
    });

    if (count) {
      count.textContent = `Showing ${shown} of ${cards.length} pieces`;
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => apply(chip.dataset.filter));
  });

  apply("all");
})();
