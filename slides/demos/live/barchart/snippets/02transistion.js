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