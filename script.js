// document.querySelector("#search").addEventListener("click", getPokemon);
const searchButton = document.querySelector("#search");
const pokemonName=document.querySelector("#pokemonName");
// document.querySelector("#pokemonName").value="Pikachu";
const historyEl=document.getElementById("history");
const pokedex_img=document.getElementById("pokedex_img");
const menuElements=document.getElementsByClassName("menu_li");
const animatedTextEl=document.getElementById("mozgokep");

const sound_img=document.getElementById("img_sound");

let sound_on_off=true;


document.addEventListener("DOMContentLoaded", function() {
  
  if (searchButton) {
    searchButton.addEventListener("click", getPokemon);
  }
  if (pokemonName) {
    pokemonName.value="Pikachu";
  }
  /* if (menuElements.length > 0) {
    for (let i = 0; i < menuElements.length; i++) {
      menuElements[i].addEventListener("click", stopAllAnimations);
    }
  } */
  themesongAutoplay();
  webW();
});

function webW(){
  const worker = new Worker('worker.js');

  // Web Worker üzenetek fogadása
  worker.onmessage = function (e) {
    console.log('Web Worker válasza:', e.data);
  };

  // Üzenet küldése a Web Workernek
  worker.postMessage(5); // Példa: küldjük el az 5-öt a Web Workernek
}

function stopTextAnimation(){
  if(animatedTextEl){
    // alert("asd");
    const computedStyle = window.getComputedStyle(animatedTextEl);
    const textAnimationDuration = computedStyle.animationDuration;
    
    setTimeout(function() {
      animatedTextEl.style.animation = "stop";
      animatedTextEl.style.display="absolute";
    }, parseFloat(textAnimationDuration)*1000);
  }
}

function themesongAutoplay(){
  const themesong_mp3=document.getElementById("theme_song");
  if (themesong_mp3) {
    themesong_mp3.src = "audio/pokémon_theme_song.mp3";
    themesong_mp3.volume=0.5;
    themesong_mp3.autoplay = true; // Automatikus lejátszás beállítása
    document.body.appendChild(themesong_mp3);
  }
  
}

/* function muteThemeSong(){
  if (!themesong_mp3.paused && !themesong_mp3.muted) {
    themesong_mp3.muted = true;
    themesong_mp3.paused=true;
  }
}

function playThemeSong(){
  if (themesong_mp3.muted) {
    themesong_mp3.muted = false;
  }
  if(themesong_mp3.paused){
    themesong_mp3.paused=false;
  }
} */

if(sound_img){
  sound_img.addEventListener("click",function(){
    if (sound_on_off) {
      muteThemeSong();
      sound_on_off=false;
      sound_img.src="images/sound_off.png";
    } else {
      playThemeSong();
      sound_on_off=true;
      sound_img.src="images/sound_on.png";
    }
});
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function showBoxShadow() {
  pokedex_img.style.boxShadow = '0 0 10px 5px yellow';
  setTimeout(() => {
    pokedex_img.style.boxShadow = '0 0 0 0 yellow';
}, 200); // 2000 ms = 2 másodperc
}

function getPokemon(e) {
  showBoxShadow();
  scrollHandle();
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      const stats_length=data.stats.length;
      const image_url=data.sprites.other["official-artwork"].front_default;
      
      /* document.querySelector(".pokemonBox").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
          id="cachedImage"
        />
      </div>
      <br>
      <div class="pokemonInfos">
        <h1 id="cached_h1">${capitalizeFirstLetter(data.name)}</h1>
        <p id="cached_p">Type: ${data.types[0].type.name}</p>
      </div>`; */

      document.querySelector(".pokemonBox").innerHTML = `
      <div>
        <img
          src=""
          alt="Pokemon name"
          id="cachedImage"
        />
      </div>
      <br>
      <div class="pokemonInfos">
        <h1 id="cached_h1">${capitalizeFirstLetter(data.name)}</h1>
        <p id="cached_p">Type: ${data.types[0].type.name}</p>
      </div>`;
      
      const statsContainer = document.querySelector(".pokemonInfos");
      for (let i = 0; i < stats_length; i++) {
        const statName = data.stats[i].stat.name;
        const baseStat = data.stats[i].base_stat;
    
        // Létrehozzuk a <p> elemeket és hozzáadjuk a div-hez
        const statElement = document.createElement("p");
        statElement.textContent = `${statName} : ${baseStat}`;
        statsContainer.appendChild(statElement);
      }
      const history_p=document.createElement("p");
      history_p.classList.add("history_p");
      history_p.textContent=capitalizeFirstLetter(data.name);
      historyEl.appendChild(history_p);
      const history_p_elements = document.getElementsByClassName("history_p");
      if (history_p_elements.length > 0) {
        const history_p = history_p_elements[0];
        history_p.addEventListener("click", history_p_click);
      }
      cacheImage(image_url);
    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
      <h4>Pokemon not found 😞</h4>
      `;
      console.log("Pokemon not found", err);
    });
  e.preventDefault();
}

function history_p_click(e){
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      const stats_length=data.stats.length;
      
      document.querySelector(".pokemonBox").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <br>
      <div class="pokemonInfos">
        <h1>${capitalizeFirstLetter(data.name)}</h1>
        <p>Type: ${data.types[0].type.name}</p>
      </div>`;
      
      const statsContainer = document.querySelector(".pokemonInfos");
      for (let i = 0; i < stats_length; i++) {
        const statName = data.stats[i].stat.name;
        const baseStat = data.stats[i].base_stat;
    
        // Létrehozzuk a <p> elemeket és hozzáadjuk a div-hez
        const statElement = document.createElement("p");
        statElement.textContent = `${statName} : ${baseStat}`;
        statsContainer.appendChild(statElement);
      }
      
    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
      <h4>Pokemon not found 😞</h4>
      `;
      console.log("Pokemon not found", err);
    });
  e.preventDefault();
}

function cacheImage(imageUrl){
  // Ellenőrizzük, hogy a kép már van-e a böngésző cache-ében
  if (localStorage.getItem("cachedImageURL") === imageUrl) {
      // Ha megtaláltuk a képet a cache-ben, használjuk azt
      var cachedImage = document.getElementById("cachedImage");
      cachedImage.src = localStorage.getItem("cachedImage");
  } else {
      // Ha a kép nincs a cache-ben, töltsük le és mentsük el
      var xhr = new XMLHttpRequest();
      xhr.open("GET", imageUrl, true);
      xhr.responseType = "blob";

      xhr.onload = function() {
          if (xhr.status === 200) {
              var blob = xhr.response;

              // A blob-ot átalakítjuk Data URL-é, és elmentjük a cache-be
              var reader = new FileReader();
              reader.onload = function() {
                  var dataUrl = reader.result;
                  localStorage.setItem("cachedImageURL", imageUrl);
                  localStorage.setItem("cachedImage", dataUrl);

                  // Beállítjuk a kép forrását a letöltött képre
                  var cachedImage = document.getElementById("cachedImage");
                  cachedImage.src = dataUrl;
              };
              reader.readAsDataURL(blob);
          }
      };
      xhr.send();
  }
}

