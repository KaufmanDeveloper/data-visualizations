import * as d3 from 'https://esm.sh/d3';
import * as Plot from 'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm';

export function getBubblePlot(svg, typesList, pokemonList) {
  const width = 640;
  const height = 400;

  const pokemonByType = d3.group(
    pokemonList,
    (data) => data.types[0],
    (data) => data.types[1]
  );

  console.log(pokemonByType);

  const pokemonByFirstType = pokemonByType.get(typesList[0]);

  console.log(pokemonByFirstType);

  // Practice is below, will remove
  const n = 20;
  const marks = [];

  for (let i = 0; i < n; i++) {
    marks.push({
      y: i * 3,
      width: 20,
      height: 2,
    });
  }

  console.log(marks);

  const rectangles = svg
    .selectAll('rect')
    .data(marks)
    .join('rect')
    .attr('y', (data) => data.y)
    .attr('width', (data) => data.width)
    .attr('height', (data) => data.height);

  console.log(rectangles);

  // svg
  //   .selectAll('circle')
  //   .data(pokemonByType)
  //   .join('circle')
  //   // set the attributes for the circles based on the data
  //   .attr('fill', 'green')
  //   // this function syntax works too
  //   // it behaves the same as the above arrow functions
  //   .attr('r', function (circ) {
  //     return circ.radius;
  //   });
}
