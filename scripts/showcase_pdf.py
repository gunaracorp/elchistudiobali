"""
Elchí Studio Bali — Website Showcase PDF (untuk klien).

A4 landscape; halaman: cover brand + 9 section desktop + 3 mobile +
2 halaman dasbor admin. Screenshot di-embed sebagai JPEG (sub-elemen
visual); semua teks/caption pakai ReportLab (vector).

Output: /home/z/my-project/download/Elchi-Website-Showcase.pdf
"""
import os
from PIL import Image
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

SRC = "/tmp/render/showcase"
DL = "/home/z/my-project/download"
TMP_JPG = "/tmp/render/showcase/jpg"
OUT = os.path.join(DL, "Elchi-Website-Showcase.pdf")

PAGE_W, PAGE_H = landscape(A4)  # 841.89 x 595.28 pt
INK = HexColor("#34231C")
CREAM = HexColor("#FFF8F0")
ROSE = HexColor("#E75A87")
ROSEDEEP = HexColor("#C93A6C")
BLUSH = HexColor("#F3C9D9")
PAPER = HexColor("#FBF1E7")

pdfmetrics.registerFont(TTFont("SansSC", "/usr/share/fonts/truetype/chinese/NotoSansSC-Regular.ttf"))
pdfmetrics.registerFont(TTFont("SansSC-Bold", "/usr/share/fonts/truetype/chinese/NotoSansSC-Bold.ttf"))
pdfmetrics.registerFont(TTFont("SerifSC-Black", "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Black.ttf"))
pdfmetrics.registerFont(TTFont("SerifSC", "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf"))

# ---------------------------------------------------------------- screenshots
DESKTOP = [
    ("01-hero-id",      "01 · Halaman Pembuka (Hero)", "Opening hero — Bahasa Indonesia"),
    ("02-about",        "02 · Tentang Studio", "About — values & story"),
    ("03-classes",      "03 · Enam Kelas Unggulan", "The six signature classes"),
    ("04-experiences",  "04 · Pengalaman Privat", "Private & group experiences"),
    ("05-instructor",   "05 · Profil Instruktur — Elin Kim", "Instructor profile & 14 client logos"),
    ("06-gallery",      "06 · Galeri Interaktif + Lightbox", "Interactive gallery with lightbox"),
    ("07-booking",      "07 · Formulir Booking", "Booking form — direct to studio"),
    ("08-faq",          "08 · FAQ", "Frequently asked questions"),
    ("09-footer",       "09 · Kontak, WhatsApp & Alamat", "Footer — WhatsApp, email & studio address"),
    ("09b-credits",     "10 · Kredit Partner di Footer", "Footer partner credits — design, hosting, legal"),
]
MOBILE = [
    ("10-mobile-hero",    "11 · Tampilan Ponsel — Pembuka", "Mobile view — hero"),
    ("11-mobile-classes", "12 · Tampilan Ponsel — Kelas", "Mobile view — classes"),
    ("12-mobile-footer",  "13 · Tampilan Ponsel — Kontak", "Mobile view — contact"),
]
ADMIN = [
    ("admin-dashboard-bookings", "14 · Dasbor Admin — Booking Masuk", "Admin dashboard — booking inbox"),
    ("admin-gallery",            "15 · Dasbor Admin — Kelola Galeri", "Admin dashboard — gallery manager"),
]

os.makedirs(TMP_JPG, exist_ok=True)


def to_jpg(name: str, quality: int = 88) -> str:
    """Convert screenshot PNG -> RGB JPEG (smaller PDF)."""
    src = os.path.join(SRC, f"{name}.png")
    if not os.path.exists(src):
        src = os.path.join(DL, "screenshots", f"{name}.png")
    dst = os.path.join(TMP_JPG, f"{name}.jpg")
    if not os.path.exists(dst):
        Image.open(src).convert("RGB").save(dst, "JPEG", quality=quality)
    return dst


def img_size(path: str):
    with Image.open(path) as im:
        return im.size


def caption_bar(c: canvas.Canvas, num_title: str, sub: str):
    """Ink caption bar at the bottom with rose accent + white text."""
    bar_h = 64
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, bar_h, stroke=0, fill=1)
    c.setFillColor(ROSE)
    c.rect(0, bar_h - 4, PAGE_W, 4, stroke=0, fill=1)
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("SansSC-Bold", 15)
    c.drawString(46, bar_h - 27, num_title)
    c.setFillColor(BLUSH)
    c.setFont("SansSC", 11)
    c.drawRightString(PAGE_W - 46, bar_h - 27, sub)
    # brand on the right of the bar
    c.setFillColor(HexColor("#FFF8F0"))
    c.setFont("SansSC-Bold", 10)
    c.drawString(46, bar_h - 46, "Elchí Studio Bali · elchistudiobali.com")
    c.setFillColor(HexColor("#B99A8C"))
    c.setFont("SansSC", 9)
    c.drawRightString(PAGE_W - 46, bar_h - 46, "PT. Elchi Studio Bali — Bali, Indonesia")


