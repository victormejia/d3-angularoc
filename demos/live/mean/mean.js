var el = d3.select('#chart-mean'),
  margin = {top: 0, right: 0, bottom: 0, left: 0}, // margin used for axis
  elWidth = parseInt(el.style('width'), 10),
  elHeight = parseInt(el.style('height'), 10),
  width = elWidth - margin.right - margin.left,
  height = elHeight - margin.top - margin.bottom,
  fillColor = '#2d323d';

var svg = el
  .append("svg")
    .attr("width", elWidth)
    .attr("height", elHeight)


/* Create Viz
----------------------------------------------*/
var data = d3.range(150).map(function () {
  return Math.round(Math.random() * 100);
});

var x = d3.scale.linear()
  .domain([0, 100])
  .range([0, width]);

var middleY = Math.round(height/2);

// middle axis
svg.append('line')
  .attr({
    x1: 0,
    y1: middleY,
    x2: x(width),
    y2: middleY,
    fill: 'none',
    stroke: '#707070',
    'stroke-width': '2'
  });








