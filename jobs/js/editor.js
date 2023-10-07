/* ═══════════════════════════════════════════════════════════
   EDITOR.JS — Edit mode with contenteditable + localStorage
   ═══════════════════════════════════════════════════════════ */

const Editor = {
  isEditing: false,

  init() {
    const btn = document.getElementById('edit-btn');
    btn.addEventListener('click', () => this.toggle());
  },

  toggle() {
    this.isEditing = !this.isEditing;
    const btn = document.getElementById('edit-btn');
    const iframe = document.getElementById('content-frame');

    btn.classList.toggle('active', this.isEditing);
    btn.title = this.isEditing ? 'Save & exit edit mode' : 'Edit mode';

    try {
      const doc = iframe.contentDocument;
      if (!doc || !doc.body) return;

      if (this.isEditing) {
        doc.body.contentEditable = 'true';
        doc.body.style.outline = 'none';
        doc.body.style.border = '2px dashed var(--accent, #0a66c2)';
        doc.body.focus();
        Downloads.showToast(I18n.t('edit.on'));
      } else {
        doc.body.contentEditable = 'false';
        doc.body.style.border = 'none';
        this.save(doc);
        Downloads.showToast(I18n.t('edit.off'));
      }
    } catch (e) {
      // Cross-origin or sandbox restriction
      Downloads.showToast('Cannot edit this document');
    }
  },

  save(doc) {
    if (!App.currentItem) return;
    const lang = I18n.get();
    const key = `edit-${App.currentItem.id}-${lang}`;
    const html = '<!DOCTYPE html>' + doc.documentElement.outerHTML;
    localStorage.setItem(key, html);

    // Rebuild sidebar to show edit badge
    App.buildSidebar();
  },

  reset() {
    if (!App.currentItem) return;
    const lang = I18n.get();
    const key = `edit-${App.currentItem.id}-${lang}`;
    localStorage.removeItem(key);
    App.handleRoute();
    App.buildSidebar();
    Downloads.showToast('Reset to original');
  }
};

// Init after app
document.addEventListener('DOMContentLoaded', () => {
  // Delayed init — wait for App
  setTimeout(() => Editor.init(), 100);
});
