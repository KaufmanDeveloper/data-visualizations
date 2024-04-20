// import * as d3 from 'https://esm.sh/d3';

const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

let pokemonList = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch(url).then(async function (response) {
    const responseJson = await response.json();
    const pokemonResults = responseJson.results;
    for (let i = 0; i < pokemonResults.length; i++) {
      const currentPokemon = pokemonResults[i];
      pokemonList.push(currentPokemon.name);
    }

    document.getElementById('pokemonNameArray').innerHTML = pokemonList;
  });
});
