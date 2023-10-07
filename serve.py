#!/usr/bin/env python3
"""
Local development server for the Job Search Portfolio.
Usage: python3 serve.py [port]
Default port: 8000
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import signal

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        # Proper MIME types
        super().end_headers()

    def log_message(self, format, *args):
        # Color-coded logging
        status = args[1] if len(args) > 1 else ''
        if str(status).startswith('2'):
            color = '\033[92m'  # Green
        elif str(status).startswith('3'):
            color = '\033[93m'  # Yellow
        elif str(status).startswith('4') or str(status).startswith('5'):
            color = '\033[91m'  # Red
        else:
            color = '\033[0m'
        print(f"{color}{args[0]} {status}\033[0m")

def signal_handler(sig, frame):
    print("\n\033[93m⏹  Serveur arrêté.\033[0m")
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/jobs/"
        print()
        print("\033[96m" + "=" * 56 + "\033[0m")
        print(f"\033[96m  🌍 Portfolio Job Search — Serveur Local\033[0m")
        print("\033[96m" + "=" * 56 + "\033[0m")
        print(f"\033[92m  📍 {url}\033[0m")
        print(f"\033[90m  📂 {DIRECTORY}\033[0m")
        print(f"\033[90m  🔧 Port: {PORT}\033[0m")
        print("\033[96m" + "-" * 56 + "\033[0m")
        print(f"\033[93m  Ctrl+C pour arrêter\033[0m")
        print()

        # Open browser automatically
        webbrowser.open(url)

        httpd.serve_forever()
