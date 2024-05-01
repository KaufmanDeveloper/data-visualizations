import * as d3 from 'https://esm.sh/d3';

import { fetchGen1Pokemon, fetchGen1PokemonTypes } from './fetchPokemon.js';
import { getBubblePlot } from './d3Chart.js';

const width = 1250;
const height = 650;
// Create the color scale.
const color = d3
  .scaleLinear()
  .domain([0, 5])
  .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
  .interpolate(d3.interpolateHcl);

let svg = d3
  .select('#content')
  .append('svg')
  .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
  .attr('width', width)
  .attr('height', height)
  .attr(
    'style',
    `max-width: 100%; height: auto; display: block; margin: 0 -14px; background: ${color(
      0
    )}; cursor: pointer;`
  );

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('loading').innerHTML = 'loading...';

  const typesList = await fetchGen1PokemonTypes();
  const pokemonList = await fetchGen1Pokemon();

  console.log(typesList);
  console.log(pokemonList);

  getBubblePlot(svg, typesList, pokemonList);

  document.getElementById('loading').innerHTML = 'loaded!';
});
