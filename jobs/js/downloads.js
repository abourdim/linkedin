/* ═══════════════════════════════════════════════════════════
   DOWNLOADS.JS — Download HTML/TXT/PDF + Copy text/link
   ═══════════════════════════════════════════════════════════ */

const Downloads = {

  update(item, lang) {
    const bar = document.getElementById('download-bar');
    if (!item || !item.downloads || item.comingSoon || item.type === 'jobs') {
      bar.innerHTML = '';
      return;
    }

    let html = '';
    const dl = item.downloads;

    // PDF download
    if (dl.pdf && dl.pdf[lang]) {
      html += `<button class="header-btn primary" onclick="Downloads.download('${dl.pdf[lang]}')">
        &#128196; <span>PDF</span></button>`;
    } else if (dl.pdf) {
      // Fallback: show first available PDF
      const firstLang = Object.keys(dl.pdf)[0];
      if (firstLang) {
        html += `<button class="header-btn primary" onclick="Downloads.download('${dl.pdf[firstLang]}')">
          &#128196; <span>PDF (${firstLang.toUpperCase()})</span></button>`;
      }
    }

    // TXT download
    if (dl.txt && dl.txt[lang]) {
      html += `<button class="header-btn" onclick="Downloads.download('${dl.txt[lang]}')">
        &#128221; <span>TXT</span></button>`;
    } else if (dl.txt) {
      const firstLang = Object.keys(dl.txt)[0];
      if (firstLang) {
        html += `<button class="header-btn" onclick="Downloads.download('${dl.txt[firstLang]}')">
          &#128221; <span>TXT</span></button>`;
      }
    }

    // HTML download (always available if file exists)
    if (item.files && item.files[lang]) {
      html += `<button class="header-btn" onclick="Downloads.download('${item.files[lang]}')">
        &#127760; <span>HTML</span></button>`;
    }

    // Copy text button
    html += `<button class="header-btn" onclick="Downloads.copyText()" title="Copy text">
      &#128203;</button>`;

    // Copy link button
    html += `<button class="header-btn" onclick="Downloads.copyLink()" title="Copy link">
      &#128279;</button>`;

    bar.innerHTML = html;
  },

  download(path) {
    const a = document.createElement('a');
    a.href = path;
    a.download = path.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  async copyText() {
    try {
      const iframe = document.getElementById('content-frame');
      const text = iframe.contentDocument?.body?.innerText || '';
      await navigator.clipboard.writeText(text);
      this.showToast('Texte copié !');
    } catch (e) {
      this.showToast('Erreur de copie');
    }
  },

  async copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.showToast('Lien copié !');
    } catch (e) {
      this.showToast('Erreur de copie');
    }
  },

  showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:8px;background:#333;color:#fff;font-size:14px;z-index:9999;opacity:0;transition:opacity 0.3s;';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2000);
  }
};
