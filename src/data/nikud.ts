export interface Nikud {
  id: string;
  mark: string;       // the nikud mark unicode
  name: string;       // Hebrew name
  nameEn: string;     // English name
  sound: string;      // vowel sound
  example: string;    // aleph + this nikud
  color: string;      // tailwind color class
  emoji: string;
}

// The main 5 vowels for beginners
export const NIKUD: Nikud[] = [
  {
    id: 'kamatz',
    mark: '\u05B8',        // ָ  kamatz
    name: 'קָמַץ',
    nameEn: 'Kamatz',
    sound: 'ah',
    example: 'אָ',
    color: 'bg-red-300',
    emoji: '🍎',
  },
  {
    id: 'patach',
    mark: '\u05B7',        // ַ  patach
    name: 'פַּתַח',
    nameEn: 'Patach',
    sound: 'ah',
    example: 'אַ',
    color: 'bg-orange-300',
    emoji: '🌅',
  },
  {
    id: 'chirik',
    mark: '\u05B4',        // ִ  chirik
    name: 'חִירִיק',
    nameEn: 'Chirik',
    sound: 'ee',
    example: 'אִ',
    color: 'bg-blue-300',
    emoji: '🫐',
  },
  {
    id: 'cholam',
    mark: '\u05B9',        // ֹ  cholam
    name: 'חוֹלָם',
    nameEn: 'Cholam',
    sound: 'oh',
    example: 'אֹ',
    color: 'bg-yellow-300',
    emoji: '🌕',
  },
  {
    id: 'kubutz',
    mark: '\u05BB',        // ֻ  kubutz
    name: 'קֻבּוּץ',
    nameEn: 'Kubutz',
    sound: 'oo',
    example: 'אֻ',
    color: 'bg-purple-300',
    emoji: '🦉',
  },
  {
    id: 'segol',
    mark: '\u05B6',        // ֶ  segol
    name: 'סֶגּוֹל',
    nameEn: 'Segol',
    sound: 'eh',
    example: 'אֶ',
    color: 'bg-green-300',
    emoji: '🍃',
  },
  {
    id: 'tsere',
    mark: '\u05B5',        // ֵ  tsere
    name: 'צֵרֵי',
    nameEn: 'Tsere',
    sound: 'ay',
    example: 'אֵ',
    color: 'bg-pink-300',
    emoji: '🦩',
  },
  {
    id: 'shuruk',
    mark: 'וּ',            // shuruk is vav+dagesh
    name: 'שּׁוּרוּק',
    nameEn: 'Shuruk',
    sound: 'oo',
    example: 'וּ',
    color: 'bg-teal-300',
    emoji: '🌊',
  },
];

export const BASIC_NIKUD = NIKUD.slice(0, 5); // first 5 for beginners
