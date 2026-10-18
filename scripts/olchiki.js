// ===========================
// scripts/olchiki.js
// ===========================

window.SCRIPT_MAPPINGS = window.SCRIPT_MAPPINGS || {};
window.SCRIPT_ENGINES = window.SCRIPT_ENGINES || {};

const rawOlChiki = {
    // === 1. VOWELS (स्वर - TYPING GUIDE KE LIYE) ===
       vowels: {
        'a':  { symbol: 'ᱚ', hindi: 'अ', english: 'a' },
        'aa': { symbol: 'ᱟ', hindi: 'आक्', english: 'aak' },
        'i':  { symbol: 'ᱤ', hindi: 'इ', english: 'i' },
        'ii': { symbol: 'ᱤ', hindi: 'ई', english: 'ii' }, 
        'u':  { symbol: 'ᱩ', hindi: 'उ', english: 'u' },
        'uu': { symbol: 'ᱩ', hindi: 'ऊ', english: 'uu' },
        'e':  { symbol: 'ᱮ', hindi: 'ए', english: 'e' },
        'ei': { symbol: 'ᱮ', hindi: 'ऐ', english: 'ei' },
        'o':  { symbol: 'ᱳ', hindi: 'ओ', english: 'o' },
        'ou': { symbol: 'ᱳ', hindi: 'औ', english: 'ou' } 
    },
    matras: {},

    // === 3. BASE CONSONANTS (व्यंजन - TYPING GUIDE KE LIYE) ===
        baseConsonants: {
        't': { symbol: 'ᱛ', hindi: 'अत्', english: 'at' },
        'g': { symbol: 'ᱜ', hindi: 'अग्', english: 'ag' },
        'M': { symbol: 'ᱝ', hindi: 'अग्', english: 'ang' },
        'l': { symbol: 'ᱞ', hindi: 'अल्', english: 'al' },
        'k': { symbol: 'ᱠ', hindi: 'आक्', english: 'aak' },
        'j': { symbol: 'ᱡ', hindi: 'अज्', english: 'aaj' },
        'm': { symbol: 'ᱢ', hindi: 'आम्', english: 'aam' },
        'w': { symbol: 'ᱣ', hindi: 'आव्', english: 'aaw' },
        's': { symbol: 'ᱥ', hindi: 'इस्', english: 'is' },
        'h': { symbol: 'ᱦ', hindi: 'इह्', english: 'ih' },
        'ny':{ symbol: 'ᱧ', hindi: 'इञ्', english: 'inj' },
        'r': { symbol: 'ᱨ', hindi: 'इर्', english: 'ir' },
        'c': { symbol: 'ᱪ', hindi: 'उच्', english: 'uch' },
        'd': { symbol: 'ᱫ', hindi: 'उद्', english: 'ud' },
        'N': { symbol: 'ᱬ', hindi: 'उण्', english: 'ur' },
        'y': { symbol: 'ᱭ', hindi: 'उय्', english: 'uy' },
        'p': { symbol: 'ᱯ', hindi: 'एप्', english: 'ep' },
        'D': { symbol: 'ᱰ', hindi: 'एड्', english: 'ed' },
        'n': { symbol: 'ᱱ', hindi: 'एन्', english: 'en' },
        'R': { symbol: 'ᱲ', hindi: 'एड्', english: 'er' },
        'T': { symbol: 'ᱴ', hindi: 'ओट् ', english: 'ot' },
        'b': { symbol: 'ᱵ', hindi: 'ओब्', english: 'ob' },
        'v': { symbol: 'ᱶ', hindi: 'ओव्', english: 'ov' },
        'H': { symbol: 'ᱷ', hindi: 'ओह्', english: 'oh' },
        'ohod': { symbol: 'ᱽ', hindi: 'ओहद', english: 'ohod' }
    },

    // === 4. NUMBERS (संख्या) ===
    numbers: {
        '0': { symbol: '᱐', hindi: '०' },
        '1': { symbol: '᱑', hindi: '१' },
        '2': { symbol: '᱒', hindi: '२' },
        '3': { symbol: '᱓', hindi: '३' },
        '4': { symbol: '᱔', hindi: '४' },
        '5': { symbol: '᱕', hindi: '५' },
        '6': { symbol: '᱖', hindi: '६' },
        '7': { symbol: '᱗', hindi: '७' },
        '8': { symbol: '᱘', hindi: '८' },
        '9': { symbol: '᱙', hindi: '९' }
    }
};

