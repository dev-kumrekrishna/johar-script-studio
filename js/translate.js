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

function generateReverseMap(scriptData) {

    const reverseMap = {};

    if (!scriptData) return reverseMap;

    const flatMap = generateFlatMap(scriptData);

    for (const key in flatMap) {

        const item = flatMap[key];

        if (!item || !item.char) continue;

        reverseMap[item.char] = {
            hindi: item.hindi || ""
        };
    }

    return reverseMap;
}

window.updateVisualBoard = function() {

    const editorInputBox =
        document.getElementById("editorBox");

    const visualBoard =
        document.getElementById("visualBoard");

    const scriptSelect =
        document.getElementById("script");


    if (!editorInputBox || !visualBoard) {
        return;
    }


    const currentScript =
        scriptSelect
            ? scriptSelect.value
            : "masaram";

    const text =
        editorInputBox.value;


    // ============================================================
    // EMPTY INPUT
    // ============================================================

    if (text.length === 0) {

        visualBoard.innerHTML =
            '<span class="placeholder-text">अनुवाद यहाँ दिखेगा (Translation will appear here)...</span>';

        window.parsedGondiTokens = [];

        return;
    }


    // ============================================================
    // SCRIPT DATA
    // ============================================================

    const scriptData =
        window.SCRIPT_MAPPINGS[currentScript];


    if (!scriptData) {

        console.warn(
            "Script mapping not found:",
            currentScript
        );

        return;
    }


    // ============================================================
    // ENGLISH → SCRIPT MAP
    // ============================================================

    const activeMap =
        generateFlatMap(scriptData);


    // ============================================================
    // SCRIPT → HINDI REVERSE MAP
    // ============================================================

    const reverseMap =
        generateReverseMap(scriptData);


    // ============================================================
    // SORT SCRIPT SYMBOLS
    //
    // Longest symbols first.
    //
    // Example:
    // ᱠᱷ  should be checked before ᱠ
    // ============================================================

    const reverseSymbols =
        Object.keys(reverseMap)
            .sort(
                (a, b) =>
                    b.length - a.length
            );


    let htmlContent = "";

    let currentGondiWord = "";

    let currentHindiWord = "";

    let fullGondiText = [];


    // ============================================================
    // FONT
    // ============================================================

    let fontFamily;

    if (currentScript === "masaram") {

        fontFamily =
            "'Masaram Gondi', sans-serif";

    }

    else if (currentScript === "gunjala") {

        fontFamily =
            "'Gunjala Gondi', sans-serif";

    }

    else if (currentScript === "olchiki") {

        fontFamily =
            "'Noto Sans Ol Chiki', sans-serif";

    }

    else {

        fontFamily =
            "sans-serif";

    }


    // ============================================================
    // FLUSH WORD
    // ============================================================

    const flushWord =
        (removeFinalHalant = false) => {

        if (currentGondiWord.length === 0) {
            return;
        }


        // ========================================================
        // REMOVE FINAL HALANT
        // ========================================================

        if (removeFinalHalant) {

            let halant = null;


            if (currentScript === "masaram") {

                halant = "𑵄";

            }

            else if (currentScript === "gunjala") {

                halant = "𑶗";

            }


            // Ol Chiki gets NO Gondi halant

            if (
                halant &&
                currentGondiWord.endsWith(halant)
            ) {

                currentGondiWord =
                    currentGondiWord.slice(
                        0,
                        -halant.length
                    );
            }


            // Hindi preview
            // Remove final Devanagari halant

            if (
                currentHindiWord.endsWith("्")
            ) {

                currentHindiWord =
                    currentHindiWord.slice(
                        0,
                        -1
                    );
            }

        }


        // ========================================================
        // CREATE VISUAL CHARACTER BOX
        // ========================================================

        htmlContent += `

            <div
                class="char-box"
                style="
                    display:inline-flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:flex-end;
                    margin:0 10px 15px 10px;
                "
            >

                <span
                    class="char-gondi"
                    style="
                        font-family:${fontFamily};
                        font-size:var(--visual-font-size,38px);
                        color:var(--white);
                        line-height:1;
                    "
                >
                    ${currentGondiWord}
                </span>


                <span
                    class="char-trans"
                    style="
                        font-size:16px;
                        color:#08FB8F;
                        font-weight:600;
                        margin-top:8px;
                    "
                >
                    ${currentHindiWord}
                </span>

            </div>

        `;


        // ========================================================
        // STORE FINAL SCRIPT TEXT
        // ========================================================

        fullGondiText.push(
            currentGondiWord
        );


        // RESET WORD

        currentGondiWord = "";

        currentHindiWord = "";

    };


    // ============================================================
    // PARSE INPUT
    // ============================================================

    let i = 0;


    while (i < text.length) {


        // ========================================================
        // SPACE
        // ========================================================

        if (text[i] === " ") {

            flushWord(true);


            htmlContent +=
                `<div style="
                    width:25px;
                    display:inline-block;
                "></div>`;


            fullGondiText.push(" ");

            i++;

            continue;
        }


        // ========================================================
        // NEW LINE
        // ========================================================

        if (text[i] === "\n") {

            flushWord(true);


            htmlContent +=
                `<div style="
                    width:100%;
                    height:0;
                "></div>`;


            fullGondiText.push("\n");

            i++;

            continue;
        }


        // ========================================================
        // FIRST:
        // CHECK IF INPUT IS ALREADY SCRIPT
        // ========================================================

        let reverseMatch = null;


        for (
            const symbol of reverseSymbols
        ) {

            if (
                text.startsWith(
                    symbol,
                    i
                )
            ) {

                reverseMatch =
                    symbol;

                break;
            }

        }


        // ========================================================
        // SCRIPT INPUT FOUND
        // ========================================================

        if (reverseMatch) {

            currentGondiWord +=
                reverseMatch;


            currentHindiWord +=
                reverseMap[
                    reverseMatch
                ].hindi;


            i +=
                reverseMatch.length;


            continue;
        }


        // ========================================================
        // OTHERWISE:
        // ENGLISH KEY INPUT
        // ========================================================

        let matchFound = false;


        // Check:
        // 4 → 3 → 2 → 1

        for (
            let len = 4;
            len >= 1;
            len--
        ) {

            if (
                i + len <=
                text.length
            ) {

                const chunk =
                    text.substring(
                        i,
                        i + len
                    );


                if (
                    activeMap[chunk]
                ) {

                    currentGondiWord +=
                        activeMap[chunk].char;


                    currentHindiWord +=
                        activeMap[chunk].hindi;


                    i += len;

                    matchFound = true;

                    break;
                }

            }

        }


        // ========================================================
        // UNKNOWN CHARACTER
        // ========================================================

        if (!matchFound) {

            currentGondiWord +=
                text[i];


            currentHindiWord +=
                text[i];


            i++;

        }

    }


    // ============================================================
    // FLUSH LAST WORD
    // ============================================================

    flushWord();


    // ============================================================
    // RENDER
    // ============================================================

    visualBoard.innerHTML =
        htmlContent;


    // ============================================================
    // COPY / DOWNLOAD DATA
    // ============================================================

    window.parsedGondiTokens =
        fullGondiText;

};