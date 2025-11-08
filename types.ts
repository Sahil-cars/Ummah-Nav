
export type View = 'quran' | 'hadith' | 'fact-check';

export type LanguageOption = 'english' | 'arabic' | 'transliteration';

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
   