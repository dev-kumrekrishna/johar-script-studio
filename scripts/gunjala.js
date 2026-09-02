// ===========================
// scripts/gunjala.js
// ===========================

window.SCRIPT_MAPPINGS = window.SCRIPT_MAPPINGS || {};

const rawGunjala = {
    // === 1. VOWELS (स्वर) ===
    vowels: {
        'a': { symbol: '𑵠', hindi: 'अ', english: 'a' },
        'aa': { symbol: '𑵡', hindi: 'आ' },
        'i': { symbol: '𑵢', hindi: 'इ' },
        'ii': { symbol: '𑵣', hindi: 'ई' },
        'u': { symbol: '𑵤', hindi: 'उ' },
        'uu': { symbol: '𑵥', hindi: 'ऊ' },
        'e': { symbol: '𑵧', hindi: 'ए' },
        'ai': { symbol: '𑵨', hindi: 'ऐ' },
        'o': { symbol: '𑵪', hindi: 'ओ' },
        'au': { symbol: '𑵫', hindi: 'औ' }
    },

    // === 2. MATRAS (मात्राएँ) ===
    matras: {
        'a':  { symbol: '', hindi: '' },
        'aa': { symbol: '𑶊', hindi: 'ा' },
        'i':  { symbol: '𑶋', hindi: 'ि' },
        'ii': { symbol: '𑶌', hindi: 'ी' },
        'I':  { symbol: '𑶌', hindi: 'ी' },
        'u':  { symbol: '𑶍', hindi: 'ु' },
        'uu': { symbol: '𑶎', hindi: 'ू' },
        'e':  { symbol: '𑶐', hindi: 'े' },
        'ai': { symbol: '𑶑', hindi: 'ै' },
        'o':  { symbol: '𑶓', hindi: 'ो' },
        'au': { symbol: '𑶔', hindi: 'ौ' },
        'M':  { symbol: '𑶕', hindi: 'ं' },
      'H':  { symbol: '𑶖', hindi: 'ः' },
      'vir': { symbol: '𑶗', hindi: '्' },
    },

    // === 3. BASE CONSONANTS (व्यंजन) ===
    baseConsonants: {
        'k': { symbol: '𑵱', hindi: 'क' },
        'kh': { symbol: '𑵲', hindi: 'ख' },
        'g': { symbol: '𑵶', hindi: 'ग' },
        'gh': { symbol: '𑵷', hindi: 'घ' },
        'ng': { symbol: '𑶄', hindi: 'ङ' },

        'c': { symbol: '𑵻', hindi: 'च' },
        'ch': { symbol: '𑵼', hindi: 'छ' },
        'j': { symbol: '𑶀', hindi: 'ज' },
        'jh': { symbol: '𑶁', hindi: 'झ' },

        'T': { symbol: '𑵽', hindi: 'ट' },
        'Th': { symbol: '𑵾', hindi: 'ठ' },
        'D': { symbol: '𑶂', hindi: 'ड' },
        'Dh': { symbol: '𑶃', hindi: 'ढ' },

        't': { symbol: '𑵳', hindi: 'त' },
        'th': { symbol: '𑵴', hindi: 'थ' },
        'd': { symbol: '𑵸', hindi: 'द' },
        'dh': { symbol: '𑵹', hindi: 'ध' },
        'n': { symbol: '𑵺', hindi: 'न' },

        'p': { symbol: '𑶅', hindi: 'प' },
        'ph': { symbol: '𑶆', hindi: 'फ' },
        'b': { symbol: '𑵮', hindi: 'ब' },
        'bh': { symbol: '𑵯', hindi: 'भ' },
        'm': { symbol: '𑵰', hindi: 'म' },

        'y': { symbol: '𑵬', hindi: 'य' },
        'r': { symbol: '𑶈', hindi: 'र' },
        'l': { symbol: '𑵵', hindi: 'ल' },
        'v': { symbol: '𑵭', hindi: 'व' },
        'w': { symbol: '𑵭', hindi: 'व' },

        's': { symbol: '𑶉', hindi: 'स' },
        'h': { symbol: '𑶇', hindi: 'ह' },
        'L': { symbol: '𑵿', hindi: 'ळ' }
    },

    // === 4. NUMBERS (संख्या) ===
    numbers: {
        '0': { symbol: '𑶠', hindi: '०' },
        '1': { symbol: '𑶡', hindi: '१' },
        '2': { symbol: '𑶢', hindi: '२' },
        '3': { symbol: '𑶣', hindi: '३' },
        '4': { symbol: '𑶤', hindi: '४' },
        '5': { symbol: '𑶥', hindi: '५' },
        '6': { symbol: '𑶦', hindi: '६' },
        '7': { symbol: '𑶧', hindi: '७' },
        '8': { symbol: '𑶨', hindi: '८' },
        '9': { symbol: '𑶩', hindi: '९' }
    }
};

// Dynamic Consonant + Halant / Matra merger for Gunjala
const generatedGunjalaConsonants = {};
const gunjalaVirama = '𑶗'; // Gunjala specific halant/virama

for (let [consKey, consData] of Object.entries(rawGunjala.baseConsonants)) {
    // Half consonant with Virama
    generatedGunjalaConsonants[consKey] = {
        symbol: consData.symbol + gunjalaVirama,
        hindi: consData.hindi + '्',
        english: consKey
    };

    // Full consonant with 'a'
    generatedGunjalaConsonants[consKey] = {
    symbol: consData.symbol,
    hindi: consData.hindi + '्',
    english: consKey
};
generatedGunjalaConsonants[consKey + 'a'] = {
    symbol: consData.symbol,
    hindi: consData.hindi,
    english: consKey + 'a'
};

    // Consonant + Matras
    for (let [matraKey, matraData] of Object.entries(rawGunjala.matras)) {
        if (matraKey === 'a') continue;
        let combinedKey = consKey + matraKey;
        generatedGunjalaConsonants[combinedKey] = {
            symbol: consData.symbol + matraData.symbol,
            hindi: consData.hindi + matraData.hindi,
            english: combinedKey
        };
    }
}

window.SCRIPT_MAPPINGS.gunjala = {
    vowels: rawGunjala.vowels,
    matras: rawGunjala.matras,

    // IMPORTANT:
    // Base consonants for Typing Guide
    baseConsonants: rawGunjala.baseConsonants,

    // Generated consonants for typing/transliteration
    consonants: generatedGunjalaConsonants,

    numbers: rawGunjala.numbers
};