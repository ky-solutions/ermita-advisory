"""Generate WOFF2 without removing glyphs, plus a static TTF for ImageResponse."""
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from pathlib import Path

root = Path(__file__).resolve().parent.parent / "public" / "fonts"
for name in ("Poppins-Regular", "SpaceGrotesk-Variable"):
    font = TTFont(root / f"{name}.ttf")
    font.flavor = "woff2"
    font.save(root / f"{name}.woff2")
    assert (root / f"{name}.woff2").stat().st_size <= (root / f"{name}.ttf").stat().st_size * .7
    original = TTFont(root / f"{name}.ttf").getBestCmap()
    converted = TTFont(root / f"{name}.woff2").getBestCmap()
    assert original == converted
font = instantiateVariableFont(TTFont(root / "SpaceGrotesk-Variable.ttf"), {"wght": 400})
font.save(root / "SpaceGrotesk-OG.ttf")
