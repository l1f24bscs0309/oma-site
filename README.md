# Oma Ceramics

A small studio site for hand-thrown stoneware: mugs, bowls, plates, vases and pitchers. Seven hand-built pages, plain HTML, CSS and JavaScript — no framework, no build step, no dependencies to install.

The illustrations of the vessels are drawn entirely in CSS, and the page-specific scripts add the interactions each page needs.

## Pages

| Page | File | What's on it |
| --- | --- | --- |
| Home | `index.html` | Hero, shelf of vessels, four featured shapes, studio promises, wholesale band |
| Shop | `shop.html` | Six products with category filters and a live result count |
| Product | `product.html` | Morning mug detail page with a glaze picker, specs and order link |
| Process | `process.html` | Six-step making process with a reading progress bar and active-step highlight |
| Care | `care.html` | Care guide written as a five-question accordion |
| About | `about.html` | Studio story, values and a live open/closed status for Saturday hours |
| Contact | `contact.html` | Studio details and a contact form with client-side validation |

## Interactions

Every page loads one deferred script from `js/`. Nothing is loaded from a CDN or package manager.

| Script | Loaded by | Behaviour |
| --- | --- | --- |
| `js/index.js` | Home | Reveals below-the-fold sections and tiles as they scroll into view; respects `prefers-reduced-motion` and leaves above-the-fold content visible immediately |
| `js/shop.js` | Shop | Chip buttons filter the product grid using `data-category`, update the "Showing X of Y pieces" count, and keep `aria-pressed` in sync |
| `js/product.js` | Product | Glaze swatch buttons recolor the large vessel and rewrite the "Also in…" note |
| `js/process.js` | Process | Scroll-linked progress bar plus the step nearest the viewport centre gets a highlighted number |
| `js/care.js` | Care | Accessible accordion: animated height, `aria-expanded`, one answer open at a time, `Enter`/`Space` support via native buttons |
| `js/contact.js` | Contact | Validates name, email and message on submit, shows inline errors, focuses the first invalid field, and shows a success message |
| `js/about.js` | About | Computes "Open now" / "Closed now" from the visitor's local time (Saturdays 11am–5pm) and refreshes every minute |

Notes:

- The contact form has `novalidate` and validates in the browser only; it does not post to a backend (`action="#"`).
- All "Order", product and shop cards currently link to `product.html` or `contact.html`; there is no cart or checkout.
- The studio hours, address, email and prices are demo content.

## Project structure

```
oma-site/
├── index.html
├── shop.html
├── product.html
├── process.html
├── care.html
├── about.html
├── contact.html
├── css/
│   ├── base.css      # tokens, typography, layout, buttons, header/footer, CSS vessels
│   ├── index.css
│   ├── shop.css
│   ├── product.css
│   ├── process.css
│   ├── care.css
│   ├── about.css
│   └── contact.css
├── js/
│   ├── index.js
│   ├── shop.js
│   ├── product.js
│   ├── process.js
│   ├── care.js
│   ├── about.js
│   └── contact.js
└── README.md
```

`base.css` holds everything shared; each page then loads its own stylesheet for page-specific layout. Scripts are plain IIFEs with no globals.

## Running it

Opening `index.html` directly in a browser works. For a local server (recommended if you later add fetch or modules):

```bash
cd oma-site
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

An internet connection is needed for the two Google Fonts (Young Serif and DM Sans). Everything else is local.

## Design tokens

Defined once in `css/base.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#edefea` | Page background |
| `--ink` | `#1d2b3a` | Text, buttons, footer |
| `--cobalt` | `#2f4b7c` | Glaze, accents |
| `--celadon` | `#a8c3b1` | Glaze, wholesale band |
| `--ochre` | `#d8a23a` | Glaze, active process step |
| `--plum` | `#6b3a4e` | Glaze |
| `--line` | `#c9cec6` | Borders and dividers |
| `--serif` | Young Serif | Headings |
| `--sans` | DM Sans | Body and UI |

Glazes share four utility classes — `g-cobalt`, `g-celadon`, `g-ochre`, `g-plum` — used by both the CSS vessel shapes and the product swatches.

## Accessibility and responsiveness

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and a single `h1` per page.
- Visible focus styles come from `base.css` (`:focus-visible`).
- Interactive controls are real `<button>` elements with `aria-pressed` / `aria-expanded` and `aria-controls` where relevant.
- Motion is disabled when `prefers-reduced-motion: reduce` is set (reveal animation, accordion transition).
- Layouts switch to a single column below 700–800px; the nav and CTA rows wrap.

## Editing content

- **Add a shop product:** copy a card inside `.list` in `shop.html` and add `data-category="drinkware|tableware|vases"` so the chips can find it. The count updates automatically.
- **Add a glaze:** add a `g-*` class in `base.css`, a button with `data-glaze`/`data-glaze-name` in `product.html`, and the matching gradient rules.
- **Add a care question:** copy an `.acc-item` block in `care.html`, give the panel a unique `id`, point the button's `aria-controls` at it, and set `aria-expanded="false"` plus `hidden` on the panel.
- **Change studio hours:** update the visible text in `about.html` and the day/hour check at the top of `js/about.js`.

## Browser support

Current Chrome, Safari, Firefox and Edge. The scripts use `IntersectionObserver`, `classList`, `dataset`, template strings and CSS transitions; without JavaScript the pages still render, though the care answers are collapsed with the `hidden` attribute.
