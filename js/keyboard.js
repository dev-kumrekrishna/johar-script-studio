// ==========================================================
// JOHAR SCRIPT STUDIO
// js/keyboard.js
// SIMPLE VIRTUAL KEYBOARD
// ==========================================================


// ==========================================================
// KEYBOARD TOGGLE + ACTION KEYS
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    const toggleKeyboardBtn =
        document.getElementById("toggleKeyboard");

    const keyboardSection =
        document.getElementById("keyboard");


    // ======================================================
    // KEYBOARD TOGGLE
    // ======================================================

    if (toggleKeyboardBtn && keyboardSection) {

        toggleKeyboardBtn.addEventListener("click", () => {

            const isHidden =
                keyboardSection.style.display === "none" ||
                keyboardSection.style.display === "";

            if (isHidden) {

                keyboardSection.style.display = "block";

                toggleKeyboardBtn.style.background =
                    "var(--primary)";

                toggleKeyboardBtn.style.color =
                    "#000";

                keyboardSection.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });

            } else {

                keyboardSection.style.display = "none";

                toggleKeyboardBtn.style.background = "";
                toggleKeyboardBtn.style.color = "";
            }

        });

    }


    // ======================================================
    // SPACE
    // ======================================================

    document
        .getElementById("kb-space")
        ?.addEventListener("click", () => {

            if (
                typeof window.insertAtCursor ===
                "function"
            ) {
                window.insertAtCursor(" ");
            }

        });


    // ======================================================
    // ENTER
    // ======================================================

    document
        .getElementById("kb-enter")
        ?.addEventListener("click", () => {

            if (
                typeof window.insertAtCursor ===
                "function"
            ) {
                window.insertAtCursor("\n");
            }

        });


    // ======================================================
    // BACKSPACE
    // ======================================================

    document
        .getElementById("kb-backspace")
        ?.addEventListener("click", () => {

            const editorBox =
                document.getElementById("editorBox");

            if (!editorBox) return;


            const startPos =
                editorBox.selectionStart;

            const endPos =
                editorBox.selectionEnd;


            // --------------------------------------------------
            // NORMAL BACKSPACE
            // --------------------------------------------------

            if (
                startPos > 0 &&
                startPos === endPos
            ) {

                editorBox.value =
                    editorBox.value.substring(
                        0,
                        startPos - 1
                    ) +
                    editorBox.value.substring(
                        endPos
                    );


                editorBox.selectionStart =
                    editorBox.selectionEnd =
                    startPos - 1;

            }


            // --------------------------------------------------
            // DELETE SELECTED TEXT
            // --------------------------------------------------

            else {

                editorBox.value =
                    editorBox.value.substring(
                        0,
                        startPos
                    ) +
                    editorBox.value.substring(
                        endPos
                    );


                editorBox.selectionStart =
                    editorBox.selectionEnd =
                    startPos;
            }


            editorBox.focus();


            editorBox.dispatchEvent(
                new Event("input", {
                    bubbles: true
                })
            );

        });

});


// ==========================================================
// SIMPLE VIRTUAL KEYBOARD RENDERER
// ==========================================================

