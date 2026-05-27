# LUXAFOIR type system

Three self-hosted families (see the `@font-face` blocks in `app/globals.css`
and `fontFamily` in `tailwind.config.ts`). Premium editorial-meets-street pairing:

| Role          | Family        | Tailwind class | Used for                                     |
| ------------- | ------------- | -------------- | -------------------------------------------- |
| Display       | Obra Letra    | `font-display` | hero, headings (h1–h6), product names        |
| Body / UI     | Space Grotesk | `font-body`    | paragraphs, buttons, nav, eyebrows (default) |
| Mono / Labels | Space Mono    | `font-mono`    | prices, sizes, quantities, badges, SKU       |

Space Grotesk + Space Mono ship in this folder already (`SpaceGrotesk-latin.woff2`,
`SpaceMono-Regular.woff2`, `SpaceMono-Bold.woff2`) — both SIL OFL, free for
commercial use, downloaded from Google Fonts. No action needed for those.

# Brand display font — Obra Letra

Obra Letra is the **display** family only. Until its files are dropped here,
headings fall back to a serif (Georgia → serif).

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
