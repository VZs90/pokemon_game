const selectElement = document.getElementById("select_stat");
let selectedValue = selectElement.value;
const firstpokemon=document.getElementById("pokemon1");
const secondpokemon=document.getElementById("pokemon2");
const battle_btn=document.getElementById("battle_btn");
let pokemonName1 = firstpokemon.value;
let pokemonName2 = secondpokemon.value;


/* battle_btn.addEventListener("click",function(){
  getPokemon(firstpokemon,secondpokemon,selectedValue);
}); */

document.addEventListener("DOMContentLoaded", function() {
  
  if (firstpokemon) {
    firstpokemon.value="Pikachu";
  }
  if (secondpokemon) {
    secondpokemon.value="Bulbasaur";
  }
  /* if (menuElements.length > 0) {
    for (let i = 0; i < menuElements.length; i++) {
      menuElements[i].addEventListener("click", stopAllAnimations);
    }
  } */
  if (battle_btn) {
    battle_btn.addEventListener("click", getPokemon);
  }
  if(selectElement){
    selectElement.addEventListener("change", function() {
      // Az új kiválasztott érték beállítása a selectedValue változóba
      selectedValue = selectElement.value;
      // Ebben a pontban a selectedValue már az új értéket tartalmazza
      console.log(selectedValue); // Opcionális: kiírhatod az új értéket a konzolra
    });
  }
  
});

function themesongAutoplay(){
  const themesong_mp3=document.getElementById("battle_music");
  if (themesong_mp3) {
    themesong_mp3.src = "audio/battle_music.mp3";
    themesong_mp3.volume=0.3;
    themesong_mp3.autoplay = true; // Automatikus lejátszás beállítása
    document.body.appendChild(themesong_mp3);
  }
  
}

function getPokemon(e) {
    pokemonName1 = firstpokemon.value.toLowerCase();
    pokemonName2 =secondpokemon.value.toLowerCase();
    const chosen_stat=selectedValue;
    let stat1_name;
    let stat1_value;
    let stat2_name;
    let stat2_value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName1}`)
      .then((response) => response.json())
      .then((data) => {
        const stats_length=data.stats.length;
        let image_url=data.sprites.other["official-artwork"].front_default;
        
        for (let i = 0; i < stats_length; i++) {
          if (chosen_stat===data.stats[i].stat.name) {
            stat1_name=data.stats[i].stat.name;
            stat1_value=data.stats[i].base_stat;
          }
          /* const statElement = document.createElement("p");
          statElement.textContent = `${statName} : ${baseStat}`;
          statsContainer.appendChild(statElement); */
        }
        document.getElementById("pokemon1_div").innerHTML = `
        <div>
          <img
            src=""
            alt="First pokémon"
            id="pok1"
          />
        </div>
        <br>
        <div class="pokebattle">
          <h1 class="pokemon1_h1">${capitalizeFirstLetter(data.name)}</h1>
          <h1 class="pokemon1_h1">${stat1_name.toUpperCase()} ${stat1_value}</h1>
        </div>`;
        /* const history_p=document.createElement("p");
        history_p.classList.add("history_p");
        history_p.textContent=capitalizeFirstLetter(data.name);
        historyEl.appendChild(history_p);
        const history_p_elements = document.getElementsByClassName("history_p");
        if (history_p_elements.length > 0) {
          const history_p = history_p_elements[0];
          history_p.addEventListener("click", history_p_click);
        }  */
        cacheImage(image_url,"pok1");
      })
      .catch((err) => {
        /* document.querySelector(".pokemonBox").innerHTML = `
        <h4>Pokemon not found 😞</h4>
        `; */
        console.log("Pokemon not found", err);
      });

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName2}`)
      .then((response) => response.json())
      .then((data) => {
        const stats_length=data.stats.length;
        image_url=data.sprites.other["official-artwork"].front_default;
        
        
        
        
        for (let i = 0; i < stats_length; i++) {
          if (chosen_stat===data.stats[i].stat.name) {
            stat2_name=data.stats[i].stat.name;
            stat2_value=data.stats[i].base_stat;
          }
          /* const statElement = document.createElement("p");
          statElement.textContent = `${statName} : ${baseStat}`;
          statsContainer.appendChild(statElement); */
        }

        document.getElementById("pokemon2_div").innerHTML = `
        <div>
          <img
            src=""
            alt="Second pokémon"
            id="pok2"
          />
        </div>
        <br>
        <div class="pokebattle">
          <h1 class="pokemon2_h1">${capitalizeFirstLetter(data.name)}</h1>
          <h1 class="pokemon2_h1">${stat2_name.toUpperCase()} ${stat2_value}</h1>
        </div>`;
        /* 
        const history_p=document.createElement("p");
        history_p.classList.add("history_p");
        history_p.textContent=capitalizeFirstLetter(data.name);
        historyEl.appendChild(history_p);
        const history_p_elements = document.getElementsByClassName("history_p");
        if (history_p_elements.length > 0) {
          const history_p = history_p_elements[0];
          history_p.addEventListener("click", history_p_click);
        } */
        cacheImage(image_url,"pok2");
        let pok1_h1_elems = document.getElementsByClassName("pokemon1_h1");
        let pok2_h1_elems = document.getElementsByClassName("pokemon2_h1");
        if (parseFloat(stat1_value)>parseFloat(stat2_value)) {
          for (var i = 0; i < pok1_h1_elems.length; i++) {
            pok1_h1_elems[i].style.backgroundColor = "green";
            pok1_h1_elems[i].style.color="white";
          }
          for (var i = 0; i < pok2_h1_elems.length; i++) {
            pok2_h1_elems[i].style.backgroundColor = "red";
            pok2_h1_elems[i].style.color="white";
          }
        } else if(parseFloat(stat1_value)<parseFloat(stat2_value)){
          for (var i = 0; i < pok1_h1_elems.length; i++) {
            pok1_h1_elems[i].style.backgroundColor = "red";
            pok1_h1_elems[i].style.color="white";
          }
          for (var i = 0; i < pok2_h1_elems.length; i++) {
            pok2_h1_elems[i].style.backgroundColor = "green";
            pok2_h1_elems[i].style.color="white";
          }
        }
      })
      .catch((err) => {
        /* document.querySelector(".pokemonBox").innerHTML = `
        <h4>Pokemon not found 😞</h4>
        `; */
        console.log("Pokemon not found", err);
      });
      
      e.preventDefault();
      
  }

  function cacheImage(imageUrl,img_id){
    // Ellenőrizzük, hogy a kép már van-e a böngésző cache-ében
    if (localStorage.getItem("cachedImageURL") === imageUrl) {
        // Ha megtaláltuk a képet a cache-ben, használjuk azt
        var cachedImage = document.getElementById(img_id);
        cachedImage.src = localStorage.getItem(img_id);
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
                    localStorage.setItem(img_id, dataUrl);
  
                    // Beállítjuk a kép forrását a letöltött képre
                    var cachedImage = document.getElementById(img_id);
                    cachedImage.src = dataUrl;
                };
                reader.readAsDataURL(blob);
            }
        };
        xhr.send();
    }
  }