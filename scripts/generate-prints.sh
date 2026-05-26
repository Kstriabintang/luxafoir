#!/usr/bin/env bash
# Generates the LUXAFOIR product mockups in public/products/.
# Takes clean free-to-use Pexels product photos (black/white tees, no models,
# white background) and composites the LUXAFOIR screen-print graphic onto the
# chest — producing Sculptor-style premium product-only mockups, strictly black
# & white garments, fully self-hosted (no fragile hotlinks).
#
# Requires: ImageMagick 7 (`magick`), curl, a bold sans font.
# Run from repo root:  bash scripts/generate-prints.sh
set -euo pipefail

OUT="$(dirname "$0")/../public/products"
mkdir -p "$OUT"
cd "$OUT"

F=/usr/share/fonts/liberation/LiberationSans-Bold.ttf
WI="rgba(255,255,255,0.96)"; WI2="rgba(255,255,255,0.9)"
BI="rgba(20,20,20,0.93)";    BI2="rgba(20,20,20,0.82)"

dl(){ curl -s -o "$1" "https://images.pexels.com/photos/$2/pexels-photo-$2.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=1333"; }

# Bases (product-only, clean white bg, verified black/white garments)
dl _blk.jpg 8532616     # black tee, full front, hanger on white wall
dl _wa.jpg  12025472    # white tee, full front flat lay
dl _wb.jpg  11671964    # white tee, full front on hanger

# Alt / detail shots (plain, no print)
dl void-alt.jpg     8532616
dl specter-alt.jpg  8532638   # black neckline detail
dl riot-alt.jpg     8532611   # black tee on hanger held
dl corrupt-alt.jpg  18186105  # folded black + white pair
dl phantom-alt.jpg  11671964
dl static-alt.jpg   12025472
dl staple-alt.jpg   12025472
dl fragment-alt.jpg 2112651

# Mild zoom variants so the single black base doesn't read as a repeat
zoom(){ magick "$1" -resize "$3%" -gravity center -extent 1000x1333 "$2"; }
zoom _blk.jpg _blk_s.jpg 108
zoom _blk.jpg _blk_r.jpg 104
zoom _blk.jpg _blk_c.jpg 112

# ── Fronts: garment + LUXAFOIR chest print ──────────────────────────
magick _blk.jpg -gravity center -font "$F" \
  -fill "$WI" -pointsize 19 -kerning 5 -annotate +0-118 "EST. 2026 · JAKARTA" \
  -pointsize 66 -kerning 7 -annotate +0-50 "LUXAFOIR" \
  -pointsize 18 -kerning 4 -annotate +0+30 "PREMIUM HEAVYWEIGHT DIVISION" \
  -quality 88 -strip void-front.jpg

magick _blk_s.jpg -gravity center -font "$F" \
  -fill "$WI" -pointsize 96 -kerning 14 -annotate +0-55 "LXFR" \
  -fill "$WI2" -pointsize 17 -kerning 3 -annotate +0+35 "SPECTER — 001 / BOXY HEAVYWEIGHT" \
  -quality 88 -strip specter-front.jpg

magick _blk_r.jpg -gravity center -font "$F" \
  -fill "$WI2" -pointsize 18 -kerning 6 -annotate +0-112 "SKENA UNIFORM" \
  -fill "$WI" -pointsize 98 -kerning 9 -annotate +0-42 "RIOT" \
  -fill "$WI2" -pointsize 18 -kerning 5 -annotate +0+48 "MADE IN INDONESIA" \
  -quality 88 -strip riot-front.jpg

magick _blk_c.jpg -gravity center -font "$F" \
  -fill "$WI" -pointsize 60 -kerning 6 -annotate +0-30 "CORRUPT" \
  -fill "$WI2" -pointsize 18 -kerning 4 -annotate +0+35 "△  LUXAFOIR DIVISION  △" \
  -quality 88 -strip corrupt-front.jpg

magick _wa.jpg -gravity center -font "$F" \
  -fill "$BI" -pointsize 19 -kerning 5 -annotate +0-118 "EST. 2026 · JAKARTA" \
  -pointsize 66 -kerning 7 -annotate +0-50 "LUXAFOIR" \
  -pointsize 18 -kerning 4 -annotate +0+30 "PREMIUM BOXY DIVISION" \
  -quality 88 -strip phantom-front.jpg

magick _wb.jpg -gravity center -font "$F" \
  -fill "$BI" -pointsize 92 -kerning 14 -annotate +0-50 "LXFR" \
  -fill "$BI2" -pointsize 17 -kerning 3 -annotate +0+38 "STATIC — 002 / BOXY HEAVYWEIGHT" \
  -quality 88 -strip static-front.jpg

magick _wa.jpg -gravity center -font "$F" \
  -fill "$BI2" -pointsize 17 -kerning 5 -annotate +0-110 "HEAVYWEIGHT 280GSM" \
  -fill "$BI" -pointsize 56 -kerning 5 -annotate +0-40 "FRAGMENT" \
  -fill "$BI2" -pointsize 18 -kerning 5 -annotate +0+40 "MADE IN INDONESIA" \
  -quality 88 -strip fragment-front.jpg

magick _wb.jpg -gravity center -font "$F" \
  -fill "$BI" -pointsize 52 -kerning 6 -annotate +0-20 "LUXAFOIR" \
  -fill "$BI2" -pointsize 17 -kerning 4 -annotate +0+33 "®  BOXY ESSENTIALS" \
  -quality 88 -strip staple-front.jpg

rm -f _blk.jpg _wa.jpg _wb.jpg _blk_s.jpg _blk_r.jpg _blk_c.jpg
echo "Generated $(ls -1 ./*-front.jpg | wc -l) fronts + alts in public/products/"
