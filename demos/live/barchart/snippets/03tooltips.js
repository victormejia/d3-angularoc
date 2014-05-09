// let's create the tooltip

var tooltip = svg.append('g').attr({class: 'tooltip'});
tooltip.append('rect').attr({ height: '30', width: '100' });
tooltip.append('text').attr({ x: 10, y: 20 });

var mouseoutTimeout;

function handleMouseover(d, i) {
  mouseoutTimeout && clearTimeout(mouseoutTimeout);

  var tooltip = svg.select('.tooltip');
  var attr = { transform: 'translate(' + [xScale(d.lang), yScale(d.value) - 35] + ')' };

  if (tooltip.style('visibility') === 'visible') {
    tooltip.transition().duration(300).attr(attr);
  }
  else {
    tooltip.attr(attr);
  }

  tooltip.select('text')
    .text(function () {
      return 'Repos: ' + d.value;
    });

  tooltip.style('visibility', 'visible');
}

function handleMouseout(d, i) {
  mouseoutTimeout = setTimeout(function () {
    svg.select('.tooltip').style('visibility', 'hidden')
  }, 1000);
}