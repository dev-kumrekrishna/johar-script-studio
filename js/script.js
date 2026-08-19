// ============================================================
// js/script.js
// Johar Script Studio
// ============================================================


// ============================================================
// SCRIPT GREETINGS
// ============================================================

const SCRIPT_GREETINGS = {

    masaram:
        "𑴘𑴦𑴴𑴠𑴴 𑴦𑴬𑴱𑴓𑴽",

    gunjala:
        "𑶂𑶈𑶍𑶅𑶍 𑶈𑶇𑶊𑶀𑶓"

};


// ============================================================
// SCRIPT FONT
// ============================================================

function getScriptFont(scriptName) {

    if (scriptName === "gunjala") {

        return "'Gunjala Gondi', sans-serif";

    }

    return "'Masaram Gondi', sans-serif";

}


// ============================================================
// HERO GREETING
// ============================================================

function updateHeroGreeting(scriptName) {

    const heroGreeting =
        document.getElementById("heroGreeting");

    if (!heroGreeting) return;


    heroGreeting.style.fontFamily =
        getScriptFont(scriptName);

    heroGreeting.style.whiteSpace =
        "nowrap";

    heroGreeting.style.letterSpacing =
        "0";

    heroGreeting.style.lineHeight =
        "1.4";


    heroGreeting.textContent =
        SCRIPT_GREETINGS[scriptName] ||
        SCRIPT_GREETINGS.masaram;

}


// ============================================================
// TYPING GUIDE
// ============================================================

window.renderTypingGuide = function (scriptName) {

    const container =
        document.getElementById("guideTables");

    if (!container) return;


    // --------------------------------------------------------
    // CLEAR OLD GUIDE
    // --------------------------------------------------------

    container.innerHTML = "";


    // --------------------------------------------------------
    // GET SCRIPT DATA
    // --------------------------------------------------------

    const scriptData =
        window.SCRIPT_MAPPINGS &&
        window.SCRIPT_MAPPINGS[scriptName];


    if (!scriptData) {

        console.warn(
            "SCRIPT_MAPPINGS not found:",
            scriptName
        );

        return;

    }


    const fontFamily =
        getScriptFont(scriptName);


    // --------------------------------------------------------
    // GUIDE CATEGORIES
    // --------------------------------------------------------

    const categories = [

        "vowels",
        "matras",
        "consonants",
        "barahkhadi",
        "numbers"

    ];


    // --------------------------------------------------------
    // RENDER EACH CATEGORY
    // --------------------------------------------------------

    categories.forEach(category => {


        let items = {};


        // ====================================================
        // VOWELS
        // ====================================================

        if (category === "vowels") {

            items =
                scriptData.vowels || {};

        }


        // ====================================================
        // MATRAS
        // ====================================================

        else if (category === "matras") {

            items =
                scriptData.matras || {};

        }


        // ====================================================
        // CONSONANTS
        // GUIDE USES "a"
        // ====================================================

        else if (category === "consonants") {

            items =
                scriptData.baseConsonants || {};

        }


        // ====================================================
        // BARAH KHADI
        // ONLY KA SERIES
        // ====================================================

        else if (category === "barahkhadi") {


            const consonants =
                scriptData.consonants || {};


            const kaSeries = [

                "ka",
                "kaa",

                "ki",
                "kii",

                "ku",
                "kuu",

                "ke",
                "kai",

                "ko",
                "kau",

                "kM",
                "kH"

            ];


            kaSeries.forEach(key => {

                if (consonants[key]) {

                    items[key] =
                        consonants[key];

                }

            });

        }


        // ====================================================
        // NUMBERS
        // ====================================================

        else if (category === "numbers") {

            items =
                scriptData.numbers || {};

        }


        // ====================================================
        // EMPTY CATEGORY
        // ====================================================

        if (
            !items ||
            Object.keys(items).length === 0
        ) {

            return;

        }


        // ====================================================
        // SECTION START
        // ====================================================

        let html = `

            <div
                id="guide-${category}"
                class="guide-table-container ${
                    category === "vowels"
                        ? "active"
                        : ""
                }"
            >

        `;


        // ====================================================
        // GUIDE ITEMS
        // ====================================================

        Object.entries(items).forEach(
            ([key, data]) => {


                if (
                    !data ||
                    !data.symbol
                ) {

                    return;

                }


                // ------------------------------------------------
                // ENGLISH KEY
                // ------------------------------------------------

                let displayKey =
                    data.english || key;


                // ------------------------------------------------
                // CONSONANTS
                //
                // GUIDE:
                // k  → ka
                // kh → kha
                // g  → ga
                //
                // KEYBOARD IS NOT TOUCHED HERE.
                // ------------------------------------------------

                if (
                    category === "consonants"
                ) {

                    if (
                        !displayKey
                            .toLowerCase()
                            .endsWith("a")
                    ) {

                        displayKey += "a";

                    }

                }


                // ------------------------------------------------
                // HINDI
                // ------------------------------------------------

                const hindi =
                    data.hindi || "";


                // ------------------------------------------------
                // KEY
                // ------------------------------------------------

                html += `

                    <div class="key">

                        <span
                            class="gondi"
                            style="
                                font-family:${fontFamily};
                                letter-spacing:0;
                            "
                        >
                            ${data.symbol}
                        </span>

                        <small>
                            ${displayKey} |
                            ${hindi}
                        </small>

                    </div>

                `;

            }
        );


        // ====================================================
        // SECTION END
        // ====================================================

        html += `

            </div>

        `;


        // ====================================================
        // INSERT SECTION
        // ====================================================

        container.insertAdjacentHTML(
            "beforeend",
            html
        );

    });


    // ========================================================
    // GUIDE FILTER BUTTONS
    // ========================================================

    bindGuideFilters();


    // ========================================================
    // UPDATE EXAMPLE FONT
    // ========================================================

    updateBarahKhadiExample(
        scriptName
    );

};


