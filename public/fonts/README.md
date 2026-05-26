# Brand font — Obra Letra

The whole site is wired to use **Obra Letra** (see the `@font-face` block in
`app/globals.css` and `fontFamily` in `tailwind.config.ts`). Until the font
files are dropped here, the site falls back to a serif (Georgia → serif).

## Drop the font files here

Download Obra Letra (a.k.a. "KC Obra Letra") and place the files in this folder
with **exactly these names**:

```
public/fonts/ObraLetra-Regular.woff2   (or .woff / .ttf)
public/fonts/ObraLetra-Bold.woff2      (or .woff / .ttf)
```

- `.woff2` is best for the web. If you only have a `.ttf`/`.otf`, you can either
  rename it to `ObraLetra-Regular.ttf` (the CSS already lists `.ttf` as a
  fallback) or convert it to woff2 (e.g. https://cloudconvert.com/ttf-to-woff2).
- Only Regular + Bold exist for this typeface; that's all the CSS expects.

No code change needed after adding the files — just commit & redeploy.

## Licensing note
Obra Letra is a paid display typeface by Lorenzo Martinez
(https://lurinzu.gumroad.com/l/OBLTRA). For a commercial store, use a properly
licensed copy rather than an unofficial free mirror.
