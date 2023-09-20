const audioElement = document.getElementById("theme_song");
/* const themesong_mp3=document.getElementById("theme_song");
  if (themesong_mp3) {
    themesong_mp3.src = "audio/pokémon_theme_song.mp3";
    themesong_mp3.volume=0.5;
    themesong_mp3.autoplay = true; // Automatikus lejátszás beállítása
    document.body.appendChild(themesong_mp3);
  } */

const autoplay=true;
let playbtn_clicked=false;

document.addEventListener("DOMContentLoaded",function(){
    if (audioElement) {
        audioElement.addEventListener("play", function() {
            if (playbtn_clicked) {
                playbtn_clicked=false;
            } else {
                playbtn_clicked=true;
            }
        });
    }
    else{
        
    }
    setInterval(checkPlayStatus, 5000);
});


function checkPlayStatus() {
    if (autoplay& !playbtn_clicked && audioElement.currentTime===0) {
        audioElement.src = "audio/pokémon_theme_song.mp3";
        audioElement.volume=0.5;
        audioElement.play();
    }
}

  