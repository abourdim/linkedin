#!/bin/bash
# ============================================================
#  START HERE — Job Search Portfolio Launcher
#  Abdelhak Bourdim — v1.0 — March 2026
# ============================================================

PORT=${1:-8000}
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  =================================================="
echo "  Job Search Portfolio — Launcher"
echo "  =================================================="
echo ""

# Check Python
if command -v python3 &>/dev/null; then
    PY=python3
elif command -v python &>/dev/null; then
    PY=python
else
    echo "  [ERROR] Python not found. Install Python 3 first."
    echo "  https://www.python.org/downloads/"
    echo ""
    exit 1
fi

echo "  Python:  $($PY --version)"
echo "  Port:    $PORT"
echo "  Folder:  $DIR"
echo "  URL:     http://localhost:$PORT/jobs/"
echo "  PIN:     123456 (default)"
echo ""
echo "  Ctrl+C to stop"
echo "  =================================================="
echo ""

cd "$DIR" && $PY serve.py "$PORT"
