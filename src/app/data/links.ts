import type { SimulationLink } from './types';

export const links: SimulationLink[] = [
  // ============================================
  // TSH CONNECTIONS
  // ============================================
  {
    source: 'tsh',
    target: 'progesterone_production',
    strength: 'strong',
    type: 'inhibitory',
    description:
      'Elevated TSH impairs corpus luteum function, reducing progesterone production after ovulation',
    mechanismDetail:
      'TSH elevation indicates inadequate thyroid hormone, which is necessary for proper corpus luteum function. The corpus luteum produces progesterone in the luteal phase, and thyroid dysfunction compromises this process.',
    researchCitations: [
      'Poppe K, et al. "Thyroid disease and female reproduction." Clin Endocrinol. 2007;66(3):309-21',
      'Krassas GE, et al. "Thyroid function and human reproductive health." Endocr Rev. 2010;31(5):702-55',
    ],
  },
  {
    source: 'tsh',
    target: 'prolactin',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'Elevated TRH (which stimulates TSH) also stimulates prolactin release',
    mechanismDetail:
      'When thyroid hormones are low, the hypothalamus releases more TRH (Thyrotropin Releasing Hormone). TRH not only stimulates TSH but also directly stimulates prolactin production.',
    researchCitations: [
      'Krassas GE. "Thyroid disease and female reproduction." Fertil Steril. 2000;74(6):1063-70',
      'Poppe K, Velkeniers B. "Thyroid and infertility." Verh K Acad Geneeskd Belg. 2002;64(6):389-99',
    ],
  },
  {
    source: 'tsh',
    target: 'ovarian_function',
    strength: 'moderate',
    type: 'inhibitory',
    description: 'Elevated TSH directly affects ovarian follicle development',
    mechanismDetail:
      'TSH receptors exist on ovarian tissue. When TSH is chronically elevated, it can interfere with normal follicular development and ovulation.',
    researchCitations: [
      'Aghajanova L, et al. "The presence of nuclear hormone receptors in human granulosa cells." J Clin Endocrinol Metab. 2009;94(9):3326-32',
    ],
  },

  // ============================================
  // FREE T3 CONNECTIONS
  // ============================================
  {
    source: 'free_t3',
    target: 'basal_metabolic_rate',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'T3 is the active thyroid hormone that directly drives cellular metabolism',
    mechanismDetail:
      'T3 binds to nuclear receptors in cells, increasing gene transcription for metabolic enzymes. It regulates mitochondrial function, ATP production, and overall cellular energy production.',
    researchCitations: [
      'Mullur R, et al. "Thyroid hormone regulation of metabolism." Physiol Rev. 2014;94(2):355-82',
      'Cheng SY, et al. "Molecular aspects of thyroid hormone actions." Endocr Rev. 2010;31(2):139-70',
    ],
  },
  {
    source: 'free_t3',
    target: 'basal_body_temperature',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'T3 directly regulates basal metabolic rate and body temperature',
    mechanismDetail:
      'Thyroid hormones increase cellular metabolism and heat production. Low T3 results in lower basal body temperature, which affects BBT charting for fertility tracking.',
    researchCitations: [
      'Silva JE. "Thermogenic mechanisms and their hormonal regulation." Physiol Rev. 2006;86(2):435-64',
    ],
  },
  {
    source: 'free_t3',
    target: 'liver_metabolism',
    strength: 'moderate',
    type: 'regulatory',
    description:
      'T3 regulates liver enzyme activity including those that metabolize estrogen',
    mechanismDetail:
      'Thyroid hormones regulate hepatic enzyme expression, including those involved in estrogen metabolism and clearance. Low T3 can lead to impaired estrogen metabolism.',
    researchCitations: [
      'Krassas GE, et al. "Thyroid function and human reproductive health." Endocr Rev. 2010;31(5):702-55',
    ],
  },
  {
    source: 'free_t3',
    target: 'shbg',
    strength: 'moderate',
    type: 'stimulatory',
    description: 'T3 stimulates production of Sex Hormone Binding Globulin',
    mechanismDetail:
      'Thyroid hormones increase SHBG synthesis in the liver. Low thyroid function decreases SHBG, potentially leading to higher free testosterone and estrogen.',
    researchCitations: [
      'Selva DM, et al. "Thyroid hormones act indirectly to increase sex hormone-binding globulin production by liver via hepatocyte nuclear factor-4alpha." J Mol Endocrinol. 2009;43(1):19-27',
    ],
  },

  // ============================================
  // FREE T4 CONNECTIONS
  // ============================================
  {
    source: 'free_t4',
    target: 'free_t3',
    strength: 'strong',
    type: 'stimulatory',
    description: 'T4 is converted to active T3 by deiodinase enzymes',
    mechanismDetail:
      'T4 (levothyroxine) is the storage form of thyroid hormone. Deiodinase enzymes in peripheral tissues convert T4 to T3, the active form that enters cells.',
    researchCitations: [
      'Bianco AC, et al. "Biochemistry, cellular and molecular biology, and physiological roles of the iodothyronine selenodeiodinases." Endocr Rev. 2002;23(1):38-89',
    ],
  },
  {
    source: 'free_t4',
    target: 'basal_metabolic_rate',
    strength: 'moderate',
    type: 'stimulatory',
    description: 'T4 contributes to metabolism after conversion to T3',
    mechanismDetail:
      'While less active than T3, T4 provides a steady reservoir that is converted to T3 as needed by tissues.',
    researchCitations: [
      'Mullur R, et al. "Thyroid hormone regulation of metabolism." Physiol Rev. 2014;94(2):355-82',
    ],
  },

  // ============================================
  // TPO ANTIBODIES CONNECTIONS
  // ============================================
  {
    source: 'tpo_antibodies',
    target: 'immune_activation',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'TPO antibodies indicate active autoimmune attack on thyroid tissue',
    mechanismDetail:
      "Anti-TPO antibodies mark an autoimmune process (Hashimoto's thyroiditis) where the immune system attacks thyroid cells. This creates chronic inflammation beyond just the thyroid.",
    researchCitations: [
      'Hollowell JG, et al. "Serum TSH, T4, and thyroid antibodies in the United States population (1988 to 1994): National Health and Nutrition Examination Survey (NHANES III)." J Clin Endocrinol Metab. 2002;87(2):489-99',
      'Stagnaro-Green A, et al. "Guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and postpartum." Thyroid. 2011;21(10):1081-125',
    ],
  },
  {
    source: 'tpo_antibodies',
    target: 'pregnancy_loss_risk',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'Thyroid antibodies increase miscarriage risk even with normal TSH',
    mechanismDetail:
      'The presence of thyroid antibodies is associated with increased pregnancy loss, likely due to associated immune dysregulation and potential impact on placental function.',
    researchCitations: [
      'Thangaratinam S, et al. "Association between thyroid autoantibodies and miscarriage and preterm birth: meta-analysis of evidence." BMJ. 2011;342:d2616',
      'Negro R, et al. "The influence of selenium supplementation on postpartum thyroid status in pregnant women with thyroid peroxidase autoantibodies." J Clin Endocrinol Metab. 2007;92(4):1263-8',
    ],
  },

  // ============================================
  // TG ANTIBODIES CONNECTIONS
  // ============================================
  {
    source: 'tg_antibodies',
    target: 'immune_activation',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'Thyroglobulin antibodies also indicate autoimmune thyroid disease',
    mechanismDetail:
      'Anti-thyroglobulin antibodies are another marker of autoimmune thyroiditis, often present alongside TPO antibodies.',
    researchCitations: [
      'Hollowell JG, et al. "Serum TSH, T4, and thyroid antibodies in the United States population (1988 to 1994)." J Clin Endocrinol Metab. 2002;87(2):489-99',
    ],
  },
  {
    source: 'tg_antibodies',
    target: 'pregnancy_loss_risk',
    strength: 'moderate',
    type: 'stimulatory',
    description:
      'TG antibodies associated with increased pregnancy complications',
    mechanismDetail:
      'Similar to TPO antibodies, TG antibodies indicate immune dysregulation that can affect pregnancy outcomes.',
    researchCitations: [
      'Stagnaro-Green A, et al. "Guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and postpartum." Thyroid. 2011;21(10):1081-125',
    ],
  },

  // ============================================
  // METABOLIC RATE CONNECTIONS
  // ============================================
  {
    source: 'basal_metabolic_rate',
    target: 'egg_quality',
    strength: 'moderate',
    type: 'stimulatory',
    description:
      'Adequate metabolism is necessary for healthy oocyte maturation',
    mechanismDetail:
      'Oocytes (eggs) are highly metabolically active cells. Thyroid dysfunction and low metabolism can impair mitochondrial function in eggs, affecting quality.',
    researchCitations: [
      'Aghajanova L, et al. "The presence of nuclear hormone receptors in human granulosa cells." J Clin Endocrinol Metab. 2009;94(9):3326-32',
    ],
  },
  {
    source: 'basal_metabolic_rate',
    target: 'ovarian_function',
    strength: 'moderate',
    type: 'stimulatory',
    description: 'Normal metabolism supports healthy ovarian function',
    mechanismDetail:
      'Ovarian follicle development and hormone production require substantial energy. Compromised metabolism affects these processes.',
    researchCitations: [
      'Krassas GE, et al. "Thyroid function and human reproductive health." Endocr Rev. 2010;31(5):702-55',
    ],
  },

  // ============================================
  // BASAL TEMPERATURE CONNECTIONS
  // ============================================
  {
    source: 'basal_body_temperature',
    target: 'bbt_pattern',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'Basal body temperature determines clarity of BBT charting patterns',
    mechanismDetail:
      'BBT charting relies on detecting the temperature rise after ovulation (caused by progesterone). Hypothyroidism causes lower baseline temps and smaller temperature shifts, making patterns harder to detect.',
    researchCitations: [
      'Weyrich A. "Basal body temperature charting in natural family planning." Am Fam Physician. 1999;59(4):870-6',
    ],
  },

  // ============================================
  // PROGESTERONE PRODUCTION CONNECTIONS
  // ============================================
  {
    source: 'progesterone_production',
    target: 'luteal_phase_length',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'Progesterone maintains the luteal phase; inadequate levels cause short luteal phase',
    mechanismDetail:
      'The corpus luteum produces progesterone after ovulation, which maintains the endometrium. Low progesterone results in premature luteal phase ending (<10 days), preventing implantation.',
    researchCitations: [
      'Practice Committee of the American Society for Reproductive Medicine. "Current clinical irrelevance of luteal phase deficiency: a committee opinion." Fertil Steril. 2015;103(4):e27-32',
      'Crawford NM, Steiner AZ. "Age-related infertility." Obstet Gynecol Clin North Am. 2015;42(1):15-25',
    ],
  },
  {
    source: 'progesterone_production',
    target: 'basal_body_temperature',
    strength: 'moderate',
    type: 'stimulatory',
    description: 'Progesterone causes the post-ovulation temperature rise',
    mechanismDetail:
      'Progesterone has a thermogenic effect, raising basal body temperature by about 0.5°F after ovulation. This is the basis of BBT charting.',
    researchCitations: [
      'Weyrich A. "Basal body temperature charting in natural family planning." Am Fam Physician. 1999;59(4):870-6',
    ],
  },
  {
    source: 'progesterone_production',
    target: 'pregnancy_loss_risk',
    strength: 'strong',
    type: 'inhibitory',
    description: 'Adequate progesterone reduces early pregnancy loss risk',
    mechanismDetail:
      'Progesterone is essential for maintaining early pregnancy by supporting the endometrium. Low progesterone is associated with increased first-trimester loss.',
    researchCitations: [
      'Coomarasamy A, et al. "A randomized trial of progesterone in women with recurrent miscarriages." N Engl J Med. 2015;373(22):2141-8',
    ],
  },

  // ============================================
  // LIVER CLEARANCE CONNECTIONS
  // ============================================
  {
    source: 'liver_metabolism',
    target: 'cycle_regularity',
    strength: 'moderate',
    type: 'regulatory',
    description: 'Proper estrogen metabolism affects cycle regularity',
    mechanismDetail:
      'The liver metabolizes and clears estrogen. Impaired clearance can lead to estrogen dominance and irregular cycles.',
    researchCitations: [
      'Krassas GE, et al. "Thyroid function and human reproductive health." Endocr Rev. 2010;31(5):702-55',
    ],
  },

  // ============================================
  // SHBG CONNECTIONS
  // ============================================
  {
    source: 'shbg',
    target: 'ovarian_function',
    strength: 'moderate',
    type: 'regulatory',
    description: 'SHBG levels affect free hormone availability',
    mechanismDetail:
      'SHBG binds sex hormones (testosterone, estrogen). Low SHBG (common with hypothyroidism) increases free hormones, potentially disrupting normal ovarian function.',
    researchCitations: [
      'Selva DM, et al. "Thyroid hormones act indirectly to increase sex hormone-binding globulin production." J Mol Endocrinol. 2009;43(1):19-27',
    ],
  },

  // ============================================
  // PROLACTIN CONNECTIONS
  // ============================================
  {
    source: 'prolactin',
    target: 'ovulation_consistency',
    strength: 'strong',
    type: 'inhibitory',
    description: 'Elevated prolactin suppresses ovulation',
    mechanismDetail:
      'High prolactin (hyperprolactinemia) interferes with GnRH pulsatility, suppressing LH and FSH release, which prevents ovulation.',
    researchCitations: [
      'Melmed S, et al. "Diagnosis and treatment of hyperprolactinemia: an Endocrine Society clinical practice guideline." J Clin Endocrinol Metab. 2011;96(2):273-88',
    ],
  },
  {
    source: 'prolactin',
    target: 'cycle_regularity',
    strength: 'strong',
    type: 'inhibitory',
    description: 'Elevated prolactin causes irregular or absent cycles',
    mechanismDetail:
      'Hyperprolactinemia often causes amenorrhea (absent periods) or oligomenorrhea (infrequent periods).',
    researchCitations: [
      'Melmed S, et al. "Diagnosis and treatment of hyperprolactinemia." J Clin Endocrinol Metab. 2011;96(2):273-88',
    ],
  },

  // ============================================
  // OVARIAN FUNCTION CONNECTIONS
  // ============================================
  {
    source: 'ovarian_function',
    target: 'ovulation_consistency',
    strength: 'strong',
    type: 'stimulatory',
    description:
      'Healthy ovarian function is required for consistent ovulation',
    mechanismDetail:
      'Normal follicle development and ovulation require properly functioning ovaries responding to FSH and LH signals.',
    researchCitations: [
      'Aghajanova L, et al. "The presence of nuclear hormone receptors in human granulosa cells." J Clin Endocrinol Metab. 2009;94(9):3326-32',
    ],
  },
  {
    source: 'ovarian_function',
    target: 'egg_quality',
    strength: 'strong',
    type: 'stimulatory',
    description: 'Ovarian health directly determines egg quality',
    mechanismDetail:
      'The ovarian environment affects oocyte maturation, mitochondrial function, and overall egg quality.',
    researchCitations: [
      'Krassas GE, et al. "Thyroid function and human reproductive health." Endocr Rev. 2010;31(5):702-55',
    ],
  },
  {
    source: 'ovarian_function',
    target: 'cycle_regularity',
    strength: 'strong',
    type: 'stimulatory',
    description: 'Normal ovarian function produces regular cycles',
    mechanismDetail:
      'The ovaries drive the menstrual cycle through follicle development and hormone production. Dysfunction leads to irregularity.',
    researchCitations: [
      'Practice Committee of American Society for Reproductive Medicine. "Current evaluation of amenorrhea." Fertil Steril. 2008;90(5 Suppl):S219-25',
    ],
  },

  // ============================================
  // IMMUNE ACTIVATION CONNECTIONS
  // ============================================
  {
    source: 'immune_activation',
    target: 'pregnancy_loss_risk',
    strength: 'strong',
    type: 'stimulatory',
    description: 'Chronic immune activation increases pregnancy loss risk',
    mechanismDetail:
      'autoimmune conditions create an inflammatory environment that can affect implantation and early pregnancy development. The exact mechanisms are still being researched but may involve NK cells and cytokines.',
    researchCitations: [
      'Thangaratinam S, et al. "Association between thyroid autoantibodies and miscarriage and preterm birth." BMJ. 2011;342:d2616',
      'Negro R, et al. "Thyroid autoantibodies and pregnancy outcomes." Best Pract Res Clin Endocrinol Metab. 2004;18(2):167-83',
    ],
  },
  {
    source: 'immune_activation',
    target: 'ovarian_function',
    strength: 'moderate',
    type: 'inhibitory',
    description: 'autoimmune inflammation may affect ovarian function',
    mechanismDetail:
      'Systemic autoimmune activation can potentially affect ovarian function, though mechanisms are not fully understood. Some autoimmune patients develop premature ovarian insufficiency.',
    researchCitations: [
      'Poppe K, et al. "Thyroid disease and female reproduction." Clin Endocrinol. 2007;66(3):309-21',
    ],
  },

  // ============================================
  // OUTCOME NODES (REPRODUCTIVE)
  // ============================================
  {
    source: 'luteal_phase_length',
    target: 'time_to_conception',
    strength: 'strong',
    type: 'inhibitory',
    description:
      'Short luteal phase (<10 days) reduces conception chances each cycle',
    mechanismDetail:
      'Implantation typically occurs 6-10 days post-ovulation. A luteal phase shorter than 10 days may not provide adequate time for implantation.',
    researchCitations: [
      'Practice Committee ASRM. "Current clinical irrelevance of luteal phase deficiency." Fertil Steril. 2015;103(4):e27-32',
    ],
  },
  {
    source: 'luteal_phase_length',
    target: 'pregnancy_loss_risk',
    strength: 'moderate',
    type: 'inhibitory',
    description: 'Adequate luteal phase length supports early pregnancy',
    mechanismDetail:
      'Even if implantation occurs, inadequate progesterone support in a short luteal phase can lead to early loss.',
    researchCitations: [
      'Coomarasamy A, et al. "A randomized trial of progesterone in women with recurrent miscarriages." N Engl J Med. 2015;373(22):2141-8',
    ],
  },
  {
    source: 'ovulation_consistency',
    target: 'time_to_conception',
    strength: 'strong',
    type: 'stimulatory',
    description: 'Consistent ovulation is necessary for conception',
    mechanismDetail:
      'Each anovulatory cycle is a missed opportunity for conception. Women with frequent anovulation take longer to conceive.',
    researchCitations: [
      'Practice Committee ASRM. "Optimizing natural fertility." Fertil Steril. 2017;107(1):52-8',
    ],
  },
  {
    source: 'ovulation_consistency',
    target: 'cycle_regularity',
    strength: 'strong',
    type: 'stimulatory',
    description: 'Regular ovulation produces regular cycles',
    mechanismDetail:
      'The menstrual cycle is driven by ovulation. Anovulatory cycles are typically irregular or absent.',
    researchCitations: [
      'Practice Committee ASRM. "Current evaluation of amenorrhea." Fertil Steril. 2008;90(5 Suppl):S219-25',
    ],
  },
  {
    source: 'egg_quality',
    target: 'time_to_conception',
    strength: 'moderate',
    type: 'stimulatory',
    description:
      'Better egg quality improves fertilization and embryo development',
    mechanismDetail:
      'Egg quality affects fertilization rates, embryo quality, and implantation success.',
    researchCitations: [
      'Krassas GE, et al. "Thyroid function and human reproductive health." Endocr Rev. 2010;31(5):702-55',
    ],
  },
  {
    source: 'egg_quality',
    target: 'pregnancy_loss_risk',
    strength: 'moderate',
    type: 'inhibitory',
    description:
      'Poor egg quality increases chromosomal abnormalities and loss risk',
    mechanismDetail:
      'Lower quality eggs are more prone to chromosomal errors during meiosis, leading to aneuploidy and miscarriage.',
    researchCitations: [
      'Practice Committee ASRM. "Age-related fertility decline." Fertil Steril. 2014;101(3):633-4',
    ],
  },
  {
    source: 'cycle_regularity',
    target: 'time_to_conception',
    strength: 'moderate',
    type: 'stimulatory',
    description:
      'Regular cycles make timing intercourse easier and indicate healthy function',
    mechanismDetail:
      'Regular cycles are easier to track for optimal timing, and regularity generally indicates normal hormonal function.',
    researchCitations: [
      'Practice Committee ASRM. "Optimizing natural fertility." Fertil Steril. 2017;107(1):52-8',
    ],
  },
  {
    source: 'bbt_pattern',
    target: 'time_to_conception',
    strength: 'weak',
    type: 'stimulatory',
    description:
      'Clear BBT patterns help identify fertile window for optimal timing',
    mechanismDetail:
      'BBT charting helps identify ovulation retrospectively and predict it in future cycles, allowing couples to time intercourse optimally.',
    researchCitations: [
      'Weyrich A. "Basal body temperature charting in natural family planning." Am Fam Physician. 1999;59(4):870-6',
    ],
  },
];
