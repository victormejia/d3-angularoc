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