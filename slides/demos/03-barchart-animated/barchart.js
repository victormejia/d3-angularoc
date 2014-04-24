// var data = [
// 	{ category: "HTML5", value: 11},
// 	{ category: "HTML", value: 100},
// 	{ category: "JavaScript", value: 53},
// 	{ category: "CSS", value: 51},
// 	{ category: "SQL", value: 83},
// 	{ category: "Java", value: 91},
// 	{ category: "Python", value: 49},
// 	{ category: "C", value: 43},
// 	{ category: ".NET Framework", value: 45},
// 	{ category: "ASP.NET", value: 18},
// 	{ category: "C#", value: 28 },
// 	{ category: "PHP", value: 39},
// 	{ category: "C++", value: 21},
// 	{ category: "Ruby", value: 12},
// 	{ category: "R", value: 33},
// 	{ category: "D", value: 18},
// 	{ category: "DDL", value: 13},
// 	{ category: "MATLAB", value: 25},
// 	{ category: "XML", value: 23},
// 	{ category: "Visual Basic", value: 21},
// ];

var el = d3.select('#chart'),
	margin = {top: 20, right: 10, bottom: 80, left: 40}, // margin used for axis
	elWidth = parseInt(el.style('width'), 10),
	elHeight = parseInt(el.style('height'), 10),
	width = elWidth - margin.right - margin.left,
	height = elHeight - margin.top - margin.bottom,
	barWidth = Math.round(width / data.length),
	fillColor = '#2d323d';

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// we need to scale
var yScale = d3.scale.linear()
	.domain([0, d3.max(data, function (d) { return d.value})])
	.range([height, 0])

var xScale = d3.scale.ordinal()
	.domain(data.map(function (d) { return d.lang; }))
	.rangeRoundBands([0, width], 0.1);

// create axis
var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom") // place label below tick
	.tickPadding(10); // padding b/n tick and label

var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.tickPadding(10)
	.tickFormat(d3.format("s"));

var xAxisGroup = svg.append("g").attr({
	class : 'axis',
	transform: 'translate(' + [0, height] + ')'
}).call(xAxis)
	.selectAll("text")
	   .style("text-anchor", "end")
    .attr("dx", "-10px")
    .attr("dy", "-11px")
	.attr({
		transform: 'rotate(-90)'
	})

var yAxisGroup = svg.append('g').attr({
	class: 'axis',
	transform: 'translate(' + [0, 0] + ')'
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
	.duration(700)
	.attr({
		y: function (d, i) {
			return yScale(d.value)
		},
		height: function (d) {
			return height - yScale(d.value)
		}
	})





