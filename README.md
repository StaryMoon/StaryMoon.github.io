# Minghao Liu

Minimal academic homepage for Minghao Liu, Ph.D. student at Peking University.

The site is intentionally plain HTML, CSS, and JavaScript. It replaces the old
heavy Jekyll template with a small static page that is easy to maintain and fast
on GitHub Pages.

## Structure

- `index.html` - profile content, publications, honors, and contact links.
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

No build step is required.
