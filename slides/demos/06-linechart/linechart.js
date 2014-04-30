var el = d3.select('#chart'),
	margin = {top: 20, right: 10, bottom: 80, left: 40}, // margin used for axis
	elWidth = parseInt(el.style('width'), 10),
	elHeight = parseInt(el.style('height'), 10),
	width = elWidth - margin.right - margin.left,
	height = elHeight - margin.top - margin.bottom,
	fillColor = '#2d323d';

var svg = d3.select("#chart")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var mouseTarget = svg.append("rect")
		.attr({
			class: 'mousetarget',
			width: width,
			height: height,
			fill: 'none',
			'pointer-events': 'all'
		});


/* Create Viz
----------------------------------------------*/
var parseDate = d3.time.format("%d-%b-%y").parse;
	bisectDate = d3.bisector(function(d) { return d.date; }).left,
	formatValue = d3.format(",.2f"),
    formatCurrency = function(d) { return "$" + formatValue(d); };

var x = d3.time.scale()
	.range([0, width]);

var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(d3.time.months, 1)
	.tickPadding(7)
   	.tickFormat(d3.time.format("%b"));;

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var line = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });

d3.csv("aapl.csv", function(error, data) {
	data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
	});

	data.sort(function(a, b) {
		return a.date - b.date;
	});

	x.domain([data[0].date, data[data.length - 1].date]);
	y.domain(d3.extent(data, function(d) { return d.close; }));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Price ($)");

	svg.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line)

	mouseTarget.on('mousemove', showTooltip);

	function showTooltip() {
		var coords = d3.mouse(this),
			x0 = x.invert(d3.mouse(this)[0]),
			i = bisectDate(data, x0, 1);
			var d0 = data[i - 1],
			d1 = data[i];
			d = x0 - d0.date > d1.date - x0 ? d1 : d0;
			// focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
			// focus.select("text").text(formatCurrency(d.close));

		svg.select('.linechart-tooltip').remove();

		var tooltip = svg.append('g').attr('class', 'linechart-tooltip');

		tooltip.append("line")
			.attr({
				x1: coords[0], y1: height, x2: coords[0], y2: 0
			});

		tooltip.append('circle')
				.attr('cx', coords[0])
				.attr('cy', y(d.close))
				.attr('r', 3)
				.attr('class', 'inner-circle');

		tooltip.append('circle')
				.attr('cx', coords[0])
				.attr('cy', y(d.close))
				.attr('r', 10)
				.attr('class', 'outer-circle');
	}			
});