def desktop_page(c: canvas.Canvas, name: str, title: str, sub: str):
    path = to_jpg(name)
    iw, ih = img_size(path)  # 1440x900
    bar_h = 64
    top_gap = 26
    max_w = PAGE_W - 92
    max_h = PAGE_H - bar_h - top_gap - 26
    scale = min(max_w / iw, max_h / ih)
    w, h = iw * scale, ih * scale
    x = (PAGE_W - w) / 2
    y = PAGE_H - top_gap - h
    # soft drop frame
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(ROSE)
    c.rect(x - 6, y - 6, w + 12, h + 12, stroke=0, fill=1)
    c.drawImage(path, x, y, width=w, height=h, preserveAspectRatio=True, mask="auto")
    caption_bar(c, title, sub)
    c.showPage()


def mobile_page(c: canvas.Canvas, name: str, title: str, sub: str):
    path = to_jpg(name)
    iw, ih = img_size(path)  # 390x844
    bar_h = 64
    max_h = PAGE_H - bar_h - 40
    scale = max_h / ih
    w, h = iw * scale, ih * scale
    x = (PAGE_W - w) / 2
    y = PAGE_H - 20 - h
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(INK)
    c.rect(x - 8, y - 8, w + 16, h + 16, stroke=0, fill=1)
    c.drawImage(path, x, y, width=w, height=h, preserveAspectRatio=True, mask="auto")
    caption_bar(c, title, sub)
    c.showPage()


def admin_page(c: canvas.Canvas, name: str, title: str, sub: str):
    desktop_page(c, name, title, sub)


def cover(c: canvas.Canvas):
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    # decorative rose dots (subtle, top-left)
    c.setFillColor(HexColor("#4A352B"))
    for gx in range(7):
        for gy in range(3):
            c.circle(64 + gx * 40, PAGE_H - 58 - gy * 40, 3.0, stroke=0, fill=1)

    # ----- left column: brand text
    lx = 64
    c.setFillColor(ROSE)
    c.setFont("SansSC-Bold", 12)
    c.drawString(lx, PAGE_H - 150, "PRESENTASI WEBSITE  ·  WEBSITE SHOWCASE")

    c.setFillColor(CREAM)
    c.setFont("SerifSC-Black", 62)
    c.drawString(lx - 4, PAGE_H - 222, "Elchí")
    c.setFillColor(ROSE)
    c.setFont("SerifSC-Black", 40)
    c.drawString(lx - 2, PAGE_H - 274, "Studio Bali")

    c.setFillColor(BLUSH)
    c.setFont("SansSC", 15)
    c.drawString(lx, PAGE_H - 312, "Website Resmi & Dasbor Studio")
    c.setFillColor(HexColor("#D9C3B6"))
    c.setFont("SansSC", 11.5)
    c.drawString(lx, PAGE_H - 336, "Situs trilingual Indonesia · English · Korea untuk kelas")
    c.drawString(lx, PAGE_H - 354, "seni & lokakarya kreatif di Kuta, Kabupaten Badung, Bali.")

    feats = [
        "Enam kelas unggulan + pengalaman privat",
        "Booking & permintaan langsung ke studio",
        "Galeri interaktif — dikelola dari dasbor",
        "Chat WhatsApp +62 823-3957-0355",
        "Dasbor admin ala WordPress (/admin)",
    ]
    fy = PAGE_H - 388
    for f in feats:
        c.setFillColor(ROSE)
        c.circle(lx + 4, fy + 4, 3.0, stroke=0, fill=1)
        c.setFillColor(CREAM)
        c.setFont("SansSC", 11.5)
        c.drawString(lx + 16, fy, f)
        fy -= 24

    c.setFillColor(HexColor("#B99A8C"))
    c.setFont("SansSC-Bold", 10.5)
    c.drawString(lx, 84, "15 November 2026")

    # ----- right column: mobile hero in rose frame
    mob = to_jpg("10-mobile-hero", quality=85)
    iw, ih = img_size(mob)  # 390 x 844
    fh = 408
    fw = fh * iw / ih  # ≈ 188
    fx = PAGE_W - 64 - fw
    fy2 = 110
    c.setFillColor(ROSE)
    c.roundRect(fx - 10, fy2 - 10, fw + 20, fh + 20, 14, stroke=0, fill=1)
    c.drawImage(mob, fx, fy2, width=fw, height=fh, preserveAspectRatio=True, mask="auto")
    c.setFillColor(BLUSH)
    c.setFont("SansSC", 9.5)
    c.drawCentredString(fx + fw / 2, fy2 - 26, "Tampilan ponsel — fully responsive")

    # footer strip
    c.setFillColor(HexColor("#4A352B"))
    c.rect(0, 0, PAGE_W, 64, stroke=0, fill=1)
    c.setFillColor(CREAM)
    c.setFont("SansSC-Bold", 12)
    c.drawString(64, 36, "Disiapkan untuk klien  ·  PT. Elchi Studio Bali")
    c.setFillColor(BLUSH)
    c.setFont("SansSC", 11)
    c.drawRightString(PAGE_W - 64, 36, "WhatsApp +62 823-3957-0355  ·  ptelchistudiobali@gmail.com")
    c.showPage()