window.renderVirtualKeyboard = function (scriptName) {

    const keyboardContainer =
        document.getElementById("dynamicKeyboard");


    if (!keyboardContainer) return;


    // ======================================================
    // CLEAR OLD KEYBOARD
    // ======================================================

    keyboardContainer.innerHTML = "";


    // ======================================================
    // GET SCRIPT DATA
    // ======================================================

    const scriptData =
        window.SCRIPT_MAPPINGS &&
        window.SCRIPT_MAPPINGS[scriptName];


    if (!scriptData) {

        console.warn(
            "Keyboard mapping not found:",
            scriptName
        );

        return;
    }


    // ======================================================
    // SCRIPT FONT
    // ======================================================

    const fontFamily =
        scriptName === "gunjala"
            ? "'Gunjala Gondi', sans-serif"
            : "'Masaram Gondi', sans-serif";


    // ======================================================
    // CREATE INDIVIDUAL KEY
    // ======================================================

    function createKey(data, fallbackKey) {

        if (!data || !data.symbol) {
            return null;
        }


        const english =
            data.english || fallbackKey;


        const button =
            document.createElement("button");


        button.type = "button";


        button.className =
            "keyboard-key";


        button.setAttribute(
            "data-eng",
            english
        );


        // --------------------------------------------------
        // SCRIPT CHARACTER
        // --------------------------------------------------

        const span =
            document.createElement("span");


        span.className =
            "keyboard-gondi";


        span.style.fontFamily =
            fontFamily;


        span.textContent =
            data.symbol;


        button.appendChild(span);


        // ==================================================
        // KEY CLICK
        // ==================================================

        button.addEventListener("click", () => {

            const editorBox =
                document.getElementById("editorBox");


            if (!editorBox) return;


            const start =
                editorBox.selectionStart ??
                editorBox.value.length;


            const end =
                editorBox.selectionEnd ??
                start;


            editorBox.value =
                editorBox.value.slice(
                    0,
                    start
                ) +
                english +
                editorBox.value.slice(
                    end
                );


            const newPosition =
                start + english.length;


            editorBox.selectionStart =
                newPosition;


            editorBox.selectionEnd =
                newPosition;


            editorBox.focus();


            editorBox.dispatchEvent(
                new Event("input", {
                    bubbles: true
                })
            );

        });


        return button;
    }


    // ======================================================
    // CREATE ROW
    // ======================================================

    function createRow(className) {

        const row =
            document.createElement("div");


        row.className =
            `keyboard-row ${className}`;


        keyboardContainer.appendChild(row);


        return row;
    }


    // ======================================================
    // ADD KEYS TO ROW
    // ======================================================

    function addKeysToRow(row, items) {

        if (!items) return;


        Object.entries(items).forEach(
            ([key, data]) => {

                const button =
                    createKey(data, key);


                if (button) {
                    row.appendChild(button);
                }

            }
        );

    }


    // ======================================================
    // 1. NUMBER ROW
    // ======================================================

    const numberRow =
        createRow("numbers");


    addKeysToRow(
        numberRow,
        scriptData.numbers
    );


    // ======================================================
    // 2. VOWEL ROW
    // ======================================================

    const vowelRow =
        createRow("vowels");


    addKeysToRow(
        vowelRow,
        scriptData.vowels
    );


    // ======================================================
    // 3. CONSONANTS
    // USE BASE CONSONANTS ONLY
    // SPLIT INTO 3 ROWS
    // ======================================================

    const consonants =
        scriptData.baseConsonants || {};


    const consonantEntries =
        Object.entries(consonants);


    if (consonantEntries.length === 0) {

        console.warn(
            "No base consonants found for:",
            scriptName
        );

    } else {

        // --------------------------------------------------
        // DIVIDE CONSONANTS INTO 3 ROWS
        // --------------------------------------------------

        const total =
            consonantEntries.length;


        const perRow =
            Math.ceil(total / 3);


        const row1Items =
            Object.fromEntries(
                consonantEntries.slice(
                    0,
                    perRow
                )
            );


        const row2Items =
            Object.fromEntries(
                consonantEntries.slice(
                    perRow,
                    perRow * 2
                )
            );


        const row3Items =
            Object.fromEntries(
                consonantEntries.slice(
                    perRow * 2
                )
            );


        // --------------------------------------------------
        // CONSONANT ROW 1
        // --------------------------------------------------

        const consonantRow1 =
            createRow(
                "consonants consonants-1"
            );


        addKeysToRow(
            consonantRow1,
            row1Items
        );


        // --------------------------------------------------
        // CONSONANT ROW 2
        // --------------------------------------------------

        const consonantRow2 =
            createRow(
                "consonants consonants-2"
            );


        addKeysToRow(
            consonantRow2,
            row2Items
        );


        // --------------------------------------------------
        // CONSONANT ROW 3
        // --------------------------------------------------

        const consonantRow3 =
            createRow(
                "consonants consonants-3"
            );


        addKeysToRow(
            consonantRow3,
            row3Items
        );

    }

};   // <-- IMPORTANT: renderVirtualKeyboard CLOSE


// ==========================================================
// INITIALIZE KEYBOARD
// ==========================================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const scriptSelect =
            document.getElementById("script");


        if (!scriptSelect) return;


        if (
            typeof window.renderVirtualKeyboard ===
            "function"
        ) {

            window.renderVirtualKeyboard(
                scriptSelect.value ||
                "masaram"
            );

        }

    }
);