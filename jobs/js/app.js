/* ═══════════════════════════════════════════════════════════
   APP.JS — Main SPA: navigation, routing, sidebar, Ctrl+K
   ═══════════════════════════════════════════════════════════ */

const App = {
  currentCountry: 'ch',
  currentSection: null,
  currentItem: null,

  // ── CONTENT MAP ──
  // Maps country → section → items → files per language
  // Paths relative to repo root (../content/ from jobs/)
  CONTENT: {
    ch: {
      cv: {
        items: [
          {
            id: 'cv-swiss',
            labels: { fr: 'CV Format Suisse', en: 'Swiss Format CV', ar: 'السيرة الذاتية السويسرية' },
            files: { fr: '../content/ch/69_cv_suisse_FR.html', en: '../content/ch/70_cv_suisse_EN.html', ar: '../content/ch/73_cv_suisse_AR.html' },
            downloads: {
              pdf: { fr: '../content/ch/69_cv_suisse_FR.pdf', en: '../content/ch/70_cv_suisse_EN.pdf', ar: '../content/ch/73_cv_suisse_AR.pdf' }
            },
            default: true
          },
          {
            id: 'cv-detailed',
            labels: { fr: 'CV Détaillé v3.0', en: 'Detailed CV v3.0', ar: 'السيرة المفصلة' },
            files: { fr: '../content/ch/48_cv_version_A_v3.0.html', en: '../content/ch/49_cv_version_A_v3.0_EN.html', ar: '../content/ch/50_cv_version_A_v3.0_AR.html' },
            downloads: {
              pdf: { fr: '../content/ch/53_cv_version_A_v3.0.pdf', en: '../content/ch/51_cv_version_A_v3.0_EN.pdf', ar: '../content/ch/52_cv_version_A_v3.0_AR.pdf' }
            }
          },
          {
            id: 'cv-condensed',
            labels: { fr: 'CV 1 Page', en: '1-Page CV', ar: 'سيرة ذاتية صفحة واحدة' },
            files: { fr: '../content/shared/118_cv_condensed_FR.html', en: '../content/shared/119_cv_condensed_EN.html', ar: '../content/shared/118_cv_condensed_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/118_cv_condensed_FR.pdf', en: '../content/shared/119_cv_condensed_EN.pdf', ar: '../content/shared/118_cv_condensed_FR.pdf' }
            }
          }
        ]
      },
      linkedin: {
        items: [
          {
            id: 'linkedin-content',
            labels: { fr: 'Contenu du Profil', en: 'Profile Content', ar: 'محتوى الملف' },
            files: { fr: '../content/shared/65_linkedin_FR.html', en: '../content/shared/64_linkedin_EN.html', ar: '../content/shared/72_linkedin_AR.html' },
            downloads: {
              txt: { fr: '../content/shared/65_linkedin_FR.txt', en: '../content/shared/64_linkedin_EN.txt', ar: '../content/shared/72_linkedin_AR.txt' }
            }
          },
          {
            id: 'linkedin-visual',
            labels: { fr: 'Aperçu Visuel', en: 'Visual Preview', ar: 'معاينة مرئية' },
            files: { fr: '../content/shared/67_linkedin_FR.html', en: '../content/shared/66_linkedin_EN.html', ar: '../content/shared/72_linkedin_AR.html' }
          }
        ]
      },
      letter: {
        items: [
          {
            id: 'cover-letter',
            labels: { fr: 'Lettre de Motivation', en: 'Cover Letter', ar: 'رسالة التحفيز' },
            files: { fr: '../content/ch/61_lettre_motivation.html', en: '../content/ch/62_lettre_motivation_EN.html', ar: '../content/ch/63_lettre_motivation_AR.html' },
            downloads: {
              pdf: { fr: '../content/ch/61_lettre_motivation.pdf', en: '../content/ch/62_lettre_motivation_EN.pdf', ar: '../content/ch/63_lettre_motivation_AR.pdf' },
              txt: { fr: '../content/ch/61_lettre_motivation.txt' }
            }
          },
          {
            id: 'letter-generic',
            labels: { fr: 'Lettre Générique', en: 'Generic Letter', ar: 'رسالة عامة' },
            files: { fr: '../content/shared/111_lettre_generique_FR.html', en: '../content/shared/112_lettre_generique_EN.html', ar: '../content/shared/113_lettre_generique_AR.html' },
            downloads: {
              pdf: { fr: '../content/shared/111_lettre_generique_FR.pdf', en: '../content/shared/112_lettre_generique_EN.pdf', ar: '../content/shared/113_lettre_generique_AR.pdf' }
            }
          }
        ]
      },
      pitch: {
        items: [
          {
            id: 'pitch-2min',
            labels: { fr: 'Pitch Entretien', en: 'Interview Pitch', ar: 'عرض المقابلة' },
            files: { fr: '../content/ch/76_pitch_2min.html', en: '../content/ch/76_pitch_2min_EN.html', ar: '../content/ch/76_pitch_2min_AR.html' },
            downloads: {
              txt: { fr: '../content/ch/76_pitch_2min.txt', en: '../content/ch/76_pitch_2min_EN.txt', ar: '../content/ch/76_pitch_2min_AR.txt' }
            }
          }
        ]
      },
      interview: {
        items: [
          {
            id: 'interview-full',
            labels: { fr: 'Préparation Complète', en: 'Full Preparation', ar: 'التحضير الكامل' },
            files: { fr: '../content/ch/58_entretien_v2.html', en: '../content/ch/58_entretien_v2_EN.html', ar: '../content/ch/58_entretien_v2_AR.html' },
            downloads: { pdf: { fr: '../content/ch/58_entretien_v2.pdf' } }
          },
          {
            id: 'interview-short',
            labels: { fr: 'Version Condensée', en: 'Condensed Version', ar: 'النسخة المختصرة' },
            files: { fr: '../content/ch/59_entretien_v3_court.html', en: '../content/ch/59_entretien_v3_court_EN.html', ar: '../content/ch/59_entretien_v3_court_AR.html' },
            downloads: { pdf: { fr: '../content/ch/59_entretien_v3_court.pdf' } }
          },
          {
            id: 'interview-ultra',
            labels: { fr: 'Fiche Flash', en: 'Flash Card', ar: 'البطاقة السريعة' },
            files: { fr: '../content/ch/60_entretien_v4_ultra.html', en: '../content/ch/60_entretien_v4_ultra_EN.html', ar: '../content/ch/60_entretien_v4_ultra_AR.html' },
            downloads: { pdf: { fr: '../content/ch/60_entretien_v4_ultra.pdf' } }
          },
          {
            id: 'flashcards',
            labels: { fr: 'Flash Cards', en: 'Flash Cards', ar: 'بطاقات المراجعة' },
            files: { fr: '../content/shared/116_flashcards_FR.html', en: '../content/shared/117_flashcards_EN.html', ar: '../content/shared/116_flashcards_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/116_flashcards_FR.pdf', en: '../content/shared/117_flashcards_EN.pdf', ar: '../content/shared/116_flashcards_FR.pdf' }
            }
          }
        ]
      },
      plan: {
        items: [
          {
            id: 'plan-ch',
            labels: { fr: 'Plan Suisse Romande', en: 'Switzerland Plan', ar: 'خطة سويسرا' },
            files: { fr: '../content/ch/68_plan_suisse_romande.html', en: '../content/ch/68_plan_suisse_romande_EN.html', ar: '../content/ch/74_plan_suisse_romande_AR.html' },
            downloads: {
              txt: { fr: '../content/ch/68_plan_suisse_romande.txt', en: '../content/ch/68_plan_suisse_romande_EN.txt', ar: '../content/ch/74_plan_suisse_romande_AR.txt' }
            }
          }
        ]
      },
      prompts: {
        items: [
          {
            id: 'prompts-ch',
            labels: { fr: 'Prompts Recherche', en: 'Search Prompts', ar: 'أوامر البحث' },
            files: { fr: '../content/ch/71_prompts_job_search_CH.html', en: '../content/ch/71_prompts_job_search_CH_EN.html', ar: '../content/ch/75_prompts_job_search_CH_AR.html' },
            downloads: {
              txt: { fr: '../content/ch/71_prompts_job_search_CH.txt', en: '../content/ch/71_prompts_job_search_CH_EN.txt', ar: '../content/ch/75_prompts_job_search_CH_AR.txt' }
            }
          },
          {
            id: 'prompts-generic',
            labels: { fr: 'Prompts Génériques', en: 'Generic Prompts', ar: 'أوامر عامة' },
            files: { fr: '../content/shared/114_prompts_generique_FR.html', en: '../content/shared/115_prompts_generique_EN.html', ar: '../content/shared/114_prompts_generique_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/114_prompts_generique_FR.pdf', en: '../content/shared/115_prompts_generique_EN.pdf', ar: '../content/shared/114_prompts_generique_FR.pdf' }
            }
          }
        ]
      },
      queries: {
        items: [
          {
            id: 'queries-ch',
            labels: { fr: 'Requêtes de Recherche', en: 'Search Queries', ar: 'استعلامات البحث' },
            files: { fr: '../content/ch/77_linkedin_search_queries_FR.html', en: '../content/ch/77_linkedin_search_queries_EN.html', ar: '../content/ch/77_linkedin_search_queries_AR.html' },
            downloads: {
              txt: { fr: '../content/ch/77_linkedin_search_queries_FR.txt', en: '../content/ch/77_linkedin_search_queries_EN.txt', ar: '../content/ch/77_linkedin_search_queries_AR.txt' }
            }
          }
        ]
      },
      jobs: {
        items: [
          {
            id: 'jobs-ch',
            labels: { fr: 'Offres Suisse', en: 'Swiss Jobs', ar: 'وظائف سويسرا' },
            type: 'jobs',
            region: 'ch'
          }
        ]
      },
      skills: {
        items: [
          {
            id: 'skills-matrix',
            labels: { fr: 'Matrice Compétences', en: 'Skills Matrix', ar: 'مصفوفة المهارات' },
            files: { fr: '../content/shared/124_skills_matrix_FR.html', en: '../content/shared/125_skills_matrix_EN.html', ar: '../content/shared/124_skills_matrix_FR.html' }
          }
        ]
      },
      portfolio: {
        items: [
          {
            id: 'portfolio',
            labels: { fr: 'Portfolio Projets', en: 'Project Portfolio', ar: 'معرض المشاريع' },
            files: { fr: '../content/shared/126_portfolio_FR.html', en: '../content/shared/127_portfolio_EN.html', ar: '../content/shared/126_portfolio_FR.html' }
          }
        ]
      },
      timeline: {
        items: [
          {
            id: 'timeline',
            labels: { fr: 'Timeline Carrière', en: 'Career Timeline', ar: 'المسار المهني' },
            files: { fr: '../content/shared/122_timeline_FR.html', en: '../content/shared/123_timeline_EN.html', ar: '../content/shared/122_timeline_FR.html' }
          }
        ]
      },
      help: {
        items: [
          {
            id: 'help',
            labels: { fr: "Guide d'utilisation", en: 'User Guide', ar: 'دليل الاستخدام' },
            files: { fr: '../content/shared/120_help_FR.html', en: '../content/shared/121_help_EN.html', ar: '../content/shared/120_help_FR.html' }
          }
        ]
      }
    },

    // France content
    fr: {
      cv: {
        items: [
          {
            id: 'cv-fr',
            labels: { fr: 'CV Format Français', en: 'French Format CV', ar: 'السيرة الذاتية - النسق الفرنسي' },
            files: { fr: '../content/fr/78_cv_france_FR.html', en: '../content/fr/79_cv_france_EN.html', ar: '../content/fr/80_cv_france_AR.html' },
            downloads: {
              pdf: { fr: '../content/fr/78_cv_france_FR.pdf', en: '../content/fr/79_cv_france_EN.pdf', ar: '../content/fr/80_cv_france_AR.pdf' }
            },
            default: true
          },
          {
            id: 'cv-condensed',
            labels: { fr: 'CV 1 Page', en: '1-Page CV', ar: 'سيرة ذاتية صفحة واحدة' },
            files: { fr: '../content/shared/118_cv_condensed_FR.html', en: '../content/shared/119_cv_condensed_EN.html', ar: '../content/shared/118_cv_condensed_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/118_cv_condensed_FR.pdf', en: '../content/shared/119_cv_condensed_EN.pdf', ar: '../content/shared/118_cv_condensed_FR.pdf' }
            }
          }
        ]
      },
      linkedin: {
        items: [
          {
            id: 'linkedin-fr-content',
            labels: { fr: 'Contenu du Profil', en: 'Profile Content', ar: 'محتوى الملف' },
            files: { fr: '../content/shared/65_linkedin_FR.html', en: '../content/shared/64_linkedin_EN.html', ar: '../content/shared/72_linkedin_AR.html' },
            downloads: { txt: { fr: '../content/shared/65_linkedin_FR.txt', en: '../content/shared/64_linkedin_EN.txt', ar: '../content/shared/72_linkedin_AR.txt' } }
          },
          {
            id: 'linkedin-fr-visual',
            labels: { fr: 'Aperçu Visuel', en: 'Visual Preview', ar: 'معاينة مرئية' },
            files: { fr: '../content/shared/67_linkedin_FR.html', en: '../content/shared/66_linkedin_EN.html', ar: '../content/shared/72_linkedin_AR.html' }
          }
        ]
      },
      letter: {
        items: [
          {
            id: 'letter-fr',
            labels: { fr: 'Lettre de Motivation', en: 'Cover Letter', ar: 'رسالة التحفيز' },
            files: { fr: '../content/fr/84_lettre_france.html', en: '../content/fr/85_lettre_france_EN.html', ar: '../content/fr/86_lettre_france_AR.html' },
            downloads: {
              pdf: { fr: '../content/fr/84_lettre_france.pdf', en: '../content/fr/85_lettre_france_EN.pdf', ar: '../content/fr/86_lettre_france_AR.pdf' }
            },
            default: true
          },
          {
            id: 'letter-generic',
            labels: { fr: 'Lettre Générique', en: 'Generic Letter', ar: 'رسالة عامة' },
            files: { fr: '../content/shared/111_lettre_generique_FR.html', en: '../content/shared/112_lettre_generique_EN.html', ar: '../content/shared/113_lettre_generique_AR.html' },
            downloads: {
              pdf: { fr: '../content/shared/111_lettre_generique_FR.pdf', en: '../content/shared/112_lettre_generique_EN.pdf', ar: '../content/shared/113_lettre_generique_AR.pdf' }
            }
          }
        ]
      },
      pitch: {
        items: [
          {
            id: 'pitch-fr',
            labels: { fr: 'Pitch Entretien', en: 'Interview Pitch', ar: 'عرض المقابلة' },
            files: { fr: '../content/fr/83_pitch_france.html', en: '../content/fr/83_pitch_france_EN.html', ar: '../content/fr/83_pitch_france_AR.html' },
            downloads: { txt: { fr: '../content/fr/83_pitch_france.txt', en: '../content/fr/83_pitch_france_EN.txt', ar: '../content/fr/83_pitch_france_AR.txt' } }
          }
        ]
      },
      interview: {
        items: [
          {
            id: 'interview-fr-full',
            labels: { fr: 'Préparation Complète', en: 'Full Preparation', ar: 'التحضير الكامل' },
            files: { fr: '../content/ch/58_entretien_v2.html', en: '../content/ch/58_entretien_v2_EN.html', ar: '../content/ch/58_entretien_v2_AR.html' },
            downloads: { pdf: { fr: '../content/ch/58_entretien_v2.pdf' } }
          },
          {
            id: 'interview-fr-short',
            labels: { fr: 'Version Condensée', en: 'Condensed Version', ar: 'النسخة المختصرة' },
            files: { fr: '../content/ch/59_entretien_v3_court.html', en: '../content/ch/59_entretien_v3_court_EN.html', ar: '../content/ch/59_entretien_v3_court_AR.html' },
            downloads: { pdf: { fr: '../content/ch/59_entretien_v3_court.pdf' } }
          },
          {
            id: 'interview-fr-ultra',
            labels: { fr: 'Fiche Flash', en: 'Flash Card', ar: 'البطاقة السريعة' },
            files: { fr: '../content/ch/60_entretien_v4_ultra.html', en: '../content/ch/60_entretien_v4_ultra_EN.html', ar: '../content/ch/60_entretien_v4_ultra_AR.html' },
            downloads: { pdf: { fr: '../content/ch/60_entretien_v4_ultra.pdf' } }
          },
          {
            id: 'flashcards',
            labels: { fr: 'Flash Cards', en: 'Flash Cards', ar: 'بطاقات المراجعة' },
            files: { fr: '../content/shared/116_flashcards_FR.html', en: '../content/shared/117_flashcards_EN.html', ar: '../content/shared/116_flashcards_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/116_flashcards_FR.pdf', en: '../content/shared/117_flashcards_EN.pdf', ar: '../content/shared/116_flashcards_FR.pdf' }
            }
          }
        ]
      },
      plan: {
        items: [
          {
            id: 'plan-fr',
            labels: { fr: 'Plan France', en: 'France Action Plan', ar: 'خطة فرنسا' },
            files: { fr: '../content/fr/81_plan_france.html', en: '../content/fr/81_plan_france_EN.html', ar: '../content/fr/82_plan_france_AR.html' },
            downloads: { txt: { fr: '../content/fr/81_plan_france.txt', en: '../content/fr/81_plan_france_EN.txt', ar: '../content/fr/82_plan_france_AR.txt' } }
          }
        ]
      },
      prompts: {
        items: [
          {
            id: 'prompts-fr',
            labels: { fr: 'Prompts Recherche', en: 'Search Prompts', ar: 'أوامر البحث' },
            files: { fr: '../content/fr/88_prompts_france.html', en: '../content/fr/88_prompts_france_EN.html', ar: '../content/fr/89_prompts_france_AR.html' },
            downloads: { txt: { fr: '../content/fr/88_prompts_france.txt', en: '../content/fr/88_prompts_france_EN.txt', ar: '../content/fr/89_prompts_france_AR.txt' } }
          },
          {
            id: 'prompts-generic',
            labels: { fr: 'Prompts Génériques', en: 'Generic Prompts', ar: 'أوامر عامة' },
            files: { fr: '../content/shared/114_prompts_generique_FR.html', en: '../content/shared/115_prompts_generique_EN.html', ar: '../content/shared/114_prompts_generique_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/114_prompts_generique_FR.pdf', en: '../content/shared/115_prompts_generique_EN.pdf', ar: '../content/shared/114_prompts_generique_FR.pdf' }
            }
          }
        ]
      },
      queries: {
        items: [
          {
            id: 'queries-fr',
            labels: { fr: 'Requêtes de Recherche', en: 'Search Queries', ar: 'استعلامات البحث' },
            files: { fr: '../content/fr/87_queries_france_FR.html', en: '../content/fr/87_queries_france_EN.html', ar: '../content/fr/87_queries_france_AR.html' },
            downloads: { txt: { fr: '../content/fr/87_queries_france_FR.txt', en: '../content/fr/87_queries_france_EN.txt', ar: '../content/fr/87_queries_france_AR.txt' } }
          }
        ]
      },
      jobs: { items: [{ id: 'jobs-fr', labels: { fr: 'Offres France', en: 'French Jobs', ar: 'وظائف فرنسا' }, type: 'jobs', region: 'fr' }] },

      skills: {
        items: [
          {
            id: 'skills-matrix',
            labels: { fr: 'Matrice Compétences', en: 'Skills Matrix', ar: 'مصفوفة المهارات' },
            files: { fr: '../content/shared/124_skills_matrix_FR.html', en: '../content/shared/125_skills_matrix_EN.html', ar: '../content/shared/124_skills_matrix_FR.html' }
          }
        ]
      },
      portfolio: {
        items: [
          {
            id: 'portfolio',
            labels: { fr: 'Portfolio Projets', en: 'Project Portfolio', ar: 'معرض المشاريع' },
            files: { fr: '../content/shared/126_portfolio_FR.html', en: '../content/shared/127_portfolio_EN.html', ar: '../content/shared/126_portfolio_FR.html' }
          }
        ]
      },
      timeline: {
        items: [
          {
            id: 'timeline',
            labels: { fr: 'Timeline Carrière', en: 'Career Timeline', ar: 'المسار المهني' },
            files: { fr: '../content/shared/122_timeline_FR.html', en: '../content/shared/123_timeline_EN.html', ar: '../content/shared/122_timeline_FR.html' }
          }
        ]
      },
      help: {
        items: [
          {
            id: 'help',
            labels: { fr: "Guide d'utilisation", en: 'User Guide', ar: 'دليل الاستخدام' },
            files: { fr: '../content/shared/120_help_FR.html', en: '../content/shared/121_help_EN.html', ar: '../content/shared/120_help_FR.html' }
          }
        ]
      }
    },
    lu: {
      cv: {
        items: [
          {
            id: 'cv-lu',
            labels: { fr: 'CV Luxembourg', en: 'Luxembourg CV', ar: 'السيرة الذاتية - لوكسمبورغ' },
            files: { fr: '../content/lu/90_cv_lu_FR.html', en: '../content/lu/91_cv_lu_EN.html', ar: '../content/lu/92_cv_lu_AR.html' },
            downloads: {
              pdf: { fr: '../content/lu/90_cv_lu_FR.pdf', en: '../content/lu/91_cv_lu_EN.pdf', ar: '../content/lu/92_cv_lu_AR.pdf' }
            },
            default: true
          },
          {
            id: 'cv-condensed',
            labels: { fr: 'CV 1 Page', en: '1-Page CV', ar: 'سيرة ذاتية صفحة واحدة' },
            files: { fr: '../content/shared/118_cv_condensed_FR.html', en: '../content/shared/119_cv_condensed_EN.html', ar: '../content/shared/118_cv_condensed_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/118_cv_condensed_FR.pdf', en: '../content/shared/119_cv_condensed_EN.pdf', ar: '../content/shared/118_cv_condensed_FR.pdf' }
            }
          }
        ]
      },
      linkedin: {
        items: [
          {
            id: 'linkedin-lu-content',
            labels: { fr: 'Contenu du Profil', en: 'Profile Content', ar: 'محتوى الملف' },
            files: { fr: '../content/shared/65_linkedin_FR.html', en: '../content/shared/64_linkedin_EN.html', ar: '../content/shared/72_linkedin_AR.html' },
            downloads: { txt: { fr: '../content/shared/65_linkedin_FR.txt', en: '../content/shared/64_linkedin_EN.txt', ar: '../content/shared/72_linkedin_AR.txt' } }
          },
          {
            id: 'linkedin-lu-visual',
            labels: { fr: 'Aperçu Visuel', en: 'Visual Preview', ar: 'معاينة مرئية' },
            files: { fr: '../content/shared/67_linkedin_FR.html', en: '../content/shared/66_linkedin_EN.html', ar: '../content/shared/72_linkedin_AR.html' }
          }
        ]
      },
      letter: {
        items: [
          {
            id: 'letter-lu',
            labels: { fr: 'Lettre Luxembourg', en: 'Luxembourg Letter', ar: 'رسالة لوكسمبورغ' },
            files: { fr: '../content/lu/96_lettre_lu.html', en: '../content/lu/97_lettre_lu_EN.html', ar: '../content/lu/98_lettre_lu_AR.html' },
            downloads: {
              pdf: { fr: '../content/lu/96_lettre_lu.pdf', en: '../content/lu/97_lettre_lu_EN.pdf', ar: '../content/lu/98_lettre_lu_AR.pdf' }
            }
          },
          {
            id: 'letter-generic',
            labels: { fr: 'Lettre Générique', en: 'Generic Letter', ar: 'رسالة عامة' },
            files: { fr: '../content/shared/111_lettre_generique_FR.html', en: '../content/shared/112_lettre_generique_EN.html', ar: '../content/shared/113_lettre_generique_AR.html' },
            downloads: {
              pdf: { fr: '../content/shared/111_lettre_generique_FR.pdf', en: '../content/shared/112_lettre_generique_EN.pdf', ar: '../content/shared/113_lettre_generique_AR.pdf' }
            },
            default: true
          }
        ]
      },
      pitch: {
        items: [
          {
            id: 'pitch-lu',
            labels: { fr: 'Pitch 2 Minutes', en: '2-Minute Pitch', ar: 'العرض التقديمي' },
            files: { fr: '../content/lu/95_pitch_lu.html', en: '../content/lu/95_pitch_lu_EN.html', ar: '../content/lu/95_pitch_lu_AR.html' },
            downloads: { txt: { fr: '../content/lu/95_pitch_lu.txt', en: '../content/lu/95_pitch_lu_EN.txt', ar: '../content/lu/95_pitch_lu_AR.txt' } }
          }
        ]
      },
      interview: {
        items: [
          {
            id: 'interview-lu-full',
            labels: { fr: 'Préparation Complète', en: 'Full Preparation', ar: 'التحضير الكامل' },
            files: { fr: '../content/ch/58_entretien_v2.html', en: '../content/ch/58_entretien_v2_EN.html', ar: '../content/ch/58_entretien_v2_AR.html' },
            downloads: { pdf: { fr: '../content/ch/58_entretien_v2.pdf' } }
          },
          {
            id: 'interview-lu-short',
            labels: { fr: 'Version Condensée', en: 'Condensed Version', ar: 'النسخة المختصرة' },
            files: { fr: '../content/ch/59_entretien_v3_court.html', en: '../content/ch/59_entretien_v3_court_EN.html', ar: '../content/ch/59_entretien_v3_court_AR.html' },
            downloads: { pdf: { fr: '../content/ch/59_entretien_v3_court.pdf' } }
          },
          {
            id: 'interview-lu-ultra',
            labels: { fr: 'Fiche Flash', en: 'Flash Card', ar: 'البطاقة السريعة' },
            files: { fr: '../content/ch/60_entretien_v4_ultra.html', en: '../content/ch/60_entretien_v4_ultra_EN.html', ar: '../content/ch/60_entretien_v4_ultra_AR.html' },
            downloads: { pdf: { fr: '../content/ch/60_entretien_v4_ultra.pdf' } }
          },
          {
            id: 'flashcards',
            labels: { fr: 'Flash Cards', en: 'Flash Cards', ar: 'بطاقات المراجعة' },
            files: { fr: '../content/shared/116_flashcards_FR.html', en: '../content/shared/117_flashcards_EN.html', ar: '../content/shared/116_flashcards_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/116_flashcards_FR.pdf', en: '../content/shared/117_flashcards_EN.pdf', ar: '../content/shared/116_flashcards_FR.pdf' }
            }
          }
        ]
      },
      plan: {
        items: [
          {
            id: 'plan-lu',
            labels: { fr: 'Plan Luxembourg', en: 'Luxembourg Plan', ar: 'خطة لوكسمبورغ' },
            files: { fr: '../content/lu/93_plan_lu.html', en: '../content/lu/93_plan_lu_EN.html', ar: '../content/lu/94_plan_lu_AR.html' },
            downloads: { txt: { fr: '../content/lu/93_plan_lu.txt', en: '../content/lu/93_plan_lu_EN.txt', ar: '../content/lu/94_plan_lu_AR.txt' } }
          }
        ]
      },
      prompts: {
        items: [
          {
            id: 'prompts-lu',
            labels: { fr: 'Prompts IA', en: 'AI Prompts', ar: 'أوامر الذكاء الاصطناعي' },
            files: { fr: '../content/lu/99_prompts_lu.html', en: '../content/lu/99_prompts_lu_EN.html', ar: '../content/lu/99_prompts_lu_AR.html' },
            downloads: { txt: { fr: '../content/lu/99_prompts_lu.txt', en: '../content/lu/99_prompts_lu_EN.txt', ar: '../content/lu/99_prompts_lu_AR.txt' } }
          },
          {
            id: 'prompts-generic',
            labels: { fr: 'Prompts Génériques', en: 'Generic Prompts', ar: 'أوامر عامة' },
            files: { fr: '../content/shared/114_prompts_generique_FR.html', en: '../content/shared/115_prompts_generique_EN.html', ar: '../content/shared/114_prompts_generique_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/114_prompts_generique_FR.pdf', en: '../content/shared/115_prompts_generique_EN.pdf', ar: '../content/shared/114_prompts_generique_FR.pdf' }
            }
          }
        ]
      },
      queries: {
        items: [
          {
            id: 'queries-lu',
            labels: { fr: 'Requêtes LinkedIn', en: 'LinkedIn Queries', ar: 'استعلامات LinkedIn' },
            files: { fr: '../content/lu/100_queries_lu.html', en: '../content/lu/100_queries_lu_EN.html', ar: '../content/lu/100_queries_lu_AR.html' },
            downloads: { txt: { fr: '../content/lu/100_queries_lu.txt', en: '../content/lu/100_queries_lu_EN.txt', ar: '../content/lu/100_queries_lu_AR.txt' } }
          }
        ]
      },
      jobs: { items: [{ id: 'jobs-lu', labels: { fr: 'Offres Luxembourg', en: 'Luxembourg Jobs', ar: 'وظائف لوكسمبورغ' }, type: 'jobs', region: 'lu' }] },

      skills: {
        items: [
          {
            id: 'skills-matrix',
            labels: { fr: 'Matrice Compétences', en: 'Skills Matrix', ar: 'مصفوفة المهارات' },
            files: { fr: '../content/shared/124_skills_matrix_FR.html', en: '../content/shared/125_skills_matrix_EN.html', ar: '../content/shared/124_skills_matrix_FR.html' }
          }
        ]
      },
      portfolio: {
        items: [
          {
            id: 'portfolio',
            labels: { fr: 'Portfolio Projets', en: 'Project Portfolio', ar: 'معرض المشاريع' },
            files: { fr: '../content/shared/126_portfolio_FR.html', en: '../content/shared/127_portfolio_EN.html', ar: '../content/shared/126_portfolio_FR.html' }
          }
        ]
      },
      timeline: {
        items: [
          {
            id: 'timeline',
            labels: { fr: 'Timeline Carrière', en: 'Career Timeline', ar: 'المسار المهني' },
            files: { fr: '../content/shared/122_timeline_FR.html', en: '../content/shared/123_timeline_EN.html', ar: '../content/shared/122_timeline_FR.html' }
          }
        ]
      },
      help: {
        items: [
          {
            id: 'help',
            labels: { fr: "Guide d'utilisation", en: 'User Guide', ar: 'دليل الاستخدام' },
            files: { fr: '../content/shared/120_help_FR.html', en: '../content/shared/121_help_EN.html', ar: '../content/shared/120_help_FR.html' }
          }
        ]
      }
    },
    gulf: {
      cv: {
        items: [
          {
            id: 'cv-gulf',
            labels: { fr: 'CV Golfe', en: 'Gulf CV', ar: 'السيرة الذاتية - الخليج' },
            files: { fr: '../content/gulf/101_cv_gulf_FR.html', en: '../content/gulf/102_cv_gulf_EN.html', ar: '../content/gulf/103_cv_gulf_AR.html' },
            downloads: {
              pdf: { fr: '../content/gulf/101_cv_gulf_FR.pdf', en: '../content/gulf/102_cv_gulf_EN.pdf', ar: '../content/gulf/103_cv_gulf_AR.pdf' }
            },
            default: true
          },
          {
            id: 'cv-condensed',
            labels: { fr: 'CV 1 Page', en: '1-Page CV', ar: 'سيرة ذاتية صفحة واحدة' },
            files: { fr: '../content/shared/118_cv_condensed_FR.html', en: '../content/shared/119_cv_condensed_EN.html', ar: '../content/shared/118_cv_condensed_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/118_cv_condensed_FR.pdf', en: '../content/shared/119_cv_condensed_EN.pdf', ar: '../content/shared/118_cv_condensed_FR.pdf' }
            }
          }
        ]
      },
      linkedin: {
        items: [
          {
            id: 'linkedin-gulf-content',
            labels: { fr: 'Contenu du Profil', en: 'Profile Content', ar: 'محتوى الملف' },
            files: { fr: '../content/shared/65_linkedin_FR.html', en: '../content/shared/64_linkedin_EN.html', ar: '../content/shared/72_linkedin_AR.html' },
            downloads: { txt: { fr: '../content/shared/65_linkedin_FR.txt', en: '../content/shared/64_linkedin_EN.txt', ar: '../content/shared/72_linkedin_AR.txt' } }
          },
          {
            id: 'linkedin-gulf-visual',
            labels: { fr: 'Aperçu Visuel', en: 'Visual Preview', ar: 'معاينة مرئية' },
            files: { fr: '../content/shared/67_linkedin_FR.html', en: '../content/shared/66_linkedin_EN.html', ar: '../content/shared/72_linkedin_AR.html' }
          }
        ]
      },
      letter: {
        items: [
          {
            id: 'letter-gulf',
            labels: { fr: 'Lettre Golfe', en: 'Gulf Letter', ar: 'رسالة الخليج' },
            files: { fr: '../content/gulf/107_lettre_gulf.html', en: '../content/gulf/108_lettre_gulf_EN.html', ar: '../content/gulf/109_lettre_gulf_AR.html' },
            downloads: {
              pdf: { fr: '../content/gulf/107_lettre_gulf.pdf', en: '../content/gulf/108_lettre_gulf_EN.pdf', ar: '../content/gulf/109_lettre_gulf_AR.pdf' }
            }
          },
          {
            id: 'letter-generic',
            labels: { fr: 'Lettre Générique', en: 'Generic Letter', ar: 'رسالة عامة' },
            files: { fr: '../content/shared/111_lettre_generique_FR.html', en: '../content/shared/112_lettre_generique_EN.html', ar: '../content/shared/113_lettre_generique_AR.html' },
            downloads: {
              pdf: { fr: '../content/shared/111_lettre_generique_FR.pdf', en: '../content/shared/112_lettre_generique_EN.pdf', ar: '../content/shared/113_lettre_generique_AR.pdf' }
            },
            default: true
          }
        ]
      },
      pitch: {
        items: [
          {
            id: 'pitch-gulf',
            labels: { fr: 'Pitch 2 Minutes', en: '2-Minute Pitch', ar: 'العرض التقديمي' },
            files: { fr: '../content/gulf/106_pitch_gulf.html', en: '../content/gulf/106_pitch_gulf_EN.html', ar: '../content/gulf/106_pitch_gulf_AR.html' },
            downloads: { txt: { fr: '../content/gulf/106_pitch_gulf.txt', en: '../content/gulf/106_pitch_gulf_EN.txt', ar: '../content/gulf/106_pitch_gulf_AR.txt' } }
          }
        ]
      },
      interview: {
        items: [
          {
            id: 'interview-gulf-full',
            labels: { fr: 'Préparation Complète', en: 'Full Preparation', ar: 'التحضير الكامل' },
            files: { fr: '../content/ch/58_entretien_v2.html', en: '../content/ch/58_entretien_v2_EN.html', ar: '../content/ch/58_entretien_v2_AR.html' },
            downloads: { pdf: { fr: '../content/ch/58_entretien_v2.pdf' } }
          },
          {
            id: 'interview-gulf-short',
            labels: { fr: 'Version Condensée', en: 'Condensed Version', ar: 'النسخة المختصرة' },
            files: { fr: '../content/ch/59_entretien_v3_court.html', en: '../content/ch/59_entretien_v3_court_EN.html', ar: '../content/ch/59_entretien_v3_court_AR.html' },
            downloads: { pdf: { fr: '../content/ch/59_entretien_v3_court.pdf' } }
          },
          {
            id: 'interview-gulf-ultra',
            labels: { fr: 'Fiche Flash', en: 'Flash Card', ar: 'البطاقة السريعة' },
            files: { fr: '../content/ch/60_entretien_v4_ultra.html', en: '../content/ch/60_entretien_v4_ultra_EN.html', ar: '../content/ch/60_entretien_v4_ultra_AR.html' },
            downloads: { pdf: { fr: '../content/ch/60_entretien_v4_ultra.pdf' } }
          },
          {
            id: 'flashcards',
            labels: { fr: 'Flash Cards', en: 'Flash Cards', ar: 'بطاقات المراجعة' },
            files: { fr: '../content/shared/116_flashcards_FR.html', en: '../content/shared/117_flashcards_EN.html', ar: '../content/shared/116_flashcards_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/116_flashcards_FR.pdf', en: '../content/shared/117_flashcards_EN.pdf', ar: '../content/shared/116_flashcards_FR.pdf' }
            }
          }
        ]
      },
      plan: {
        items: [
          {
            id: 'plan-gulf',
            labels: { fr: 'Plan Golfe', en: 'Gulf Plan', ar: 'خطة الخليج' },
            files: { fr: '../content/gulf/104_plan_gulf.html', en: '../content/gulf/104_plan_gulf_EN.html', ar: '../content/gulf/105_plan_gulf_AR.html' },
            downloads: { txt: { fr: '../content/gulf/104_plan_gulf.txt', en: '../content/gulf/104_plan_gulf_EN.txt', ar: '../content/gulf/105_plan_gulf_AR.txt' } }
          }
        ]
      },
      prompts: {
        items: [
          {
            id: 'prompts-gulf',
            labels: { fr: 'Prompts IA', en: 'AI Prompts', ar: 'أوامر الذكاء الاصطناعي' },
            files: { fr: '../content/gulf/110_prompts_gulf.html', en: '../content/gulf/110_prompts_gulf_EN.html', ar: '../content/gulf/110_prompts_gulf_AR.html' },
            downloads: { txt: { fr: '../content/gulf/110_prompts_gulf.txt', en: '../content/gulf/110_prompts_gulf_EN.txt', ar: '../content/gulf/110_prompts_gulf_AR.txt' } }
          },
          {
            id: 'prompts-generic',
            labels: { fr: 'Prompts Génériques', en: 'Generic Prompts', ar: 'أوامر عامة' },
            files: { fr: '../content/shared/114_prompts_generique_FR.html', en: '../content/shared/115_prompts_generique_EN.html', ar: '../content/shared/114_prompts_generique_FR.html' },
            downloads: {
              pdf: { fr: '../content/shared/114_prompts_generique_FR.pdf', en: '../content/shared/115_prompts_generique_EN.pdf', ar: '../content/shared/114_prompts_generique_FR.pdf' }
            }
          }
        ]
      },
      queries: {
        items: [
          {
            id: 'queries-gulf',
            labels: { fr: 'Requêtes LinkedIn', en: 'LinkedIn Queries', ar: 'استعلامات LinkedIn' },
            files: { fr: '../content/gulf/111_queries_gulf.html', en: '../content/gulf/111_queries_gulf_EN.html', ar: '../content/gulf/111_queries_gulf_AR.html' },
            downloads: { txt: { fr: '../content/gulf/111_queries_gulf.txt', en: '../content/gulf/111_queries_gulf_EN.txt', ar: '../content/gulf/111_queries_gulf_AR.txt' } }
          }
        ]
      },
      jobs: { items: [{ id: 'jobs-gulf', labels: { fr: 'Offres Golfe', en: 'Gulf Jobs', ar: 'وظائف الخليج' }, type: 'jobs', region: 'gulf' }] },

      skills: {
        items: [
          {
            id: 'skills-matrix',
            labels: { fr: 'Matrice Compétences', en: 'Skills Matrix', ar: 'مصفوفة المهارات' },
            files: { fr: '../content/shared/124_skills_matrix_FR.html', en: '../content/shared/125_skills_matrix_EN.html', ar: '../content/shared/124_skills_matrix_FR.html' }
          }
        ]
      },
      portfolio: {
        items: [
          {
            id: 'portfolio',
            labels: { fr: 'Portfolio Projets', en: 'Project Portfolio', ar: 'معرض المشاريع' },
            files: { fr: '../content/shared/126_portfolio_FR.html', en: '../content/shared/127_portfolio_EN.html', ar: '../content/shared/126_portfolio_FR.html' }
          }
        ]
      },
      timeline: {
        items: [
          {
            id: 'timeline',
            labels: { fr: 'Timeline Carrière', en: 'Career Timeline', ar: 'المسار المهني' },
            files: { fr: '../content/shared/122_timeline_FR.html', en: '../content/shared/123_timeline_EN.html', ar: '../content/shared/122_timeline_FR.html' }
          }
        ]
      },
      help: {
        items: [
          {
            id: 'help',
            labels: { fr: "Guide d'utilisation", en: 'User Guide', ar: 'دليل الاستخدام' },
            files: { fr: '../content/shared/120_help_FR.html', en: '../content/shared/121_help_EN.html', ar: '../content/shared/120_help_FR.html' }
          }
        ]
      }
    }
  },

  // Section icons (emoji for now, can be replaced with SVG)
  SECTION_ICONS: {
    cv: '&#128196;',
    linkedin: '&#128188;',
    letter: '&#9993;',
    pitch: '&#127908;',
    interview: '&#128203;',
    plan: '&#128506;',
    prompts: '&#129302;',
    queries: '&#128269;',
    jobs: '&#128188;',
    help: '&#10067;',
    portfolio: '&#128188;',
    timeline: '&#128197;',
    skills: '&#128202;'
  },

  // ── INITIALIZATION ──
  init() {
    Themes.init();
    I18n.init();
    this.buildSidebar();
    this.bindEvents();
    this.handleRoute();
    this.initCommandPalette();
  },

  // ── BUILD SIDEBAR ──
  buildSidebar() {
    const nav = document.getElementById('sidebar-nav');
    const lang = I18n.get();
    const country = this.currentCountry;
    const sections = this.CONTENT[country];

    if (!sections) return;

    let html = '';
    const sectionKeys = Object.keys(sections);

    sectionKeys.forEach(key => {
      const section = sections[key];
      const label = I18n.sectionLabels[key] ? I18n.sectionLabels[key][lang] : key;
      const icon = this.SECTION_ICONS[key] || '';
      const items = section.items || [];

      html += `<div class="nav-section open" data-section="${key}">`;
      html += `<div class="nav-section-header">`;
      html += `<span class="nav-section-icon">${icon}</span>`;
      html += `<span>${label}</span>`;
      html += `<span class="nav-section-chevron">&#9656;</span>`;
      html += `</div>`;
      html += `<div class="nav-section-items">`;

      items.forEach(item => {
        const itemLabel = item.labels[lang] || item.labels['fr'] || item.id;
        const comingSoon = item.comingSoon ? ' <span style="opacity:0.5;font-size:10px">(soon)</span>' : '';
        const modified = this.hasEdits(item.id) ? ' <span class="badge-modified">&#9998;</span>' : '';
        html += `<div class="nav-item${item.default ? ' active' : ''}" data-item="${item.id}" data-section="${key}">`;
        html += `${itemLabel}${comingSoon}${modified}`;
        html += `</div>`;
      });

      html += `</div></div>`;
    });

    nav.innerHTML = html;
  },

  // ── BIND EVENTS ──
  bindEvents() {
    // Country tabs
    document.getElementById('country-tabs').addEventListener('click', (e) => {
      const tab = e.target.closest('.country-tab');
      if (!tab) return;
      this.setCountry(tab.dataset.country);
    });

    // Sidebar nav clicks
    document.getElementById('sidebar-nav').addEventListener('click', (e) => {
      // Section header toggle
      const header = e.target.closest('.nav-section-header');
      if (header) {
        header.parentElement.classList.toggle('open');
        return;
      }
      // Item click
      const item = e.target.closest('.nav-item');
      if (item) {
        window.location.hash = `${this.currentCountry}/${item.dataset.item}`;
      }
    });

    // Hash routing
    window.addEventListener('hashchange', () => this.handleRoute());

    // Mobile: swipe left to close sidebar
    let touchStartX = 0;
    const sidebar = document.getElementById('sidebar');
    sidebar.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    sidebar.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (dx < -60) sidebar.classList.remove('open');
    }, { passive: true });

    // Hamburger
    document.getElementById('hamburger-btn').addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('open');
      sidebar.classList.remove('collapsed');
    });

    // Sidebar overlay close
    document.getElementById('sidebar-overlay').addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('open');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K → command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleCommandPalette();
      }
      // Escape → close command palette or mobile sidebar
      if (e.key === 'Escape') {
        document.getElementById('cmd-overlay').classList.remove('visible');
        document.getElementById('sidebar').classList.remove('open');
      }
    });

    // Ctrl+K button in header
    document.getElementById('cmd-trigger').addEventListener('click', () => {
      this.toggleCommandPalette();
    });
  },

  // ── SET COUNTRY ──
  setCountry(country) {
    this.currentCountry = country;

    // Update tabs
    document.querySelectorAll('.country-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.country === country);
    });

    // Rebuild sidebar for new country
    this.buildSidebar();

    // Navigate to default item
    const sections = this.CONTENT[country];
    const firstSection = Object.keys(sections)[0];
    const firstItem = sections[firstSection].items[0];
    window.location.hash = `${country}/${firstItem.id}`;
  },

  // ── ROUTE HANDLER ──
  handleRoute() {
    const hash = window.location.hash.slice(1) || `${this.currentCountry}/cv-swiss`;
    const parts = hash.split('/');
    const country = parts[0] || 'ch';
    const itemId = parts[1] || 'cv-swiss';

    // Update country if changed
    if (country !== this.currentCountry) {
      this.currentCountry = country;
      document.querySelectorAll('.country-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.country === country);
      });
      this.buildSidebar();
    }

    // Find the item
    const { section, item } = this.findItem(country, itemId);
    if (!item) return;

    this.currentSection = section;
    this.currentItem = item;

    const lang = I18n.get();

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.item === itemId);
    });

    // Update breadcrumb
    const sectionLabel = I18n.sectionLabels[section] ? I18n.sectionLabels[section][lang] : section;
    const itemLabel = item.labels[lang] || item.labels['fr'] || itemId;
    document.getElementById('breadcrumb-section').textContent = sectionLabel;
    document.getElementById('breadcrumb-item').textContent = itemLabel;

    // Show jobs panel or iframe
    const iframe = document.getElementById('content-frame');
    const jobsPanel = document.getElementById('jobs-panel');

    if (item.type === 'jobs') {
      iframe.style.display = 'none';
      jobsPanel.classList.add('visible');
      if (typeof Jobs !== 'undefined') Jobs.show(item.region);
    } else if (item.comingSoon) {
      iframe.style.display = 'block';
      jobsPanel.classList.remove('visible');
      iframe.srcdoc = `<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Segoe UI,Arial;color:#888;font-size:24px;">
        <div style="text-align:center;">
          <div style="font-size:64px;margin-bottom:16px;">&#128679;</div>
          <div>Coming Soon</div>
          <div style="font-size:14px;margin-top:8px;color:#aaa;">Phase 2-4</div>
        </div>
      </body></html>`;
    } else {
      iframe.style.display = 'block';
      jobsPanel.classList.remove('visible');
      const file = item.files[lang] || item.files['fr'] || '';
      if (file) {
        // Check for saved edits
        const editKey = `edit-${item.id}-${lang}`;
        const savedEdit = localStorage.getItem(editKey);
        if (savedEdit) {
          iframe.srcdoc = savedEdit;
        } else {
          iframe.removeAttribute('srcdoc');
          iframe.src = file;
        }
      }
    }

    // Inject copy buttons into iframe content after load
    iframe.onload = () => this.injectCopyButtons(iframe);

    // Update download buttons
    if (typeof Downloads !== 'undefined') Downloads.update(item, lang);

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
  },

  // ── FIND ITEM ──
  findItem(country, itemId) {
    const sections = this.CONTENT[country];
    if (!sections) return {};

    for (const sectionKey of Object.keys(sections)) {
      const section = sections[sectionKey];
      for (const item of section.items) {
        if (item.id === itemId) {
          return { section: sectionKey, item };
        }
      }
    }
    return {};
  },

  // ── CHECK EDITS ──
  hasEdits(itemId) {
    for (const lang of ['fr', 'en', 'ar']) {
      if (localStorage.getItem(`edit-${itemId}-${lang}`)) return true;
    }
    return false;
  },

  // ── INJECT COPY BUTTONS ──
  injectCopyButtons(iframe) {
    try {
      const doc = iframe.contentDocument;
      if (!doc) return;
      const lang = I18n.get();
      const labels = { fr: ['Copier', 'Copié !'], en: ['Copy', 'Copied!'], ar: ['نسخ', 'تم !'] };
      const [label, labelDone] = labels[lang] || labels['en'];

      // Copy buttons for prompt boxes
      doc.querySelectorAll('.prompt-box').forEach(box => {
        if (box.querySelector('.copy-btn')) return;
        box.style.position = 'relative';
        box.style.paddingTop = '28pt';
        const btn = doc.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = label;
        btn.style.cssText = 'position:absolute;top:6pt;right:6pt;background:#0a66c2;color:#fff;border:none;border-radius:3pt;padding:3pt 10pt;font-size:7.5pt;font-weight:600;cursor:pointer;letter-spacing:0.3pt;';
        btn.addEventListener('click', () => {
          const text = box.innerText.replace(new RegExp('^' + label + '\\n?'), '');
          navigator.clipboard.writeText(text).then(() => {
            btn.textContent = labelDone;
            btn.style.background = '#27ae60';
            setTimeout(() => { btn.textContent = label; btn.style.background = '#0a66c2'; }, 1500);
          });
        });
        box.appendChild(btn);
      });

      // Click-to-copy for query boxes
      doc.querySelectorAll('.query-box').forEach(box => {
        if (box.dataset.copyBound) return;
        box.dataset.copyBound = '1';
        box.style.cursor = 'pointer';
        box.title = lang === 'ar' ? 'انقر للنسخ' : lang === 'en' ? 'Click to copy' : 'Cliquer pour copier';
        box.addEventListener('click', () => {
          navigator.clipboard.writeText(box.innerText).then(() => {
            box.style.background = '#d4edda';
            box.style.borderColor = '#27ae60';
            setTimeout(() => { box.style.background = ''; box.style.borderColor = ''; }, 1000);
          });
        });
      });
    } catch (e) { /* cross-origin or sandbox restriction */ }
  },

  // ── COMMAND PALETTE ──
  initCommandPalette() {
    const overlay = document.getElementById('cmd-overlay');
    const input = document.getElementById('cmd-input');
    const results = document.getElementById('cmd-results');

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('visible');
    });

    // Search on input
    input.addEventListener('input', () => {
      const query = input.value.toLowerCase().trim();
      if (!query) {
        results.innerHTML = this.getDefaultCommands();
        return;
      }
      results.innerHTML = this.searchCommands(query);
    });

    // Keyboard nav in results
    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('.cmd-result');
      const selected = results.querySelector('.cmd-result.selected');
      let idx = Array.from(items).indexOf(selected);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        idx = Math.min(idx + 1, items.length - 1);
        items.forEach(i => i.classList.remove('selected'));
        items[idx]?.classList.add('selected');
        items[idx]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        idx = Math.max(idx - 1, 0);
        items.forEach(i => i.classList.remove('selected'));
        items[idx]?.classList.add('selected');
        items[idx]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const sel = results.querySelector('.cmd-result.selected') || items[0];
        if (sel) sel.click();
      }
    });

    // Click on result
    results.addEventListener('click', (e) => {
      const result = e.target.closest('.cmd-result');
      if (!result) return;

      const action = result.dataset.action;
      if (action === 'navigate') {
        window.location.hash = result.dataset.hash;
      } else if (action === 'theme') {
        Themes.set(result.dataset.theme);
      } else if (action === 'lang') {
        I18n.set(result.dataset.lang);
      } else if (action === 'country') {
        this.setCountry(result.dataset.country);
      }

      overlay.classList.remove('visible');
    });
  },

  toggleCommandPalette() {
    const overlay = document.getElementById('cmd-overlay');
    const input = document.getElementById('cmd-input');
    const results = document.getElementById('cmd-results');

    overlay.classList.toggle('visible');
    if (overlay.classList.contains('visible')) {
      input.value = '';
      input.focus();
      results.innerHTML = this.getDefaultCommands();
    }
  },

  getDefaultCommands() {
    const lang = I18n.get();
    let html = '';

    // Quick actions
    const countries = ['ch', 'fr', 'lu', 'gulf'];
    countries.forEach(c => {
      const label = I18n.countryLabels[c][lang];
      const flag = { ch: '&#127464;&#127469;', fr: '&#127467;&#127479;', lu: '&#127473;&#127482;', gulf: '&#127462;&#127466;' }[c];
      html += `<div class="cmd-result" data-action="country" data-country="${c}">
        <span class="cmd-result-icon">${flag}</span>${label}</div>`;
    });

    // Sections for current country
    const sections = this.CONTENT[this.currentCountry];
    Object.keys(sections).forEach(key => {
      sections[key].items.forEach(item => {
        const label = item.labels[lang] || item.labels['fr'];
        const icon = this.SECTION_ICONS[key] || '';
        html += `<div class="cmd-result" data-action="navigate" data-hash="${this.currentCountry}/${item.id}">
          <span class="cmd-result-icon">${icon}</span>${label}</div>`;
      });
    });

    return html;
  },

  searchCommands(query) {
    const lang = I18n.get();
    let html = '';
    let results = [];

    // Search all countries and items
    Object.keys(this.CONTENT).forEach(country => {
      const sections = this.CONTENT[country];
      Object.keys(sections).forEach(sectionKey => {
        sections[sectionKey].items.forEach(item => {
          const label = item.labels[lang] || item.labels['fr'] || '';
          const sectionLabel = I18n.sectionLabels[sectionKey] ? I18n.sectionLabels[sectionKey][lang] : '';
          const countryLabel = I18n.countryLabels[country][lang];
          const searchText = `${label} ${sectionLabel} ${countryLabel} ${item.id}`.toLowerCase();

          if (searchText.includes(query)) {
            const icon = this.SECTION_ICONS[sectionKey] || '';
            const flag = { ch: '&#127464;&#127469;', fr: '&#127467;&#127479;', lu: '&#127473;&#127482;', gulf: '&#127462;&#127466;' }[country];
            results.push(`<div class="cmd-result${results.length === 0 ? ' selected' : ''}" data-action="navigate" data-hash="${country}/${item.id}">
              <span class="cmd-result-icon">${icon}</span>${flag} ${label}
              <span class="cmd-result-shortcut">${countryLabel}</span></div>`);
          }
        });
      });
    });

    // Search themes
    const themes = ['light', 'dark', 'blue', 'contrast', 'golden-age', 'alhambra', 'medina'];
    themes.forEach(t => {
      if (t.includes(query) || 'theme'.includes(query)) {
        results.push(`<div class="cmd-result" data-action="theme" data-theme="${t}">
          <span class="cmd-result-icon">&#127912;</span>Theme: ${t}</div>`);
      }
    });

    return results.join('') || '<div class="cmd-result" style="opacity:0.5;cursor:default;">No results</div>';
  }
};
