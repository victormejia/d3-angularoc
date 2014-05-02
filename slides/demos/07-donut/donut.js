var el = d3.select('#chart'),
  margin = {top: 20, right: 10, bottom: 80, left: 40}, // margin used for axis
  elWidth = parseInt(el.style('width'), 10),
  elHeight = parseInt(el.style('height'), 10),
  width = elWidth - margin.right - margin.left,
  height = elHeight - margin.top - margin.bottom,
  fillColor = '#2d323d';

var svg = d3.select("#chart")
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + [width/2 + margin.right * 2, height/2 + margin.top * 2] + ')');

/* Create Viz
----------------------------------------------*/
function arcTween(a) {
  // see: http://bl.ocks.org/mbostock/1346410
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

// generate random data
var data = d3.range(7).map(function() {
  return Math.round(Math.random() * 100);
})

var radius = Math.min(width, height) / 2;

// group of 10 colors
var color = d3.scale.category20();

var pie = d3.layout.pie()
  .sort(null);

var arc = d3.svg.arc()
  .outerRadius(radius)
  .innerRadius(radius *0.6);

var path = svg.selectAll("path")
  .data(pie(data))
.enter().append("path")
  .style("fill", function(d, i) { return color(i) })
  .each(function(d) { this._current = {startAngle: 0, endAngle: 0}; });

// animate the data
path.transition().duration(1000).attrTween('d', arcTween);