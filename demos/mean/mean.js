var el = d3.select('#chart-mean'),
  margin = {top: 0, right: 0, bottom: 0, left: 0}, // margin used for axis
  elWidth = parseInt(el.style('width'), 10),
  elHeight = parseInt(el.style('height'), 10),
  width = elWidth - margin.right - margin.left,
  height = elHeight - margin.top - margin.bottom,
  fillColor = '#2d323d';

var svg = el
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)


/* Create Viz
----------------------------------------------*/
//var random = d3.random.normal(50, 20);
var data = d3.range(100).map(function () {
  // return Math.round(random());
  return Math.round(Math.random() * 100);
});

var x = d3.scale.linear()
  .domain([0, 100])
  .range([0, width]);

var y = d3.scale.linear()
  .domain([0, height])
  .range([height, 0]);
  
var middleY = y(height/2);

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

var pts = [];

var points = svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
    .attr('cx', function (d) {
      return x(d);
    })
    .attr('cy', y(height))
    .attr('r', 4)
    .attr('fill', 'none')
  .transition()
    .delay(function (d, i) {
      return i * 100;
    })
    .duration(2500)
    .ease('bounce')
    .each('end', function (d) {
      pts.push(d);
      meanDot
        .transition()
        .ease('linear')
        .attr('cx', x(d3.mean(pts)))
        .attr('fill', '#45A1DE')
    })
    .attr('cx', function (d) {
      return x(d);
    })
    .attr('cy', middleY)
    .attr('fill', '#fff');

var mean = d3.mean(data);

var meanDot = svg.append('circle')
  .attr('cx', x(mean))
  .attr('cy', middleY)
  .attr('r', 15)
  .attr('fill', 'none')