// ============================================================
// BARAH KHADI EXAMPLE
//
// HTML CONTENT IS STATIC.
// JS ONLY DECIDES WHICH SCRIPT TO SHOW.
// ============================================================

function updateBarahKhadiExample(scriptName) {

    const box =
        document.getElementById(
            "barahkhadiExample"
        );


    if (!box) return;


    const examples =
        box.querySelectorAll(
            ".example-script"
        );


    examples.forEach(example => {


        const targetScript =
            example.getAttribute(
                "data-script"
            );


        if (
            targetScript === scriptName
        ) {

            example.style.display =
                "block";


            example.style.fontFamily =
                getScriptFont(scriptName);


        }

        else {

            example.style.display =
                "none";

        }

    });

}


// ============================================================
// SHOW / HIDE BARAH KHADI EXAMPLE
// ============================================================

function setBarahKhadiExampleVisibility(
    category
) {

    const box =
        document.getElementById(
            "barahkhadiExample"
        );


    if (!box) return;


    if (
        category === "barahkhadi"
    ) {

        box.classList.add(
            "visible"
        );

    }

    else {

        box.classList.remove(
            "visible"
        );

    }

}


// ============================================================
// GUIDE FILTERS
// ============================================================

function bindGuideFilters() {


    const buttons =
        document.querySelectorAll(
            ".guide-btn"
        );


    const containers =
        document.querySelectorAll(
            ".guide-table-container"
        );


    buttons.forEach(button => {


        button.onclick = function () {


            // ------------------------------------------------
            // REMOVE ACTIVE BUTTON
            // ------------------------------------------------

            buttons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            // ------------------------------------------------
            // HIDE ALL GUIDE SECTIONS
            // ------------------------------------------------

            containers.forEach(
                container => {

                    container.classList.remove(
                        "active"
                    );

                }
            );


            // ------------------------------------------------
            // ACTIVE BUTTON
            // ------------------------------------------------

            button.classList.add(
                "active"
            );


            // ------------------------------------------------
            // GET CATEGORY
            // ------------------------------------------------

            const category =
                button.getAttribute(
                    "data-guide"
                );


            // ------------------------------------------------
            // SHOW SELECTED CATEGORY
            // ------------------------------------------------

            const target =
                document.getElementById(
                    `guide-${category}`
                );


            if (target) {

                target.classList.add(
                    "active"
                );

            }


            // ------------------------------------------------
            // EXAMPLE VISIBILITY
            // ------------------------------------------------

            setBarahKhadiExampleVisibility(
                category
            );

        };

    });

}


