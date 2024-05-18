import * as d3 from 'https://esm.sh/d3';
import * as Plot from 'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm';

export function getBubblePlot(svg, typesList, pokemonList) {
  const width = 640;
  const height = 400;

  const pokemonByType = d3.flatGroup(
    pokemonList,
    (data) => data.types[0],
    (data) => data.types[1] ?? 'none'
  );

  const xPosition = 0;
  const yPosition = 0;

  const pokemonByFirstGenTypes = [];

  for (let i = 0; i < typesList.length; i++) {
    const currentType = typesList[i];
    const pokemonList = [];

    for (let j = 0; j < pokemonByType.length; j++) {
      const currentPokemonTypeGrouping = pokemonByType[j];

      const currentTypeMatchesGrouping =
        currentType === currentPokemonTypeGrouping[0] ||
        currentType === currentPokemonTypeGrouping[1];

      if (currentTypeMatchesGrouping) {
        for (let k = 0; k < currentPokemonTypeGrouping[2].length; k++) {
          const currentPokemonName = currentPokemonTypeGrouping[2][k].name;

          if (!pokemonList.includes(currentPokemonName)) {
            pokemonList.push(currentPokemonName);
          }
        }
      }
    }

    pokemonByFirstGenTypes.push({
      type: currentType,
      pokemon: pokemonList,
    });
  }

  console.log(pokemonByFirstGenTypes);

  // var x = d3.scaleOrdinal().domain(typesList);

  // Practice is below, will remove
  // const n = 10;
  // const marks = [];

  // for (let i = 0; i < n; i++) {
  //   marks.push({
  //     cx: i * 12,
  //     cy: 5,
  //     radius: 4,
  //     label: `Node ${i}`,
  //   });
  // }

  // console.log(marks);

  // const circles = svg
  //   .selectAll('circle')
  //   .data(marks)
  //   .join('circle')
  //   .attr('cx', (data) => data.cx)
  //   .attr('cy', (data) => data.cy)
  //   .attr('r', (data) => data.radius)
  //   .attr('stroke', 'black')
  //   .attr('stroke-width', 0.5)
  //   .attr('fill', 'white')
  //   .text('Example');

  // const text = svg
  //   .selectAll('text')
  //   .attr('pointer-events', 'none')
  //   .attr('text-anchor', 'middle')
  //   .data(marks)
  //   .join('text')
  //   .attr('dx', (data) => data.cx - data.radius * 0.75)
  //   .attr('font-size', (data) => data.radius / 2)
  //   .attr('dy', (data) => data.cy)
  //   .text((data) => data.label);
}
