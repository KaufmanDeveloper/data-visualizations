import * as d3 from 'https://esm.sh/d3';
import * as Plot from 'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm';

export function getBubblePlot(svg, typesList, pokemonList, width, height) {
  const pokemonByFirstGenTypes = _getPokemonByType(typesList, pokemonList);
  const pokemonByFirstGenTypesFlat = _getPokemonByTypeFlat(
    pokemonByFirstGenTypes
  );

  console.log(pokemonByFirstGenTypes);
  console.log(pokemonByFirstGenTypesFlat);
  console.log(typesList);
  const typeRange = _getRangeArray(typesList, width - 200);
  const typesListAsObjects = _getTypesListAsObject(typesList);

  var xPosition = d3.scaleOrdinal().domain(typesList).range(typeRange);

  var node = svg
    .append('g')
    .selectAll('circle')
    .data(pokemonByFirstGenTypesFlat)
    .enter()
    .append('circle')
    .attr('r', 4)
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .style('fill', 'white')
    .attr('stroke', 'black')
    .style('stroke-width', 0.5);

  var text = svg
    .append('g')
    .selectAll('text')
    .data(typesListAsObjects)
    .enter()
    .append('text')
    .attr('text-anchor', 'end')
    .attr('pointer-events', 'none')
    .attr('dy', width / 2)
    .attr('dx', height / 2)
    .text((data) => data.type);

  // Features of the forces applied to the nodes:
  var simulation = d3
    .forceSimulation()
    .force(
      'x',
      d3
        .forceX()
        .strength(0.5)
        .x(function (d) {
          return xPosition(d.type);
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
    .force('collide', d3.forceCollide().strength(0.1).radius(5).iterations(1)); // Force that avoids circle overlapping

  // Features of the forces applied to the nodes:
  var textSimulation = d3
    .forceSimulation()
    .force(
      'x',
      d3
        .forceX()
        .strength(0.5)
        .x(function (d) {
          return xPosition(d.type);
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
    .force('collide', d3.forceCollide().strength(0.1).radius(5).iterations(1)); // Force that avoids circle overlapping

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

  textSimulation.nodes(typesListAsObjects).on('tick', function (d) {
    text
      .attr('dx', function (d) {
        return d.x;
      })
      .attr('dy', function (d) {
        return d.y;
      });
  });

  // simulation.nodes(pokemonByFirstGenTypesFlat).on('tick', function (d) {
  //   text
  //     .attr('cx', function (d) {
  //       return d.x;
  //     })
  //     .attr('cy', function (d) {
  //       return d.y;
  //     });
  // });

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

function _getRangeArray(typesList, width) {
  const separateAmount = width / typesList.length;
  let currentXPosition = 0;
  let range = [];

  for (let i = 0; i < typesList.length; i++) {
    range.push(currentXPosition);

    currentXPosition += separateAmount;
  }

  return range;
}

function _getTypesListAsObject(typesList) {
  let types = [];

  for (let i = 0; i < typesList.length; i++) {
    types.push({ type: typesList[i] });
  }

  return types;
}
