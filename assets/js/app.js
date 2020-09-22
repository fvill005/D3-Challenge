// @TODO: YOUR CODE HERE!
//setting up canvas area to plot chart
var svgWidth = 1000;
var svgHeight = 500;

//defining margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//creating an svg wrapper and appending svg group that will hold chart and shift it according to margins
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//importing data
d3.csv("assets/data.csv").then(function(data) {
    
    //parsing data as numbers
    data.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
    });
    //creating scale functions 
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(data, d => d.age)])
        .range([0,width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.smokes)])
        .range([height, 0]);
    
    // creating axis functions 
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //appending the axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

        //adding the circles to the chart 
    var circlesGroup = chartGroup.selectAll("circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "cadetblue")
        .attr("opacity", ".5");

        //adding label for y-axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokes");
    //adding label for x-axis
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Age");
  
  
    
}).catch(function(error) {
    console.log(error);
});