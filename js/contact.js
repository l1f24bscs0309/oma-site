// Contact page: validate the form in the browser before it is sent.
(() => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("#form-status");

  const fields = [
    {
      input: form.querySelector("#n"),
      error: form.querySelector("#err-n"),
      check: (value) =>
        value.trim().length >= 2 ? "" : "Please enter your name.",
    },
    {
      input: form.querySelector("#e"),
      error: form.querySelector("#err-e"),
      check: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
          ? ""
          : "Please enter a valid email address.",
    },
    {
      input: form.querySelector("#m"),
      error: form.querySelector("#err-m"),
      check: (value) =>
        value.trim().length >= 10
          ? ""
          : "Please add a little more detail (at least 10 characters).",
    },
  ];

  const validate = (field) => {
    const message = field.check(field.input.value);
    field.error.textContent = message;
    field.input.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  };

  fields.forEach((field) => {
    field.input.addEventListener("input", () => {
      if (field.input.getAttribute("aria-invalid") === "true") validate(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const results = fields.map(validate);
    const firstInvalid = fields[results.indexOf(false)];

    if (firstInvalid) {
      status.textContent = "Please fix the highlighted fields.";
      status.classList.remove("ok");
      firstInvalid.input.focus();
      return;
    }

    const name = form.querySelector("#n").value.trim();
    status.textContent = `Thanks, ${name}. Your message is on its way — we reply within one working day.`;
    status.classList.add("ok");

    form.reset();
    fields.forEach((field) => {
      field.error.textContent = "";
      field.input.removeAttribute("aria-invalid");
    });
  });
})();