def closing(c: canvas.Canvas):
    """Ringkasan fitur + cara kerja dasbor admin (vektor penuh)."""
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(INK)
    c.rect(0, PAGE_H - 210, PAGE_W, 210, stroke=0, fill=1)
    c.setFillColor(ROSE)
    c.rect(0, PAGE_H - 214, PAGE_W, 4, stroke=0, fill=1)
    c.setFillColor(CREAM)
    c.setFont("SerifSC-Black", 30)
    c.drawString(64, PAGE_H - 110, "Semua bisa dikelola sendiri —")
    c.setFillColor(ROSE)
    c.drawString(64, PAGE_H - 150, "seperti WordPress.")
    c.setFillColor(HexColor("#D9C3B6"))
    c.setFont("SansSC", 12.5)
    c.drawString(64, PAGE_H - 182, "Buka /admin di browser, masuk dengan email & password studio, lalu kelola booking, galeri, dan pengaturan situs.")

    items = [
        ("Booking Masuk", "Setiap reservasi dari situs langsung tampil di dasbor — lengkap dengan tombol WhatsApp per pemesan."),
        ("Galeri", "Unggah foto dari perangkat atau URL, atur keterangan dan urutan — foto langsung tampil di galeri situs."),
        ("Pengaturan", "Alamat studio confirmed, nomor WhatsApp, email, jam operasional, dan Instagram — tombol Publish menyimpan, Download Excel mengekspor booking."),
        ("Keamanan", "Password terenkripsi scrypt, sesi cookie aman 7 hari, semua API admin terproteksi."),
    ]
    y = PAGE_H - 260
    for t, b in items:
        c.setFillColor(ROSEDEEP)
        c.setFont("SansSC-Bold", 14)
        c.drawString(64, y, t)
        c.setFillColor(INK)
        c.setFont("SansSC", 11.5)
        c.drawString(64, y - 19, b)
        y -= 58

    c.setFillColor(BLUSH)
    c.roundRect(64, 88, PAGE_W - 128, 70, 12, stroke=0, fill=1)
    c.setFillColor(ROSEDEEP)
    c.setFont("SansSC-Bold", 12.5)
    c.drawString(84, 136, "Kontak studio:  WhatsApp +62 823-3957-0355   ·   ptelchistudiobali@gmail.com")
    c.setFont("SansSC", 10.5)
    c.drawString(84, 117, "Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia")
    c.setFillColor(ROSEDEEP)
    c.setFont("SansSC", 9.5)
    c.drawString(84, 100, "Email aktif:  elchistudio@gmail.com   ·   info@elchistudio.com")
    c.setFillColor(HexColor("#8A6F62"))
    c.setFont("SansSC", 9)
    c.drawRightString(PAGE_W - 64, 30, "Kredensial admin dikirim terpisah demi keamanan. © 2026 PT. Elchi Studio Bali")
    c.showPage()


def main():
    c = canvas.Canvas(OUT, pagesize=landscape(A4))
    c.setTitle("Elchí Studio Bali — Website Showcase")
    c.setAuthor("PT. Elchi Studio Bali")
    c.setSubject("Presentasi website trilingual + dasbor admin (ID / EN / KO)")
    c.setCreator("Z.ai")

    cover(c)
    for name, title, sub in DESKTOP:
        desktop_page(c, name, title, sub)
    for name, title, sub in MOBILE:
        mobile_page(c, name, title, sub)
    for name, title, sub in ADMIN:
        admin_page(c, name, title, sub)
    closing(c)

    c.save()
    size = os.path.getsize(OUT)
    print(f"OK: {OUT} ({size / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
