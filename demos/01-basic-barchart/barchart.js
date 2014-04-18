var data = [
	{ category: "HTML5", value: 11},
	{ category: "HTML", value: 100},
	{ category: "JavaScript", value: 53},
	{ category: "CSS", value: 51},
	{ category: "SQL", value: 83},
	{ category: "Java", value: 91},
	{ category: "Python", value: 49},
	{ category: "C", value: 43},
	{ category: ".NET Framework", value: 45},
	{ category: "ASP.NET", value: 18},
	{ category: "C#", value: 28 },
	{ category: "PHP", value: 39},
	{ category: "C++", value: 21},
	{ category: "Ruby", value: 12},
	{ category: "R", value: 33},
	{ category: "D", value: 18},
	{ category: "Data definition language", value: 13},
	{ category: "MATLAB", value: 25},
	{ category: "XML", value: 23},
	{ category: "Visual Basic", value: 21},
];

var w = window.innerWidth,
	h = window.innerHeight,
	margin = 40,
	svgWidth = w - margin *2,
	svgHeight = h - margin * 2,
	barWidth = Math.round(svgWidth / data.length),
	fillColor = '#2d323d';

var svg = d3.select('.chart')
	.append('svg')
	.attr({
		width: w - margin * 2,
		height: h - margin * 2
	})

//create visualization
var r = svg.selectAll('rect')
	.data(data)
	.enter()
	.append('rect')
	.attr({
		x: function (d, i) {
			return i * barWidth;
		},
		y: function (d, i) {
			return svgHeight - d.value;
		},
		height: function (d) {
			return d.value
		},
		width: barWidth,
		fill: fillColor
	})



// // we need to scale
// var heightScale = d3.scale.linear()
// 	.domain([0, d3.max(data, function (d) { return d.value})])
// 	.range([0, svgHeight])


// var xScale = d3.scale.ordinal()
// 	.domain(data.map(function (d) { return d.category; }))
// 	.rangeRoundBands([0, svgWidth], 0.1);

// // create visualization
// var r = svg.selectAll('rect')
// 	.data(data)
// 	.enter()
// 	.append('rect')
// 	.attr({
// 		x: function (d, i) {
// 			return xScale(d.category)
// 		},
// 		y: function (d, i) {
// 			return svgHeight - heightScale(d.value);
// 		},
// 		height: function (d) {
// 			return heightScale(d.value);
// 		},
// 		width: xScale.rangeBand(),
// 		fill: fillColor
// 	})