// ==========================================
// TRANSLATION ENGINE OVERRIDES
// ==========================================
const translationOverrides = {
    'a':  { symbol: 'ᱚ', hindi: 'अ' },
    'AA': { symbol: 'ᱟ', hindi: 'आ' },
    'I':  { symbol: 'ᱤ', hindi: 'इ' },
    'II': { symbol: 'ᱤ', hindi: 'ई ' },
    'U':  { symbol: 'ᱩ', hindi: 'उ' },
    'UU': { symbol: 'ᱩ', hindi: 'ऊ' },
    'E':  { symbol: 'ᱮ', hindi: 'ए' },
    'EI': { symbol: 'ᱮ', hindi: 'ऐ ' },
    'O':  { symbol: 'ᱳ', hindi: 'ओ' },
    'OU': { symbol: 'ᱳ', hindi: 'औ' },
    'AM': { symbol: 'ᱝ', hindi: 'अं' },
    'oH': { symbol: 'ᱷ', hindi: 'अः' },

    'aa': { symbol: 'ᱟ', hindi: 'ा' },
    'i':  { symbol: 'ᱤ', hindi: 'ि' },
    'ii': { symbol: 'ᱤ', hindi: 'ी' },
    'u':  { symbol: 'ᱩ', hindi: 'ु' },
    'uu': { symbol: 'ᱩ', hindi: 'ू' },
    'e':  { symbol: 'ᱮ', hindi: 'े' },
    'ei': { symbol: 'ᱮ', hindi: 'ै' },
    'o':  { symbol: 'ᱳ', hindi: 'ो' },
    'ou': { symbol: 'ᱳ', hindi: 'ौ' },
    'M':  { symbol: 'ᱝ', hindi: 'ं' },
    'H':  { symbol: 'ᱷ', hindi: 'ः' },
    
    'k':  { symbol: 'ᱠ', hindi: 'क' },
    'kh': { symbol: 'ᱠᱷ', hindi: 'ख' },
    'g':  { symbol: 'ᱜ', hindi: 'ग' },
    'gh': { symbol: 'ᱜᱷ', hindi: 'घ' },
    'c':  { symbol: 'ᱪ', hindi: 'च' },
    'ch': { symbol: 'ᱪᱷ', hindi: 'छ' },
    'j':  { symbol: 'ᱡ', hindi: 'ज' },
    'jh': { symbol: 'ᱡᱷ', hindi: 'झ' },
    'ny': { symbol: 'ᱧ', hindi: 'ञ' },
    'T':  { symbol: 'ᱴ', hindi: 'ट' },
    'Th': { symbol: 'ᱴᱷ', hindi: 'ठ' },
    'D':  { symbol: 'ᱰ', hindi: 'ड' },
    'Dh': { symbol: 'ᱰᱷ', hindi: 'ढ' },
    'N':  { symbol: 'ᱬ', hindi: 'ण' },
    't':  { symbol: 'ᱛ', hindi: 'त' },
    'th': { symbol: 'ᱛᱷ', hindi: 'थ' },
    'd':  { symbol: 'ᱫ', hindi: 'द' },
    'dh': { symbol: 'ᱫᱷ', hindi: 'ध' },
    'n':  { symbol: 'ᱱ', hindi: 'न' },
    'p':  { symbol: 'ᱯ', hindi: 'प' },
    'ph': { symbol: 'ᱯᱷ', hindi: 'फ' },
    'b':  { symbol: 'ᱵ', hindi: 'ब' },
    'bh': { symbol: 'ᱵᱷ', hindi: 'भ' },
    'm':  { symbol: 'ᱢ', hindi: 'म' },
    'y':  { symbol: 'ᱭ', hindi: 'य' },
    'r':  { symbol: 'ᱨ', hindi: 'र' },
    'l':  { symbol: 'ᱞ', hindi: 'ल' },
    'w':  { symbol: 'ᱣ', hindi: 'व' },
    's':  { symbol: 'ᱥ', hindi: 'स' },
    'h':  { symbol: 'ᱦ', hindi: 'ह' },
    'R':  { symbol: 'ᱲ', hindi: 'ड़' },
};

