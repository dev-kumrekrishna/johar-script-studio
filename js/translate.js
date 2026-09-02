// ===========================
// js/translate.js
// ===========================

function generateFlatMap(scriptData) {
    let flatMap = {};
    if (!scriptData) return flatMap;

    // MAGIC FIX: Yahan hum order set kar rahe hain. 
    // Matras pehle load hongi, aur Vowels uske baad. 
    // Isse standalone keys (jaise 'i', 'A') humesha Swar (इ, आ) banengi!
    // Aur 'ki', 'ka' jaise combinations directly 'consonants' se uth jayenge.
    const orderedCategories = ['matras', 'vowels', 'consonants', 'numbers'];

    for (let category of orderedCategories) {
        if (scriptData[category]) {
            for (let key in scriptData[category]) {
                const item = scriptData[category][key];
                if (typeof item === 'object') {
                    // Visual board ke liye char aur hindi dono store kar rahe hain
                    flatMap[key] = { char: item.symbol, hindi: item.hindi || '' };
                }
            }
        }
    }
    return flatMap;
}

window.updateVisualBoard = function() {
    const editorInputBox = document.getElementById("editorBox");
    const visualBoard = document.getElementById("visualBoard");
    const scriptSelect = document.getElementById("script");
    
    if (!editorInputBox || !visualBoard) return;

    const currentScript = scriptSelect ? scriptSelect.value : 'masaram';
    const text = editorInputBox.value;
    
    // Agar khali hai
    if (text.length === 0) {
        visualBoard.innerHTML = '<span class="placeholder-text">अनुवाद यहाँ दिखेगा (Translation will appear here)...</span>';
        window.parsedGondiTokens = [];
        return;
    }

    // Flat Map create karo based on active script
    const activeMap = generateFlatMap(window.SCRIPT_MAPPINGS[currentScript]);

    let htmlContent = "";
    let currentGondiWord = "";
    let currentHindiWord = "";
    let fullGondiText = [];

    const flushWord = (removeFinalHalant = false) => {
    if (currentGondiWord.length > 0) {

        // Space/Enter par sirf LAST halant remove hoga
        if (removeFinalHalant) {
            const activeScriptData = window.SCRIPT_MAPPINGS[currentScript];

            const halant =
                currentScript === 'masaram'
                    ? '𑵄'
                    : '𑶗';

            if (currentGondiWord.endsWith(halant)) {
                currentGondiWord =
                    currentGondiWord.slice(0, -halant.length);
            }

            // Hindi preview se bhi last halant remove
            if (currentHindiWord.endsWith('्')) {
                currentHindiWord =
                    currentHindiWord.slice(0, -1);
            }
        }

        htmlContent += `
            <div class="char-box"
                style="display:inline-flex;
                       flex-direction:column;
                       align-items:center;
                       justify-content:flex-end;
                       margin:0 10px 15px 10px;">

                <span class="char-gondi"
                    style="font-family:'${currentScript === 'masaram' ? 'Masaram Gondi' : 'Gunjala Gondi'}';
                           font-size:var(--visual-font-size,38px);
                           color:var(--white);
                           line-height:1;">
                    ${currentGondiWord}
                </span>

                <span class="char-trans"
                    style="font-size:16px;
                           color:#08FB8F;
                           font-weight:600;
                           margin-top:8px;">
                    ${currentHindiWord}
                </span>
            </div>`;

        fullGondiText.push(currentGondiWord);

        currentGondiWord = "";
        currentHindiWord = "";
    }
};

    let i = 0;
    while (i < text.length) {
        if (text[i] === ' ') {
            flushWord(true);
            htmlContent += `<div style="width: 25px; display: inline-block;"></div>`;
            fullGondiText.push(' ');
            i++;
            continue;
        }
        if (text[i] === '\n') {
            flushWord(true);
            htmlContent += `<div style="width: 100%; height: 0;"></div>`;
            fullGondiText.push('\n');
            i++;
            continue;
        }

        let matchFound = false;
        // Check for 4, 3, 2, 1 letter combinations
        for (let len = 4; len >= 1; len--) {
            if (i + len <= text.length) {
                let chunk = text.substring(i, i + len);
                if (activeMap[chunk]) {
                    currentGondiWord += activeMap[chunk].char;
                    currentHindiWord += activeMap[chunk].hindi;
                    i += len;
                    matchFound = true;
                    break;
                }
            }
        }

        if (!matchFound) {
            currentGondiWord += text[i];
            currentHindiWord += text[i];
            i++;
        }
    }
    
    flushWord();
    visualBoard.innerHTML = htmlContent;
    window.parsedGondiTokens = fullGondiText; // For Copy/Download feature
};