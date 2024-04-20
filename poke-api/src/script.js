// import * as d3 from 'https://esm.sh/d3';

const pokeAPIBaseUrl = 'https://pokeapi.co/api/v2';
const getGen1PokemonSuffix = '/pokemon?limit=151';
const getGen1PokemonUrl = `${pokeAPIBaseUrl}${getGen1PokemonSuffix}`;

document.addEventListener('DOMContentLoaded', async () => {
  const pokemonList = await fetchGen1Pokemon();

  document.getElementById('pokemonNameArray').innerHTML = pokemonList;
});

async function fetchGen1Pokemon() {
  let pokemonList = [];

  const response = await fetch(getGen1PokemonUrl);

  const responseJson = await response.json();
  const pokemonResults = responseJson.results;
  for (let i = 0; i < pokemonResults.length; i++) {
    const currentPokemon = pokemonResults[i];

    console.log(currentPokemon);

    pokemonList.push(currentPokemon.name);
  }

  return pokemonList;
}
