var el = d3.select('#chart'),
  margin = {top: 20, right: 10, bottom: 80, left: 40}, // margin used for axis
  elWidth = parseInt(el.style('width'), 10),
  elHeight = parseInt(el.style('height'), 10),
  width = elWidth - margin.right - margin.left,
  height = elHeight - margin.top - margin.bottom,
  fillColor = '#2d323d';

var svg = d3.select('#chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var mouseTarget = svg.append('rect')
    .attr({
      class: 'mousetarget',
      width: width,
      height: height,
      fill: 'none',
      'pointer-events': 'all'
    });


/* Create Viz
----------------------------------------------*/
var parseDate = d3.time.format('%d-%b-%y').parse;
  // see http://bl.ocks.org/mbostock/3902569
  bisectDate = d3.bisector(function(d) { return d.date; }).left,
  formatValue = d3.format(',.2f'),
  formatCurrency = function(d) { return '$' + formatValue(d); };

var x = d3.time.scale()
  .range([0, width]);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom')
  .ticks(d3.time.months, 1)
  .tickPadding(7)
  .tickFormat(d3.time.format('%b'));;

var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left');

var line = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.close); });

d3.csv('aapl.csv', function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  data.sort(function(a, b) {
    return a.date - b.date;
  });

  x.domain([data[0].date, data[data.length - 1].date]);
  y.domain(d3.extent(data, function(d) { return d.close; }));

  // x-axis
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  // y-axis
  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');

  // stock line chart
  var path = svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

  // animate path
  // src: http://bl.ocks.org/duopixel/4063326
  var totalLength = path.node().getTotalLength();
  path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(700)
      .ease('linear')
      .attr('stroke-dashoffset', 0);

  // tooltip group
  var tooltip = svg.append('g').attr('class', 'linechart-tooltip').style('visibility', 'hidden'),
    tooltipWidth = 130,
    tooltipHeight = 40;
  tooltip.append('line');
  tooltip.append('circle').attr({ r: 3, class: 'inner-circle', 'pointer-events': 'none' });
  tooltip.append('circle').attr({ r: 10, class: 'outer-circle', 'pointer-events': 'none' });
  tooltip.append('rect').attr({ width: tooltipWidth, height: tooltipHeight, 'pointer-events': 'none' });

  var text = tooltip.append('text').attr('pointer-events', 'none')

  mouseTarget.on('mousemove', showTooltip);
  svg.on('mouseleave', function () {
    tooltip.style('visibility', 'hidden')
  });

  function showTooltip() {
    var coords = d3.mouse(this),
      x0 = x.invert(d3.mouse(this)[0]),
      i = bisectDate(data, x0, 1);
      var d0 = data[i - 1],
      d1 = data[i];
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;

    // the values
    var xPos = x(d.date);
    var yPos = y(d.close);

    var tooltip = svg.select('.linechart-tooltip');

    tooltip.select('line').attr({ x1: xPos, y1: height, x2: xPos, y2: 0 });

    tooltip.select('.inner-circle').attr('cx', xPos).attr('cy', yPos)

    tooltip.select('.outer-circle').attr('cx', xPos).attr('cy', yPos)

    var tooltipPos = getTooltipPos({x: xPos, y: yPos});

    tooltip.select('rect').attr({ x: tooltipPos.x, y: tooltipPos.y});

    var text = tooltip.select('text');
    text.selectAll('tspan').remove();

    text.attr('x', tooltipPos.x + 10).attr('y', tooltipPos.y + 15);

    text.append('tspan')
      .attr('text-anchor', 'start')
      .text(function () {
        return d3.time.format('%a, %b %d %Y')(d.date);
      })
    text.append('tspan')
      .attr('dy', 16)
      .attr('dx', -96)
      .attr('text-anchor', 'start')
      .text(function () {
        return 'Price: ' + formatCurrency(d.close);
      })

    tooltip.style('visibility', 'visible');
  }

  function getTooltipPos(pos) {
    // check right boundary
    if ((pos.x + Math.round(tooltipWidth / 2)) > width) {
      return {
        x: pos.x - tooltipWidth - 20,
        y: pos.y - Math.round(tooltipHeight / 2)
      };
    }

    // check top boundary
    if ((pos.y - tooltipHeight) < 0 ) {
      return {
        x: pos.x - Math.round(tooltipWidth / 2),
        y: pos.y + Math.round(tooltipHeight / 2)
      };
    }

    // check left boundary
    if ((pos.x - Math.round(tooltipWidth / 2)) < 0) {
      return {
        x: pos.x + 20,
        y: pos.y - Math.round(tooltipHeight / 2)
      }
    }

    return {
      x: pos.x - Math.round(tooltipWidth / 2),
      y: pos.y - tooltipHeight - 20
    };
  }
});