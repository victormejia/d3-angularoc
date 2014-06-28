var el = d3.select('#chart'),
  margin = {top: 40, right: 10, bottom: 80, left: 50}, // margin used for axis
  elWidth = parseInt(el.style('width'), 10),
  elHeight = parseInt(el.style('height'), 10),
  width = elWidth - margin.right - margin.left,
  height = elHeight - margin.top - margin.bottom,
  barWidth = Math.round(width / data.length),
  fillColor = '#2d323d';

var svg = d3.select('#chart').append('svg')
    .attr('width', elWidth)
    .attr('height', elHeight)
  .append("g")
    .attr('transform', 'translate(' + margin.left + "," + margin.top + ')');

/* Create Viz
----------------------------------------------*/








