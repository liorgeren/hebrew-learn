export interface Letter {
  id: string;
  letter: string;
  name: string;       // Hebrew name
  nameEn: string;     // English transliteration
  sound: string;      // phonetic sound
  group: number;      // 1-5 for grouping ~5 per group
  emoji: string;      // fun emoji to associate
  color: string;      // tailwind bg color class
}

export const LETTERS: Letter[] = [
  // Group 1
  { id: 'aleph', letter: 'א', name: 'אָלֶף', nameEn: 'Aleph', sound: '', group: 1, emoji: '🦁', color: 'bg-yellow-300' },
  { id: 'bet', letter: 'בּ', name: 'בֵּית', nameEn: 'Bet', sound: 'b', group: 1, emoji: '🏠', color: 'bg-orange-300' },
  { id: 'gimel', letter: 'ג', name: 'גִּימֶל', nameEn: 'Gimel', sound: 'g', group: 1, emoji: '🐪', color: 'bg-pink-300' },
  { id: 'dalet', letter: 'ד', name: 'דָּלֶת', nameEn: 'Dalet', sound: 'd', group: 1, emoji: '🚪', color: 'bg-purple-300' },
  { id: 'he', letter: 'ה', name: 'הֵא', nameEn: 'He', sound: 'h', group: 1, emoji: '🌬️', color: 'bg-blue-300' },

  // Group 2
  { id: 'vav', letter: 'ו', name: 'וָו', nameEn: 'Vav', sound: 'v', group: 2, emoji: '🪝', color: 'bg-green-300' },
  { id: 'zayin', letter: 'ז', name: 'זַיִן', nameEn: 'Zayin', sound: 'z', group: 2, emoji: '🗡️', color: 'bg-yellow-400' },
  { id: 'chet', letter: 'ח', name: 'חֵית', nameEn: 'Chet', sound: 'ch', group: 2, emoji: '🧵', color: 'bg-red-300' },
  { id: 'tet', letter: 'ט', name: 'טֵית', nameEn: 'Tet', sound: 't', group: 2, emoji: '🪢', color: 'bg-indigo-300' },
  { id: 'yod', letter: 'י', name: 'יוֹד', nameEn: 'Yod', sound: 'y', group: 2, emoji: '🤏', color: 'bg-teal-300' },

  // Group 3
  { id: 'kaf', letter: 'כּ', name: 'כַּף', nameEn: 'Kaf', sound: 'k', group: 3, emoji: '✋', color: 'bg-orange-400' },
  { id: 'lamed', letter: 'ל', name: 'לָמֶד', nameEn: 'Lamed', sound: 'l', group: 3, emoji: '📐', color: 'bg-pink-400' },
  { id: 'mem', letter: 'מ', name: 'מֵם', nameEn: 'Mem', sound: 'm', group: 3, emoji: '💧', color: 'bg-cyan-300' },
  { id: 'nun', letter: 'נ', name: 'נוּן', nameEn: 'Nun', sound: 'n', group: 3, emoji: '🐟', color: 'bg-lime-300' },
  { id: 'samech', letter: 'ס', name: 'סָמֶך', nameEn: 'Samech', sound: 's', group: 3, emoji: '⭕', color: 'bg-violet-300' },

  // Group 4
  { id: 'ayin', letter: 'ע', name: 'עַיִן', nameEn: 'Ayin', sound: '', group: 4, emoji: '👁️', color: 'bg-yellow-300' },
  { id: 'pe', letter: 'פּ', name: 'פֵּא', nameEn: 'Pe', sound: 'p', group: 4, emoji: '👄', color: 'bg-rose-300' },
  { id: 'tsadi', letter: 'צ', name: 'צַדִּי', nameEn: 'Tsadi', sound: 'ts', group: 4, emoji: '🌿', color: 'bg-emerald-300' },
  { id: 'kuf', letter: 'ק', name: 'קוֹף', nameEn: 'Kuf', sound: 'k', group: 4, emoji: '🐒', color: 'bg-amber-300' },
  { id: 'resh', letter: 'ר', name: 'רֵישׁ', nameEn: 'Resh', sound: 'r', group: 4, emoji: '🦁', color: 'bg-sky-300' },

  // Group 5
  { id: 'shin', letter: 'שׁ', name: 'שִׁין', nameEn: 'Shin', sound: 'sh', group: 5, emoji: '🦷', color: 'bg-fuchsia-300' },
  { id: 'tav', letter: 'ת', name: 'תָּו', nameEn: 'Tav', sound: 't', group: 5, emoji: '🎵', color: 'bg-red-400' },
];

export const LETTER_GROUPS = [1, 2, 3, 4, 5];
export const getLettersByGroup = (group: number) => LETTERS.filter(l => l.group === group);
