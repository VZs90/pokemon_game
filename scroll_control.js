// Az elem kiválasztása
var myDiv = document.getElementById("history");

document.addEventListener("DOMContentLoaded", function() {
    scrollHandle();
});

function scrollHandle(){
    if (myDiv) {
            // A tartalom és az elem méretének összehasonlítása
        if (myDiv.scrollHeight > myDiv.clientHeight) {
            // Ha a tartalom nagyobb, mint az elem, akkor beállítjuk az overflow: scroll; tulajdonságot
            myDiv.classList.add("scrollable");
            myDiv.style.overflowX="hidden";
            myDiv.style.overflowY="visible";
        } else {
            // Ha a tartalom nem nagyobb, mint az elem, akkor eltávolítjuk az overflow: scroll; tulajdonságot
            myDiv.classList.remove("scrollable");
            myDiv.style.overflowX="hidden";
            myDiv.style.overflowY="hidden";
        }
    }
    
}
