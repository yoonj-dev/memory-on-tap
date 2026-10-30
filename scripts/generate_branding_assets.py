#!/usr/bin/env python3
import os
import math
from PIL import Image, ImageDraw

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

# 1. Favicon SVG
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="memGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="50%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="#090d16"/>
  <!-- Silicon Chip Outline -->
  <rect x="116" y="116" width="280" height="280" rx="44" fill="#0f172a" stroke="url(#memGrad)" stroke-width="14" filter="url(#glow)"/>
  
  <!-- HBM 3D Stacks (4 Die Blocks) -->
  <rect x="156" y="156" width="88" height="88" rx="16" fill="#10b981" fill-opacity="0.9" />
  <rect x="268" y="156" width="88" height="88" rx="16" fill="#06b6d4" fill-opacity="0.9" />
  <rect x="156" y="268" width="88" height="88" rx="16" fill="#06b6d4" fill-opacity="0.9" />
  <rect x="268" y="268" width="88" height="88" rx="16" fill="#3b82f6" fill-opacity="0.9" />
  
  <!-- Interconnect Bus (TSV Micro-bumps) -->
  <circle cx="256" cy="200" r="8" fill="#ffffff" />
  <circle cx="256" cy="312" r="8" fill="#ffffff" />
  <circle cx="200" cy="256" r="8" fill="#ffffff" />
  <circle cx="312" cy="256" r="8" fill="#ffffff" />
  <circle cx="256" cy="256" r="14" fill="#38bdf8" />
  
  <!-- Outer Pins -->
  <line x1="200" y1="80" x2="200" y2="116" stroke="#10b981" stroke-width="12" stroke-linecap="round"/>
  <line x1="256" y1="80" x2="256" y2="116" stroke="#06b6d4" stroke-width="12" stroke-linecap="round"/>
  <line x1="312" y1="80" x2="312" y2="116" stroke="#3b82f6" stroke-width="12" stroke-linecap="round"/>
  
  <line x1="200" y1="396" x2="200" y2="432" stroke="#10b981" stroke-width="12" stroke-linecap="round"/>
  <line x1="256" y1="396" x2="256" y2="432" stroke="#06b6d4" stroke-width="12" stroke-linecap="round"/>
  <line x1="312" y1="396" x2="312" y2="432" stroke="#3b82f6" stroke-width="12" stroke-linecap="round"/>

  <line x1="80" y1="200" x2="116" y2="200" stroke="#10b981" stroke-width="12" stroke-linecap="round"/>
  <line x1="80" y1="256" x2="116" y2="256" stroke="#06b6d4" stroke-width="12" stroke-linecap="round"/>
  <line x1="80" y1="312" x2="116" y2="312" stroke="#3b82f6" stroke-width="12" stroke-linecap="round"/>

  <line x1="396" y1="200" x2="432" y2="200" stroke="#10b981" stroke-width="12" stroke-linecap="round"/>
  <line x1="396" y1="256" x2="432" y2="256" stroke="#06b6d4" stroke-width="12" stroke-linecap="round"/>
  <line x1="396" y1="312" x2="432" y2="312" stroke="#3b82f6" stroke-width="12" stroke-linecap="round"/>
</svg>'''

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w") as f:
    f.write(svg_content)

def draw_memory_icon(size):
    img = Image.new("RGBA", (size, size), (9, 13, 22, 255))
    draw = ImageDraw.Draw(img)
    scale = size / 512.0
    
    # Outer rounded box
    box_pad = int(116 * scale)
    box_size = size - (box_pad * 2)
    radius = int(44 * scale)
    draw.rounded_rectangle(
        [box_pad, box_pad, box_pad + box_size, box_pad + box_size],
        radius=radius,
        fill=(15, 23, 42, 255),
        outline=(6, 182, 212, 255),
        width=max(2, int(12 * scale))
    )
    
    # 4 Die stacks
    d_size = int(88 * scale)
    p1 = int(156 * scale)
    p2 = int(268 * scale)
    r_die = max(2, int(16 * scale))
    
    draw.rounded_rectangle([p1, p1, p1 + d_size, p1 + d_size], radius=r_die, fill=(16, 185, 129, 230))
    draw.rounded_rectangle([p2, p1, p2 + d_size, p1 + d_size], radius=r_die, fill=(6, 182, 212, 230))
    draw.rounded_rectangle([p1, p2, p1 + d_size, p2 + d_size], radius=r_die, fill=(6, 182, 212, 230))
    draw.rounded_rectangle([p2, p2, p2 + d_size, p2 + d_size], radius=r_die, fill=(59, 130, 246, 230))
    
    # Center node
    c = size // 2
    r_c = max(3, int(14 * scale))
    draw.ellipse([c - r_c, c - r_c, c + r_c, c + r_c], fill=(56, 189, 248, 255))
    
    return img

img_512 = draw_memory_icon(512)
img_512.save(os.path.join(PUBLIC_DIR, "icon-512.png"))

img_192 = draw_memory_icon(192)
img_192.save(os.path.join(PUBLIC_DIR, "icon-192.png"))

img_180 = draw_memory_icon(180)
img_180.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"))

img_32 = draw_memory_icon(32)
img_32.save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO", sizes=[(32, 32)])

# Open Graph image (1200x630)
og_img = Image.new("RGBA", (1200, 630), (9, 13, 22, 255))
draw_og = ImageDraw.Draw(og_img)

# Background subtle grid & gradient glow
for x in range(0, 1200, 60):
    draw_og.line([x, 0, x, 630], fill=(15, 23, 42, 100), width=1)
for y in range(0, 630, 60):
    draw_og.line([0, y, 1200, y], fill=(15, 23, 42, 100), width=1)

# Center Icon paste
icon_center = draw_memory_icon(240)
og_img.paste(icon_center, (120, 195), icon_center)

og_img.save(os.path.join(PUBLIC_DIR, "og-image.png"))
print("Memory on Tap branding assets generated successfully!")
