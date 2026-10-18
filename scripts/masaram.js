// ===========================
// scripts/masaram.js
// ===========================
window.SCRIPT_ENGINES = window.SCRIPT_ENGINES || {};
window.SCRIPT_MAPPINGS = window.SCRIPT_MAPPINGS || {};

const rawMasaram = {
    // === 1. VOWELS (स्वर) ===
    vowels: {
        'a': { symbol: '𑴀', hindi: 'अ', english: 'a' },
        'aa': { symbol: '𑴁', hindi: 'आ' },
        'i': { symbol: '𑴂', hindi: 'इ' },
        'ii': { symbol: '𑴃', hindi: 'ई' },
        'u': { symbol: '𑴄', hindi: 'उ' },
        'uu': { symbol: '𑴅', hindi: 'ऊ' },
        'e': { symbol: '𑴆', hindi: 'ए' },
        'ai': { symbol: '𑴈', hindi: 'ऐ' },
        'o': { symbol: '𑴉', hindi: 'ओ' },
        'au': { symbol: '𑴋', hindi: 'औ' },
        'ang': { symbol: '𑴀𑵀', hindi: 'अं' },
        'ah': { symbol: '𑴀𑵁', hindi: 'अः' },
    },

    // === 2. MATRAS & MODIFIERS (मात्राएँ) ===
    matras: {
        'a':  { symbol: '', hindi: '' },         // Full letter (removes Halant)
        'aa': { symbol: '𑴱', hindi: 'ा' }, 
        'i':  { symbol: '𑴲', hindi: 'ि' },
        'ii': { symbol: '𑴳', hindi: 'ी' },
        'u':  { symbol: '𑴴', hindi: 'ु' },
        'uu': { symbol: '𑴵', hindi: 'ू' },
        'U':  { symbol: '𑴵', hindi: 'ू' },
        'e':  { symbol: '𑴺', hindi: 'े' },
        'ai': { symbol: '𑴼', hindi: 'ै' },
        'o':  { symbol: '𑴽', hindi: 'ो' },
        'au': { symbol: '𑴿', hindi: 'ौ' },
        
        // Corrected Modifiers
        'M':  { symbol: '𑵀', hindi: 'ं' }, 
        'H':  { symbol: '𑵁', hindi: 'ः' },
        'MM': { symbol: '𑵃', hindi: 'ँ' },
        'ra': { symbol: '𑵇', hindi: '्र' },      // Ra-kara
        'r':  { symbol: '𑵆', hindi: 'र्' },      // Repha
        'ri': { symbol: '𑵇𑴲', hindi: 'ृ' }     // Fixed: Combined Rakara + Matra I (e.g. kri = 𑴌𑵇𑴲)
    },

    // === 3. BASE CONSONANTS (व्यंजन - Base Form) ===
    baseConsonants: {
        'k': { symbol: '𑴌', hindi: 'क' },
        'kh': { symbol: '𑴍', hindi: 'ख' },
        'g': { symbol: '𑴎', hindi: 'ग' },
        'gh': { symbol: '𑴏', hindi: 'घ' },
        'F': { symbol: '𑴐', hindi: 'ड़' },

        'c': { symbol: '𑴑', hindi: 'च' },
        'ch': { symbol: '𑴒', hindi: 'छ' },
        'j': { symbol: '𑴓', hindi: 'ज' },
        'jh': { symbol: '𑴔', hindi: 'झ' },
        'Y': { symbol: '𑴕', hindi: 'ञ' },

        'T': { symbol: '𑴖', hindi: 'ट' },
        'Th': { symbol: '𑴗', hindi: 'ठ' },
        'D': { symbol: '𑴘', hindi: 'ड' },
        'Dh': { symbol: '𑴙', hindi: 'ढ' },
        'N': { symbol: '𑴚', hindi: 'ण' },

        't': { symbol: '𑴛', hindi: 'त' },
        'th': { symbol: '𑴜', hindi: 'थ' },
        'd': { symbol: '𑴝', hindi: 'द' },
        'dh': { symbol: '𑴞', hindi: 'ध' },
        'n': { symbol: '𑴟', hindi: 'न' },

        'p': { symbol: '𑴠', hindi: 'प' },
        'ph': { symbol: '𑴡', hindi: 'फ' },
        'b': { symbol: '𑴢', hindi: 'ब' },
        'bh': { symbol: '𑴣', hindi: 'भ' },
        'm': { symbol: '𑴤', hindi: 'म' },

        'y': { symbol: '𑴥', hindi: 'य' },
        'r': { symbol: '𑴦', hindi: 'र' },
        'l': { symbol: '𑴧', hindi: 'ल' },
        'v': { symbol: '𑴨', hindi: 'व' },
        'w': { symbol: '𑴨', hindi: 'व' },

        'sh': { symbol: '𑴩', hindi: 'श' },
        'S': { symbol: '𑴪', hindi: 'ष' },
        's': { symbol: '𑴫', hindi: 'स' },
        'h': { symbol: '𑴬', hindi: 'ह' },
        'L': { symbol: '𑴭', hindi: 'ळ' },
        
        // Conjuncts
        'x': { symbol: '𑴮', hindi: 'क्ष' },
        'Z': { symbol: '𑴰', hindi: 'त्र' },
        'X': { symbol: '𑴯', hindi: 'ज्ञ' },
        
        // Nuqta
        'f': { symbol: '𑴡𑵂', hindi: 'फ़' },
        'z': { symbol: '𑴓𑵂', hindi: 'ज़' },
        'q': { symbol: '𑴌𑵂', hindi: 'क़' }
        
    },

    // === 4. NUMBERS (संख्या) ===
    numbers: {
        '0': { symbol: '𑵐', hindi: '०' },
        '1': { symbol: '𑵑', hindi: '१' },
        '2': { symbol: '𑵒', hindi: '२' },
        '3': { symbol: '𑵓', hindi: '३' },
        '4': { symbol: '𑵔', hindi: '४' },
        '5': { symbol: '𑵕', hindi: '५' },
        '6': { symbol: '𑵖', hindi: '६' },
        '7': { symbol: '𑵗', hindi: '७' },
        '8': { symbol: '𑵘', hindi: '८' },
        '9': { symbol: '𑵙', hindi: '९' }
    }
};

