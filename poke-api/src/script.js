import * as d3 from 'https://esm.sh/d3';

import { getBubblePlot } from './d3Chart.js';

const width = 1200;
const height = 1000;
// Create the color scale.
const color = d3
  .scaleLinear()
  .domain([0, 5])
  .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
  .interpolate(d3.interpolateHcl);

let svg = d3
  .select('#content')
  .append('svg')
  .attr('viewBox', `0 0 ${width} ${height}`)
  .attr('width', width)
  .attr('height', height);

document.addEventListener('DOMContentLoaded', async () => {
  getBubblePlot(svg, width, height);
});
