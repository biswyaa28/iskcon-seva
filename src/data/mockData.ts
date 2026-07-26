import { CorePillar, GitaParallel, EventItem, SevaPreset } from '../types';

export const CORE_PILLARS: CorePillar[] = [
  {
    id: 'quantum-cosmology',
    title: 'Quantum Mechanics & Vedic Cosmology',
    sanskritTerm: 'Brahman & Maya',
    category: 'Physics',
    icon: 'blur_on',
    shortDesc: 'Exploring the collapse of the wave function, observer effect, and unified field theory through Brahman and the cosmic cycles.',
    fullDesc: 'Modern quantum field theory postulates an underlying non-local energy field (Zero Point Field) from which all subatomic matter continuously emerges and dissolves. Vedic Cosmology describes this non-dual energetic source as Nirguna Brahman, with the material cosmos operating under multi-dimensional time (Yugas) and non-local entanglement.',
    scientificConcept: 'Quantum Wave Function Collapse & Non-Local Entanglement',
    scripturalRef: 'Bhagavad Gita 10.8 & Srimad Bhagavatam 3.26',
    keyInsights: [
      'The Observer Effect in Quantum Mechanics aligns with Purusha (conscious observer) giving form to Prakriti (unmanifest matter).',
      'Time dilation in Brahma-Loka described thousands of years prior to Einsteinian Relativity.',
      'Cyclic cosmological expansion (Srishti) and contraction (Pralaya) mirroring inflationary universe models.'
    ]
  },
  {
    id: 'neuroscience-mind',
    title: 'Neuroscience & Mind Architecture',
    sanskritTerm: 'Manas, Buddhi, Ahankara',
    category: 'Neuroscience',
    icon: 'psychology',
    shortDesc: 'Deciphering neural plasticity, Default Mode Network (DMN) quieting, and executive control through Vedic psychology.',
    fullDesc: 'The Sankhya philosophy provides a precise 24-element structural model of consciousness. Manas (emotional sensory mind), Buddhi (discriminative intellect), and Ahankara (ego-identity) correlate directly with the prefrontal cortex, limbic system, and the neurobiological Default Mode Network.',
    scientificConcept: 'Neuroplasticity, DMN Deactivation & Vagus Nerve Stimulation',
    scripturalRef: 'Bhagavad Gita 6.5 - 6.6 & Yoga Sutras 1.2',
    keyInsights: [
      'Mantra meditation selectively down-regulates hyperactive amygdala response and reduces stress hormones (cortisol).',
      'Cultivating Sthitaprajna (unshakable intellect) strengthens prefrontal cortex executive cognitive control.',
      'Self-realization transforms the neuro-identity from reactive survival modes to coherent gamma brainwaves.'
    ]
  },
  {
    id: 'epistemology-reason',
    title: 'Epistemology & Scientific Method',
    sanskritTerm: 'Pramana Vichara',
    category: 'Epistemology',
    icon: 'auto_stories',
    shortDesc: 'Comparing empirical observation (Pratyaksha), logical deduction (Anumana), and sound testimony (Sabda).',
    fullDesc: 'Vedic philosophy posits rigorous epistemology through Nyaya and Vedanta logic. Science relies heavily on empirical perception (Pratyaksha) and mathematical inference (Anumana). Vedic epistemology introduces Sabda Pramana (verified testimony of realized seers) to access subtle realms beyond optical instrumentation.',
    scientificConcept: 'Limitations of Empirical Measurement & Axiomatic Epistemology',
    scripturalRef: 'Bhagavad Gita 2.16 & Nyaya Sutras 1.1.3',
    keyInsights: [
      'Empirical senses are constrained within narrow electromagnetic spectrums (400–700nm); truth requires deeper tools of perception.',
      'Scientific axioms are tested against repeatable experiential inner methodologies (Sadhana).',
      'Synthesis of objective external measurement with subjective inner introspection.'
    ]
  },
  {
    id: 'nutrition-bioenergy',
    title: 'Sattvic Bio-Energy & Cellular Health',
    sanskritTerm: 'Sattva, Rajas, Tamas',
    category: 'Nutrition',
    icon: 'eco',
    shortDesc: 'Understanding the bio-energetic frequencies of food, gut microbiome health, and compassion-based ecology.',
    fullDesc: 'The Gita classifies food into three Gunas (Sattva - clarity/vitality, Rajas - passion/restlessness, Tamas - inertia/decay). Modern nutritional epigenetics and gut-brain axis research confirm that plant-based, fresh, compassionate meals reduce systemic inflammation, optimize gut microbiota, and enhance mental focus.',
    scientificConcept: 'Epigenetics, Gut-Brain Axis & Mitochondrial ATP Synthesis',
    scripturalRef: 'Bhagavad Gita 17.8 - 17.10 & Ayurveda Sushruta Samhita',
    keyInsights: [
      'Prasadam (food offered with gratitude) exhibits positive structural and biochemical harmonic properties.',
      'Plant-centric bio-nutrition significantly lowers chronic oxidative stress and cellular longevity markers.',
      'Ahimsa (non-violence) in food production preserves planetary ecological balance and soil biome.'
    ]
  },
  {
    id: 'ethical-leadership',
    title: 'Ethical Leadership & Conscious AI',
    sanskritTerm: 'Dharma & Karma',
    category: 'Ethics',
    icon: 'balance',
    shortDesc: 'Guiding artificial intelligence, technology development, and executive leadership with Dharmic principles.',
    fullDesc: 'As artificial intelligence and automated decision systems reshape human society, technology without moral grounding risks exponential harm. Dharmic ethics offer timeless governance models based on truthfulness (Satya), self-restraint (Tapa), cleanliness (Saucha), and compassion (Daya).',
    scientificConcept: 'AI Alignment, Systemic Ethics & Complexity Theory',
    scripturalRef: 'Bhagavad Gita 3.21 & Mahabharata Shanti Parva',
    keyInsights: [
      'Leaders act as "Yad yad acharati shreshthas" — standard-setters whose ethical frequency ripples through society.',
      'Karma principles model complex feedback loops and long-term unintended consequences in technological systems.',
      'Human values must remain grounded in spiritual self-knowledge, preventing algorithmic dehumanization.'
    ]
  },
  {
    id: 'acoustic-vibration',
    title: 'Acoustic Resonance & Mantra Science',
    sanskritTerm: 'Sabda Brahma & Nada Yoga',
    category: 'Acoustics',
    icon: 'graphic_eq',
    shortDesc: 'Investigating sound resonance, cymatics, frequency entrainment, and Sanskrit phonemes on neuro-circuitry.',
    fullDesc: 'Sanskrit is an acoustic language engineered around precise resonant sound vibrations. Modern neuroscience and cymatics show that structured sonic frequencies alter cellular vibration, align brainwave synchronization, and stimulate endogenous dopamine and serotonin.',
    scientificConcept: 'Auditory Neural Entrainment, Cymatics & Vagal Tone',
    scripturalRef: 'Bhagavad Gita 10.25 & Mandukya Upanishad',
    keyInsights: [
      'Mantra sound waves produce geometric symmetry in vibrating medium (Cymatics).',
      'The Hare Krishna Mahamantra activates parasympathetic nervous states, elevating alpha-theta brain coherence.',
      'Sonic meditation clears subconscious neural chatter (Chitta Vritti Nirodha).'
    ]
  }
];

