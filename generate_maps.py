#!/usr/bin/env python3
"""
Generuje obrazki mapy z zaznaczonymi obiektami geograficznymi.
Jeden plik PNG na każdy obiekt w data.js.

Uruchom z katalogu geo-claude:
    python3 generate_maps.py

Wymagania: Pillow (pip install Pillow)
"""

import json
import os
import subprocess
import sys
from PIL import Image, ImageDraw, ImageFont

MAP_PATH    = 'assets/maps/Europe_blank_map.png'
OUTPUT_DIR  = 'assets/maps/answers'
FONT_PATHS  = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/TTF/DejaVuSans-Bold.ttf',
]

# ── Dane z data.js ──────────────────────────────────────────────────────────

def load_categories():
    """Wczytuje CATEGORIES z data.js przez Node.js."""
    script = """
const fs = require('fs');
const code = fs.readFileSync('js/data.js', 'utf8');
const fn = new Function(code + '\\nreturn CATEGORIES;');
process.stdout.write(JSON.stringify(fn()));
"""
    r = subprocess.run(['node', '-e', script], capture_output=True, text=True)
    if r.returncode != 0:
        print('Błąd Node.js:', r.stderr, file=sys.stderr)
        sys.exit(1)
    return json.loads(r.stdout)

# ── Rysowanie markera ────────────────────────────────────────────────────────

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def get_font(size):
    for path in FONT_PATHS:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def draw_marker(draw: ImageDraw.ImageDraw, px: int, py: int,
                color_hex: str, label: str, img_w: int):
    rgb = hex_to_rgb(color_hex)
    r        = max(9,  img_w // 120)   # promień kropki
    font_sz  = max(12, img_w // 95)    # rozmiar fontu
    pad      = max(4,  img_w // 280)   # padding etykiety

    font = get_font(font_sz)

    # --- Cień kropki ---
    sd = max(2, r // 4)
    draw.ellipse([px-r+sd, py-r+sd, px+r+sd, py+r+sd], fill=(0, 0, 0, 90))

    # --- Biała obwódka ---
    bw = max(2, r // 5)
    draw.ellipse([px-r-bw, py-r-bw, px+r+bw, py+r+bw], fill=(255, 255, 255, 255))

    # --- Kolorowa kropka ---
    draw.ellipse([px-r, py-r, px+r, py+r], fill=(*rgb, 255))

    # --- Etykieta ---
    bbox = draw.textbbox((0, 0), label, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    lx = px - tw // 2
    ly = py + r + bw + 4

    # Tło (zaokrąglony prostokąt)
    draw.rounded_rectangle(
        [lx - pad, ly - pad, lx + tw + pad, ly + th + pad],
        radius=max(3, pad),
        fill=(*rgb, 230),
        outline=(255, 255, 255, 200),
        width=1,
    )
    # Tekst
    draw.text((lx, ly), label, fill=(255, 255, 255, 255), font=font)

# ── Generowanie ──────────────────────────────────────────────────────────────

def generate_all():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    base = Image.open(MAP_PATH).convert('RGBA')
    img_w, img_h = base.size
    print(f'Mapa bazowa: {img_w}×{img_h} px')

    categories = load_categories()
    total = 0

    for cat in categories:
        color = cat['color']
        cat_name = cat['name']
        for item in cat['items']:
            px = int(round(item['x'] / 100 * img_w))
            py = int(round(item['y'] / 100 * img_h))

            img  = base.copy()
            draw = ImageDraw.Draw(img, 'RGBA')
            draw_marker(draw, px, py, color, item['name'], img_w)

            out = os.path.join(OUTPUT_DIR, f"{item['id']}.png")
            img.convert('RGB').save(out, 'PNG', optimize=True)
            total += 1
            print(f'  ✓  {item["id"]:28s} ({px:4d},{py:4d})  {cat_name} / {item["name"]}')

    print(f'\nGotowe: {total} obrazków → {OUTPUT_DIR}/')

if __name__ == '__main__':
    generate_all()
