import * as d3 from 'https://esm.sh/d3';
import * as Plot from 'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm';

export function getBubblePlot(svg, typesList, pokemonList, width, height) {
  const xPosition = 0;
  const yPosition = 0;

  const pokemonByFirstGenTypes = _getPokemonByType(typesList, pokemonList);
  const pokemonByFirstGenTypesFlat = _getPokemonByTypeFlat(
    pokemonByFirstGenTypes
  );

  console.log(pokemonByFirstGenTypes);
  console.log(pokemonByFirstGenTypesFlat);

  var x = d3
    .scaleOrdinal()
    .domain(typesList)
    .range([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]);

  var node = svg
    .append('g')
    .selectAll('circle')
    .data(pokemonByFirstGenTypesFlat)
    .enter()
    .append('circle')
    .attr('r', 2)
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .style('fill', 'white')
    .attr('stroke', 'black')
    .style('stroke-width', 0.5);

  // Features of the forces applied to the nodes:
  var simulation = d3
    .forceSimulation()
    .force(
      'x',
      d3
        .forceX()
        .strength(0.5)
        .x(function (d) {
          return x(d.type);
        })
    )
    .force(
      'y',
      d3
        .forceY()
        .strength(0.1)
        .y(height / 2)
    )
    .force(
      'center',
      d3
        .forceCenter()
        .x(width / 2)
        .y(height / 2)
    ) // Attraction to the center of the svg area
    .force('charge', d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
    .force('collide', d3.forceCollide().strength(0.1).radius(3).iterations(1)); // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation.nodes(pokemonByFirstGenTypesFlat).on('tick', function (d) {
    node
      .attr('cx', function (d) {
        return d.x;
      })
      .attr('cy', function (d) {
        return d.y;
      });
  });

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

function _getPokemonByType(typesList, pokemonList) {
  const pokemonByType = d3.flatGroup(
    pokemonList,
    (data) => data.types[0],
    (data) => data.types[1] ?? 'none'
  );

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

  return pokemonByFirstGenTypes;
}

function _getPokemonByTypeFlat(pokemonByType) {
  const flatPokemonByType = [];

  for (let i = 0; i < pokemonByType.length; i++) {
    const currentPokemonByType = pokemonByType[i];

    for (let j = 0; j < currentPokemonByType.pokemon.length; j++) {
      flatPokemonByType.push({
        type: currentPokemonByType.type,
        pokemon: currentPokemonByType.pokemon[j],
      });
    }
  }

  return flatPokemonByType;
}
