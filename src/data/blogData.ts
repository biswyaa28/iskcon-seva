export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  category: 'Scriptures' | 'Wellness' | 'Community';
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  publishDate: string;
  readTime: string;
  featured: boolean;
  coverImage: string;
  excerpt: string;
  content: {
    sectionHeading?: string;
    paragraphs: string[];
    quote?: string;
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'quantum-physics-and-the-observer-in-bhagavad-gita',
    title: 'Quantum Physics and the Consciousness of the Observer in the Bhagavad Gita',
    subtitle: 'Analyzing Verse 2.20 through non-locality, wave-function collapse, and Vedic metaphysics.',
    category: 'Scriptures',
    tags: ['Scriptures', 'Quantum Mechanics', 'Consciousness'],
    author: {
      name: 'Dr. Devamrita Das',
      role: 'Research Director, Vedic Epistemology Institute',
      avatar: 'D',
      bio: 'Dr. Devamrita Das holds a Ph.D. in Theoretical Physics from MIT and has spent 20 years researching the intersections between quantum observer theory and Vedic metaphysics.'
    },
    publishDate: 'August 10, 2026',
    readTime: '7 min read',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'For centuries, Western physics treated the observer as a passive witness. Modern quantum mechanics—and Chapter 2 of the Bhagavad Gita—reveal that the observer (Atman) is foundational to physical reality.',
    content: [
      {
        sectionHeading: '1. The Paradigm Shift of the Observer',
        paragraphs: [
          'In classical Newtonian mechanics, the universe was viewed as a deterministic clockwork machine. Particles possessed definite locations and momentum regardless of whether anyone was watching.',
          'However, the advent of quantum mechanics—pioneered by Planck, Bohr, Heisenberg, and Schrödinger—shattered this mechanical worldview. The famous Double-Slit Experiment demonstrated that subatomic entities behave as probability waves until a measurement or observation is made, collapsing the wave function into a localized particle.'
        ],
        quote: '“The observer cannot be separated from the observed. In quantum mechanics, consciousness is not a byproduct of matter, but a primary fabric of existence.” — Erwin Schrödinger'
      },
      {
        sectionHeading: '2. Bhagavad Gita Verse 2.20: The Unborn Observer',
        paragraphs: [
          'In Chapter 2, Verse 20 of the Bhagavad Gita, Sri Krishna provides the definitive ontological definition of the conscious self (Atman):',
          '“na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ” — For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing, and primeval.',
          'When translated into quantum vocabulary, the Atman represents the non-material observer that transcends space-time parameters. Matter (Prakriti) remains in a state of unmanifest potential (Pradhana) until permeated by the conscious gaze (Drishti) of Purusha.'
        ]
      },
      {
        sectionHeading: '3. Practical Implications for Modern Wellbeing',
        paragraphs: [
          'Understanding yourself as the unshakeable observer rather than the transient physical particle releases cognitive anxiety. You are not the temporary emotion, the fluctuating brainwave, or the aging cellular structure.',
          'Through daily Japa meditation and Gita study, we train our focus to remain anchored in the observer state (Sakshi-bhava), experiencing unwavering tranquility amidst life’s thermodynamic turbulence.'
        ]
      }
    ]
  },
  {
    slug: 'sattvic-diet-and-neuroplasticity-food-as-consciousness',
    title: 'Sattvic Diet & Neuroplasticity: How Pure Food Alters Mind States',
    subtitle: 'The biochemical link between Ahimsa, gut-brain axis, and mental calm.',
    category: 'Wellness',
    tags: ['Wellness', 'Sattvic Food', 'Neuroscience'],
    author: {
      name: 'Priya Sharma, M.D.',
      role: 'Integrative Neurologist & Ayurvedic Specialist',
      avatar: 'P',
      bio: 'Dr. Priya Sharma is a practicing neurologist specializing in gut-brain axis communication and traditional Sattvic nutritional therapy.'
    },
    publishDate: 'August 5, 2026',
    readTime: '5 min read',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'The Bhagavad Gita classifies food into three Gunas: Sattva, Rajas, and Tamas. Modern neurogastroenterology now proves how clean, plant-based food transforms neurochemistry.',
    content: [
      {
        sectionHeading: '1. Food as Information, Not Just Calories',
        paragraphs: [
          'In Bhagavad Gita 17.8, Krishna describes Sattvic foods as those that promote longevity, virtue, strength, health, happiness, and satisfaction: “āyuh-sattva-balārogya-sukha-prīti-vivardhanāḥ”.',
          'Modern science validates that food is not merely thermal energy; it is genetic and neurochemical communication. The gut contains over 100 million neurons (the enteric nervous system) and produces 90% of the body’s serotonin.'
        ],
        quote: '“As is the food, so is the mind. As is the mind, so are the thoughts.” — Chandogya Upanishad'
      },
      {
        sectionHeading: '2. Rajasic and Tamasic Food Impact on Brain Waves',
        paragraphs: [
          'Highly pungent, overly salty, or artificial foods (Rajasic) trigger chronic low-grade neuro-inflammation and sympathetic nervous system hyper-arousal.',
          'Stale, heavily processed, or flesh-based foods (Tamasic) induce brain fog, lethargy, and downregulation of neuroplasticity markers such as BDNF (Brain-Derived Neurotrophic Factor).'
        ]
      }
    ]
  },
  {
    slug: 'anna-daan-the-transformative-power-of-food-relief',
    title: 'Anna Daan: The Transformative Power of Community Food Relief',
    subtitle: 'How feeding 500,000+ souls creates social harmony and uplifts cities.',
    category: 'Community',
    tags: ['Community', 'Anna Daan', 'Prasadam'],
    author: {
      name: 'Radheshyam Das',
      role: 'Head of Seva & Community Outreach',
      avatar: 'R',
      bio: 'Radheshyam leads the Science of Krishna Anna Daan initiative, orchestrating daily distribution of hot Sattvic meals across hospital shelters and rural townships.'
    },
    publishDate: 'July 28, 2026',
    readTime: '6 min read',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Giving food (Anna Daan) is recognized in Vedic texts as the highest form of physical charity. Discover how our daily Prasadam drives build trust, hope, and dignity.',
    content: [
      {
        sectionHeading: '1. The Sacred Dignity of Feeding Hungry Souls',
        paragraphs: [
          'In Vedic culture, no guest or neighbor should ever go hungry within the radius of a community sanctuary. Food given with unconditional love and offered to the Divine becomes "Prasadam"—sacred grace.',
          'When a person in distress receives a warm, nutritious meal served with genuine respect, it heals more than physical hunger; it restores faith in human goodness.'
        ]
      },
      {
        sectionHeading: '2. Real Impact in Hospital Waiting Wings',
        paragraphs: [
          'Family members waiting outside intensive care units often endure immense financial and emotional strain. Our mobile Anna Daan vans provide free, hot meals right to these waiting areas.',
          'Over the last year, our volunteers have delivered over 500,000 meals with zero overhead waste, sustained entirely by individual donations.'
        ]
      }
    ]
  },
  {
    slug: 'overcoming-addiction-with-mantra-and-gita-psychology',
    title: 'Overcoming Addiction with Mantra & Gita Psychology',
    subtitle: 'Reclaiming mental autonomy from compulsive neural pathways.',
    category: 'Wellness',
    tags: ['Wellness', 'Anti-Drug', 'Mind Control'],
    author: {
      name: 'Dr. Ananya Verma',
      role: 'Clinical Psychologist & Youth Counselor',
      avatar: 'A',
      bio: 'Dr. Ananya Verma combines cognitive behavioral therapy (CBT) with ancient Vedic breathwork and sound vibration therapy.'
    },
    publishDate: 'July 18, 2026',
    readTime: '8 min read',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Addiction is a disease of misplaced seeking for bliss (Ananda). By swapping destructive habits with high-frequency sound meditation (Japa), youth rewire brain circuits.',
    content: [
      {
        sectionHeading: '1. The Mechanism of "Higher Taste" (Rasa)',
        paragraphs: [
          'Bhagavad Gita 2.59 states: “rasa-varjaṁ raso ’py asya paraṁ dṛṣṭvā nivartate” — The embodied soul may be restricted from sense enjoyment, though the taste for sense objects remains. But, ceasing such engagements by experiencing a higher taste, he is fixed in consciousness.',
          'Willpower alone is rarely sufficient to defeat chemical addiction. True recovery occurs when the brain discovers a higher spiritual taste through sound therapy, meditation, and purposeful community.'
        ]
      }
    ]
  }
];
