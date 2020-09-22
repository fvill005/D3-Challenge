// @TODO: YOUR CODE HERE!
//setting up canvas area to plot chart
var svgWidth = 960;
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

    
d3.csv("data.csv").then(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
});