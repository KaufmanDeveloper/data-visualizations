import * as d3 from 'https://esm.sh/d3';

export function getBubblePlot(svg, typesList, pokemonList, width, height) {
  const pokemonByFirstGenTypes = _getPokemonByType(typesList, pokemonList);
  const pokemonByFirstGenTypesFlat = _getPokemonByTypeFlat(
    pokemonByFirstGenTypes
  );

  const typeRange = _getRangeArray(typesList, width - 200);

  var xPosition = d3.scaleOrdinal().domain(typesList).range(typeRange);

  const radius = 6;

  var node = svg
    .append('g')
    .selectAll('circle')
    .data(pokemonByFirstGenTypesFlat)
    .enter()
    .append('circle')
    .attr('r', radius)
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .style('fill', (d) => d.color)
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
    .force(
      'collide',
      d3
        .forceCollide()
        .strength(0.1)
        .radius(radius + 1)
        .iterations(1)
    ); // Force that avoids circle overlapping

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
        color: _getColorByType(currentPokemonByType.type),
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

function _getColorByType(type) {
  let colorHex = 'white';

  switch (type) {
    case 'normal':
      colorHex = '#A8A77A';
      break;
    case 'fire':
      colorHex = '#EE8130';
      break;
    case 'water':
      colorHex = '#6390F0';
      break;
    case 'electric':
      colorHex = '#F7D02C';
      break;
    case 'grass':
      colorHex = '#7AC74C';
      break;
    case 'ice':
      colorHex = '#96D9D6';
      break;
    case 'fighting':
      colorHex = '#C22E28';
      break;
    case 'poison':
      colorHex = '#A33EA1';
      break;
    case 'ground':
      colorHex = '#E2BF65';
      break;
    case 'flying':
      colorHex = '#A98FF3';
      break;
    case 'psychic':
      colorHex = '#F95587';
      break;
    case 'bug':
      colorHex = '#A6B91A';
      break;
    case 'rock':
      colorHex = '#B6A136';
      break;
    case 'ghost':
      colorHex = '#735797';
      break;
    case 'dragon':
      colorHex = '#6F35FC';
      break;
  }

  return colorHex;
}
