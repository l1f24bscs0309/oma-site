// About page: show whether the studio is open right now.
(() => {
  const badge = document.querySelector("[data-studio-status]");
  if (!badge) return;

  const update = () => {
    const now = new Date();
    const open =
      now.getDay() === 6 && now.getHours() >= 11 && now.getHours() < 17;

    badge.textContent = open ? "Open now" : "Closed now";
    badge.classList.toggle("open", open);
    badge.classList.toggle("shut", !open);
    badge.title = open
      ? "The studio is open until 5pm."
      : "The studio opens Saturday at 11am.";
  };

  update();
  window.setInterval(update, 60000);
})();
