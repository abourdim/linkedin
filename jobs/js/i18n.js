/* ═══════════════════════════════════════════════════════════
   I18N.JS — Language switcher (FR/EN/AR) + RTL support
   ═══════════════════════════════════════════════════════════ */

const I18n = {
  LANGUAGES: {
    fr: { label: 'FR', name: 'Français', dir: 'ltr' },
    en: { label: 'EN', name: 'English', dir: 'ltr' },
    ar: { label: 'AR', name: 'العربية', dir: 'rtl' }
  },
  STORAGE_KEY: 'portfolio-lang',
  current: 'fr',

  // UI translations for the shell
  strings: {
    'pin.title': {
      fr: 'Accès Sécurisé',
      en: 'Secure Access',
      ar: 'الوصول الآمن'
    },
    'pin.subtitle': {
      fr: 'Entrez votre code PIN à 6 chiffres',
      en: 'Enter your 6-digit PIN code',
      ar: 'أدخل رمز PIN المكون من 6 أرقام'
    },
    'sidebar.title': {
      fr: 'Ingénieur Embarqué Senior',
      en: 'Senior Embedded Engineer',
      ar: 'مهندس أنظمة مدمجة أول'
    },
    'cmd.placeholder': {
      fr: 'Rechercher documents, actions...',
      en: 'Search documents, actions...',
      ar: 'البحث في المستندات والإجراءات...'
    },
    'jobs.search': {
      fr: 'Rechercher',
      en: 'Search',
      ar: 'بحث'
    },
    'jobs.placeholder': {
      fr: 'embedded software engineer',
      en: 'embedded software engineer',
      ar: 'embedded software engineer'
    },
    'edit.on': {
      fr: 'Mode édition activé',
      en: 'Edit mode enabled',
      ar: 'وضع التحرير مفعّل'
    },
    'edit.off': {
      fr: 'Mode lecture',
      en: 'View mode',
      ar: 'وضع القراءة'
    },
    'download.html': {
      fr: 'HTML',
      en: 'HTML',
      ar: 'HTML'
    },
    'download.txt': {
      fr: 'TXT',
      en: 'TXT',
      ar: 'TXT'
    },
    'download.pdf': {
      fr: 'PDF',
      en: 'PDF',
      ar: 'PDF'
    },
    'download.copy': {
      fr: 'Copier',
      en: 'Copy',
      ar: 'نسخ'
    },
    'download.link': {
      fr: 'Lien',
      en: 'Link',
      ar: 'رابط'
    }
  },

  // Section/item labels per language
  sectionLabels: {
    cv: { fr: 'CV / Resume', en: 'CV / Resume', ar: 'السيرة الذاتية' },
    linkedin: { fr: 'Profil LinkedIn', en: 'LinkedIn Profile', ar: 'ملف LinkedIn' },
    letter: { fr: 'Lettre de Motivation', en: 'Cover Letter', ar: 'رسالة التحفيز' },
    pitch: { fr: 'Pitch 2 Minutes', en: '2-Minute Pitch', ar: 'العرض التقديمي' },
    interview: { fr: 'Prépa Entretien', en: 'Interview Prep', ar: 'التحضير للمقابلة' },
    plan: { fr: 'Plan de Recherche', en: 'Job Search Plan', ar: 'خطة البحث' },
    prompts: { fr: 'Prompts IA', en: 'AI Prompts', ar: 'أوامر الذكاء الاصطناعي' },
    queries: { fr: 'Requêtes LinkedIn', en: 'LinkedIn Queries', ar: 'استعلامات LinkedIn' },
    jobs: { fr: 'Offres d\'Emploi', en: 'Job Listings', ar: 'عروض العمل' },
    portfolio: { fr: 'Portfolio', en: 'Portfolio', ar: 'معرض المشاريع' },
    timeline: { fr: 'Timeline', en: 'Timeline', ar: 'المسار المهني' },
    skills: { fr: 'Compétences', en: 'Skills', ar: 'المهارات' },
    help: { fr: 'Aide', en: 'Help', ar: 'مساعدة' }
  },

  countryLabels: {
    ch: { fr: 'Suisse', en: 'Switzerland', ar: 'سويسرا' },
    fr: { fr: 'France', en: 'France', ar: 'فرنسا' },
    lu: { fr: 'Luxembourg', en: 'Luxembourg', ar: 'لوكسمبورغ' },
    gulf: { fr: 'Golfe', en: 'Gulf', ar: 'الخليج' }
  },

  init() {
    this.current = localStorage.getItem(this.STORAGE_KEY) || 'fr';
    this.apply(this.current);

    // Bind language button clicks
    document.getElementById('lang-switcher').addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      this.set(btn.dataset.lang);
    });
  },

  set(lang) {
    if (!this.LANGUAGES[lang]) lang = 'fr';
    this.current = lang;
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.apply(lang);

    // Reload content in new language
    if (typeof App !== 'undefined') App.handleRoute();
  },

  apply(lang) {
    const config = this.LANGUAGES[lang];

    // Set document direction + lang
    document.documentElement.setAttribute('dir', config.dir);
    document.documentElement.setAttribute('lang', lang);

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Translate data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (this.strings[key] && this.strings[key][lang]) {
        el.textContent = this.strings[key][lang];
      }
    });

    // Translate command palette placeholder
    const cmdInput = document.getElementById('cmd-input');
    if (cmdInput && this.strings['cmd.placeholder']) {
      cmdInput.placeholder = this.strings['cmd.placeholder'][lang];
    }
  },

  t(key) {
    if (this.strings[key] && this.strings[key][this.current]) {
      return this.strings[key][this.current];
    }
    return key;
  },

  get() {
    return this.current;
  }
};
