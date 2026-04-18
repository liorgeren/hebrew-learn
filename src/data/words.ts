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
];
