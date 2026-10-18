// ===========================
// js/translate.js
// ===========================

window.updateVisualBoard = function() {
    const editorInputBox = document.getElementById("editorBox");
    const visualBoard = document.getElementById("visualBoard");
    const scriptSelect = document.getElementById("script");

    if (!editorInputBox || !visualBoard) return;

    const currentScript = scriptSelect ? scriptSelect.value : "masaram";
    const text = editorInputBox.value;

    if (text.length === 0) {
        visualBoard.innerHTML = '<span class="placeholder-text">Translation will appear here...</span>';
        window.parsedGondiTokens = [];
        return;
    }

    // Universal Reverse Mapping ke liye text ko script domain ke hisaab se tokenize karein
    let chunks = [];
    let currentDomain = null;
    let currentText = "";

    for (const char of text) {
        const cp = char.codePointAt(0);
        let domain = currentScript; // English typing ke liye selected script default rahega
        
        // Native script characters ko auto-detect karein
        if (cp >= 0x11D00 && cp <= 0x11D5F) domain = "masaram";
        else if (cp >= 0x11D60 && cp <= 0x11DAF) domain = "gunjala";
        else if (cp >= 0x1C50 && cp <= 0x1C7F) domain = "olchiki";
        
        // Spaces aur newlines ko current script block ke sath hi rakhein
        if (char === " " || char === "\n") {
            domain = currentDomain || currentScript;
        }

        if (domain !== currentDomain && currentText.length > 0) {
            chunks.push({ script: currentDomain, text: currentText });
            currentText = "";
        }
        currentDomain = domain;
        currentText += char;
    }
    if (currentText.length > 0) {
        chunks.push({ script: currentDomain, text: currentText });
    }

    let allTokens = [];
    for (const chunk of chunks) {
        const engine = window.SCRIPT_ENGINES && window.SCRIPT_ENGINES[chunk.script];
        if (engine) {
            const tokens = engine.translate(chunk.text);
            
            // Har token ko dynamically sahi visual font assign karein
            let fontFamily = chunk.script === "masaram" ? "'Masaram Gondi', sans-serif" :
                             chunk.script === "gunjala" ? "'Gunjala Gondi', sans-serif" :
                             chunk.script === "olchiki" ? "'Noto Sans Ol Chiki', sans-serif" : "sans-serif";
            
            // Yaha exact dropdown options wale names set kiye gaye hain
            let scriptLabel = chunk.script === "masaram" ? "Masaram Gondi" :
                              chunk.script === "gunjala" ? "Gunjala Gondi" :
                              chunk.script === "olchiki" ? "Ol Chiki - Santhali" : "Text";
                             
            for (let t of tokens) {
                t.fontFamily = fontFamily;
                t.scriptLabel = scriptLabel;
                allTokens.push(t);
            }
        }
    }

    // Tokens ko visually render karein
    let htmlContent = "";
    let fullGondiText = [];

    for (const token of allTokens) {
        if (token.type === 'space') {
            htmlContent += `<div style="width:25px; display:inline-block;"></div>`;
            fullGondiText.push(" ");
        } else if (token.type === 'newline') {
            htmlContent += `<div style="width:100%; height:0;"></div>`;
            fullGondiText.push("\n");
        } else if (token.type === 'word') {
            htmlContent += `
                <div class="char-box" style="display:inline-flex; flex-direction:column; align-items:center; justify-content:flex-end; margin:0 10px 15px 10px;">
                    <span style="font-size:11px; color:#888; font-weight:500; margin-bottom:8px; letter-spacing:0.5px;">
                        ${token.scriptLabel}
                    </span>
                    <span class="char-gondi" style="font-family:${token.fontFamily}; font-size:var(--visual-font-size,38px); color:var(--white); line-height:1;">
                        ${token.gondi}
                    </span>
                    <span class="char-trans" style="font-size:16px; color:#08FB8F; font-weight:600; margin-top:8px;">
                        ${token.hindi}
                    </span>
                </div>
            `;
            fullGondiText.push(token.gondi);
        }
    }

    visualBoard.innerHTML = htmlContent;
    window.parsedGondiTokens = fullGondiText;
};