window.SCRIPT_MAPPINGS.olchiki = {
    vowels: rawOlChiki.vowels,            
    matras: rawOlChiki.matras,
    baseConsonants: rawOlChiki.baseConsonants, 
    consonants: translationOverrides,     
    numbers: rawOlChiki.numbers
};

// ==========================================
// DYNAMIC MERGER FOR OL CHIKI TRANSLATION
// ==========================================
const hiddenMatras = {
    'a':  { symbol: 'ᱚ', hindi: '' },    
    'aa': { symbol: 'ᱟ', hindi: 'ा' },
    'i':  { symbol: 'ᱤ', hindi: 'ि' },
    'ii': { symbol: 'ᱤ', hindi: 'ी' },
    'u':  { symbol: 'ᱩ', hindi: 'ु' },
    'uu': { symbol: 'ᱩ', hindi: 'ू' },
    'e':  { symbol: 'ᱮ', hindi: 'े' },
    'ei': { symbol: 'ᱮ', hindi: 'ै' },
    'o':  { symbol: 'ᱳ', hindi: 'ो' },
    'ou': { symbol: 'ᱳ', hindi: 'ौ' },
    'aM': { symbol: 'ᱝ', hindi: 'ं' },
    'aH': { symbol: 'ᱷ', hindi: 'ः' },
    'AA': { symbol: 'ᱟ', hindi: 'ा' },
    'I':  { symbol: 'ᱤ', hindi: 'ि' },
    'II': { symbol: 'ᱤ', hindi: 'ी' },
    'U':  { symbol: 'ᱩ', hindi: 'ु' },
    'UU': { symbol: 'ᱩ', hindi: 'ू' },
    'E':  { symbol: 'ᱮ', hindi: 'े' },
    'EI': { symbol: 'ᱮ', hindi: 'ै' },
    'O':  { symbol: 'ᱳ', hindi: 'ो' },
    'OU': { symbol: 'ᱳ', hindi: 'ौ' },
    'M':  { symbol: 'ᱝ', hindi: 'ं' },
    'oH': { symbol: 'ᱷ', hindi: 'ः' }
};

