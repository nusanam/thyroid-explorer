import type { SimulationNode } from './types';

export const nodes: SimulationNode[] = [
  // ==================== THYROID MARKERS ====================
  {
    id: 'tsh',
    label: 'TSH',
    category: 'thyroid',
    description: 'Thyroid Stimulating Hormone',
    normalRange: '0.5-4.5',
    optimalRange: '<2.5 for fertility',
    unit: 'mIU/L',
    educationalContent: {
      whatItIs:
        'TSH is a hormone released by your pituitary gland that signals your thyroid to produce thyroid hormones (T3 and T4). Think of it as your body\'s "thyroid thermostat."',
      whyItMatters:
        'Elevated TSH indicates your thyroid is struggling to produce enough hormone, so your pituitary keeps releasing more TSH to try to stimulate it. Even mildly elevated TSH (2.5-4.5) can impair fertility and increase miscarriage risk, though most doctors consider this "normal."',
      howToOptimize:
        'If TSH is elevated, treatment with levothyroxine (synthetic T4) can bring it into optimal range. Target TSH <2.5 when trying to conceive. Retest every 6-8 weeks until stable, then every 3-6 months.',
    },
  },
  {
    id: 'free_t3',
    label: 'Free T3',
    category: 'thyroid',
    description: 'Free Triiodothyronine (Active Thyroid Hormone)',
    normalRange: '2.3-4.2',
    optimalRange: '3.0-4.0 (upper half of range)',
    unit: 'pg/mL',
    educationalContent: {
      whatItIs:
        'T3 is the active form of thyroid hormone that actually works in your cells. "Free" T3 is the amount not bound to proteins—the portion available for your body to use. Most T3 comes from converting T4 to T3 in your liver and other tissues.',
      whyItMatters:
        "T3 directly drives your metabolism, body temperature, energy production, and many reproductive processes. Low T3 means your cells aren't getting the thyroid hormone they need, even if TSH and T4 look okay. This is especially common with chronic stress, inflammation, or nutrient deficiencies (selenium, zinc, iron).",
      howToOptimize:
        'If T3 is low despite normal T4, address conversion issues: reduce inflammation, manage stress, ensure adequate selenium (200mcg/day), zinc (15-30mg/day), and iron. Some people need T3 medication (liothyronine or combination T4/T3) if conversion remains poor.',
    },
  },
  {
    id: 'free_t4',
    label: 'Free T4',
    category: 'thyroid',
    description: 'Free Thyroxine (Inactive Thyroid Hormone)',
    normalRange: '0.8-1.8',
    optimalRange: '1.0-1.5 (mid-range)',
    unit: 'ng/dL',
    educationalContent: {
      whatItIs:
        'T4 is the storage form of thyroid hormone produced by your thyroid gland. It\'s "inactive" until converted to T3. Your thyroid makes mostly T4, which then converts to T3 throughout your body as needed. "Free" T4 is the unbound portion available for conversion.',
      whyItMatters:
        "T4 is the reservoir that supplies T3. Low T4 means not enough raw material for making active thyroid hormone. Most thyroid medications are synthetic T4 (levothyroxine), so monitoring Free T4 helps ensure you're taking the right dose.",
      howToOptimize:
        'Levothyroxine supplementation directly raises T4 levels. Typical starting dose is 25-50mcg daily, adjusted based on repeat labs. Take on empty stomach, wait 30-60 minutes before eating. Avoid taking with iron, calcium, or coffee which reduce absorption.',
    },
  },
  {
    id: 'tpo_antibodies',
    label: 'TPO Antibodies',
    category: 'thyroid',
    description: 'Thyroid Peroxidase Antibodies',
    normalRange: '<35',
    optimalRange: '<9 (undetectable)',
    unit: 'IU/mL',
    educationalContent: {
      whatItIs:
        "TPO antibodies are immune proteins that attack thyroid peroxidase, an enzyme your thyroid needs to produce hormones. Their presence indicates Hashimoto's thyroiditis, an autoimmune condition where your immune system mistakenly attacks your thyroid.",
      whyItMatters:
        'Even with normal TSH, elevated TPO antibodies increase miscarriage risk by 2-4x and pregnancy complications. The immune attack causes gradual thyroid destruction over time. Women with elevated antibodies need closer monitoring during pregnancy and may need thyroid medication even with "normal" TSH.',
      howToOptimize:
        'TPO antibodies can\'t be "cured" but can be reduced: address gut health, reduce gluten if sensitive, optimize vitamin D (>40 ng/mL), selenium (200mcg/day), manage stress, treat any infections. Some people see antibodies drop 50%+ with lifestyle changes. Thyroid medication doesn\'t lower antibodies but protects thyroid function.',
    },
  },
  {
    id: 'tg_antibodies',
    label: 'Tg Antibodies',
    category: 'thyroid',
    description: 'Thyroglobulin Antibodies',
    normalRange: '<20',
    optimalRange: '<4 (undetectable)',
    unit: 'IU/mL',
    educationalContent: {
      whatItIs:
        "Thyroglobulin antibodies attack thyroglobulin, a protein your thyroid uses to produce thyroid hormones. Like TPO antibodies, they indicate autoimmune thyroid disease (Hashimoto's). About 80% of Hashimoto's patients have TPO antibodies, 70% have Tg antibodies, and some have only Tg antibodies.",
      whyItMatters:
        'Tg antibodies contribute to thyroid destruction and inflammation. Some women have normal TPO but elevated Tg antibodies—testing both is important. Elevated Tg antibodies alone still increase pregnancy complications and warrant treatment.',
      howToOptimize:
        'Same strategies as TPO antibodies: gut health, anti-inflammatory diet, vitamin D, selenium, stress management. Consider gluten elimination trial (3+ months) as gluten molecular mimicry may trigger thyroid antibodies in susceptible people.',
    },
  },

  // ==================== INTERMEDIATE EFFECTS ====================
  {
    id: 'basal_metabolic_rate',
    label: 'Metabolic Rate',
    category: 'intermediate',
    description: 'Basal Metabolic Rate & Cellular Energy',
    educationalContent: {
      whatItIs:
        'Your basal metabolic rate (BMR) is the energy your cells use at rest for basic functions—breathing, circulation, cell production, nutrient processing. Thyroid hormones, especially T3, are the master regulators of cellular metabolism. They tell your mitochondria how much energy to produce.',
      whyItMatters:
        'Low thyroid = slow metabolism = less cellular energy. This affects every system, including reproduction. Eggs and developing follicles need lots of energy. The corpus luteum (which makes progesterone after ovulation) is metabolically demanding. Slowed metabolism also causes weight gain, fatigue, and cold intolerance—classic hypothyroid symptoms.',
      howToOptimize:
        'Optimize thyroid function (see thyroid markers). Support mitochondrial health: CoQ10 (100-300mg), magnesium (400mg), B vitamins, regular exercise (improves mitochondrial density). Adequate protein and calories—severe calorie restriction further slows metabolism.',
    },
  },
  {
    id: 'basal_body_temp',
    label: 'Body Temperature',
    category: 'intermediate',
    description: 'Basal Body Temperature Regulation',
    educationalContent: {
      whatItIs:
        "Your basal body temperature (BBT) is your temperature at rest, taken first thing in morning before moving. Thyroid hormones directly regulate body temperature by controlling metabolic heat production. In healthy cycles, BBT rises about 0.5-1°F after ovulation due to progesterone's thermogenic effect.",
      whyItMatters:
        'Hypothyroid women have lower baseline temperatures (often <97.5°F) which makes the normal biphasic BBT pattern less pronounced. A temperature rise from 96.8°F to 97.3°F is harder to detect than 97.8°F to 98.3°F. This makes BBT charting less reliable for detecting ovulation and timing intercourse.',
      howToOptimize:
        'Treat underlying hypothyroidism to raise baseline temperature. Once thyroid is optimized, BBT charting becomes more accurate. Use a sensitive thermometer (0.01°F precision), take at same time daily, track for 2-3 cycles to see your pattern.',
    },
  },
  {
    id: 'progesterone_production',
    label: 'Progesterone Production',
    category: 'intermediate',
    description: 'Corpus Luteum Function & Progesterone Synthesis',
    educationalContent: {
      whatItIs:
        'After ovulation, the empty follicle transforms into the corpus luteum, a temporary endocrine gland that produces progesterone. Progesterone maintains the uterine lining and is essential for supporting early pregnancy until the placenta takes over around 10 weeks.',
      whyItMatters:
        'The corpus luteum needs thyroid hormones to function properly. Elevated TSH and low T3 directly impair corpus luteum formation and progesterone production. This causes short luteal phase (<10 days) and low progesterone, making it difficult for embryos to implant and early pregnancies to sustain. Progesterone should be >10 ng/mL at 7 days post-ovulation for healthy luteal phase.',
      howToOptimize:
        'Optimize thyroid function first—this often improves progesterone naturally. If progesterone remains low despite optimal thyroid, consider: vitamin C (500mg), vitamin E (400 IU), magnesium (400mg), chaste tree berry (vitex). Bioidentical progesterone supplementation in luteal phase or early pregnancy if needed.',
    },
  },
  {
    id: 'liver_metabolism',
    label: 'Liver Hormone Clearance',
    category: 'intermediate',
    description: 'Hepatic Estrogen & Hormone Metabolism',
    educationalContent: {
      whatItIs:
        'Your liver metabolizes and clears hormones, including estrogen. This involves two phases: Phase 1 (using CYP450 enzymes) breaks down hormones, Phase 2 (conjugation) packages them for excretion via bile and stool. Thyroid hormones regulate liver enzyme activity and bile flow.',
      whyItMatters:
        'Hypothyroidism slows liver function, reducing estrogen clearance. This can lead to estrogen dominance (high estrogen relative to progesterone) even if estrogen production is normal. Excess estrogen contributes to heavy periods, PMS, breast tenderness, and can interfere with ovulation. Slow bile flow also reduces fat-soluble vitamin absorption (A, D, E, K).',
      howToOptimize:
        'Optimize thyroid function. Support liver: cruciferous vegetables (broccoli, Brussels sprouts—contain DIM which helps estrogen metabolism), adequate fiber (25-30g/day binds estrogen in gut), B vitamins especially B6 and B12, magnesium, milk thistle. Reduce alcohol and unnecessary medications that burden liver.',
    },
  },
  {
    id: 'shbg',
    label: 'SHBG Levels',
    category: 'intermediate',
    description: 'Sex Hormone Binding Globulin',
    educationalContent: {
      whatItIs:
        'SHBG is a protein produced by the liver that binds to sex hormones (testosterone, estrogen) in the blood. Hormones bound to SHBG are inactive; only "free" hormones can enter cells and exert effects. Thyroid status affects SHBG production—hypothyroid lowers SHBG, hyperthyroid raises it.',
      whyItMatters:
        'Low SHBG (common in hypothyroid) means more free testosterone, which can worsen PCOS symptoms or acne. It also affects estrogen balance. High SHBG (common in hyperthyroid or with estrogen excess) binds too much testosterone, potentially reducing libido and energy. Optimal SHBG is typically 60-100 nmol/L for women.',
      howToOptimize:
        'SHBG normalizes when thyroid is optimized. Also influenced by: insulin sensitivity (high insulin lowers SHBG—manage blood sugar), body composition (obesity lowers SHBG), fiber intake (increases SHBG), and stress (chronic stress lowers SHBG).',
    },
  },
  {
    id: 'prolactin',
    label: 'Prolactin Levels',
    category: 'intermediate',
    description: 'Prolactin Secretion',
    educationalContent: {
      whatItIs:
        "Prolactin is a hormone from the pituitary that stimulates milk production. It's normally elevated during pregnancy and breastfeeding. The same pituitary hormone (TRH) that stimulates TSH also stimulates prolactin, so hypothyroidism can cause mildly elevated prolactin.",
      whyItMatters:
        'Elevated prolactin (>25 ng/mL when not pregnant/nursing) suppresses GnRH, which reduces FSH and LH, which impairs ovulation. This can cause irregular cycles or anovulation. It also reduces progesterone production. In hypothyroid women, fixing the thyroid often normalizes prolactin without needing dopamine agonists.',
      howToOptimize:
        'Treat underlying hypothyroidism first—prolactin often normalizes. If prolactin remains elevated, investigate other causes (pituitary adenoma, medications, stress). Natural support: vitamin B6 (100mg), vitex/chaste tree berry. Avoid frequent nipple stimulation. Medication (cabergoline or bromocriptine) if significantly elevated and not responding to other measures.',
    },
  },
  {
    id: 'ovarian_function',
    label: 'Ovarian Function',
    category: 'intermediate',
    description: 'Follicle Development & Ovarian Response',
    educationalContent: {
      whatItIs:
        'Your ovaries respond to FSH and LH to develop follicles and trigger ovulation. Thyroid hormone receptors exist directly on ovarian cells, meaning thyroid hormones directly influence how your ovaries function, independent of effects on other hormones.',
      whyItMatters:
        'Hypothyroidism impairs follicular development—follicles may grow slowly or not reach full maturity before ovulation. This affects egg quality and ovulation timing. Thyroid dysfunction also reduces ovarian response to FSH, meaning it takes more FSH to recruit and mature follicles. In IVF, hypothyroid women often need higher FSH doses and have lower egg retrieval numbers.',
      howToOptimize:
        'Optimize thyroid function 2-3 months before trying to conceive—follicles take 3 months to mature from primordial to ovulatory stage. Support egg quality: CoQ10 (200-600mg), vitamin D (>40 ng/mL), omega-3s (1000-2000mg EPA/DHA), antioxidants, adequate protein, avoid smoking and excess alcohol.',
    },
  },
  {
    id: 'immune_activation',
    label: 'Immune Activation',
    category: 'intermediate',
    description: 'Inflammatory Response & Immune Dysregulation',
    educationalContent: {
      whatItIs:
        "In Hashimoto's thyroiditis, thyroid antibodies indicate ongoing immune system activation and inflammation. While the antibodies target the thyroid, this immune dysregulation can have body-wide effects. The inflammatory cytokines produced affect implantation, placental development, and pregnancy maintenance.",
      whyItMatters:
        'Elevated thyroid antibodies increase miscarriage risk even with normal TSH. Studies show 2-4x higher miscarriage rates with positive antibodies. The inflammation may interfere with embryo implantation and early placental formation. Antibodies also predict higher risk of postpartum thyroiditis (30-50% with antibodies develop it vs 5% without).',
      howToOptimize:
        'Reduce overall inflammation: anti-inflammatory diet (rich in omega-3s, colorful vegetables, minimize processed foods), optimize vitamin D (>40 ng/mL has immunomodulating effects), selenium (200mcg/day reduces antibodies), stress management (chronic stress worsens autoimmunity), adequate sleep (7-9 hours), gut health (70% of immune system is in gut).',
    },
  },

  // ==================== REPRODUCTIVE OUTCOMES ====================
  {
    id: 'cycle_regularity',
    label: 'Cycle Regularity',
    category: 'reproductive',
    description: 'Menstrual Cycle Consistency',
    normalRange: '25-35 days',
    optimalRange: '27-32 days (variation <3 days)',
    unit: 'days',
    educationalContent: {
      whatItIs:
        'Cycle regularity refers to how consistent your cycle length is month-to-month. A regular cycle means ovulation is occurring predictably. Cycles can be regular but long (e.g., consistently 35 days) or irregular with variable length (e.g., 28 days, then 42 days, then 31 days).',
      whyItMatters:
        "Irregular cycles usually indicate irregular or absent ovulation, making it difficult to time intercourse and predict fertility. Even with regular cycles, if they're very long (>35 days) or short (<24 days), this often signals hormonal imbalance. Hypothyroidism commonly causes longer, irregular cycles due to effects on ovulation and hormone metabolism.",
      howToOptimize:
        'Track cycles for 3+ months to identify patterns. Optimize thyroid function—many women see cycles normalize within 2-3 months of reaching optimal TSH. Address other factors: manage stress, adequate nutrition (not under-eating), healthy body composition (very low or high body fat affects cycles), treat any other hormonal imbalances (PCOS, elevated prolactin).',
    },
  },
  {
    id: 'ovulation_consistency',
    label: 'Ovulation Consistency',
    category: 'reproductive',
    description: 'Regular Ovulatory Cycles',
    educationalContent: {
      whatItIs:
        'Ovulation is the release of a mature egg from the ovary. Consistent ovulation means you release an egg every cycle, around the same cycle day. You can have regular periods without ovulating (anovulatory cycles with withdrawal bleeding) or ovulate irregularly. Confirm ovulation with: BBT rise, positive OPK (ovulation predictor kit), progesterone >10 ng/mL at 7 days post-ovulation, or ultrasound.',
      whyItMatters:
        "You can't get pregnant without ovulation. Hypothyroidism increases anovulation rates—studies show 23-68% of hypothyroid women have anovulatory cycles vs <5-10% in healthy women. Even with treatment, ovulation may take several cycles to normalize. Irregular ovulation makes conception timing difficult and reduces monthly conception probability.",
      howToOptimize:
        'Optimize thyroid function 2-3 months before TTC. Track ovulation with multiple methods (BBT, OPKs, cervical mucus, progesterone testing). Support ovulation: myo-inositol (2-4g/day), adequate healthy fats, vitamin D, manage stress, maintain healthy weight. If anovulatory despite optimal thyroid, may need ovulation induction (letrozole or clomid) under reproductive endocrinologist care.',
    },
  },
  {
    id: 'luteal_phase_length',
    label: 'Luteal Phase Length',
    category: 'reproductive',
    description: 'Post-Ovulation Phase Duration',
    normalRange: '10-16 days',
    optimalRange: '12-14 days',
    unit: 'days',
    educationalContent: {
      whatItIs:
        'The luteal phase is the time from ovulation to your period, when the corpus luteum produces progesterone to prepare the uterine lining for potential implantation. Count from the day after ovulation (identified by BBT rise or positive OPK) to the day before your period starts. This phase should be relatively consistent across cycles.',
      whyItMatters:
        "Short luteal phase (<10 days) is called luteal phase defect (LPD). Embryos need 10-12 days post-ovulation to implant and establish pregnancy. If your period comes before Day 10, there's insufficient time and insufficient progesterone for implantation. LPD is common in hypothyroidism due to impaired corpus luteum function and low progesterone.",
      howToOptimize:
        'Optimize thyroid first—this often lengthens luteal phase within 2-3 cycles. Support progesterone production: vitamin C (500mg post-ovulation), vitamin B6 (50-100mg), magnesium (400mg), vitex (if not on thyroid meds—check interactions). If luteal phase remains <10 days, consider progesterone supplementation (bioidentical, 200-400mg vaginally or orally) in luteal phase or early pregnancy.',
    },
  },
  {
    id: 'egg_quality',
    label: 'Egg Quality',
    category: 'reproductive',
    description: 'Oocyte Health & Developmental Potential',
    educationalContent: {
      whatItIs:
        'Egg quality refers to the chromosomal integrity and developmental potential of your eggs. High-quality eggs have normal chromosome numbers (euploid), healthy mitochondria for energy, and proper cellular machinery for fertilization and embryo development. Quality declines with age but is also affected by oxidative stress, inflammation, and hormonal environment.',
      whyItMatters:
        'Poor egg quality increases miscarriage risk (most early losses are due to chromosomal abnormalities), reduces fertilization rates, and decreases likelihood of embryos developing to blastocyst stage. Hypothyroidism and thyroid antibodies negatively impact egg quality through increased oxidative stress, inflammation, and impaired follicular development. Eggs take 3 months to mature, so improvements need that timeframe.',
      howToOptimize:
        'Optimize thyroid 3+ months before TTC. Support egg quality: CoQ10 (200-600mg ubiquinol), vitamin D (>40 ng/mL), omega-3s (2000mg EPA/DHA), antioxidants (vitamin C, E, NAC), melatonin (3mg at night—antioxidant for follicles), DHEA if low (25-75mg—check levels first), myo-inositol (2-4g). Lifestyle: no smoking, limit alcohol, manage stress, adequate sleep, avoid endocrine disruptors.',
    },
  },
  {
    id: 'time_to_conception',
    label: 'Time to Conception',
    category: 'reproductive',
    description: 'Months to Achieve Pregnancy',
    normalRange: '6-12 months',
    optimalRange: '3-6 months',
    unit: 'months',
    educationalContent: {
      whatItIs:
        'Time to conception (also called "fecundability") is how long it takes to achieve pregnancy with regular, well-timed intercourse. Healthy couples under 35 have about 20-25% chance per cycle (fecundability rate), meaning 80% conceive within 6 months and 90% within 12 months. This assumes ovulation detection and good timing.',
      whyItMatters:
        'Hypothyroidism significantly increases time to conception through multiple mechanisms: irregular ovulation (reduces opportunities), anovulatory cycles (no chance that month), short luteal phase (prevents implantation), poor egg quality (increases early loss), reduced libido and energy (less intercourse). Studies show hypothyroid women take 2-3x longer to conceive vs euthyroid women.',
      howToOptimize:
        'Optimize thyroid before TTC—ideally TSH <2.5 for 2-3 months. Track ovulation accurately (BBT, OPKs, cervical mucus), time intercourse for 2-3 days before ovulation through ovulation day (fertility window). Address other factors: healthy weight, both partners take prenatals, reduce stress, adequate frequency (every 1-2 days during fertile window). Seek fertility specialist evaluation if not pregnant after 6 months (age >35) or 12 months (age <35).',
    },
  },
  {
    id: 'pregnancy_loss_risk',
    label: 'Pregnancy Loss Risk',
    category: 'reproductive',
    description: 'Miscarriage & Early Pregnancy Loss',
    normalRange: '15-20% (baseline risk)',
    unit: 'percent',
    educationalContent: {
      whatItIs:
        'Pregnancy loss (miscarriage) is loss before 20 weeks, most commonly in first trimester. Baseline risk is 15-20% in detected pregnancies, higher with maternal age. Most first trimester losses are due to chromosomal abnormalities incompatible with life. Recurrent pregnancy loss (RPL) is defined as 2+ consecutive losses.',
      whyItMatters:
        'Both overt and subclinical hypothyroidism increase miscarriage risk. Studies show: TSH >2.5 increases risk by 1.5-2x, TSH >4.0 by 2-3x. Thyroid antibodies increase risk 2-4x even with normal TSH. Mechanisms include: inadequate progesterone support, impaired placental development, increased inflammation, poor egg quality leading to chromosomal abnormalities, and inadequate thyroid hormone for fetal neurodevelopment in early pregnancy.',
      howToOptimize:
        'Optimize thyroid before conception: TSH <2.5, treat antibodies if present. Start levothyroxine if TSH >2.5 when TTC. If known thyroid condition, increase levothyroxine dose by 25-30% as soon as pregnancy is confirmed (thyroid hormone needs increase immediately). Early progesterone supplementation if history of loss (200mg twice daily vaginally). Monitor TSH every 4 weeks in first trimester, adjust medication to keep TSH 0.5-2.5. Address other risk factors: autoimmune conditions, thrombophilias, anatomic issues.',
    },
  },
  {
    id: 'bbt_pattern',
    label: 'BBT Pattern Clarity',
    category: 'reproductive',
    description: 'Basal Body Temperature Biphasic Pattern',
    educationalContent: {
      whatItIs:
        "A healthy BBT chart shows a biphasic (two-phase) pattern: lower temperatures in follicular phase (before ovulation), then a clear rise of 0.5-1.0°F that sustains through the luteal phase (after ovulation). The rise is caused by progesterone's thermogenic effect. The shift should occur within 1-2 days of ovulation and remain elevated until just before your period.",
      whyItMatters:
        'Hypothyroid women often have: 1) Lower baseline temperatures (<97.5°F follicular phase, <98.0°F luteal phase), making the shift harder to detect, 2) Smaller temperature rises (<0.4°F) due to low progesterone, 3) Erratic patterns making ovulation timing unclear, 4) Monophasic (no rise) patterns indicating anovulation. This makes BBT less useful for detecting ovulation and timing intercourse.',
      howToOptimize:
        'Optimize thyroid to raise baseline temperature and support progesterone production—BBT charting becomes more reliable. Use a sensitive BBT thermometer (0.01°F precision). Take temperature same time daily before getting out of bed. Chart for 2-3 cycles to establish your pattern. Combine BBT with other methods (cervical mucus, OPKs) for most accurate ovulation detection. If persistently monophasic, investigate anovulation causes.',
    },
  },
];
