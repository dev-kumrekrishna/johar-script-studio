// ===========================
// scripts/olchiki.js
// ===========================

window.SCRIPT_MAPPINGS = window.SCRIPT_MAPPINGS || {};

const rawOlChiki = {
    // === 1. VOWELS (स्वर - TYPING GUIDE KE LIYE) ===
    // Yahan single letters ka actual pronunciation (phonetic name) likha hai
    vowels: {
        'a':  { symbol: 'ᱚ', hindi: 'अ', english: 'a' },
        'aa': { symbol: 'ᱟ', hindi: 'आक्', english: 'aak' },
        'i':  { symbol: 'ᱤ', hindi: 'इ', english: 'i' },
        'u':  { symbol: 'ᱩ', hindi: 'उ', english: 'u' },
        'e':  { symbol: 'ᱮ', hindi: 'ए', english: 'e' },
        'o':  { symbol: 'ᱳ', hindi: 'ओ', english: 'o' }
    },

    // Ol Chiki mein dependent matras nahi hoti, isliye isko khali rakhein
    matras: {},

    // === 3. BASE CONSONANTS (व्यंजन - TYPING GUIDE KE LIYE) ===
    // Yahan single letters ka phonetic meaning hai (jaise aaj, ih, ir)
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
        
        
        
        // Baaki bache hue characters ko bhi is list mein add kar sakte hain
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
    // Vowel Overrides
    'a':  { symbol: 'ᱚ', hindi: 'अ' },
    'aa': { symbol: 'ᱟ', hindi: 'ा' },
    'i':  { symbol: 'ᱤ', hindi: 'ि' },
    'u':  { symbol: 'ᱩ', hindi: 'ु' },
    'e':  { symbol: 'ᱮ', hindi: 'े' },
    'o':  { symbol: 'ᱳ', hindi: 'ो' },
    'M':  { symbol: 'ᱝ', hindi: 'ं' },
    'oH':  { symbol: 'ᱷ', hindi: 'ः' },
    
    // Consonant Overrides (Taki 'j' dabane par 'अज्' ki jagah 'ज' type ho)
    'k': { symbol: 'ᱠ', hindi: 'क' },
    'kh': { symbol: 'ᱠᱷ', hindi: 'ख' },
    'g': { symbol: 'ᱜ', hindi: 'ग' },
    'g': { symbol: 'ᱜᱷ', hindi: 'घ' },

    'c': { symbol: 'ᱪ', hindi: 'च' },
    'ch': { symbol: 'ᱪᱷ', hindi: 'छ' },
    'j': { symbol: 'ᱡ', hindi: 'ज' },
    'jh': { symbol: 'ᱡᱷ', hindi: 'झ' },
    'ny':{ symbol: 'ᱧ', hindi: 'ञ' },

    'T': { symbol: 'ᱴ', hindi: 'ट' },
    'Th': { symbol: 'ᱴᱷ', hindi: 'ठ' },
    'D': { symbol: 'ᱰ', hindi: 'ड' },
    'Dh': { symbol: 'ᱰᱷ', hindi: 'ढ' },
    'N': { symbol: 'ᱬ', hindi: 'ण' },

    't': { symbol: 'ᱛ', hindi: 'त' },
    'th': { symbol: 'ᱛᱷ', hindi: 'थ' },
    'd': { symbol: 'ᱫ', hindi: 'द' },
    'dh': { symbol: 'ᱫᱷ', hindi: 'ध' },
    'n': { symbol: 'ᱱ', hindi: 'न' },

    'p': { symbol: 'ᱯ', hindi: 'प' },
    'ph': { symbol: 'ᱯᱷ', hindi: 'फ' },
    'b': { symbol: 'ᱵ', hindi: 'ब' },
    'bh': { symbol: 'ᱵᱷ', hindi: 'भ' },
    'm': { symbol: 'ᱢ', hindi: 'म' },

    'y': { symbol: 'ᱭ', hindi: 'य' },
    'r': { symbol: 'ᱨ', hindi: 'र' },
    'l': { symbol: 'ᱞ', hindi: 'ल' },
    'w': { symbol: 'ᱣ', hindi: 'व' },
    
    's': { symbol: 'ᱥ', hindi: 'स' },
    'h': { symbol: 'ᱦ', hindi: 'ह' },
    'R': { symbol: 'ᱲ', hindi: 'ड़' },

    
    
    
    
    
    
    
    
};

window.SCRIPT_MAPPINGS.olchiki = {
    vowels: rawOlChiki.vowels,            // UI Guide me show hoga
    matras: rawOlChiki.matras,
    baseConsonants: rawOlChiki.baseConsonants, // UI Guide me show hoga
    consonants: translationOverrides,     // Translate engine me merge hokar purane values ko replace karega
    numbers: rawOlChiki.numbers
};