const baseConsonantsForTranslation = {
    'k': { symbol: 'ᱠ', hindi: 'क्' }, 'kh': { symbol: 'ᱠᱷ', hindi: 'ख्' }, 'g': { symbol: 'ᱜ', hindi: 'ग्' }, 'gh': { symbol: 'ᱜᱷ', hindi: 'घ्' },
    'c': { symbol: 'ᱪ', hindi: 'च्' }, 'ch': { symbol: 'ᱪᱷ', hindi: 'छ्' }, 'j': { symbol: 'ᱡ', hindi: 'ज्' }, 'jh': { symbol: 'ᱡᱷ', hindi: 'झ्' }, 'ny': { symbol: 'ᱧ', hindi: 'ञ्' },
    'T': { symbol: 'ᱴ', hindi: 'ट्' }, 'Th': { symbol: 'ᱴᱷ', hindi: 'ठ्' }, 'D': { symbol: 'ᱰ', hindi: 'ड्' }, 'Dh': { symbol: 'ᱰᱷ', hindi: 'ढ्' }, 'N': { symbol: 'ᱬ', hindi: 'ण्' },
    't': { symbol: 'ᱛ', hindi: 'त्' }, 'th': { symbol: 'ᱛᱷ', hindi: 'थ्' }, 'd': { symbol: 'ᱫ', hindi: 'द्' }, 'dh': { symbol: 'ᱫᱷ', hindi: 'ध्' }, 'n': { symbol: 'ᱱ', hindi: 'न्' },
    'p': { symbol: 'ᱯ', hindi: 'प्' }, 'ph': { symbol: 'ᱯᱷ', hindi: 'फ्' }, 'b': { symbol: 'ᱵ', hindi: 'ब्' }, 'bh': { symbol: 'ᱵᱷ', hindi: 'भ्' }, 'm': { symbol: 'ᱢ', hindi: 'म्' },
    'y': { symbol: 'ᱭ', hindi: 'य्' }, 'r': { symbol: 'ᱨ', hindi: 'र्' }, 'l': { symbol: 'ᱞ', hindi: 'ल्' }, 'w': { symbol: 'ᱣ', hindi: 'व्' },
    's': { symbol: 'ᱥ', hindi: 'स्' }, 'h': { symbol: 'ᱦ', hindi: 'ह्' }, 'R': { symbol: 'ᱲ', hindi: 'ड़्' }
};

const generatedOlChikiConsonants = {};

for (let [consKey, consData] of Object.entries(baseConsonantsForTranslation)) {
    let baseHindiClean = consData.hindi.replace('्', ''); 
    generatedOlChikiConsonants[consKey] = {
        symbol: consData.symbol,
        hindi: baseHindiClean, 
        english: consKey
    };

    for (let [matraKey, matraData] of Object.entries(hiddenMatras)) {
        let combinedKey = consKey + matraKey; 
        generatedOlChikiConsonants[combinedKey] = {
            symbol: consData.symbol + matraData.symbol,
            hindi: baseHindiClean + matraData.hindi,
            english: combinedKey
        };
    }
}

class OlChikiEngine {
    constructor() {
        this.flatMap = this.buildFlatMap();
        this.contextualReverse = this.buildContextualReverseMap();
    }

    buildFlatMap() {
        let map = {};
        const orderedCategories = ['matras', 'vowels', 'consonants', 'numbers'];
        for (let category of orderedCategories) {
            if (window.SCRIPT_MAPPINGS.olchiki[category]) {
                for (let key in window.SCRIPT_MAPPINGS.olchiki[category]) {
                    const item = window.SCRIPT_MAPPINGS.olchiki[category][key];
                    if (typeof item === 'object') map[key] = { char: item.symbol, hindi: item.hindi || '' };
                }
            }
        }
        return map;
    }

    buildContextualReverseMap() {
        return {
            consonants: {
                'ᱠᱷ': 'ख', 'ᱜᱷ': 'घ', 'ᱪᱷ': 'छ', 'ᱡᱷ': 'झ',
                'ᱴᱷ': 'ठ', 'ᱰᱷ': 'ढ', 'ᱛᱷ': 'थ', 'ᱫᱷ': 'ध',
                'ᱯᱷ': 'फ', 'ᱵᱷ': 'भ', 
                'ᱠ': 'क', 'ᱜ': 'ग', 'ᱝ': 'ं', 'ᱞ': 'ल',
                'ᱪ': 'च', 'ᱡ': 'ज', 'ᱢ': 'म', 'ᱣ': 'व',
                'ᱥ': 'स', 'ᱦ': 'ह', 'ᱧ': 'ञ', 'ᱨ': 'र',
                'ᱰ': 'ड', 'ᱬ': 'ण', 'ᱭ': 'य', 'ᱯ': 'प',
                'ᱱ': 'न', 'ᱲ': 'ड़', 'ᱴ': 'ट', 'ᱵ': 'ब',
                'ᱶ': 'व', 'ᱷ': 'ः', 'ᱽ': '्'
            },
            vowels: {
                'ᱚ': { indep: 'अ', matra: '' },
                'ᱟ': { indep: 'आ', matra: 'ा' },
                'ᱤ': { indep: 'इ', matra: 'ि' },
                'ᱩ': { indep: 'उ', matra: 'ु' },
                'ᱮ': { indep: 'ए', matra: 'े' },
                'ᱳ': { indep: 'ओ', matra: 'ो' }
            },
            numbers: {
                '᱐': '०', '᱑': '१', '᱒': '२', '᱓': '३', '᱔': '४',
                '᱕': '५', '᱖': '६', '᱗': '७', '᱘': '८', '᱙': '९'
            }
        };
    }