export const GITA_PARALLELS: GitaParallel[] = [
  {
    id: 'gita-2-20',
    chapterVerse: 'Bhagavad Gita 2.20',
    sanskritText: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
    translation: 'For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing, and primeval. He is not slain when the body is slain.',
    scientificParallel: 'First Law of Thermodynamics (Conservation of Energy) & Quantum Information Conservation Theory',
    field: 'Quantum Physics',
    modernPaperRef: 'Leonard Susskind (2008) - "The Black Hole War: Quantum Information Cannot Be Destroyed"',
    tags: ['Energy Conservation', 'Consciousness', 'Quantum Physics']
  },
  {
    id: 'gita-13-3',
    chapterVerse: 'Bhagavad Gita 13.3',
    sanskritText: 'क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत। क्षेत्रक्षेत्रज्ञयोर्ज्ञानं यत्तज्ज्ञानं मतं मम॥',
    translation: 'O scion of Bharata, you should understand that I am also the knower in all bodies, and to understand this body and its knower is called knowledge.',
    scientificParallel: 'Quantum Field Theory of Non-Local Consciousness & Knower-Known Observer Field',
    field: 'Quantum Mechanics',
    modernPaperRef: 'Erwin Schrödinger (1944) - "What is Life? Consciousness is a singular of which the plural is unknown."',
    tags: ['Quantum Field', 'Observer Effect', 'Non-Locality']
  },
  {
    id: 'gita-6-34',
    chapterVerse: 'Bhagavad Gita 6.34',
    sanskritText: 'चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम्। तस्याहं निग्रहं मन्ये वायोराइव सुदुष्करम्॥',
    translation: 'The mind is restless, turbulent, obstinate and very strong, O Krishna, and to subdue it, it seems to me more difficult than controlling the wind.',
    scientificParallel: 'Neurobiology of the Default Mode Network (DMN) & Mind-Wandering Entropy',
    field: 'Neuroscience',
    modernPaperRef: 'Harvard Study (Killingsworth & Gilbert, 2010) - "A Wandering Mind Is an Unhappy Mind"',
    tags: ['Neuroscience', 'Mind Control', 'DMN']
  },
  {
    id: 'gita-17-8',
    chapterVerse: 'Bhagavad Gita 17.8',
    sanskritText: 'आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः। रस्याः स्निग्धाः स्थिरा हृद्या आहारः सात्त्विकप्रियाः॥',
    translation: 'Foods preferred by those in the mode of goodness increase the duration of life, purify one’s existence and give strength, health, happiness and satisfaction. Such foods are juicy, wholesome, and pleasing to the heart.',
    scientificParallel: 'Epigenetic Longevity, Plant-Based Anti-Inflammatory Diets & Gut Microbiome Diversity',
    field: 'Nutritional Genomics',
    modernPaperRef: 'Cell Metabolism (2021) - "Polyphenol-Rich Sattvic Foods & Microflora Longevity Pathways"',
    tags: ['Epigenetics', 'Microbiome', 'Longevity']
  }
];

