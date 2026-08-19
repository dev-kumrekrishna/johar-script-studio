// ===========================
// js/masaram.js
// ===========================

const SCRIPT_MAPPINGS = {
    masaram: {
        // === 1. VOWELS (स्वर) ===
        vowels: {
            'a': { symbol: '𑴀', hindi: 'अ', english: 'a' },
            'aa': { symbol: '𑴁', hindi: 'आ' },
            'A': { symbol: '𑴁', hindi: 'आ' },
            'i': { symbol: '𑴂', hindi: 'इ' },
            'ii': { symbol: '𑴃', hindi: 'ई' },
            'I': { symbol: '𑴃', hindi: 'ई' },
            'u': { symbol: '𑴄', hindi: 'उ' },
            'uu': { symbol: '𑴅', hindi: 'ऊ' },
            'U': { symbol: '𑴅', hindi: 'ऊ' },
            'e': { symbol: '𑴆', hindi: 'ए' },
            'ai': { symbol: '𑴈', hindi: 'ऐ' },
            'o': { symbol: '𑴉', hindi: 'ओ' },
            'au': { symbol: '𑴋', hindi: 'औ' }
        },

        // === 2. MATRAS & MODIFIERS (मात्राएँ) ===
        matras: {
            '𑵄a':  '',
            '𑵄A':  { symbol: '𑴱', hindi: 'ा' }, // ा
            '𑵄i':  { symbol: '𑴲', hindi: 'ि' }, // ि
            '𑵄I':  { symbol: '𑴳', hindi: 'ी' },// ी
            '𑵄u':  { symbol: '𑴴', hindi: 'ु' },// ु
            '𑵄U':  { symbol: '𑴵', hindi: 'ू' },// ू
            '𑵄e':  { symbol: '𑴺', hindi: 'े' },// े
            '𑵄ai':  { symbol: '𑴼', hindi: 'ै' },// ै
            '𑵄o':  { symbol: '𑴲', hindi: 'ो' },// ो
            '𑵄au':  { symbol: '𑴲', hindi: 'ौ' },// ौ
            
            
            
            // Anusvara, Visarga & Halant
            '𑵄M': { symbol: '𑵀', hindi: 'ं' }, 
            'H': { symbol: '𑵁', hindi: 'ः' },
            'MM': { symbol: '𑵃', hindi: 'ँ' },
            '𑵄ra': { symbol: '𑵇', hindi: '्र' },
            '𑵄r': { symbol: '𑵆', hindi: 'र्' },
            '𑵄ri': { symbol: '𑵆 𑵇', hindi: 'ृ' },
           
        },

        // === 3. CONSONANTS (व्यंजन) ===
        consonants: {
            'k': { symbol: '𑴌𑵄', hindi: 'क' },
            'ka': { symbol: '𑴌', hindi: 'क' },
            'kh': { symbol: '𑴍𑵄', hindi: 'ख' },
            'kha': { symbol: '𑴍', hindi: 'ख' },
            'g': { symbol: '𑴎𑵄', hindi: 'ग' },
            'gh': { symbol: '𑴏𑵄', hindi: 'घ' },
            'ng': { symbol: '𑴐𑵄', hindi: 'ङ' },

            'c': { symbol: '𑴑𑵄', hindi: 'च' },
            'ch': { symbol: '𑴑𑵄', hindi: 'च' },
            'chh': { symbol: '𑴒𑵄', hindi: 'छ' },
            'j': { symbol: '𑴓𑵄', hindi: 'ज' },
            'jh': { symbol: '𑴔𑵄', hindi: 'झ' },
            'ny': { symbol: '𑴕𑵄', hindi: 'ञ' },

            'T': { symbol: '𑴖𑵄', hindi: 'ट' },
            'Th': { symbol: '𑴗𑵄', hindi: 'ठ' },
            'D': { symbol: '𑴘𑵄', hindi: 'ड' },
            'Dh': { symbol: '𑴙𑵄', hindi: 'ढ' },
            'N': { symbol: '𑴚𑵄', hindi: 'ण' },

            't': { symbol: '𑴛𑵄', hindi: 'त' },
            'th': { symbol: '𑴜𑵄', hindi: 'थ' },
            'd': { symbol: '𑴝𑵄', hindi: 'द' },
            'dh': { symbol: '𑴞𑵄', hindi: 'ध' },
            'n': { symbol: '𑴟𑵄', hindi: 'न' },

            'p': { symbol: '𑴠𑵄', hindi: 'प' },
            'ph': { symbol: '𑴡𑵄', hindi: 'फ' },
            'f': { symbol: '𑴡𑵂𑵄', hindi: 'फ़' },
            'b': { symbol: '𑴢𑵄', hindi: 'ब' },
            'bh': { symbol: '𑴣𑵄', hindi: 'भ' },
            'm': { symbol: '𑴤𑵄', hindi: 'म' },

            'y': { symbol: '𑴥𑵄', hindi: 'य' },
            'r': { symbol: '𑴦𑵄', hindi: 'र' },
            'l': { symbol: '𑴧𑵄', hindi: 'ल' },
            'v': { symbol: '𑴨𑵄', hindi: 'व' },
            'w': { symbol: '𑴨𑵄', hindi: 'व' },

            'sh': { symbol: '𑴩𑵄', hindi: 'श' },
            'S': { symbol: '𑴪𑵄', hindi: 'ष' },
            's': { symbol: '𑴫𑵄', hindi: 'स' },
            'h': { symbol: '𑴬𑵄', hindi: 'ह' },
            'L': { symbol: '𑴭𑵄', hindi: 'ळ' },
            
            // Conjuncts
            'ksh': { symbol: '𑴮𑵄', hindi: 'क्ष' },
            'x': { symbol: '𑴮𑵄', hindi: 'क्ष' },
            'tr': { symbol: '𑴰𑵄', hindi: 'त्र' },
            'gy': { symbol: '𑴯𑵄', hindi: 'ज्ञ' },
            
            // Nuqta Letters
            'z': { symbol: '𑴓𑵂𑵄', hindi: 'ज़' },
            'q': { symbol: '𑴌𑵂𑵄', hindi: 'क़' }
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
    },
    gunjala: {
        vowels: {},
        matras: {},
        consonants: {},
        numbers: {}
    }
};

// Transliterator Engine ke liye nested object ko single map me convert karna
function generateFlatMap(scriptData) {
    let flatMap = {};
    
    // Har category ke andar se data nikalna
    for (let category in scriptData) {
        for (let key in scriptData[category]) {
            const item = scriptData[category][key];
            if (typeof item === 'object') {
                flatMap[key] = item.symbol;
            } else {
                flatMap[key] = item; // Directly assign raw strings like '𑵄a': ''
            }
        }
    }
    
    // Typing convenience ke liye Vowel merges automatically add karna
    const v = scriptData.vowels;
    if (v) {
        if (v['aa']) flatMap['𑴀a'] = v['aa'].symbol;
        if (v['A'])  flatMap['𑴀A'] = v['A'].symbol;
        if (v['ii']) flatMap['𑴂i'] = v['ii'].symbol;
        if (v['I'])  flatMap['𑴂I'] = v['I'].symbol;
        if (v['uu']) flatMap['𑴄u'] = v['uu'].symbol;
        if (v['U'])  flatMap['𑴄U'] = v['U'].symbol;
        if (v['ai']) {
            flatMap['𑴀i'] = v['ai'].symbol;
            flatMap['𑴆i'] = v['ai'].symbol; // ei -> ai
        }
        if (v['au']) {
            flatMap['𑴀u'] = v['au'].symbol;
            flatMap['𑴉u'] = v['au'].symbol; // ou -> au
        }
    }
    
    return flatMap;
}

const ACTIVE_MAPPINGS = {
    masaram: generateFlatMap(SCRIPT_MAPPINGS.masaram),
    gunjala: generateFlatMap(SCRIPT_MAPPINGS.gunjala)
};

// =============================
// Live Translation Board Logic
// =============================
const visualBoard = document.getElementById("visualBoard");
const editorInputBox = document.getElementById("editorBox");

// 1. Smart Reverse Map Banayein (Jo Halant aur Matra dono ko samjhe)
const REVERSE_MAP = {};
const scriptData = SCRIPT_MAPPINGS.masaram;

// Vowels aur Numbers ko map karein
['vowels', 'numbers'].forEach(category => {
    if (scriptData[category]) {
        for (const [engKey, data] of Object.entries(scriptData[category])) {
            if (data.hindi) REVERSE_MAP[data.symbol] = data.hindi;
        }
    }
});

// Consonants (Vyanjan) ko map karein (Bina Halant aur Halant ke sath)
if (scriptData.consonants) {
    for (const [engKey, data] of Object.entries(scriptData.consonants)) {
        if (data.symbol && data.hindi) {
            // Agar gondi me Halant hai (𑵄), toh Hindi me bhi Halant lagayein
            REVERSE_MAP[data.symbol] = data.hindi + '्'; 
            
            // Bina Halant wale base character ko pure Hindi akshar se map karein
            const baseGondi = data.symbol.replace('𑵄', '');
            REVERSE_MAP[baseGondi] = data.hindi;
        }
    }
}

// Gondi Matras ko Hindi Matras se direct map karein
const matraHindiMap = {
    '𑴹': 'a', '𑴱': 'ा', '𑴲': 'ि', '𑴳': 'ी', '𑴴': 'ु', '𑴵': 'ू',  '𑴺': 'े', '𑴼': 'ै', '𑴽': 'ो', '𑴿': 'ौ',
    '𑴹': 'a', '𑵀': 'ं', '𑵁': 'ः', '𑵃': 'ँ', '𑵇': '्र', '𑵆': 'र्', '𑵆 𑵇': 'ृ',
  
};
Object.assign(REVERSE_MAP, matraHindiMap);

// 2. Editor me type hone par Word-by-Word update karein
editorInputBox.addEventListener("input", updateVisualBoard);

function updateVisualBoard() {
    const text = editorInputBox.value;
    
    // Agar khali hai
    if (text.length === 0) {
        visualBoard.innerHTML = '<span class="placeholder-text">अनुवाद यहाँ दिखेगा (Translation will appear here)...</span>';
        return;
    }

    let htmlContent = "";
    let currentGondiWord = "";
    let currentHindiWord = "";

    // Current word ko HTML me push karne ka function
    const flushWord = () => {
        if (currentGondiWord.length > 0) {
            htmlContent += `
                <div class="word-box" style="display: inline-flex; flex-direction: column; align-items: center; justify-content: flex-end; margin: 0 10px 15px 10px;">
                    <span class="char-gondi" style="font-family: '${editorInputBox.style.fontFamily}'; font-size: 38px; color: var(--white); line-height: 1;">${currentGondiWord}</span>
                    <span class="char-trans" style="font-size: 16px; color: #08FB8F; font-weight: 600; margin-top: 8px;">${currentHindiWord}</span>
                </div>`;
            currentGondiWord = "";
            currentHindiWord = "";
        }
    };

    let i = 0;
    while (i < text.length) {
        // Agar space dabaya, toh pichla word render kar do
        if (text[i] === ' ') {
            flushWord();
            htmlContent += `<div style="width: 25px; display: inline-block;"></div>`; // Word Space
            i++;
            continue;
        }
        // Agar Enter dabaya
        if (text[i] === '\n') {
            flushWord();
            htmlContent += `<div style="width: 100%; height: 0;"></div>`; // New Line
            i++;
            continue;
        }

        // Gondi symbols (jaise half letters) multiple bytes le sakte hain, isliye greedy match lagayenge
        let matchFound = false;
        for (let len = 3; len >= 1; len--) {
            let chunk = text.substring(i, i + len);
            if (REVERSE_MAP[chunk]) {
                currentGondiWord += chunk;
                currentHindiWord += REVERSE_MAP[chunk];
                i += len;
                matchFound = true;
                break;
            }
        }

        // Agar dictionary me translation nahi mila
        if (!matchFound) {
            currentGondiWord += text[i];
            currentHindiWord += text[i];
            i++;
        }
    }
    
    // Last word ko render karne ke liye
    flushWord();

    visualBoard.innerHTML = htmlContent;
}
