/* ═══════════════════════════════════════════════════════════
   JOBS.JS — Live job listings via Adzuna API (free tier)
   Fallback: curated links to job boards
   ═══════════════════════════════════════════════════════════ */

const Jobs = {
  // Adzuna API config (free tier: 250 req/month)
  // Get your key at: https://developer.adzuna.com/
  API_ID: '',   // Set your Adzuna app_id here
  API_KEY: '',  // Set your Adzuna app_key here

  // Region configs
  REGIONS: {
    ch: {
      country: 'ch',
      labels: { fr: 'Suisse', en: 'Switzerland', ar: 'سويسرا' },
      defaultQuery: 'embedded software engineer',
      locations: [
        { value: 'Geneva', labels: { fr: 'Genève', en: 'Geneva', ar: 'جنيف' } },
        { value: 'Lausanne', labels: { fr: 'Lausanne', en: 'Lausanne', ar: 'لوزان' } },
        { value: 'Zurich', labels: { fr: 'Zurich', en: 'Zurich', ar: 'زيورخ' } },
        { value: '', labels: { fr: 'Toute la Suisse', en: 'All Switzerland', ar: 'كل سويسرا' } }
      ],
      jobBoards: [
        { name: 'jobs.ch', url: 'https://www.jobs.ch/en/vacancies/?term=embedded+engineer' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=embedded+software+engineer&location=Switzerland' },
        { name: 'Indeed CH', url: 'https://ch.indeed.com/jobs?q=embedded+engineer&l=Switzerland' },
        { name: 'SwissDevJobs', url: 'https://swissdevjobs.ch/jobs/Embedded/All' }
      ]
    },
    fr: {
      country: 'fr',
      labels: { fr: 'France', en: 'France', ar: 'فرنسا' },
      defaultQuery: 'ingénieur logiciel embarqué',
      locations: [
        { value: 'Paris', labels: { fr: 'Île-de-France', en: 'Paris Region', ar: 'منطقة باريس' } },
        { value: 'Toulouse', labels: { fr: 'Toulouse', en: 'Toulouse', ar: 'تولوز' } },
        { value: 'Grenoble', labels: { fr: 'Grenoble', en: 'Grenoble', ar: 'غرونوبل' } },
        { value: '', labels: { fr: 'Toute la France', en: 'All France', ar: 'كل فرنسا' } }
      ],
      jobBoards: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=ingénieur+embarqué&location=France' },
        { name: 'Indeed FR', url: 'https://www.indeed.fr/emplois?q=ingénieur+embarqué&l=Île-de-France' },
        { name: 'APEC', url: 'https://www.apec.fr/candidat/recherche-emploi.html/emploi?motsCles=embarqué' },
        { name: 'Welcome to the Jungle', url: 'https://www.welcometothejungle.com/fr/jobs?query=embedded&page=1' }
      ]
    },
    lu: {
      country: 'lu',
      labels: { fr: 'Luxembourg', en: 'Luxembourg', ar: 'لوكسمبورغ' },
      defaultQuery: 'embedded engineer',
      locations: [
        { value: 'Luxembourg', labels: { fr: 'Luxembourg-Ville', en: 'Luxembourg City', ar: 'مدينة لوكسمبورغ' } },
        { value: '', labels: { fr: 'Tout le Luxembourg', en: 'All Luxembourg', ar: 'كل لوكسمبورغ' } }
      ],
      jobBoards: [
        { name: 'jobs.lu', url: 'https://www.jobs.lu/search-jobs?keywords=embedded+engineer' },
        { name: 'Moovijob', url: 'https://www.moovijob.com/en/search?q=embedded' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=embedded+engineer&location=Luxembourg' },
        { name: 'ICTjob.lu', url: 'https://www.ictjob.lu/en/search-it-jobs?query=embedded' }
      ]
    },
    gulf: {
      country: 'ae',
      labels: { fr: 'Golfe / GCC', en: 'Gulf / GCC', ar: 'الخليج العربي' },
      defaultQuery: 'embedded software engineer',
      locations: [
        { value: 'Dubai', labels: { fr: 'Dubaï', en: 'Dubai', ar: 'دبي' } },
        { value: 'Abu Dhabi', labels: { fr: 'Abu Dhabi', en: 'Abu Dhabi', ar: 'أبو ظبي' } },
        { value: 'Riyadh', labels: { fr: 'Riyad', en: 'Riyadh', ar: 'الرياض' } },
        { value: 'Doha', labels: { fr: 'Doha', en: 'Doha', ar: 'الدوحة' } },
        { value: '', labels: { fr: 'Tout le Golfe', en: 'All Gulf', ar: 'كل الخليج' } }
      ],
      jobBoards: [
        { name: 'Bayt', url: 'https://www.bayt.com/en/international/jobs/embedded-engineer-jobs/' },
        { name: 'GulfTalent', url: 'https://www.gulftalent.com/jobs/embedded-engineer' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=embedded+engineer&location=United+Arab+Emirates' },
        { name: 'Naukrigulf', url: 'https://www.naukrigulf.com/embedded-engineer-jobs' }
      ]
    }
  },

  currentRegion: 'ch',

  show(region) {
    this.currentRegion = region;
    const panel = document.getElementById('jobs-panel');
    const config = this.REGIONS[region];
    const lang = I18n.get();

    if (!config) return;

    let html = '';

    // Search bar
    html += `<div class="jobs-search-bar">`;
    html += `<input class="jobs-search-input" id="jobs-query" type="text" value="${config.defaultQuery}" placeholder="${I18n.t('jobs.placeholder')}">`;
    html += `<select class="jobs-region-select" id="jobs-location">`;
    config.locations.forEach(loc => {
      const label = loc.labels[lang] || loc.labels['fr'];
      html += `<option value="${loc.value}">${label}</option>`;
    });
    html += `</select>`;
    html += `<button class="jobs-search-btn" onclick="Jobs.search()">${I18n.t('jobs.search')}</button>`;
    html += `</div>`;

    // Job boards quick links
    html += `<div style="margin-bottom:16px;display:flex;gap:8px;flex-wrap:wrap;">`;
    config.jobBoards.forEach(board => {
      html += `<a href="${board.url}" target="_blank" rel="noopener" class="job-card-link" style="font-size:12px;">${board.name} &#8599;</a>`;
    });
    html += `</div>`;

    // Results area
    html += `<div class="jobs-results" id="jobs-results">`;

    if (this.API_ID && this.API_KEY) {
      html += `<div style="text-align:center;padding:40px;color:var(--text-secondary);">
        Click "Search" to find live job listings</div>`;
    } else {
      html += `<div style="text-align:center;padding:40px;color:var(--text-secondary);">
        <div style="font-size:32px;margin-bottom:12px;">&#128161;</div>
        <div style="font-size:16px;font-weight:600;margin-bottom:8px;">API Key Required</div>
        <div style="font-size:13px;max-width:400px;margin:0 auto;">
          To see live job listings, get a free API key from
          <a href="https://developer.adzuna.com/" target="_blank" rel="noopener" style="color:var(--accent);">developer.adzuna.com</a>
          and set it in <code>jobs/js/jobs.js</code>
        </div>
        <div style="font-size:13px;margin-top:16px;">
          Meanwhile, use the quick links above to search directly on job boards.
        </div>
      </div>`;
    }

    html += `</div>`;

    panel.innerHTML = html;
  },

  async search() {
    const query = document.getElementById('jobs-query').value;
    const location = document.getElementById('jobs-location').value;
    const results = document.getElementById('jobs-results');
    const config = this.REGIONS[this.currentRegion];

    if (!this.API_ID || !this.API_KEY) {
      // Fallback: open LinkedIn search in new tab
      const linkedinUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location || config.labels['en'])}`;
      window.open(linkedinUrl, '_blank');
      return;
    }

    results.innerHTML = '<div style="text-align:center;padding:40px;">Loading...</div>';

    try {
      const country = config.country;
      let url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${this.API_ID}&app_key=${this.API_KEY}&results_per_page=20&what=${encodeURIComponent(query)}`;
      if (location) {
        url += `&where=${encodeURIComponent(location)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        results.innerHTML = data.results.map(job => this.renderJobCard(job)).join('');
      } else {
        results.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-secondary);">No results found. Try different keywords.</div>';
      }
    } catch (err) {
      results.innerHTML = `<div style="text-align:center;padding:40px;color:#e53935;">
        Error fetching jobs. Please use the direct links above.</div>`;
    }
  },

  renderJobCard(job) {
    const title = job.title || 'Untitled';
    const company = job.company?.display_name || 'Unknown';
    const location = job.location?.display_name || '';
    const salary = job.salary_min && job.salary_max
      ? `${Math.round(job.salary_min/1000)}K - ${Math.round(job.salary_max/1000)}K`
      : '';
    const date = job.created ? new Date(job.created).toLocaleDateString() : '';
    const url = job.redirect_url || '#';
    const isNew = job.created && (Date.now() - new Date(job.created).getTime()) < 48 * 3600 * 1000;

    return `<div class="job-card">
      <div class="job-card-title">${title}</div>
      <div class="job-card-company">${company}</div>
      <div class="job-card-meta">
        ${location ? `<span>&#128205; ${location}</span>` : ''}
        ${salary ? `<span>&#128176; ${salary}</span>` : ''}
        ${date ? `<span>&#128197; ${date}</span>` : ''}
        ${isNew ? '<span class="job-card-badge">NEW</span>' : ''}
      </div>
      <a class="job-card-link" href="${url}" target="_blank" rel="noopener">View job &#8599;</a>
    </div>`;
  }
};
