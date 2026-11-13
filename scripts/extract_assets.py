#!/usr/bin/env python3
"""Extract authentic brand photos from Elchi Studio Bali PDF documents.
Crops proportional regions (verified visually), saves to public/images/.
Also builds a contact sheet for single-read visual verification."""
import os
from PIL import Image, ImageDraw, ImageOps

SRC = "/home/z/my-project/upload/elchiestudiobalidoc"
OUT = "/home/z/my-project/public/images"
TMP = "/home/z/my-project/scripts/tmp_extract"
os.makedirs(OUT, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

# 1) Render PDF pages at 150 dpi
elchi_pdf = os.path.join(SRC, "Elchi.pdf")
elin_pdf = os.path.join(SRC, "Elin's Classes workshop_20261112_203448_0000.pdf")
for pdf, tag, first, last in [(elchi_pdf, "elchi", "1", "5"), (elin_pdf, "elin", "1", "2")]:
    os.system(f'pdftoppm -r 150 -jpeg -jpegopt quality=92 -f {first} -l {last} "{pdf}" "{TMP}/{tag}"')

files = sorted(os.listdir(TMP))
print("Rendered:", files)

def crop_pct(img, x0, y0, x1, y1):
    W, H = img.size
    return img.crop((int(x0*W), int(y0*H), int(x1*W), int(y1*H)))

results = {}

# 2) Class photos from Elchi.pdf (photo occupies top portion of each page, torn edge below)
crops = {
    "class-travel-drawing": ("elchi-1.jpg", 0.00, 0.015, 1.00, 0.435),
    "class-postcards":      ("elchi-2.jpg", 0.00, 0.015, 1.00, 0.435),
    "class-dog-keychain":   ("elchi-3.jpg", 0.00, 0.015, 1.00, 0.485),
    "class-flipflop":       ("elchi-4.jpg", 0.00, 0.015, 1.00, 0.455),
    "class-tshirt":         ("elchi-5.jpg", 0.00, 0.015, 1.00, 0.375),
}
for name, (f, *box) in crops.items():
    img = Image.open(os.path.join(TMP, f)).convert("RGB")
    c = crop_pct(img, *box)
    c.save(os.path.join(OUT, f"{name}.jpg"), quality=90)
    results[name] = c

# 3) Elin portrait — circular crop (photo circle at top-right of page 2)
p2 = Image.open(os.path.join(TMP, "elin-2.jpg")).convert("RGB")
W, H = p2.size
cx, cy, r = 0.755*W, 0.205*H, 0.175*W
box = (int(cx-r), int(cy-r), int(cx+r), int(cy+r))
face = p2.crop(box).convert("RGBA")
side = min(face.size)
face = ImageOps.fit(face, (side, side))
size = side
mask = Image.new("L", (size, size), 0)
d = ImageDraw.Draw(mask)
d.ellipse((0, 0, size, size), fill=255)
face.putalpha(mask)
face.save(os.path.join(OUT, "elin-portrait.png"))
results["elin-portrait"] = face

# 4) Group workshop photo from Elin page 1 (bottom-right group photo)
p1 = Image.open(os.path.join(TMP, "elin-1.jpg")).convert("RGB")
g = crop_pct(p1, 0.455, 0.345, 0.985, 0.505)
g.save(os.path.join(OUT, "group-workshop.jpg"), quality=90)
results["group-workshop"] = g

# 5) Contact sheet for one-shot visual verification
cols = 4
thumb = 360
rows = (len(results) + cols - 1) // cols
sheet = Image.new("RGB", (cols*thumb, rows*thumb), (250, 243, 236))
dr = ImageDraw.Draw(sheet)
for i, (name, im) in enumerate(results.items()):
    im2 = ImageOps.contain(im.convert("RGB"), (thumb-16, thumb-16))
    x, y = (i % cols)*thumb, (i // cols)*thumb
    sheet.paste(im2, (x+8, y+8))
    dr.text((x+10, y+thumb-24), name, fill=(51, 35, 31))
sheet.save("/home/z/my-project/scripts/contact-sheet.jpg", quality=85)
print("Contact sheet saved. Sizes:")
for name, im in results.items():
    print(f"  {name}: {im.size}")
