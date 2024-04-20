import * as d3 from 'https://esm.sh/d3';
import { fetchGen1Pokemon, fetchGen1PokemonTypes } from './fetchPokemon.js';

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('pokemonNameArray').innerHTML = 'loading...';

  const typesList = await fetchGen1PokemonTypes();
  const pokemonList = await fetchGen1Pokemon();

  console.log(typesList);
  console.log(pokemonList);

  document.getElementById('pokemonNameArray').innerHTML = 'loaded!';
});
