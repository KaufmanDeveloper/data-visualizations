import * as d3 from "https://esm.sh/d3";

const w = 1250;
const h = 650;
const padding = 40;
const paddingLeft = 80;
const paddingBottom = 60;
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
 
const svg = d3
  .select('#container')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

const tooltip = d3
  .select('#container')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0);

document.addEventListener('DOMContentLoaded', () => {
  d3.json(url)
    .then(json => scaleGraphAndPlotData(json.data))
    .catch(e => console.error(`${e.name}: ${e.message}`));
})
  
const scaleGraphAndPlotData = (ds) => {
  
  const yMax = d3.max(ds, d => d[1]);
  const xMin = new Date(d3.min(ds, d => d[0]));
  const xMax = new Date(d3.max(ds, d => d[0]));
  xMax.setMonth(xMax.getMonth() + 3);
  
  const yScale = d3.scaleLinear([0, yMax],[h - paddingBottom, padding]);
  const xScale = d3.scaleTime([xMin, xMax],[paddingLeft, w - padding]);

  const yCoord = (h - padding - paddingBottom)/2 + padding;
  svg
    .append('g')
    .classed('axis', true)
    .attr('id', 'y-axis')
    .attr('transform', `translate(${paddingLeft},0)`)
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('transform', `translate(${-paddingLeft*3/5},${yCoord})rotate(-90)`)
    .style('text-anchor', 'middle')
    .style('font-size', '18px')
    .text('Quarterly Gross Domestic Product (in Billion)');

  svg 
    .append('g')
    .classed('axis', true)
    .attr('id', 'x-axis')
    .attr('transform', `translate(0,${h-paddingBottom})`)
    .call(d3.axisBottom(xScale));

  const barW = (w - padding*2)/ds.length;
  const bars = svg
    .selectAll('.bar')
    .data(ds)
    .enter()
    .append('rect')
    .classed('bar', true)
    .on('mouseover', (e, d) => {
      const year = d[0].slice(0,4);
      const quarter = Math.ceil(d[0].slice(5,7) / 3);
      const gdp = d3.format(',.1f')(d[1]);
      
      tooltip
        .transition()
        .duration(500)
        .style('opacity', 0.75)
        .attr('data-date', d[0]);

      tooltip.html(`$${gdp} Billion<br>in Q${quarter} of ${year}`);
    })
    .on('mouseout', () => tooltip
        .transition()
        .duration(500)
        .style('opacity', 0)
        .attr('data-date', ''))
    .on('mousemove', (e) => tooltip
        .style('left', (e.pageX + 20) + 'px')
        .style('top', (e.pageY - 20) + 'px'))
    .attr('x', (d) => xScale(new Date(d[0])))
    .attr('y', h-paddingBottom)
    .attr('width', barW)
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .transition()
    .duration(2500)
    .attr('y', d => yScale(d[1]))
    .attr('height', d => h - paddingBottom - yScale(d[1]));

  svg
    .append('text')
    .classed('info', true)
    .attr('x', paddingLeft)
    .attr('y', h - 16)
    .html('for more information visit the <a href="https://www.bea.gov/itable/national-gdp-and-personal-income" target="_blank">NIPA website</a>')
  
}

      