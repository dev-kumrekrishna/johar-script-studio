// ==========================================================
// JOHAR SCRIPT STUDIO
// js/keyboard.js
// Virtual Keyboard ONLY
// ==========================================================


// ==========================================================
// KEYBOARD TOGGLE + ACTION KEYS
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const toggleKeyboardBtn =
            document.getElementById(
                "toggleKeyboard"
            );

        const keyboardSection =
            document.getElementById(
                "keyboard"
            );


        // ==================================================
        // KEYBOARD TOGGLE
        // ==================================================

        if (
            toggleKeyboardBtn &&
            keyboardSection
        ) {

            toggleKeyboardBtn.addEventListener(
                "click",
                () => {

                    const isHidden =
                        keyboardSection.style.display === "none" ||
                        keyboardSection.style.display === "";


                    if (isHidden) {

                        keyboardSection.style.display =
                            "block";


                        toggleKeyboardBtn.style.background =
                            "var(--primary)";


                        toggleKeyboardBtn.style.color =
                            "#000";


                        keyboardSection.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest"
                        });


                    } else {

                        keyboardSection.style.display =
                            "none";


                        toggleKeyboardBtn.style.background =
                            "";


                        toggleKeyboardBtn.style.color =
                            "";

                    }

                }
            );

        }


        // ==================================================
        // SPACE
        // ==================================================

        document
            .getElementById("kb-space")
            ?.addEventListener(
                "click",
                () => {

                    if (
                        typeof window.insertAtCursor ===
                        "function"
                    ) {

                        window.insertAtCursor(
                            " "
                        );

                    }

                }
            );


        // ==================================================
        // ENTER
        // ==================================================

        document
            .getElementById("kb-enter")
            ?.addEventListener(
                "click",
                () => {

                    if (
                        typeof window.insertAtCursor ===
                        "function"
                    ) {

                        window.insertAtCursor(
                            "\n"
                        );

                    }

                }
            );


        // ==================================================
        // BACKSPACE
        // ==================================================

        document
            .getElementById("kb-backspace")
            ?.addEventListener(
                "click",
                () => {

                    const editorBox =
                        document.getElementById(
                            "editorBox"
                        );


                    if (!editorBox) {
                        return;
                    }


                    const startPos =
                        editorBox.selectionStart;


                    const endPos =
                        editorBox.selectionEnd;


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


                    } else {

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
                        new Event("input")
                    );

                }
            );

    }
);


// ==========================================================
// VIRTUAL KEYBOARD RENDERER
// ==========================================================

window.renderVirtualKeyboard =
    function (scriptName) {

        const keyboardContainer =
            document.getElementById(
                "dynamicKeyboard"
            );


        if (!keyboardContainer) {
            return;
        }


        keyboardContainer.innerHTML =
            "";


        const scriptData =
            window.SCRIPT_MAPPINGS &&
            window.SCRIPT_MAPPINGS[
                scriptName
            ];


        if (!scriptData) {

            console.warn(
                "Keyboard mapping not found:",
                scriptName
            );

            return;
        }


        // ==================================================
        // SCRIPT FONT
        // ==================================================

        const fontFamily =
            scriptName === "gunjala"
                ? "'Gunjala Gondi', sans-serif"
                : "'Masaram Gondi', sans-serif";


        // ==================================================
        // CREATE KEY
        // ==================================================

        function createKey(
            data,
            fallbackKey
        ) {

            if (
                !data ||
                !data.symbol
            ) {

                return null;

            }


            const english =
                data.english ||
                fallbackKey;


            const hindi =
                data.hindi || "";


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "keyboard-key";


            button.setAttribute(
                "data-eng",
                english
            );


            button.innerHTML = `
                <span
                    class="keyboard-gondi"
                    style="
                        font-family:${fontFamily};
                    "
                >
                    ${data.symbol}
                </span>

                <small
                    class="keyboard-label"
                >
                    ${english} | ${hindi}
                </small>
            `;


            button.addEventListener("click", () => {

    const editorBox =
        document.getElementById("editorBox");

    if (!editorBox) {
        console.warn(
            "Keyboard: #editorBox not found"
        );
        return;
    }

    // Keep the current cursor position
    const start =
        editorBox.selectionStart ?? editorBox.value.length;

    const end =
        editorBox.selectionEnd ?? start;

    // Insert the keyboard value
    editorBox.value =
        editorBox.value.slice(0, start) +
        english +
        editorBox.value.slice(end);

    // Move cursor after inserted text
    const newPosition =
        start + english.length;

    editorBox.selectionStart =
        newPosition;

    editorBox.selectionEnd =
        newPosition;

    // Keep writing pad focused
    editorBox.focus();

    // Tell transliteration system that text changed
    editorBox.dispatchEvent(
        new Event("input", {
            bubbles: true
        })
    );

});


            return button;

        }


        // ==================================================
        // ADD KEYS
        // ==================================================

        function addKeys(items) {

            if (!items) {
                return;
            }


            Object.entries(items)
                .forEach(
                    ([key, data]) => {

                        const button =
                            createKey(
                                data,
                                key
                            );


                        if (button) {

                            keyboardContainer
                                .appendChild(
                                    button
                                );

                        }

                    }
                );

        }


        // ==================================================
        // 1. NUMBERS
        // ==================================================

        addKeys(
            scriptData.numbers
        );


        // ==================================================
        // 2. VOWELS
        // ==================================================

        addKeys(
            scriptData.vowels
        );


        // ==================================================
        // 3. CONSONANTS
        //
        // KEYBOARD = HALF / HALANT
        //
        // k  → क्
        // kh → ख्
        // g  → ग्
        //
        // NO:
        // ka
        // kaa
        // ki
        // kii
        // ku
        // etc.
        // ==================================================

        const baseConsonants =
            scriptData.baseConsonants ||
            {};


        const generatedConsonants =
            scriptData.consonants ||
            {};


        const halantConsonants =
            {};


        Object.keys(
            baseConsonants
        ).forEach(
            key => {

                /*
                 * Prefer generated consonant
                 * because it normally contains
                 * the actual half/halant symbol.
                 */

                if (
                    generatedConsonants[key]
                ) {

                    halantConsonants[key] =
                        generatedConsonants[key];


                } else if (
                    baseConsonants[key]
                ) {

                    halantConsonants[key] =
                        baseConsonants[key];

                }

            }
        );


        addKeys(
            halantConsonants
        );

    };


// ==========================================================
// INITIALIZE KEYBOARD
// ==========================================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const scriptSelect =
            document.getElementById(
                "script"
            );


        if (!scriptSelect) {
            return;
        }


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