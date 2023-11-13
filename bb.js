console.log("BB РєРѕРґС‹ СЃ РєР»Р°РІРёР°С‚СѓСЂС‹ РІРєР»СЋС‡РµРЅС‹");

const keyMappings = {
    KeyQ: {
        startTag: "[quote]",
        endTag: "[/quote]",
    },
    KeyI: {
        startTag: "[i]",
        endTag: "[/i]",
    },
    KeyB: {
        startTag: "[b]",
        endTag: "[/b]",
    },
    KeyS: {
        startTag: "[s]",
        endTag: "[/s]",
    },
    KeyU: {
        startTag: "[u]",
        endTag: "[/u]",
    },
    KeyL: {
        startTag: "[align=left]",
        endTag: "[/align]",
    },
    KeyR: {
        startTag: "[align=right]",
        endTag: "[/align]",
    },
    KeyG: {
        startTag: "[align=center]",
        endTag: "[/align]",
    },
    KeyK: {
        startTag: "[code]",
        endTag: "[/code]",
    },
     KeyN: {
        startTag: "[indent]",
        endTag: "",
    },
    KeyH: {
        startTag: "[hide=999999]",
        endTag: "[/hide]",
    },
    KeyM: {
        startTag: "[hr]",
        endTag: "",
    },
    BracketRight: {
        startTag: "<a href=''>",
        endTag: "</a>",
    },
    BracketLeft: {
        startTag: "<div>",
        endTag: "</div>",
    },
    Quote: {
        startTag: "<br>",
        endTag: "",
    },
    Slash: {
        startTag: "<p>",
        endTag: "</p>",
    }
};

function updateTextareaValue(textarea, value) {
    textarea.value = value;
}

function setCursorPosition(textarea, position) {
    textarea.selectionStart = position;
    textarea.selectionEnd = position;
}

function handleKeyDown(event) {
    const textarea = document.getElementById("main-reply");
    if (!textarea) {
        return;
    }

    const isCursorInsideTextarea = event.target === textarea;

    if (isCursorInsideTextarea && (event.ctrlKey || event.metaKey) && keyMappings.hasOwnProperty(event.code)) {
        event.preventDefault();

        const keyboardCode = event.code;
        const baseKey = keyMappings[keyboardCode];

        if (baseKey) {
            const startTag = baseKey.startTag;
            const endTag = baseKey.endTag;

            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;

            const selectedText = textarea.value.substring(startPos, endPos);

            let newText;
            if (selectedText.length > 0) {
                newText = textarea.value.slice(0, startPos) + startTag + selectedText + endTag + textarea.value.slice(endPos);
            } else {
                newText = textarea.value.slice(0, startPos) + startTag + endTag + textarea.value.slice(endPos);
            }

            updateTextareaValue(textarea, newText);

            const newCursorPos = startPos + startTag.length + (selectedText.length > 0 ? selectedText.length + endTag.length : 0);
            setCursorPosition(textarea, newCursorPos);
        }
    }
}

document.addEventListener("keydown", handleKeyDown);
