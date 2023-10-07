#!/usr/bin/env python3
"""
CV PDF Generator - Abdelhak Bourdim
====================================

Generates PDF CVs from HTML templates using WeasyPrint.

Prerequisites:
    pip install weasyprint

Usage:
    python3 generate_pdf.py          # Generate both versions
    python3 generate_pdf.py a        # Generate Version A only
    python3 generate_pdf.py b        # Generate Version B only

Files:
    Input:
        cv_version_A.html  -> Version A (Workshop-DIY in sidebar)
        cv_version_B.html  -> Version B (Workshop-DIY as main experience)
    Output:
        cv_abdelhak_bourdim_VERSION_A.pdf
        cv_abdelhak_bourdim_VERSION_B.pdf

How to edit:
    1. Open cv_version_A.html or cv_version_B.html in any text editor
    2. Modify the HTML content (text, bullets, dates, etc.)
    3. Run this script to regenerate the PDF
    4. CSS styles are in the <style> block at the top of each HTML file
"""

import sys
import os

try:
    from weasyprint import HTML
except ImportError:
    print("WeasyPrint not installed. Run:")
    print("  pip install weasyprint")
    sys.exit(1)

DIR = os.path.dirname(os.path.abspath(__file__))

VERSIONS = {
    "a": {
        "html": os.path.join(DIR, "cv_version_A.html"),
        "pdf": os.path.join(DIR, "cv_abdelhak_bourdim_VERSION_A.pdf"),
        "label": "Version A (sidebar)",
    },
    "b": {
        "html": os.path.join(DIR, "cv_version_B.html"),
        "pdf": os.path.join(DIR, "cv_abdelhak_bourdim_VERSION_B.pdf"),
        "label": "Version B (experience)",
    },
}


def generate(key):
    v = VERSIONS[key]
    if not os.path.exists(v["html"]):
        print(f"  [SKIP] {v['html']} not found")
        return
    HTML(v["html"]).write_pdf(v["pdf"])
    size_kb = os.path.getsize(v["pdf"]) / 1024
    print(f"  [OK] {v['label']} -> {v['pdf']} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    choice = sys.argv[1].lower() if len(sys.argv) > 1 else "all"

    print("CV PDF Generator")
    print("=" * 40)

    if choice == "a":
        generate("a")
    elif choice == "b":
        generate("b")
    else:
        generate("a")
        generate("b")

    print("\nDone!")
