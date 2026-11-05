"""Ham fotoğraflardan siteye uygun WebP görseller üretir.

Kullanım:
    python scripts/optimize_images.py "C:/klasor/ham-fotograflar"

Hangi kaynaktan hangi görselin üretileceği scripts/image_manifest.json dosyasındadır.
Yeni bir yemek fotoğrafı eklemek için oraya bir satır ekleyip betiği yeniden çalıştırın.
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img"
QUALITY = 78


def load(src_dir, name):
    return ImageOps.exif_transpose(Image.open(Path(src_dir) / name)).convert("RGB")


def make_logo(src_dir, spec):
    """Tabeladaki yuvarlak amblemi şeffaf zeminli logo ve favicon olarak kırpar."""
    x0, y0, x1, y1 = spec["ellipse"]
    im = load(src_dir, spec["source"]).crop((x0, y0, x1, y1)).resize((512, 512), Image.LANCZOS)
    mask = Image.new("L", (2048, 2048), 0)
    ImageDraw.Draw(mask).ellipse((8, 8, 2040, 2040), fill=255)
    im.putalpha(mask.resize((512, 512), Image.LANCZOS))
    im.save(OUT / "logo.webp", quality=88, method=6)
    im.resize((64, 64), Image.LANCZOS).save(OUT / "favicon.png", optimize=True)


def main(src_dir):
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = json.loads((ROOT / "scripts" / "image_manifest.json").read_text(encoding="utf-8"))
    for slug, spec in manifest.items():
        if slug == "_logo":
            make_logo(src_dir, spec)
            continue
        im = load(src_dir, spec["source"])
        if "crop" in spec:
            im = im.crop(tuple(spec["crop"]))
        for width in spec["widths"]:
            target = min(width, im.width)
            resized = im.resize((target, round(im.height * target / im.width)), Image.LANCZOS)
            resized.save(OUT / f"{slug}-{width}.webp", quality=QUALITY, method=6)
    total = sum(f.stat().st_size for f in OUT.iterdir())
    print(f"{len(list(OUT.iterdir()))} dosya, toplam {total / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
