import * as d3 from 'https://esm.sh/d3';
import { pokemonByTypeFlat, types } from './data/pokemon-gen-1.js';

export function getBubblePlot(svg, width, height) {
  const xTypeRange = _getXRangeArray(types);
  const yTypeRange = _getYRangeArray(types);

  var xPosition = d3.scaleOrdinal().domain(types).range(xTypeRange);
  var yPosition = d3.scaleOrdinal().domain(types).range(yTypeRange);

  const separationAmount = 18;

  var node = svg
    .append('g')
    .selectAll('text')
    .data(pokemonByTypeFlat)
    .enter()
    .append('text')
    .attr('x', width / 2)
    .attr('y', height / 2)
    .attr('fill', (d) => d.color)
    .attr('cursor', 'pointer')
    .text((d) => d.pokemon)
    .call(
      d3
        .drag() // call specific function when circle is dragged
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

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
        .y(function (d) {
          return yPosition(d.type);
        })
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
      d3.forceCollide().strength(0.1).radius(separationAmount).iterations(1)
    ); // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation.nodes(pokemonByTypeFlat).on('tick', function (d) {
    node
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y;
      });
  });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  }
}

function _getXRangeArray(typesList) {
  const separateAmount = 200;
  let currentXPosition = 0;
  let range = [];
  let rowCounter = 0;

  for (let i = 0; i < typesList.length; i++) {
    range.push(currentXPosition);

    rowCounter++;
    currentXPosition += separateAmount;

    if (rowCounter >= 5) {
      currentXPosition = 0;
      rowCounter = 0;
    }
  }

  return range;
}

function _getYRangeArray(typesList) {
  const separateAmount = 300;

  let currentYPosition = 0;
  let range = [];
  let rowCounter = 0;

  for (let i = 0; i < typesList.length; i++) {
    range.push(currentYPosition);

    rowCounter++;

    if (rowCounter >= 5) {
      currentYPosition += separateAmount;
      rowCounter = 0;
    }
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
