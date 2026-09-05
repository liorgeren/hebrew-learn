#!/usr/bin/env python3
"""Render Carmit clips for words and syllables (macOS `say` + afconvert)."""

from __future__ import annotations

import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def parse_words() -> list[tuple[str, str]]:
    text = (ROOT / "src/data/words.ts").read_text()
    return re.findall(r"id: '(\w+)', word: '([^']+)'", text)


def parse_syllables() -> list[tuple[str, str]]:
    text = (ROOT / "src/data/syllables.ts").read_text()
    rows = re.findall(
        r"baseLetter: '([^']+)', letterNameEn: '([^']+)'.*?nikudId: '([^']+)', nikudMark: '([^']+)'",
        text,
        flags=re.S,
    )
    return [
        (
            f"{name.lower()}-{nikud_id}",
            f"{letter}{mark.encode('utf-8').decode('unicode_escape')}",
        )
        for letter, name, nikud_id, mark in rows
    ]


def render(clip_id: str, hebrew: str, dest_dir: Path) -> None:
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / f"{clip_id}.m4a"
    if dest.exists():
        print(f"skip {dest.relative_to(ROOT)}")
        return
    with tempfile.TemporaryDirectory() as tmp:
        aiff = Path(tmp) / f"{clip_id}.aiff"
        subprocess.run(
            ["say", "-v", "Carmit", "-r", "120", "-o", str(aiff), hebrew],
            check=True,
        )
        subprocess.run(
            ["afconvert", "-f", "m4af", "-d", "aac", str(aiff), str(dest)],
            check=True,
        )
    print(f"wrote {dest.relative_to(ROOT)}")


def main() -> int:
    if sys.platform != "darwin":
        print("This script uses macOS `say` / `afconvert`.", file=sys.stderr)
        return 1

    for clip_id, word in parse_words():
        render(clip_id, word, ROOT / "public/audio/words")
    for clip_id, syllable in parse_syllables():
        render(clip_id, syllable, ROOT / "public/audio/syllables")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
