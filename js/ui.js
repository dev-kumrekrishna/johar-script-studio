// =============================
// js/ui.js
// UI TOOLS
// =============================


// =============================
// DOM Elements
// =============================

const copyBtn =
    document.getElementById("copyBtn");

const clearBtn =
    document.getElementById("clearBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const fontSize =
    document.getElementById("fontSize");

const themeBtn =
    document.getElementById("themeBtn");

const editor =
    document.getElementById("editorBox");

const scriptSelect =
    document.getElementById("script");


// =============================
// THEME TOGGLE
// =============================

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle(
            "light-theme"
        );


        const icon =
            themeBtn.querySelector("i");


        if (!icon) return;


        if (
            document.body.classList.contains(
                "light-theme"
            )
        ) {

            icon.classList.remove(
                "ri-moon-line"
            );

            icon.classList.add(
                "ri-sun-line"
            );

        } else {

            icon.classList.remove(
                "ri-sun-line"
            );

            icon.classList.add(
                "ri-moon-line"
            );

        }

    });

}


// ============================================================
// COPY TRANSLATED GONDI TEXT
// ============================================================

if (copyBtn) {

    copyBtn.addEventListener("click", async () => {

        let finalGondiText = "";


        // ====================================================
        // 1. FIRST: LIVE TRANSLATION TOKENS
        // ====================================================

        if (
            Array.isArray(window.parsedGondiTokens) &&
            window.parsedGondiTokens.length > 0
        ) {

            finalGondiText =
                window.parsedGondiTokens.join("");

        }


        // ====================================================
        // 2. SECOND: EXISTING getFinalText()
        // ====================================================

        if (
            !finalGondiText.trim() &&
            typeof window.getFinalText === "function"
        ) {

            try {

                finalGondiText =
                    window.getFinalText();

            }

            catch (error) {

                console.warn(
                    "getFinalText() failed:",
                    error
                );

            }

        }


        // ====================================================
        // 3. THIRD: DIRECT TRANSLITERATION FALLBACK
        // ====================================================

        if (
            !finalGondiText.trim() &&
            editor &&
            editor.value.trim() &&
            typeof window.transliterateSentence ===
                "function"
        ) {

            try {

                const result =
                    window.transliterateSentence(
                        editor.value,
                        scriptSelect
                            ? scriptSelect.value
                            : "masaram"
                    );

                if (
                    result &&
                    typeof result.gondi === "string"
                ) {

                    finalGondiText =
                        result.gondi;

                }

            }

            catch (error) {

                console.warn(
                    "Direct transliteration failed:",
                    error
                );

            }

        }


        // ====================================================
        // NOTHING TO COPY
        // ====================================================

        if (
            !finalGondiText ||
            !finalGondiText.trim()
        ) {

            alert(
                "Write something to copy!"
            );

            return;

        }


        // ====================================================
        // RTL SUPPORT
        // ====================================================

        let textToCopy =
            finalGondiText;

        if (
            window.currentDirection ===
            "rtl"
        ) {

            if (
                !textToCopy.startsWith(
                    "\u202E"
                )
            ) {

                textToCopy =
                    "\u202E" +
                    textToCopy;

            }

        }


        // ====================================================
        // COPY
        // ====================================================

        try {

            await navigator.clipboard.writeText(
                textToCopy
            );


            alert(
                "Gondi Translation Copied Successfully!"
            );


        }

        catch (error) {

            console.error(
                "Could not copy Gondi translation:",
                error
            );


            // =================================================
            // OLD BROWSER FALLBACK
            // =================================================

            try {

                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.value =
                    textToCopy;

                textarea.style.position =
                    "fixed";

                textarea.style.left =
                    "-9999px";

                document.body.appendChild(
                    textarea
                );

                textarea.focus();

                textarea.select();

                document.execCommand(
                    "copy"
                );

                document.body.removeChild(
                    textarea
                );


                alert(
                    "Gondi Translation Copied Successfully!"
                );

            }

            catch (fallbackError) {

                console.error(
                    "Copy fallback failed:",
                    fallbackError
                );

                alert(
                    "Failed to copy text."
                );

            }

        }

    });

}


// =============================
// DOWNLOAD TXT
// =============================

if (downloadBtn) {

    downloadBtn.addEventListener(
        "click",
        () => {

            const finalGondiText =
                typeof window.getFinalText === "function"
                    ? window.getFinalText()
                    : "";


            if (!finalGondiText.trim()) {

                alert(
                    "Write something to download!"
                );

                return;

            }


            let fileContent =
                finalGondiText;


            // RTL support
            if (
                window.currentDirection === "rtl"
            ) {

                fileContent =
                    "\u202E" +
                    finalGondiText;

            }


            const blob =
                new Blob(
                    [fileContent],
                    {
                        type:
                            "text/plain;charset=utf-8"
                    }
                );


            const link =
                document.createElement("a");


            link.href =
                URL.createObjectURL(blob);


            const scriptName =
                scriptSelect &&
                scriptSelect.selectedIndex >= 0

                    ? scriptSelect
                        .options[
                            scriptSelect.selectedIndex
                        ]
                        .text

                    : "Script";


            link.download =
                `JoharStudio_${scriptName
                    .replace(/\s+/g, "_")}.txt`;


            link.click();


            URL.revokeObjectURL(
                link.href
            );

        }
    );

}


// =============================
// CLEAR BUTTON
// =============================

if (clearBtn) {

    clearBtn.addEventListener(
        "click",
        () => {

            if (!confirm("Clear all text?")) {
                return;
            }


            if (editor) {
                editor.value = "";
            }


            const originalKeysDisplay =
                document.getElementById(
                    "originalKeysDisplay"
                );


            if (originalKeysDisplay) {

                originalKeysDisplay.innerText =
                    "...";

            }


            if (
                typeof updateVisualBoard ===
                "function"
            ) {

                updateVisualBoard();

            }

        }
    );

}


// =============================
// FONT SIZE
// Supports 12px → whatever options exist
// =============================

if (fontSize) {

    const applyFontSize = () => {

        const value =
            fontSize.value;


        if (!value) return;


        document.documentElement.style
            .setProperty(
                "--visual-font-size",
                value
            );

    };


    fontSize.addEventListener(
        "change",
        applyFontSize
    );


    // Apply current/default value
    applyFontSize();

}