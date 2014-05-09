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
// we need to scale
var yScale = d3.scale.linear()
  .domain([0, d3.max(data, function (d) { return d.value})])
  .range([height, 0]);

var xScale = d3.scale.ordinal()
  .domain(data.map(function (d) { return d.lang; }))
  .rangeRoundBands([0, width], 0.1);

// create axis
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom') // place label below tick
  .tickPadding(10); // padding b/n tick and label

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left')
  .tickPadding(10)
  .tickFormat(d3.format('s'));

var xAxisGroup = svg.append('g').attr({
  class : 'axis',
  transform: 'translate(' + [0, height] + ')'
}).call(xAxis)
  .selectAll("text")
    .style('text-anchor', 'end')
    .attr('dx', '-10px')
    .attr('dy', '-11px')
    .attr({
      transform: 'rotate(-90)'
    });

var yAxisGroup = svg.append('g').attr({
  class: 'axis'
}).call(yAxis);

// create visualization
var r = svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr({
    x: function (d, i) {
      return xScale(d.lang)
    },
    y: height,
    height: 0,
    width: xScale.rangeBand(),
    fill: fillColor
  });

r.transition()
  .duration(1500)
  .attr({
    y: function (d, i) {
      return yScale(d.value)
    },
    height: function (d) {
      return height - yScale(d.value)
    }
  })





