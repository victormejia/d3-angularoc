var data = [
  { x: 100, y: 110 },
  { x: 83,  y: 43  },
  { x: 92,  y: 28  },
  { x: 49,  y: 74  },
  { x: 51,  y: 10  },
  { x: 25,  y: 98  },
  { x: 77,  y: 30  },
  { x: 20,  y: 83  },
  { x: 11,  y: 63  },
  { x:  4,  y: 55  },
  { x:  0,  y: 0   },
  { x: 85,  y: 100 },
  { x: 60,  y: 40  },
  { x: 70,  y: 80  },
  { x: 10,  y: 20  },
  { x: 40,  y: 50  },
  { x: 25,  y: 31  }
];

var data2 = [
  { x: 90, y: 10 },
  { x: 50,  y: 10  },
  ];


var el = d3.select('#chart'),
  margin = {top: 20, right: 10, bottom: 80, left: 40}, // margin used for axis
  elWidth = parseInt(el.style('width'), 10),
  elHeight = parseInt(el.style('height'), 10),
  width = elWidth - margin.right - margin.left,
  height = elHeight - margin.top - margin.bottom,
  fillColor = '#2d323d',
  radius = 7;

var svg = d3.select('#chart').append('svg')
    .attr('width', elWidth)
    .attr('height', elHeight)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

/* Create Viz
----------------------------------------------*/
var xScale = d3.scale.linear()
  .domain([0, d3.max(data, function (d) { return d.x; }) + 10])
  .range([0, width]);

var yScale = d3.scale.linear()
  .domain([0, d3.max(data, function (d) { return d.y; }) + 10])
  .range([height, 0]);

var xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickPadding(10); //ticks above axis
var yAxis = d3.svg.axis().scale(yScale).orient('left').tickPadding(10);

var circleInitialAttrs = {
  cx: xScale(0),
  cy: yScale(0),
  r: radius
};

var circleAttrs = {
  cx: function (d) { return xScale(d.x); },
  cy: function (d) { return yScale(d.y); },
  r: radius,
  fill: fillColor
};

// append group element
var xAxisGroup = svg.append('g').attr({
  'class': 'axis',
  transform: 'translate(' + [0, height] + ')'
}).call(xAxis);

var yAxisGroup = svg.append('g').attr({
  'class': 'axis'
}).call(yAxis);

// the visualization
var circles = svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
    .attr(circleAttrs);





// setTimeout(function () {

//  // update domain
//  xScale.domain([0, d3.max(data2, function (d) { return d.x; }) + 10]);
//  yScale.domain([0, d3.max(data2, function (d) { return d.y; }) + 10]);

//  xAxisGroup.transition().call(xAxis);
//  yAxisGroup.transition().call(yAxis);

//  var c = svg.selectAll('circle')
//    .data(data2);

//  c.enter().append('circle')
//    .attr(circleInitialAttrs)

//  c.transition()
//    .delay(function (d, i) {
//      return i * 10;
//    })
//    .duration(5000)
//    .ease('elastic')
//    .attr(circleAttrs);

//  c.exit().remove();

// }, 4000);