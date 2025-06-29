function jacaEmotesJs__getEmote(a = 0, e = 5) {
    return new Promise((t, c) => {
        let s = document.createElement("canvas"),
            o = s.getContext("2d"),
            n = new Image;
        s.width = 128, s.height = 128, n.onload = function() {
            o.drawImage(n, a % e * 128, 128 * Math.floor(a / e), 128, 128, 0, 0, 128, 128);   
            let c = s.toDataURL();256
            t(c)
        }, n.onerror = function() {
            c(Error("Failed to load image"))
        }, n.src = "static.png"
    })
}
var jacaEmotesJs__emotes = [];

function jacaEmotesJs__initEmotes() {
    jacaEmotesJs__emotes = Array(23);
    for (var a = 0; a < jacaEmotesJs__emotes.length; a++) jacaEmotesJs__emotes[a] = jacaEmotesJs__getEmote(a)
}
var jacaEmotesJs__emoteNames = ["macaMoshi","macaMischief","macaPensive","jacaSoulStare","jacadaM", "jacadaXD", "jacadaNUT", "jacadaPOG", "jacadaPOP", "jacadaShy", "jacadaSob", "jacadaLove", "jacadaBlush", "jacadaLenny", "jacadaPeace", "jacadaSippy", "jacadaGlance", "jacadaHunger", "jacadaScreem", "jacadaStress", "jacadaCRACKED", "jacadaTrolled", "jacadaOMEGANUT"];
async function parseJacaEmotes(a) {
    let e = await Promise.all(jacaEmotesJs__emotes);
    return a.replace(/_([^_]+)_/g, function(a, t) {
        let c = jacaEmotesJs__emoteNames.indexOf(t);
        if (-1 === c) return a;
        {
            let s = e[c];
            return `<img src="${s}" alt="${t}" title="${t}" class="jacadaEmote">`
        }
    })
}
jacaEmotesJs__initEmotes();
var jacaEmotesJs__styleSheet = document.createElement("style");
jacaEmotesJs__styleSheet.innerHTML = `.jacadaEmote {width: 24px;height: 24px;vertical-align: middle;margin: 0;transform: translateY(-12.5%);}`, document.head.appendChild(jacaEmotesJs__styleSheet);