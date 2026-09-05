export interface Word {
  id: string;
  word: string;           // Hebrew word with nikud
  translation: string;    // English translation
  emoji: string;          // visual representation
  syllables: string[];    // array of syllable strings for sound-it-out mode
  color: string;          // tailwind bg class
}

export const WORDS: Word[] = [
  // Body
  { id: 'av', word: 'אָב', translation: 'Dad', emoji: '👨', syllables: ['אָ', 'ב'], color: 'bg-blue-200' },
  { id: 'em', word: 'אֵם', translation: 'Mom', emoji: '👩', syllables: ['אֵ', 'ם'], color: 'bg-pink-200' },
  { id: 'yad', word: 'יָד', translation: 'Hand', emoji: '🖐️', syllables: ['יָ', 'ד'], color: 'bg-yellow-200' },
  { id: 'regel', word: 'רֶגֶל', translation: 'Foot', emoji: '🦶', syllables: ['רֶ', 'גֶ', 'ל'], color: 'bg-orange-200' },

  // Animals
  { id: 'dag', word: 'דָּג', translation: 'Fish', emoji: '🐟', syllables: ['דָּ', 'ג'], color: 'bg-cyan-200' },
  { id: 'sus', word: 'סוּס', translation: 'Horse', emoji: '🐴', syllables: ['סוּ', 'ס'], color: 'bg-amber-200' },
  { id: 'kelev', word: 'כֶּלֶב', translation: 'Dog', emoji: '🐶', syllables: ['כֶּ', 'לֶ', 'ב'], color: 'bg-brown-200' },
  { id: 'chatul', word: 'חָתוּל', translation: 'Cat', emoji: '🐱', syllables: ['חָ', 'תוּ', 'ל'], color: 'bg-purple-200' },
  { id: 'perah', word: 'פָּרָה', translation: 'Cow', emoji: '🐮', syllables: ['פָּ', 'רָ', 'ה'], color: 'bg-green-200' },

  // Nature
  { id: 'shemesh', word: 'שֶׁמֶשׁ', translation: 'Sun', emoji: '☀️', syllables: ['שֶׁ', 'מֶ', 'שׁ'], color: 'bg-yellow-300' },
  { id: 'yareach', word: 'יָרֵחַ', translation: 'Moon', emoji: '🌙', syllables: ['יָ', 'רֵ', 'חַ'], color: 'bg-indigo-200' },
  { id: 'geshem', word: 'גֶּשֶׁם', translation: 'Rain', emoji: '🌧️', syllables: ['גֶּ', 'שֶׁ', 'ם'], color: 'bg-sky-200' },

  // Food
  { id: 'tapuach', word: 'תַּפּוּחַ', translation: 'Apple', emoji: '🍎', syllables: ['תַּ', 'פּוּ', 'חַ'], color: 'bg-red-200' },
  { id: 'lachma', word: 'לֶחֶם', translation: 'Bread', emoji: '🍞', syllables: ['לֶ', 'חֶ', 'ם'], color: 'bg-orange-300' },
  { id: 'mayim', word: 'מַיִם', translation: 'Water', emoji: '💧', syllables: ['מַ', 'יִ', 'ם'], color: 'bg-blue-300' },

  // Common objects
  { id: 'bayit', word: 'בַּיִת', translation: 'House', emoji: '🏠', syllables: ['בַּ', 'יִ', 'ת'], color: 'bg-lime-200' },
  { id: 'sefer', word: 'סֵפֶר', translation: 'Book', emoji: '📚', syllables: ['סֵ', 'פֶ', 'ר'], color: 'bg-teal-200' },
  { id: 'kadur', word: 'כַּדּוּר', translation: 'Ball', emoji: '⚽', syllables: ['כַּ', 'דּוּ', 'ר'], color: 'bg-rose-200' },

  // Family
  { id: 'ach', word: 'אָח', translation: 'Brother', emoji: '👦', syllables: ['אָ', 'ח'], color: 'bg-sky-300' },
  { id: 'achot', word: 'אָחוֹת', translation: 'Sister', emoji: '👧', syllables: ['אָ', 'חוֹ', 'ת'], color: 'bg-pink-300' },
  { id: 'yeled', word: 'יֶלֶד', translation: 'Boy', emoji: '🧒', syllables: ['יֶ', 'לֶ', 'ד'], color: 'bg-blue-300' },
  { id: 'yalda', word: 'יַלְדָּה', translation: 'Girl', emoji: '👧', syllables: ['יַל', 'דָּ', 'ה'], color: 'bg-rose-300' },

  // Body
  { id: 'rosh', word: 'רֹאשׁ', translation: 'Head', emoji: '🗣️', syllables: ['רֹ', 'אשׁ'], color: 'bg-amber-300' },
  { id: 'peh', word: 'פֶּה', translation: 'Mouth', emoji: '👄', syllables: ['פֶּ', 'ה'], color: 'bg-red-300' },
  { id: 'ayin', word: 'עַיִן', translation: 'Eye', emoji: '👁️', syllables: ['עַ', 'יִ', 'ן'], color: 'bg-violet-200' },
  { id: 'ozen', word: 'אֹזֶן', translation: 'Ear', emoji: '👂', syllables: ['אֹ', 'זֶ', 'ן'], color: 'bg-orange-200' },

  // Animals
  { id: 'tzipor', word: 'צִפּוֹר', translation: 'Bird', emoji: '🐦', syllables: ['צִ', 'פּוֹ', 'ר'], color: 'bg-lime-300' },
  { id: 'dov', word: 'דֹּב', translation: 'Bear', emoji: '🐻', syllables: ['דֹּ', 'ב'], color: 'bg-yellow-200' },
  { id: 'arnav', word: 'אַרְנָב', translation: 'Rabbit', emoji: '🐰', syllables: ['אַר', 'נָ', 'ב'], color: 'bg-fuchsia-200' },

  // Nature
  { id: 'etz', word: 'עֵץ', translation: 'Tree', emoji: '🌳', syllables: ['עֵ', 'ץ'], color: 'bg-green-300' },
  { id: 'perach', word: 'פֶּרַח', translation: 'Flower', emoji: '🌸', syllables: ['פֶּ', 'רַ', 'ח'], color: 'bg-pink-200' },
  { id: 'kochav', word: 'כּוֹכָב', translation: 'Star', emoji: '⭐', syllables: ['כּוֹ', 'כָ', 'ב'], color: 'bg-indigo-300' },
  { id: 'yam', word: 'יָם', translation: 'Sea', emoji: '🌊', syllables: ['יָ', 'ם'], color: 'bg-cyan-300' },

  // Food
  { id: 'chalav', word: 'חָלָב', translation: 'Milk', emoji: '🥛', syllables: ['חָ', 'לָ', 'ב'], color: 'bg-stone-200' },
  { id: 'beitza', word: 'בֵּיצָה', translation: 'Egg', emoji: '🥚', syllables: ['בֵּי', 'צָ', 'ה'], color: 'bg-yellow-100' },
  { id: 'banana', word: 'בָּנָנָה', translation: 'Banana', emoji: '🍌', syllables: ['בָּ', 'נָ', 'נָ', 'ה'], color: 'bg-yellow-300' },

  // Objects
  { id: 'delet', word: 'דֶּלֶת', translation: 'Door', emoji: '🚪', syllables: ['דֶּ', 'לֶ', 'ת'], color: 'bg-amber-200' },
  { id: 'mechonit', word: 'מְכוֹנִית', translation: 'Car', emoji: '🚗', syllables: ['מְ', 'כוֹ', 'נִי', 'ת'], color: 'bg-red-200' },
];

export const WORDS_PER_STAGE = 20;

export function shuffleList<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function pickStageWords(count = WORDS_PER_STAGE): Word[] {
  return shuffleList(WORDS).slice(0, Math.min(count, WORDS.length));
}
