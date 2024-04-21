// import * as d3 from 'https://esm.sh/d3';
import * as Plot from 'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm';
import { fetchGen1Pokemon, fetchGen1PokemonTypes } from './fetchPokemon.js';

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('loading').innerHTML = 'loading...';

  const typesList = await fetchGen1PokemonTypes();
  const pokemonList = await fetchGen1Pokemon();

  plotExample();

  console.log(typesList);
  console.log(pokemonList);

  document.getElementById('loading').innerHTML = 'loaded!';
});

function plotExample() {
  const plot = Plot.rectY(
    { length: 10000 },
    Plot.binX({ y: 'count' }, { x: Math.random })
  ).plot();
  const div = document.querySelector('#content');
  div.append(plot);
}
