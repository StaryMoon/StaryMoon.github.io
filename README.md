# Minghao Liu

Minimal academic homepage for Minghao Liu, Ph.D. student at Peking University.

<p align="center">
  <img src="assets/homepage-preview.png" width="860" alt="Minghao Liu homepage preview">
</p>

> Preview image source: the public GitHub Pages site at https://starymoon.github.io/.

The site is intentionally plain HTML, CSS, and JavaScript. It replaces the old
heavy Jekyll template with a small static page that is easy to maintain and fast
on GitHub Pages.

## Structure

- `index.html` - profile content, publications, honors, and contact links.
- `speedcraft.html` - niche game and mechanical puzzle notes.
- `styles.css` - visual system and responsive layout.
- `script.js` - lightweight deraining-inspired canvas sketch.
- `assets/minghao-liu.jpg` - profile image.

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Updating Content

Most edits are in `index.html`:

- Update publications in the `#publications` section.
- Update awards in the `#honors` section.
- Update links in the hero and footer.
- Update niche game notes in `speedcraft.html`.

No build step is required.
