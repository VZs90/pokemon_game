function getPokemon(pokename) {
    const pokemonName = lowerCaseName(pokename);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        const stats_length=data.stats.length;
        const image_url=data.sprites.other["official-artwork"].front_default;
        
        /* document.querySelector(".pokemonBox").innerHTML = `
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
        </div>`; */
        
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
  }