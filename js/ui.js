// =============================
// js/ui.js
// UI TOOLS
// =============================


// =============================
// DOM ELEMENTS
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


// ============================================================
// INSERT TEXT AT CURRENT CURSOR POSITION
// Used by Virtual Keyboard: Space + Enter
// ============================================================

window.insertAtCursor = function (text) {

    const editorBox =
        document.getElementById("editorBox");

    if (!editorBox) {
        return;
    }


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
        text +
        editorBox.value.slice(
            end
        );


    const newPosition =
        start + text.length;


    editorBox.selectionStart =
        newPosition;

    editorBox.selectionEnd =
        newPosition;


    editorBox.focus();


    // Trigger live translation
    editorBox.dispatchEvent(
        new Event("input", {
            bubbles: true
        })
    );
};


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


        if (!icon) {
            return;
        }


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
// GET FINAL GONDI TEXT
// Central function used by COPY + DOWNLOAD
// ============================================================

window.getUIFinalGondiText = function () {

    let finalGondiText = "";


    // ========================================================
    // 1. LIVE TRANSLATION TOKENS
    // ========================================================

    if (
        Array.isArray(window.parsedGondiTokens) &&
        window.parsedGondiTokens.length > 0
    ) {

        finalGondiText =
            window.parsedGondiTokens.join("");

    }


    // ========================================================
    // 2. EXISTING getFinalText()
    // ========================================================

    if (
        !finalGondiText.trim() &&
        typeof window.getFinalText ===
            "function"
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


    // ========================================================
    // 3. DIRECT TRANSLITERATION FALLBACK
    // ========================================================

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
                typeof result.gondi ===
                    "string"
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


    return finalGondiText || "";
};


// ============================================================
// COPY TRANSLATED TEXT
// LTR / RTL OPTIONS
// ============================================================

if (copyBtn) {

    copyBtn.addEventListener("click", async () => {

        const finalText =
            window.getUIFinalGondiText();

        // NOTHING TO COPY
        if (!finalText || !finalText.trim()) {
            alert("Write something to copy!");
            return;
        }

        // --------------------------------------------------------
        // CREATE COPY OPTION MENU
        // --------------------------------------------------------

        const oldMenu =
            document.getElementById("copyDirectionMenu");

        if (oldMenu) {
            oldMenu.remove();
        }

        const menu =
            document.createElement("div");

        menu.id = "copyDirectionMenu";

        menu.style.position = "fixed";
        menu.style.zIndex = "99999";
        menu.style.left = "50%";
        menu.style.top = "50%";
        menu.style.transform = "translate(-50%, -50%)";
        menu.style.background = "#111";
        menu.style.border = "1px solid #08fb8f";
        menu.style.borderRadius = "18px";
        menu.style.padding = "20px";
        menu.style.width = "260px";
        menu.style.boxShadow =
            "0 10px 40px rgba(0,0,0,.6)";
        menu.style.textAlign = "center";

        menu.innerHTML = `
            <div style="
                color:white;
                font-size:20px;
                font-weight:700;
                margin-bottom:16px;
            ">
                Copy Text
            </div>

            <button id="copyLTRBtn" style="
                width:100%;
                padding:13px;
                margin-bottom:10px;
                border:none;
                border-radius:12px;
                background:#08fb8f;
                color:#000;
                font-weight:700;
                font-size:16px;
                cursor:pointer;
            ">
                LTR — abcd
            </button>

            <button id="copyRTLBtn" style="
                width:100%;
                padding:13px;
                margin-bottom:10px;
                border:none;
                border-radius:12px;
                background:#08fb8f;
                color:#000;
                font-weight:700;
                font-size:16px;
                cursor:pointer;
            ">
                RTL — dcba
            </button>

            <button id="closeCopyMenu" style="
                width:100%;
                padding:10px;
                border:1px solid #555;
                border-radius:12px;
                background:#222;
                color:#aaa;
                font-weight:600;
                cursor:pointer;
            ">
                Cancel
            </button>
        `;

        document.body.appendChild(menu);


        // --------------------------------------------------------
        // COPY FUNCTION
        // --------------------------------------------------------

        async function copyText(text, message) {

            try {

                await navigator.clipboard.writeText(text);

                menu.remove();

                alert(message);

            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

                // OLD BROWSER FALLBACK

                try {

                    const textarea =
                        document.createElement("textarea");

                    textarea.value = text;

                    textarea.style.position = "fixed";
                    textarea.style.left = "-9999px";

                    document.body.appendChild(textarea);

                    textarea.focus();
                    textarea.select();

                    document.execCommand("copy");

                    document.body.removeChild(textarea);

                    menu.remove();

                    alert(message);

                } catch (fallbackError) {

                    console.error(
                        "Copy fallback failed:",
                        fallbackError
                    );

                    alert("Failed to copy text.");

                }

            }

        }


        // --------------------------------------------------------
        // LTR COPY
        // --------------------------------------------------------

        document
            .getElementById("copyLTRBtn")
            .addEventListener("click", () => {

                copyText(
                    finalText,
                    "LTR text copied successfully!"
                );

            });


        // --------------------------------------------------------
        // RTL COPY
        // ACTUAL CHARACTER REVERSAL
        // --------------------------------------------------------

        document
            .getElementById("copyRTLBtn")
            .addEventListener("click", () => {

                const rtlText =
                    Array.from(finalText)
                        .reverse()
                        .join("");

                copyText(
                    rtlText,
                    "RTL text copied successfully!"
                );

            });


        // --------------------------------------------------------
        // CLOSE
        // --------------------------------------------------------

        document
            .getElementById("closeCopyMenu")
            .addEventListener("click", () => {

                menu.remove();

            });

    });

}


// ============================================================
// DOWNLOAD TXT
// ============================================================

if (downloadBtn) {

    downloadBtn.addEventListener(
        "click",
        () => {

            // Use the same reliable system as COPY
            const finalGondiText =
                window.getUIFinalGondiText();


            // ================================================
            // NOTHING TO DOWNLOAD
            // ================================================

            if (
                !finalGondiText ||
                !finalGondiText.trim()
            ) {

                alert(
                    "Write something to download!"
                );

                return;
            }


            // ================================================
            // FILE CONTENT
            // ================================================

            let fileContent =
                finalGondiText;


            // RTL support
            if (
                window.currentDirection ===
                "rtl"
            ) {

                if (
                    !fileContent.startsWith(
                        "\u202E"
                    )
                ) {

                    fileContent =
                        "\u202E" +
                        fileContent;

                }

            }


            // ================================================
            // CREATE TXT FILE
            // ================================================

            const blob =
                new Blob(
                    [
                        fileContent
                    ],
                    {
                        type:
                            "text/plain;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            // ================================================
            // FILE NAME
            // ================================================

            let scriptName =
                "Script";


            if (
                scriptSelect &&
                scriptSelect.selectedIndex >= 0
            ) {

                scriptName =
                    scriptSelect
                        .options[
                            scriptSelect.selectedIndex
                        ]
                        .text;

            }


            scriptName =
                scriptName
                    .replace(
                        /[^\w\u0900-\u097F-]+/g,
                        "_"
                    )
                    .replace(
                        /^_+|_+$/g,
                        ""
                    );


            link.download =
                `JoharStudio_${scriptName || "Script"}.txt`;


            // ================================================
            // DOWNLOAD
            // ================================================

            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );


            // Give browser time to start download
            setTimeout(
                () => {
                    URL.revokeObjectURL(url);
                },
                1000
            );

        }
    );

}


// ============================================================
// CLEAR BUTTON
// ============================================================

if (clearBtn) {

    clearBtn.addEventListener(
        "click",
        () => {

            if (
                !confirm(
                    "Clear all text?"
                )
            ) {

                return;
            }


            if (editor) {

                editor.value =
                    "";

            }


            // Clear parsed translation tokens
            if (
                Array.isArray(
                    window.parsedGondiTokens
                )
            ) {

                window.parsedGondiTokens =
                    [];

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


            // Trigger input so live translation
            // also resets
            if (editor) {

                editor.dispatchEvent(
                    new Event("input", {
                        bubbles: true
                    })
                );

            }

        }
    );

}


// ============================================================
// FONT SIZE
// Supports existing options
// ============================================================

if (fontSize) {

    const applyFontSize = () => {

        const value =
            fontSize.value;


        if (!value) {
            return;
        }


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