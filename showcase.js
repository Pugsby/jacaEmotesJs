function setupImagePreview() {
    const previewImg = document.getElementById('imagePreview');
    const imageLinks = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".webp"]');
    imageLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function(e) {
            previewImg.src = this.href;
            previewImg.style.opacity = 1;
        });
        link.addEventListener('mousemove', function(e) {
            previewImg.style.left = (e.clientX + 15) + 'px';
            previewImg.style.top = (e.clientY + 15) + 'px';
        });
        link.addEventListener('mouseleave', function(e) {
            previewImg.style.opacity = 0;
        });
    });
}

function loadEmotesShowcase() {
    // Get the container where we'll add the emotes
    const emotesDiv = document.getElementById('emotesDiv');
    
    // Check if jacaEmotesJs__emoteNames exists (it's defined in jacaEmotes.js)
    if (typeof jacaEmotesJs__emoteNames !== 'undefined') {
        // Loop through each emote name (similar to a for loop in Lua)
        jacaEmotesJs__emoteNames.forEach(function(emoteName) {
            // Create a new div element for each emote demo
            const emoteDemo = document.createElement('div');
            emoteDemo.className = 'emoteDemo';
            
            // Create the HTML content for this emote
            // This is like string concatenation in Lua
            emoteDemo.innerHTML = `
                <p>${emoteName}: </p>
                <p class="parse">_${emoteName}_</p>
            `;
            
            // Add this emote demo to the container
            emotesDiv.appendChild(emoteDemo);
        });
    } else {
        // If the emote names array isn't available, show an error
        emotesDiv.innerHTML = '<p>Error: jacaEmotesJs__emoteNames not found. Make sure jacaEmotes.js is loaded.</p>';
    }
}

function parseAllEmotes() {
    // Find all elements with class "parse" and parse their emotes
    const toParse = document.getElementsByClassName("parse");
    Array.from(toParse).forEach(element => {
        parseJacaEmotes(element.innerHTML)
        .then(result => element.innerHTML = result);
    });
}

function initializePage() {
    // Load the emotes showcase first
    loadEmotesShowcase();
    
    // Then parse all the emotes (including the ones we just added)
    parseAllEmotes();
    
    // Set up image preview functionality
    setupImagePreview();
    
    // Set favicon to the second emote (index 1)
    const favicon = document.getElementById("favicon");
    if (typeof jacaEmotesJs__emotes !== 'undefined' && jacaEmotesJs__emotes[1]) {
        jacaEmotesJs__emotes[1].then(function(emoteDataUrl) {
            favicon.href = emoteDataUrl;
        });
    }
}

// Wait for the page to fully load, then initialize everything
document.addEventListener('DOMContentLoaded', initializePage);

// Also run initialization immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // Still loading, so DOMContentLoaded will fire
} else {
    // Already loaded, run initialization now
    initializePage();
}