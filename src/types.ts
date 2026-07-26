export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
}

export interface CorePillar {
  id: string;
  title: string;
  sanskritTerm: string;
  category: 'Physics' | 'Neuroscience' | 'Epistemology' | 'Nutrition' | 'Ethics' | 'Acoustics';
  icon: string;
  shortDesc: string;
  fullDesc: string;
  scientificConcept: string;
  scripturalRef: string;
  keyInsights: string[];
}

export interface GitaParallel {
  id: string;
  chapterVerse: string;
  sanskritText: string;
  translation: string;
  scientificParallel: string;
  field: string;
  modernPaperRef?: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Feast' | 'Study Circle' | 'Meditation' | 'Seva Drive' | 'Symposium';
  dayTime: string;
  location: string;
  description: string;
  speakerOrHost: string;
  isOnlineAvailable: boolean;
  meetingLink?: string;
}

export interface SevaPreset {
  id: string;
  title: string;
  amountUSD: number;
  mealsProvided: number;
  gitasSponsored: number;
  scholarshipHours: number;
  isPopular?: boolean;
  tagline: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  scriptureRef?: string;
  scientificParallel?: string;
}
