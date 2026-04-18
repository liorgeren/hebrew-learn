export interface Syllable {
  id: string;
  text: string;       // the full syllable with nikud
  baseLetter: string; // letter without nikud
  nikudId: string;
  sound: string;      // phonetic pronunciation
  letterNameEn: string;
}

// Curated common syllables using the 5 most common letters + 5 basic nikud
// Base letters: ב מ ד ל ס (common beginner letters)
// Nikud: kamatz(ah), patach(ah), chirik(ee), cholam(oh), kubutz(oo)

const SYLLABLE_DATA: Array<{
  baseLetter: string;
  letterNameEn: string;
  letterSound: string;
  nikudId: string;
  nikudMark: string;
  nikudSound: string;
}> = [
  // Bet (ב = b)
  { baseLetter: 'ב', letterNameEn: 'Bet', letterSound: 'b', nikudId: 'kamatz', nikudMark: '\u05B8', nikudSound: 'ah' },
  { baseLetter: 'ב', letterNameEn: 'Bet', letterSound: 'b', nikudId: 'patach', nikudMark: '\u05B7', nikudSound: 'ah' },
  { baseLetter: 'ב', letterNameEn: 'Bet', letterSound: 'b', nikudId: 'chirik', nikudMark: '\u05B4', nikudSound: 'ee' },
  { baseLetter: 'ב', letterNameEn: 'Bet', letterSound: 'b', nikudId: 'cholam', nikudMark: '\u05B9', nikudSound: 'oh' },
  { baseLetter: 'ב', letterNameEn: 'Bet', letterSound: 'b', nikudId: 'kubutz', nikudMark: '\u05BB', nikudSound: 'oo' },
  // Mem (מ = m)
  { baseLetter: 'מ', letterNameEn: 'Mem', letterSound: 'm', nikudId: 'kamatz', nikudMark: '\u05B8', nikudSound: 'ah' },
  { baseLetter: 'מ', letterNameEn: 'Mem', letterSound: 'm', nikudId: 'patach', nikudMark: '\u05B7', nikudSound: 'ah' },
  { baseLetter: 'מ', letterNameEn: 'Mem', letterSound: 'm', nikudId: 'chirik', nikudMark: '\u05B4', nikudSound: 'ee' },
  { baseLetter: 'מ', letterNameEn: 'Mem', letterSound: 'm', nikudId: 'cholam', nikudMark: '\u05B9', nikudSound: 'oh' },
  { baseLetter: 'מ', letterNameEn: 'Mem', letterSound: 'm', nikudId: 'kubutz', nikudMark: '\u05BB', nikudSound: 'oo' },
  // Dalet (ד = d)
  { baseLetter: 'ד', letterNameEn: 'Dalet', letterSound: 'd', nikudId: 'kamatz', nikudMark: '\u05B8', nikudSound: 'ah' },
  { baseLetter: 'ד', letterNameEn: 'Dalet', letterSound: 'd', nikudId: 'patach', nikudMark: '\u05B7', nikudSound: 'ah' },
  { baseLetter: 'ד', letterNameEn: 'Dalet', letterSound: 'd', nikudId: 'chirik', nikudMark: '\u05B4', nikudSound: 'ee' },
  { baseLetter: 'ד', letterNameEn: 'Dalet', letterSound: 'd', nikudId: 'cholam', nikudMark: '\u05B9', nikudSound: 'oh' },
  { baseLetter: 'ד', letterNameEn: 'Dalet', letterSound: 'd', nikudId: 'kubutz', nikudMark: '\u05BB', nikudSound: 'oo' },
  // Lamed (ל = l)
  { baseLetter: 'ל', letterNameEn: 'Lamed', letterSound: 'l', nikudId: 'kamatz', nikudMark: '\u05B8', nikudSound: 'ah' },
  { baseLetter: 'ל', letterNameEn: 'Lamed', letterSound: 'l', nikudId: 'patach', nikudMark: '\u05B7', nikudSound: 'ah' },
  { baseLetter: 'ל', letterNameEn: 'Lamed', letterSound: 'l', nikudId: 'chirik', nikudMark: '\u05B4', nikudSound: 'ee' },
  { baseLetter: 'ל', letterNameEn: 'Lamed', letterSound: 'l', nikudId: 'cholam', nikudMark: '\u05B9', nikudSound: 'oh' },
  { baseLetter: 'ל', letterNameEn: 'Lamed', letterSound: 'l', nikudId: 'kubutz', nikudMark: '\u05BB', nikudSound: 'oo' },
  // Shin (שׁ = sh)
  { baseLetter: 'שׁ', letterNameEn: 'Shin', letterSound: 'sh', nikudId: 'kamatz', nikudMark: '\u05B8', nikudSound: 'ah' },
  { baseLetter: 'שׁ', letterNameEn: 'Shin', letterSound: 'sh', nikudId: 'patach', nikudMark: '\u05B7', nikudSound: 'ah' },
  { baseLetter: 'שׁ', letterNameEn: 'Shin', letterSound: 'sh', nikudId: 'chirik', nikudMark: '\u05B4', nikudSound: 'ee' },
  { baseLetter: 'שׁ', letterNameEn: 'Shin', letterSound: 'sh', nikudId: 'cholam', nikudMark: '\u05B9', nikudSound: 'oh' },
  { baseLetter: 'שׁ', letterNameEn: 'Shin', letterSound: 'sh', nikudId: 'kubutz', nikudMark: '\u05BB', nikudSound: 'oo' },
];

export const SYLLABLES: Syllable[] = SYLLABLE_DATA.map((d) => ({
  id: `${d.letterNameEn.toLowerCase()}-${d.nikudId}`,
  text: d.baseLetter + d.nikudMark,
  baseLetter: d.baseLetter,
  nikudId: d.nikudId,
  sound: `${d.letterSound}${d.nikudSound}`,
  letterNameEn: d.letterNameEn,
}));