// ==========================================
// DYNAMIC MERGER FOR CONSONANTS & MATRAS
// ==========================================
const generatedConsonants = {};
const halantGondi = '𑵄';
const halantHindi = '्';

const raKara = rawMasaram.matras.ra;

if (raKara) {
    for (let [consKey, consData] of Object.entries(rawMasaram.baseConsonants)) {

        // consonant + ra + matra
        for (let [matraKey, matraData] of Object.entries(rawMasaram.matras)) {

            if (matraKey === 'ra' || matraKey === 'r') {
                continue;
            }

            const combinedKey = consKey + 'r' + matraKey;

            generatedConsonants[combinedKey] = {
                symbol: consData.symbol + raKara.symbol + matraData.symbol,
                hindi: consData.hindi + '्र' + matraData.hindi,
                english: combinedKey
            };
        }
    }
}

for (let [consKey, consData] of Object.entries(rawMasaram.baseConsonants)) {
    // 1. Standalone / Half Consonant (e.g. 'k' -> '𑴌𑵄')
    generatedConsonants[consKey] = {
        symbol: consData.symbol + halantGondi,
        hindi: consData.hindi + halantHindi,
        english: consKey
    };

    // 2. Consonant + Matras Combination (e.g. 'kri' -> '𑴌𑵇𑴲')
    for (let [matraKey, matraData] of Object.entries(rawMasaram.matras)) {
        let combinedKey = consKey + matraKey; 
        
        generatedConsonants[combinedKey] = {
            symbol: consData.symbol + matraData.symbol,
            hindi: consData.hindi + matraData.hindi,
            english: combinedKey
        };
    }
}

// Global scope me assign karo
window.SCRIPT_MAPPINGS.masaram = {
    vowels: rawMasaram.vowels,
    matras: rawMasaram.matras,

    // IMPORTANT:
    // Base consonants for Typing Guide
    baseConsonants: rawMasaram.baseConsonants,

    // Generated consonants for typing/transliteration
    consonants: generatedConsonants,

    numbers: rawMasaram.numbers
};

class MasaramEngine {
    constructor() {
        this.flatMap = this.buildFlatMap();
        this.reverseMap = this.buildReverseMap();
        this.reverseSymbols = Object.keys(this.reverseMap).sort((a, b) => b.length - a.length);
    }

    buildFlatMap() {
        let map = {};
        const orderedCategories = ['matras', 'vowels', 'consonants', 'numbers'];
        for (let category of orderedCategories) {
            if (window.SCRIPT_MAPPINGS.masaram[category]) {
                for (let key in window.SCRIPT_MAPPINGS.masaram[category]) {
                    const item = window.SCRIPT_MAPPINGS.masaram[category][key];
                    if (typeof item === 'object') map[key] = { char: item.symbol, hindi: item.hindi || '' };
                }
            }
        }
        return map;
    }

    buildReverseMap() {
        const reverse = {};
        for (const key in this.flatMap) {
            const item = this.flatMap[key];
            if (item && item.char) reverse[item.char] = { hindi: item.hindi || "" };
        }
        return reverse;
    }

    translate(text) {
        let tokens = [];
        let currentGondiWord = "";
        let currentHindiWord = "";
        let i = 0;
        const halantGondi = '𑵄';
        const halantHindi = '्';

        const flushWord = (removeFinalHalant = false) => {
            if (currentGondiWord.length === 0) return;
            let finalGondi = currentGondiWord;
            let finalHindi = currentHindiWord;

            if (removeFinalHalant) {
                if (finalGondi.endsWith(halantGondi)) finalGondi = finalGondi.slice(0, -halantGondi.length);
                if (finalHindi.endsWith(halantHindi)) finalHindi = finalHindi.slice(0, -halantHindi.length);
            }

            tokens.push({ type: 'word', gondi: finalGondi, hindi: finalHindi });
            currentGondiWord = ""; currentHindiWord = "";
        };

        while (i < text.length) {
            if (text[i] === " ") { flushWord(true); tokens.push({ type: 'space', gondi: " ", hindi: " " }); i++; continue; }
            if (text[i] === "\n") { flushWord(true); tokens.push({ type: 'newline', gondi: "\n", hindi: "\n" }); i++; continue; }

            let reverseMatch = this.reverseSymbols.find(sym => text.startsWith(sym, i));
            if (reverseMatch) {
                currentGondiWord += reverseMatch;
                currentHindiWord += this.reverseMap[reverseMatch].hindi;
                i += reverseMatch.length;
                continue;
            }

            let matchFound = false;
            for (let len = 4; len >= 1; len--) {
                if (i + len <= text.length) {
                    const chunk = text.substring(i, i + len);
                    if (this.flatMap[chunk]) {
                        currentGondiWord += this.flatMap[chunk].char;
                        currentHindiWord += this.flatMap[chunk].hindi;
                        i += len; matchFound = true; break;
                    }
                }
            }
            if (!matchFound) { currentGondiWord += text[i]; currentHindiWord += text[i]; i++; }
        }
        flushWord(true);
        return tokens;
    }
}
window.SCRIPT_ENGINES.masaram = new MasaramEngine();