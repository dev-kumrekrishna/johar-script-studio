// =============================
// js/pad.js 
// =============================

const editorInput = document.getElementById("editorBox");
const originalKeysDisplay = document.getElementById("originalKeysDisplay");

if (editorInput) {
    editorInput.addEventListener("input", function() {
        if (originalKeysDisplay) {
            originalKeysDisplay.innerText = this.value.length > 0 ? this.value : "...";
        }
        
        // Seedha translation engine call karo bina kisi error ke
        if (typeof window.updateVisualBoard === "function") {
            window.updateVisualBoard();
        }
    });
}