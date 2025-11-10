export type View = 'quran' | 'hadith' | 'fact-check' | 'bookmarks' | 'duas' | 'mosque-finder' | 'chatbot' | 'islamic-facts';

export type LanguageOption = 'english' | 'arabic' | 'transliteration' | 'combined';

export interface Ayah {
  number: number;
  arabic: string;
  english: string;
  transliteration: string;
  tafsir?: string;
}

export interface Surah {
  name: string;
  number: number;
  englishName: string;
  revelationType: string;
  numberOfAyahs: number;
  verses: Ayah[];
}

export interface Hadith {
  collection: string;
  book: string;
  hadithNumber: string;
  arabic: string;
  english: string;
  reference: string;
}

export interface Bookmark {
  surahNumber: number;
  surahName: string;
  ayah: Ayah;
}

export interface Dua {
  title: string;
  arabic: string;
  transliteration: string;
  english: string;
  reference: string;
}

// FIX: Add SalatGuide and SalatStep types to resolve import error in constants/salatGuides.ts
export interface SalatStep {
  step: number;
  instruction: string;
  imageUrl: string;
}

export interface SalatGuide {
  title: string;
  introduction: string;
  steps: SalatStep[];
}
