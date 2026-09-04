export interface Letter {
  id: string;
  letter: string;
  name: string;       // Hebrew name
  nameEn: string;     // English transliteration
  sound: string;      // phonetic sound
  emoji: string;      // fun emoji to associate
  color: string;      // tailwind bg color class
}

export const LETTERS: Letter[] = [
  { id: 'aleph', letter: 'א', name: 'אָלֶף', nameEn: 'Aleph', sound: '', emoji: '🦁', color: 'bg-yellow-300' },
  { id: 'bet', letter: 'בּ', name: 'בֵּית', nameEn: 'Bet', sound: 'b', emoji: '🏠', color: 'bg-orange-300' },
  { id: 'gimel', letter: 'ג', name: 'גִּימֶל', nameEn: 'Gimel', sound: 'g', emoji: '🐪', color: 'bg-pink-300' },
  { id: 'dalet', letter: 'ד', name: 'דָּלֶת', nameEn: 'Dalet', sound: 'd', emoji: '🚪', color: 'bg-purple-300' },
  { id: 'he', letter: 'ה', name: 'הֵא', nameEn: 'He', sound: 'h', emoji: '🌬️', color: 'bg-blue-300' },
  { id: 'vav', letter: 'ו', name: 'וָו', nameEn: 'Vav', sound: 'v', emoji: '🪝', color: 'bg-green-300' },
  { id: 'zayin', letter: 'ז', name: 'זַיִן', nameEn: 'Zayin', sound: 'z', emoji: '🗡️', color: 'bg-yellow-400' },
  { id: 'chet', letter: 'ח', name: 'חֵית', nameEn: 'Chet', sound: 'ch', emoji: '🧵', color: 'bg-red-300' },
  { id: 'tet', letter: 'ט', name: 'טֵית', nameEn: 'Tet', sound: 't', emoji: '🪢', color: 'bg-indigo-300' },
  { id: 'yod', letter: 'י', name: 'יוֹד', nameEn: 'Yod', sound: 'y', emoji: '🤏', color: 'bg-teal-300' },
  { id: 'kaf', letter: 'כּ', name: 'כַּף', nameEn: 'Kaf', sound: 'k', emoji: '✋', color: 'bg-orange-400' },
  { id: 'lamed', letter: 'ל', name: 'לָמֶד', nameEn: 'Lamed', sound: 'l', emoji: '📐', color: 'bg-pink-400' },
  { id: 'mem', letter: 'מ', name: 'מֵם', nameEn: 'Mem', sound: 'm', emoji: '💧', color: 'bg-cyan-300' },
  { id: 'nun', letter: 'נ', name: 'נוּן', nameEn: 'Nun', sound: 'n', emoji: '🐟', color: 'bg-lime-300' },
  { id: 'samech', letter: 'ס', name: 'סָמֶך', nameEn: 'Samech', sound: 's', emoji: '⭕', color: 'bg-violet-300' },
  { id: 'ayin', letter: 'ע', name: 'עַיִן', nameEn: 'Ayin', sound: '', emoji: '👁️', color: 'bg-yellow-300' },
  { id: 'pe', letter: 'פּ', name: 'פֵּא', nameEn: 'Pe', sound: 'p', emoji: '👄', color: 'bg-rose-300' },
  { id: 'tsadi', letter: 'צ', name: 'צַדִּי', nameEn: 'Tsadi', sound: 'ts', emoji: '🌿', color: 'bg-emerald-300' },
  { id: 'kuf', letter: 'ק', name: 'קוֹף', nameEn: 'Kuf', sound: 'k', emoji: '🐒', color: 'bg-amber-300' },
  { id: 'resh', letter: 'ר', name: 'רֵישׁ', nameEn: 'Resh', sound: 'r', emoji: '🦁', color: 'bg-sky-300' },
  { id: 'shin', letter: 'שׁ', name: 'שִׁין', nameEn: 'Shin', sound: 'sh', emoji: '🦷', color: 'bg-fuchsia-300' },
  { id: 'tav', letter: 'ת', name: 'תָּו', nameEn: 'Tav', sound: 't', emoji: '🎵', color: 'bg-red-400' },
];
