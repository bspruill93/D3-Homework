
var svgWidth = 960;
var svgHeight = 500;

var Margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 150
};

var Width = svgWidth - Margin.left - Margin.right;
var Height = svgHeight - Margin.top - Margin.bottom;


var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${Margin.left}, ${Margin.top})`);

var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var texts = d3.select("body").append("div")
   .attr("class","text");

var texts = d3.select("body").append("div")
  .attr("class","yaxis");
  
d3.csv("./assets/data/data.csv").then(function(csvData, error) {
    if (error) throw error;

    csvData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        
    });
    
    var poverty = csvData.map(data => data.poverty);   
  
    var healthcare = csvData.map(data => data.healthcare);
  
  
    var xScale = d3.scaleLinear()
    .domain([d3.min(poverty)-1 , d3.max(poverty)+1])
    .range([0, Width])

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(healthcare)-1 , d3.max(healthcare)+1])
      .range([Height, 0]);
      

    svg.append("text")      
      .attr("x", Width -200 )
      .attr("y", Height + 40 + Margin.bottom)
      .style("text-anchor", "middle")
      .text("Poverty");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", Margin.left - 50)
      .attr("x",0 - (Height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Healthcare");    
      

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .call(leftAxis);
      
    chartGroup.append("g")
      .attr("transform", `translate(0, ${Height})`)
      .call(bottomAxis)
      
    var element = chartGroup.selectAll(".circle")
      .data(csvData)
      .enter()
      .append("circle")
      .attr("r", 15)
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("fill","blue")
      .attr("stroke-width", 5)
      
    
    var texts2 = chartGroup.selectAll(".text").append("g")
      .data(csvData)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare))
      .text(function(d){return d.abbr})
      .style("text-anchor", "middle")

    
})