// ============================================================
// SCRIPT CHANGE
// ============================================================

function handleScriptChange(
    scriptName
) {


    // ========================================================
    // HERO
    // ========================================================

    updateHeroGreeting(
        scriptName
    );


    // ========================================================
    // TYPING GUIDE
    // ========================================================

    try {


        if (
            typeof window.renderTypingGuide ===
            "function"
        ) {

            window.renderTypingGuide(
                scriptName
            );

        }

    }

    catch (error) {

        console.error(
            "Typing guide error:",
            error
        );

    }


    // ========================================================
    // BARAH KHADI EXAMPLE
    // ========================================================

    updateBarahKhadiExample(
        scriptName
    );


    // ========================================================
    // VIRTUAL KEYBOARD
    //
    // IMPORTANT:
    // Keyboard logic belongs ONLY to keyboard.js
    // ========================================================

    try {


        if (
            typeof window.renderVirtualKeyboard ===
            "function"
        ) {

            window.renderVirtualKeyboard(
                scriptName
            );

        }

    }

    catch (error) {

        console.error(
            "Virtual keyboard error:",
            error
        );

    }

}


// ============================================================
// DOM READY
// ============================================================

window.addEventListener(
    "DOMContentLoaded",
    () => {


        try {


            // ==================================================
            // EDITOR
            // ==================================================

            const editor =
                document.getElementById(
                    "editorBox"
                );


            if (editor) {

                editor.style.fontFamily =
                    "'Poppins', sans-serif";

            }


            // ==================================================
            // SCRIPT SELECT
            // ==================================================

            const scriptSelect =
                document.getElementById(
                    "script"
                );


            const selectedScript =
                scriptSelect &&
                scriptSelect.value
                    ? scriptSelect.value
                    : "masaram";


            // ==================================================
            // INITIAL SCRIPT
            // ==================================================

            handleScriptChange(
                selectedScript
            );


            // ==================================================
            // SCRIPT CHANGE
            // ==================================================

            if (scriptSelect) {


                scriptSelect.addEventListener(
                    "change",
                    event => {


                        handleScriptChange(
                            event.target.value
                        );


                    }
                );

            }


            // ==================================================
            // DEFAULT VISUAL FONT SIZE
            // ==================================================

            document.documentElement
                .style
                .setProperty(
                    "--visual-font-size",
                    "32px"
                );


            // ==================================================
            // DEFAULT EXAMPLE STATE
            // ==================================================

            setBarahKhadiExampleVisibility(
                "vowels"
            );


        }

        catch (error) {


            console.error(
                "Johar Script Studio startup error:",
                error
            );


        }

        finally {


            // ==================================================
            // NEVER KEEP LOADER STUCK
            // ==================================================

            const loader =
                document.querySelector(
                    ".loader"
                );


            if (loader) {

                loader.style.display =
                    "none";

            }

        }

    }
);

/* =========================================
   PWA SERVICE WORKER
   ========================================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(registration => {

                console.log(
                    "Johar Script Studio PWA ready:",
                    registration.scope
                );

            })
            .catch(error => {

                console.error(
                    "PWA Service Worker error:",
                    error
                );

            });

    });

}