    translate(text) {
        let tokens = [];
        let currentGondiWord = "";
        let currentHindiWord = "";
        let i = 0;
        let lastType = null; // State tracker: 'consonant', 'vowel', or null

        const flushWord = () => {
            if (currentGondiWord.length === 0) return;
            tokens.push({ type: 'word', gondi: currentGondiWord, hindi: currentHindiWord });
            currentGondiWord = ""; currentHindiWord = "";
            lastType = null;
        };

        // Longest valid match first configuration
        const sortedConsonants = Object.keys(this.contextualReverse.consonants).sort((a, b) => b.length - a.length);

        while (i < text.length) {
            // Numbers, spaces, and punctuation bypass mapping
            if (text[i] === " " || text[i] === "\n") { 
                flushWord(); 
                tokens.push({ type: text[i] === " " ? 'space' : 'newline', gondi: text[i], hindi: text[i] }); 
                i++; 
                continue; 
            }

            let matched = false;

            // 1. REVERSE MAPPING (Pasted Ol Chiki text Contextual Logic)
            for (const sym of sortedConsonants) {
                if (text.startsWith(sym, i)) {
                    currentGondiWord += sym;
                    currentHindiWord += this.contextualReverse.consonants[sym];
                    lastType = 'consonant';
                    i += sym.length;
                    matched = true;
                    break;
                }
            }
            if (matched) continue;

            const char = text[i];

            // Context-Aware Vowels (Rule A, Rule B, Rule C)
            if (this.contextualReverse.vowels[char]) {
                currentGondiWord += char;
                if (lastType === 'consonant') {
                    // Rule B: Vowel after Consonant = Matra
                    currentHindiWord += this.contextualReverse.vowels[char].matra;
                } else {
                    // Rule A & C: Vowel at beginning or after another Vowel = Independent
                    currentHindiWord += this.contextualReverse.vowels[char].indep;
                }
                lastType = 'vowel';
                i++;
                continue;
            }

            if (this.contextualReverse.numbers[char]) {
                currentGondiWord += char;
                currentHindiWord += this.contextualReverse.numbers[char];
                lastType = null;
                i++;
                continue;
            }

            // 2. FORWARD MAPPING (Typed English Logic)
            for (let len = 4; len >= 1; len--) {
                if (i + len <= text.length) {
                    const chunk = text.substring(i, i + len);
                    if (this.flatMap[chunk]) {
                        const generatedOlChikiSym = this.flatMap[chunk].char;
                        currentGondiWord += generatedOlChikiSym;
                        currentHindiWord += this.flatMap[chunk].hindi;
                        
                        // Maintain correct state even during forward typing
                        const lastRenderedChar = generatedOlChikiSym.slice(-1);
                        if (this.contextualReverse.vowels[lastRenderedChar]) {
                            lastType = 'vowel';
                        } else if (Object.keys(this.contextualReverse.consonants).includes(lastRenderedChar)) {
                            lastType = 'consonant';
                        } else {
                            lastType = null;
                        }

                        i += len;
                        matched = true;
                        break;
                    }
                }
            }
            if (matched) continue;

            // 3. UNKNOWN CHARACTER
            currentGondiWord += char;
            currentHindiWord += char;
            lastType = null;
            i++;
        }
        flushWord();
        return tokens;
    }
}
window.SCRIPT_ENGINES.olchiki = new OlChikiEngine();