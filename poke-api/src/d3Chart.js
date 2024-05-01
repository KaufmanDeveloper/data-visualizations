import * as d3 from 'https://esm.sh/d3';

export function getBubblePlot(svg, typesList, pokemonList) {
  const width = 640;
  const height = 400;

  const pokemonByType = d3.group(pokemonList, (data) => data.types[0]);

  console.log(pokemonByType);

  const grassTypePokemon = pokemonByType.get('grass');

  console.log(grassTypePokemon);
}