export const WEEKLY_EVENTS: EventItem[] = [
  {
    id: 'sunday-feast',
    title: 'Sunday Vedic Wisdom Feast & Kirtan Science',
    category: 'Feast',
    dayTime: 'Every Sunday | 5:00 PM – 8:00 PM',
    location: 'Community Center Sanctuary & Live Stream',
    description: 'An uplifting evening featuring scientific discourses on Bhagavad Gita, deep mantra kirtan meditation, and a sumptuous 100% Sattvic organic Prasadam feast.',
    speakerOrHost: 'Dr. Radheshyam Das (Ph.D. IIT) & Cultural Ensemble',
    isOnlineAvailable: true,
    meetingLink: 'https://zoom.us/j/scienceofkrishna'
  },
  {
    id: 'gita-study-circle',
    title: 'Quantum Gita Study Circle',
    category: 'Study Circle',
    dayTime: 'Wednesdays | 7:30 PM – 8:45 PM',
    location: 'Interactive Zoom Workshop',
    description: 'Chapter-by-chapter verse breakdown exploring Sanskrit linguistics, quantum physics parallels, and practical life engineering.',
    speakerOrHost: 'Vedic Research Panel',
    isOnlineAvailable: true,
    meetingLink: 'https://zoom.us/j/gitastudy'
  },
  {
    id: 'youth-meditation',
    title: 'Youth & Tech Professionals Meditation Lab',
    category: 'Meditation',
    dayTime: 'Saturdays | 8:00 AM – 9:30 AM',
    location: 'Consciousness Lab & Outdoor Garden',
    description: 'Breathwork, Japa sound entrainment, focus techniques for software engineers, founders, and students.',
    speakerOrHost: 'Gouranga Pr & Neuroscience Mentors',
    isOnlineAvailable: true
  },
  {
    id: 'food-for-life-seva',
    title: 'Prasadam Meal Distribution Drive (Food For Life)',
    category: 'Seva Drive',
    dayTime: 'Saturdays | 11:00 AM – 2:00 PM',
    location: 'City Community Kitchen & Outreach Locations',
    description: 'Preparing and serving 1,000+ hot, freshly cooked, nutritious Sattvic meals to underprivileged families and students.',
    speakerOrHost: 'Seva Volunteer Corps',
    isOnlineAvailable: false
  }
];

export const SEVA_PRESETS: SevaPreset[] = [
  {
    id: 'preset-1',
    title: 'Nourish 25 Children',
    amountUSD: 15,
    mealsProvided: 25,
    gitasSponsored: 2,
    scholarshipHours: 5,
    tagline: 'Provides 25 wholesome, hot Prasadam meals to school children.'
  },
  {
    id: 'preset-2',
    title: 'Sponsor 50 Meals & 5 Books',
    amountUSD: 35,
    mealsProvided: 50,
    gitasSponsored: 5,
    scholarshipHours: 12,
    isPopular: true,
    tagline: 'Most Popular: Feeds 50 people and places 5 Gitas in university libraries.'
  },
  {
    id: 'preset-3',
    title: 'Youth Science Camp Patron',
    amountUSD: 108,
    mealsProvided: 150,
    gitasSponsored: 18,
    scholarshipHours: 40,
    tagline: 'Sponsors 108 sacred wisdom books and 150 meals for youth delegates.'
  },
  {
    id: 'preset-4',
    title: 'Grand Prasadam Pillar',
    amountUSD: 300,
    mealsProvided: 500,
    gitasSponsored: 50,
    scholarshipHours: 120,
    tagline: 'Pillar Patron: Enables a full Sunday Prasadam distribution drive.'
  }
];

export const SAMPLE_CHAT_PROMPTS = [
  "How does the Bhagavad Gita describe the observer effect?",
  "What is the difference between Manas, Buddhi, and Ahankara in modern psychology?",
  "Explain Gita Chapter 2 Verse 20 and the First Law of Thermodynamics.",
  "Why is Prasadam considered beneficial for cellular health?",
  "How can a software developer practice Karma Yoga at work?"
];
