
var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
];
var graphWidth = 1200 - 20;
var graphHeight = 500 - 20;

d3.json(url, function (error, json){
//json data details
var minDate = new Date(json.data[0][0]);
var maxDate = new Date(json.data[json.data.length - 1][0]);
//==================================================================
var svg = d3.select("body").append("svg")
          .attr("height", graphHeight)
          .attr("width", graphWidth);

//X axis
var xScale = d3.time.scale()
  .domain([minDate, maxDate])
  .range([0, 1000]);

var xAxisSvg = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(d3.time.years, 5);

var xAxis = svg.append('g')
  .call(xAxisSvg)
  .attr({
    'class':'axis',
    'transform': 'translate(50, ' + (graphHeight-20) + ')'
  })
  .append('text')
  .attr('class', 'gdp')
  .attr('transform', 'rotate(0)')
  .attr('x', 400)
  .attr('y', -400)
  .attr('dy', '2em')
  .style('text-anchor', 'end')
  .text('USA Gross Domestic Product');


// Y axis
var yScale = d3.scale.linear()
  .domain([0, 20000])
  .range([graphHeight, 0]);

var yAxisSvg = d3.svg.axis()
  .scale(yScale)
  .orient('left');

var yAxis = svg.append('g')
  .call(yAxisSvg)
  .attr({
    'class': 'axis',
    'transform': 'translate(55, -20)'
  });

    svg.selectAll('rect')
       .data(json.data)
       .enter()
       .append('rect')
       .attr("class", "bar")
       .attr({
         x: function(d, i) {
           return i * (1000 / json.data.length);
         },
         y: function(d, i) {
           return graphHeight - ( (graphHeight * d[1]) / 20000 );
         },
         width: (graphWidth / json.data.length),
         height: function(d) {
           return ( (graphHeight * d[1]) / 20000 );
         },
         transform: 'translate(50, -20)',
         fill: 'purple'
       })
       .on('mouseover', function(d) {
          var xCoordinate = parseFloat(d3.select(this).attr("x"));
          (xCoordinate > 1000) ? xCoordinate = 200 : xCoordinate;
          (xCoordinate < 50) ? xCoordinate = 50 : xCoordinate;
          var yCoordinate = parseFloat(d3.select(this).attr("y")) / 3 + graphHeight / 2;
          var thisDate = new Date(d[0]);
          d3.select("#tooltip")
            .style("left", xCoordinate + "px")
            .style("top", yCoordinate + "px")
            .select("#value")
              .html('<strong>$'+d[1].toLocaleString()+' Billion</strong><p>'+thisDate.getFullYear()+' - '+monthNames[thisDate.getMonth()]+'</p>');
          d3.select("#tooltip").classed("hidden", false);
         })
         .on('mouseout', function(d) {
           d3.select('#tooltip').classed("hidden", true);
         });



}); //d3.json
