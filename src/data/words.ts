export interface Word {
  id: string;
  word: string;           // Hebrew word with nikud
  translation: string;    // English translation
  emoji: string;          // visual representation
  color: string;          // tailwind bg class
  level: 1 | 2 | 3;        // difficulty tier
}

export const WORDS: Word[] = [
  // Level 1 — Body
  { id: 'av', word: 'אָב', translation: 'Dad', emoji: '👨', color: 'bg-blue-200', level: 1 },
  { id: 'em', word: 'אֵם', translation: 'Mom', emoji: '👩', color: 'bg-pink-200', level: 1 },
  { id: 'yad', word: 'יָד', translation: 'Hand', emoji: '🖐️', color: 'bg-yellow-200', level: 1 },
  { id: 'regel', word: 'רֶגֶל', translation: 'Foot', emoji: '🦶', color: 'bg-orange-200', level: 1 },

  // Level 1 — Animals
  { id: 'dag', word: 'דָּג', translation: 'Fish', emoji: '🐟', color: 'bg-cyan-200', level: 1 },
  { id: 'sus', word: 'סוּס', translation: 'Horse', emoji: '🐴', color: 'bg-amber-200', level: 1 },
  { id: 'kelev', word: 'כֶּלֶב', translation: 'Dog', emoji: '🐶', color: 'bg-orange-300', level: 1 },
  { id: 'chatul', word: 'חָתוּל', translation: 'Cat', emoji: '🐱', color: 'bg-purple-200', level: 1 },
  { id: 'perah', word: 'פָּרָה', translation: 'Cow', emoji: '🐮', color: 'bg-green-200', level: 1 },

  // Level 1 — Nature
  { id: 'shemesh', word: 'שֶׁמֶשׁ', translation: 'Sun', emoji: '☀️', color: 'bg-yellow-300', level: 1 },
  { id: 'yareach', word: 'יָרֵחַ', translation: 'Moon', emoji: '🌙', color: 'bg-indigo-200', level: 1 },
  { id: 'geshem', word: 'גֶּשֶׁם', translation: 'Rain', emoji: '🌧️', color: 'bg-sky-200', level: 1 },

  // Level 1 — Food
  { id: 'tapuach', word: 'תַּפּוּחַ', translation: 'Apple', emoji: '🍎', color: 'bg-red-200', level: 1 },
  { id: 'lachma', word: 'לֶחֶם', translation: 'Bread', emoji: '🍞', color: 'bg-orange-200', level: 1 },
  { id: 'mayim', word: 'מַיִם', translation: 'Water', emoji: '💧', color: 'bg-blue-300', level: 1 },

  // Level 1 — Common objects
  { id: 'bayit', word: 'בַּיִת', translation: 'House', emoji: '🏠', color: 'bg-lime-200', level: 1 },
  { id: 'sefer', word: 'סֵפֶר', translation: 'Book', emoji: '📚', color: 'bg-teal-200', level: 1 },
  { id: 'kadur', word: 'כַּדּוּר', translation: 'Ball', emoji: '⚽', color: 'bg-rose-200', level: 1 },

  // Level 1 — Family
  { id: 'ach', word: 'אָח', translation: 'Brother', emoji: '👦', color: 'bg-sky-300', level: 1 },
  { id: 'achot', word: 'אָחוֹת', translation: 'Sister', emoji: '👧', color: 'bg-pink-300', level: 1 },
  { id: 'yeled', word: 'יֶלֶד', translation: 'Boy', emoji: '🧒', color: 'bg-blue-300', level: 1 },
  { id: 'yalda', word: 'יַלְדָּה', translation: 'Girl', emoji: '👧', color: 'bg-rose-300', level: 1 },

  // Level 1 — Body (more)
  { id: 'rosh', word: 'רֹאשׁ', translation: 'Head', emoji: '🗣️', color: 'bg-amber-300', level: 1 },
  { id: 'peh', word: 'פֶּה', translation: 'Mouth', emoji: '👄', color: 'bg-red-300', level: 1 },
  { id: 'ayin', word: 'עַיִן', translation: 'Eye', emoji: '👁️', color: 'bg-violet-200', level: 1 },
  { id: 'ozen', word: 'אֹזֶן', translation: 'Ear', emoji: '👂', color: 'bg-orange-200', level: 1 },

  // Level 1 — Animals (more)
  { id: 'tzipor', word: 'צִפּוֹר', translation: 'Bird', emoji: '🐦', color: 'bg-lime-300', level: 1 },
  { id: 'dov', word: 'דֹּב', translation: 'Bear', emoji: '🐻', color: 'bg-yellow-200', level: 1 },
  { id: 'arnav', word: 'אַרְנָב', translation: 'Rabbit', emoji: '🐰', color: 'bg-fuchsia-200', level: 1 },

  // Level 1 — Nature (more)
  { id: 'etz', word: 'עֵץ', translation: 'Tree', emoji: '🌳', color: 'bg-green-300', level: 1 },
  { id: 'perach', word: 'פֶּרַח', translation: 'Flower', emoji: '🌸', color: 'bg-pink-200', level: 1 },
  { id: 'kochav', word: 'כּוֹכָב', translation: 'Star', emoji: '⭐', color: 'bg-indigo-300', level: 1 },
  { id: 'yam', word: 'יָם', translation: 'Sea', emoji: '🌊', color: 'bg-cyan-300', level: 1 },

  // Level 1 — Food (more)
  { id: 'chalav', word: 'חָלָב', translation: 'Milk', emoji: '🥛', color: 'bg-stone-200', level: 1 },
  { id: 'beitza', word: 'בֵּיצָה', translation: 'Egg', emoji: '🥚', color: 'bg-yellow-100', level: 1 },
  { id: 'banana', word: 'בָּנָנָה', translation: 'Banana', emoji: '🍌', color: 'bg-yellow-300', level: 1 },

  // Level 1 — Objects (more)
  { id: 'delet', word: 'דֶּלֶת', translation: 'Door', emoji: '🚪', color: 'bg-amber-200', level: 1 },
  { id: 'mechonit', word: 'מְכוֹנִית', translation: 'Car', emoji: '🚗', color: 'bg-red-200', level: 1 },

  // Level 1 — a few more easy words to round out to 50
  { id: 'kos', word: 'כּוֹס', translation: 'Cup', emoji: '🥤', color: 'bg-cyan-200', level: 1 },
  { id: 'kisse', word: 'כִּסֵּא', translation: 'Chair', emoji: '🪑', color: 'bg-amber-200', level: 1 },
  { id: 'tik', word: 'תִּיק', translation: 'Bag', emoji: '🎒', color: 'bg-orange-300', level: 1 },
  { id: 'uga', word: 'עוּגָה', translation: 'Cake', emoji: '🍰', color: 'bg-pink-300', level: 1 },
  { id: 'lev', word: 'לֵב', translation: 'Heart', emoji: '❤️', color: 'bg-red-300', level: 1 },
  { id: 'pil', word: 'פִּיל', translation: 'Elephant', emoji: '🐘', color: 'bg-gray-200', level: 1 },
  { id: 'kof', word: 'קוֹף', translation: 'Monkey', emoji: '🐒', color: 'bg-yellow-200', level: 1 },
  { id: 'nachash', word: 'נָחָשׁ', translation: 'Snake', emoji: '🐍', color: 'bg-green-200', level: 1 },
  { id: 'mita', word: 'מִטָּה', translation: 'Bed', emoji: '🛏️', color: 'bg-indigo-200', level: 1 },
  { id: 'keter', word: 'כֶּתֶר', translation: 'Crown', emoji: '👑', color: 'bg-yellow-300', level: 1 },
  { id: 'degel', word: 'דֶּגֶל', translation: 'Flag', emoji: '🚩', color: 'bg-red-200', level: 1 },
  { id: 'gerev', word: 'גֶּרֶב', translation: 'Sock', emoji: '🧦', color: 'bg-teal-200', level: 1 },

  // Level 2 — Numbers
  { id: 'echad', word: 'אֶחָד', translation: 'One', emoji: '1️⃣', color: 'bg-blue-200', level: 2 },
  { id: 'shtayim', word: 'שְׁתַּיִם', translation: 'Two', emoji: '2️⃣', color: 'bg-pink-200', level: 2 },
  { id: 'shalosh', word: 'שָׁלוֹשׁ', translation: 'Three', emoji: '3️⃣', color: 'bg-yellow-200', level: 2 },
  { id: 'arba', word: 'אַרְבַּע', translation: 'Four', emoji: '4️⃣', color: 'bg-orange-200', level: 2 },
  { id: 'chamesh', word: 'חָמֵשׁ', translation: 'Five', emoji: '5️⃣', color: 'bg-cyan-200', level: 2 },
  { id: 'shesh', word: 'שֵׁשׁ', translation: 'Six', emoji: '6️⃣', color: 'bg-amber-200', level: 2 },
  { id: 'sheva', word: 'שֶׁבַע', translation: 'Seven', emoji: '7️⃣', color: 'bg-purple-200', level: 2 },
  { id: 'shmone', word: 'שְׁמוֹנֶה', translation: 'Eight', emoji: '8️⃣', color: 'bg-green-200', level: 2 },
  { id: 'tesha', word: 'תֵּשַׁע', translation: 'Nine', emoji: '9️⃣', color: 'bg-indigo-200', level: 2 },
  { id: 'eser', word: 'עֶשֶׂר', translation: 'Ten', emoji: '🔟', color: 'bg-sky-200', level: 2 },

  // Level 2 — Colors
  { id: 'adom', word: 'אָדוֹם', translation: 'Red', emoji: '🔴', color: 'bg-red-200', level: 2 },
  { id: 'kachol', word: 'כָּחוֹל', translation: 'Blue', emoji: '🔵', color: 'bg-blue-200', level: 2 },
  { id: 'tzahov', word: 'צָהוֹב', translation: 'Yellow', emoji: '🟡', color: 'bg-yellow-200', level: 2 },
  { id: 'yarok', word: 'יָרוֹק', translation: 'Green', emoji: '🟢', color: 'bg-green-200', level: 2 },
  { id: 'lavan', word: 'לָבָן', translation: 'White', emoji: '⚪', color: 'bg-stone-200', level: 2 },

  // Level 2 — Clothing
  { id: 'chultza', word: 'חֻלְצָה', translation: 'Shirt', emoji: '👕', color: 'bg-cyan-300', level: 2 },
  { id: 'michnasayim', word: 'מִכְנָסַיִם', translation: 'Pants', emoji: '👖', color: 'bg-blue-300', level: 2 },
  { id: 'kova', word: 'כּוֹבַע', translation: 'Hat', emoji: '🧢', color: 'bg-amber-300', level: 2 },
  { id: 'naalayim', word: 'נַעֲלַיִם', translation: 'Shoes', emoji: '👟', color: 'bg-rose-200', level: 2 },
  { id: 'meil', word: 'מְעִיל', translation: 'Coat', emoji: '🧥', color: 'bg-teal-300', level: 2 },

  // Level 2 — Weather / nature
  { id: 'anan', word: 'עָנָן', translation: 'Cloud', emoji: '☁️', color: 'bg-sky-200', level: 2 },
  { id: 'ruach', word: 'רוּחַ', translation: 'Wind', emoji: '💨', color: 'bg-gray-200', level: 2 },
  { id: 'sheleg', word: 'שֶׁלֶג', translation: 'Snow', emoji: '❄️', color: 'bg-cyan-100', level: 2 },
  { id: 'keshet', word: 'קֶשֶׁת', translation: 'Rainbow', emoji: '🌈', color: 'bg-purple-200', level: 2 },
  { id: 'har', word: 'הַר', translation: 'Mountain', emoji: '⛰️', color: 'bg-stone-300', level: 2 },

  // Level 2 — School
  { id: 'iparon', word: 'עִפָּרוֹן', translation: 'Pencil', emoji: '✏️', color: 'bg-yellow-200', level: 2 },
  { id: 'machberet', word: 'מַחְבֶּרֶת', translation: 'Notebook', emoji: '📓', color: 'bg-orange-200', level: 2 },
  { id: 'talmid', word: 'תַּלְמִיד', translation: 'Student', emoji: '🧑‍🎓', color: 'bg-blue-200', level: 2 },
  { id: 'moreh', word: 'מוֹרֶה', translation: 'Teacher', emoji: '🧑‍🏫', color: 'bg-green-200', level: 2 },
  { id: 'kita', word: 'כִּתָּה', translation: 'Classroom', emoji: '🏫', color: 'bg-red-200', level: 2 },

  // Level 2 — Transportation
  { id: 'ofanayim', word: 'אוֹפַנַּיִם', translation: 'Bicycle', emoji: '🚲', color: 'bg-lime-200', level: 2 },
  { id: 'otobus', word: 'אוֹטוֹבּוּס', translation: 'Bus', emoji: '🚌', color: 'bg-yellow-300', level: 2 },
  { id: 'rakevet', word: 'רַכֶּבֶת', translation: 'Train', emoji: '🚆', color: 'bg-indigo-200', level: 2 },
  { id: 'matos', word: 'מָטוֹס', translation: 'Airplane', emoji: '✈️', color: 'bg-sky-300', level: 2 },
  { id: 'sira', word: 'סִירָה', translation: 'Boat', emoji: '⛵', color: 'bg-cyan-200', level: 2 },

  // Level 2 — Family (more)
  { id: 'saba', word: 'סַבָּא', translation: 'Grandpa', emoji: '👴', color: 'bg-amber-200', level: 2 },
  { id: 'savta', word: 'סָבְתָא', translation: 'Grandma', emoji: '👵', color: 'bg-pink-200', level: 2 },
  { id: 'tinok', word: 'תִּינוֹק', translation: 'Baby', emoji: '👶', color: 'bg-rose-200', level: 2 },
  { id: 'dod', word: 'דּוֹד', translation: 'Uncle', emoji: '🧔', color: 'bg-blue-200', level: 2 },
  { id: 'doda', word: 'דּוֹדָה', translation: 'Aunt', emoji: '👩‍🦰', color: 'bg-fuchsia-200', level: 2 },

  // Level 2 — Feelings
  { id: 'sameach', word: 'שָׂמֵחַ', translation: 'Happy', emoji: '😊', color: 'bg-yellow-200', level: 2 },
  { id: 'atzuv', word: 'עָצוּב', translation: 'Sad', emoji: '😢', color: 'bg-blue-200', level: 2 },
  { id: 'ayef', word: 'עָיֵף', translation: 'Tired', emoji: '😴', color: 'bg-purple-200', level: 2 },
  { id: 'koes', word: 'כּוֹעֵס', translation: 'Angry', emoji: '😠', color: 'bg-red-200', level: 2 },
  { id: 'mefuchad', word: 'מְפֻחָד', translation: 'Scared', emoji: '😨', color: 'bg-indigo-200', level: 2 },

  // Level 2 — Time & places
  { id: 'boker', word: 'בֹּקֶר', translation: 'Morning', emoji: '🌅', color: 'bg-orange-200', level: 2 },
  { id: 'layla', word: 'לַיְלָה', translation: 'Night', emoji: '🌃', color: 'bg-indigo-300', level: 2 },
  { id: 'gan', word: 'גַּן', translation: 'Kindergarten', emoji: '🧸', color: 'bg-lime-200', level: 2 },
  { id: 'ginah', word: 'גִּנָּה', translation: 'Yard', emoji: '🌷', color: 'bg-pink-200', level: 2 },
  { id: 'choof', word: 'חוֹף', translation: 'Beach', emoji: '🏖️', color: 'bg-cyan-200', level: 2 },

  // Level 3 — Professions
  { id: 'rofe', word: 'רוֹפֵא', translation: 'Doctor', emoji: '👨‍⚕️', color: 'bg-red-200', level: 3 },
  { id: 'shoter', word: 'שׁוֹטֵר', translation: 'Police Officer', emoji: '👮', color: 'bg-blue-200', level: 3 },
  { id: 'kabai', word: 'כַּבָּאי', translation: 'Firefighter', emoji: '🧑‍🚒', color: 'bg-orange-200', level: 3 },
  { id: 'tabach', word: 'טַבָּח', translation: 'Chef', emoji: '👨‍🍳', color: 'bg-yellow-200', level: 3 },
  { id: 'tzayar', word: 'צַיָּר', translation: 'Painter', emoji: '🎨', color: 'bg-purple-200', level: 3 },

  // Level 3 — Places
  { id: 'muzeon', word: 'מוּזֵיאוֹן', translation: 'Museum', emoji: '🏛️', color: 'bg-stone-200', level: 3 },
  { id: 'shuk', word: 'שׁוּק', translation: 'Market', emoji: '🏪', color: 'bg-amber-200', level: 3 },
  { id: 'misada', word: 'מִסְעָדָה', translation: 'Restaurant', emoji: '🍽️', color: 'bg-rose-200', level: 3 },
  { id: 'tachana', word: 'תַּחֲנָה', translation: 'Station', emoji: '🚉', color: 'bg-sky-200', level: 3 },
  { id: 'kikar', word: 'כִּכָּר', translation: 'Town Square', emoji: '🏙️', color: 'bg-gray-200', level: 3 },

  // Level 3 — Nature & animals
  { id: 'zeev', word: 'זְאֵב', translation: 'Wolf', emoji: '🐺', color: 'bg-gray-300', level: 3 },
  { id: 'shual', word: 'שׁוּעָל', translation: 'Fox', emoji: '🦊', color: 'bg-orange-300', level: 3 },
  { id: 'namer', word: 'נָמֵר', translation: 'Tiger', emoji: '🐯', color: 'bg-orange-200', level: 3 },
  { id: 'arye', word: 'אַרְיֵה', translation: 'Lion', emoji: '🦁', color: 'bg-yellow-300', level: 3 },
  { id: 'girafa', word: 'גִּירָפָה', translation: 'Giraffe', emoji: '🦒', color: 'bg-yellow-200', level: 3 },
  { id: 'akavish', word: 'עַכָּבִיש', translation: 'Spider', emoji: '🕷️', color: 'bg-stone-300', level: 3 },
  { id: 'dvora', word: 'דְּבוֹרָה', translation: 'Bee', emoji: '🐝', color: 'bg-yellow-200', level: 3 },
  { id: 'parpar', word: 'פַּרְפַּר', translation: 'Butterfly', emoji: '🦋', color: 'bg-fuchsia-200', level: 3 },
  { id: 'tarnegol', word: 'תַּרְנְגוֹל', translation: 'Rooster', emoji: '🐓', color: 'bg-red-300', level: 3 },
  { id: 'tzvi', word: 'צְבִי', translation: 'Deer', emoji: '🦌', color: 'bg-amber-200', level: 3 },

  // Level 3 — Kitchen & food
  { id: 'mitbach', word: 'מִטְבָּח', translation: 'Kitchen', emoji: '🍳', color: 'bg-orange-200', level: 3 },
  { id: 'tzalachat', word: 'צַלַּחַת', translation: 'Plate', emoji: '🍽️', color: 'bg-blue-200', level: 3 },
  { id: 'mazleg', word: 'מַזְלֵג', translation: 'Fork', emoji: '🍴', color: 'bg-gray-200', level: 3 },
  { id: 'kapit', word: 'כַּפִּית', translation: 'Spoon', emoji: '🥄', color: 'bg-cyan-200', level: 3 },
  { id: 'mekarer', word: 'מְקָרֵר', translation: 'Refrigerator', emoji: '🧊', color: 'bg-sky-200', level: 3 },
  { id: 'of', word: 'עוֹף', translation: 'Chicken', emoji: '🍗', color: 'bg-amber-300', level: 3 },
  { id: 'yerek', word: 'יֶרֶק', translation: 'Vegetable', emoji: '🥦', color: 'bg-green-300', level: 3 },
  { id: 'pri', word: 'פְּרִי', translation: 'Fruit', emoji: '🍇', color: 'bg-purple-300', level: 3 },
  { id: 'ugiya', word: 'עוּגִיָּה', translation: 'Cookie', emoji: '🍪', color: 'bg-amber-200', level: 3 },
  { id: 'glida', word: 'גְּלִידָה', translation: 'Ice Cream', emoji: '🍦', color: 'bg-pink-200', level: 3 },

  // Level 3 — Body (more)
  { id: 'lashon', word: 'לָשׁוֹן', translation: 'Tongue', emoji: '👅', color: 'bg-red-200', level: 3 },
  { id: 'shen', word: 'שֵׁן', translation: 'Tooth', emoji: '🦷', color: 'bg-stone-100', level: 3 },
  { id: 'sear', word: 'שֵׂעָר', translation: 'Hair', emoji: '🦱', color: 'bg-amber-300', level: 3 },
  { id: 'gav', word: 'גַּב', translation: 'Back', emoji: '🧍', color: 'bg-blue-200', level: 3 },
  { id: 'katef', word: 'כָּתֵף', translation: 'Shoulder', emoji: '🤷', color: 'bg-teal-200', level: 3 },

  // Level 3 — Sports & activities
  { id: 'kaduregel', word: 'כַּדּוּרֶגֶל', translation: 'Soccer', emoji: '⚽', color: 'bg-green-200', level: 3 },
  { id: 'sechiya', word: 'שְׂחִיָּה', translation: 'Swimming', emoji: '🏊', color: 'bg-blue-300', level: 3 },
  { id: 'rikud', word: 'רִיקוּד', translation: 'Dance', emoji: '💃', color: 'bg-rose-300', level: 3 },
  { id: 'musika', word: 'מוּסִיקָה', translation: 'Music', emoji: '🎵', color: 'bg-purple-200', level: 3 },
  { id: 'tziyur', word: 'צִיּוּר', translation: 'Drawing', emoji: '🖍️', color: 'bg-yellow-200', level: 3 },

  // Level 3 — Tools & objects
  { id: 'patish', word: 'פַּטִּיש', translation: 'Hammer', emoji: '🔨', color: 'bg-gray-200', level: 3 },
  { id: 'masmer', word: 'מַסְמֵר', translation: 'Nail', emoji: '🔩', color: 'bg-stone-200', level: 3 },
  { id: 'chevel', word: 'חֶבֶל', translation: 'Rope', emoji: '🪢', color: 'bg-amber-200', level: 3 },
  { id: 'magnet', word: 'מַגְנֵט', translation: 'Magnet', emoji: '🧲', color: 'bg-red-300', level: 3 },
  { id: 'shaon', word: 'שָׁעוֹן', translation: 'Clock', emoji: '⏰', color: 'bg-sky-200', level: 3 },

  // Level 3 — Holidays & celebrations
  { id: 'chag', word: 'חַג', translation: 'Holiday', emoji: '🎉', color: 'bg-pink-200', level: 3 },
  { id: 'matana', word: 'מַתָּנָה', translation: 'Gift', emoji: '🎁', color: 'bg-red-200', level: 3 },
  { id: 'ner', word: 'נֵר', translation: 'Candle', emoji: '🕯️', color: 'bg-yellow-200', level: 3 },
  { id: 'balon', word: 'בַּלּוֹן', translation: 'Balloon', emoji: '🎈', color: 'bg-blue-200', level: 3 },
  { id: 'mesiba', word: 'מְסִבָּה', translation: 'Party', emoji: '🎊', color: 'bg-fuchsia-200', level: 3 },
];

export const WORDS_PER_STAGE = 10;

export function shuffleList<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function wordsForLevel(level: 1 | 2 | 3): Word[] {
  return WORDS.filter(w => w.level === level);
}

export function pickStageWords(level: 1 | 2 | 3, count = WORDS_PER_STAGE): Word[] {
  const pool = wordsForLevel(level);
  return shuffleList(pool).slice(0, Math.min(count, pool.length));
}
