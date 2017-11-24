var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#31ff2f")
    .attr("stroke","black")
    .attr("stroke-width","0.5")   

d3.json("iceland_regions.topo.json", function(error, data) {
	var subunits = topojson.feature(data, data.objects.regions);
	var projection = d3.geoAlbers()
    .center([-1.0, 65])
    .rotate([18, 0])
    .parallels([50, 60])
    .scale(7000)
    .translate([width / 2, height / 2]);
    var path = d3.geoPath()
    .projection(projection);
  
  svg.selectAll(".subunit")
    .data(subunits.features)
    .enter().append("path")
	.attr("class", function(d) { return "subunit"; })
	.attr("d", path)
	/*.on('mouseover', function(d) {
		d3.select(this).attr("fill", "yellow")
	})
	.on('mouseout', function(d) {
		d3.select(this).attr("fill","#31ff2f")
	})	*/
	.on('mousedown', function(d){	
		d3.select(this).attr("fill",randColor);	
	})		
	.on('mouseup', function(d){	
		wait(300);
		d3.select(this).attr("fill","#31ff2f");	

	})
});

	function randColor(){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);

		var color = 'rgb(' + r + ',' + g + ',' + b + ')';
		console.log(color);
		return color;
	}

	var xAndYCalculator = d3.geoAlbers()
		.translate([width / 2, height / 2])
		.center([-1.0, 65])
    	.rotate([18, 0])
    	.parallels([50, 60])
		.scale(6950)

d3.json("towns.json", function(error,town){
	console.log(town);
	svg.selectAll("")
		var towns  = topojson.feature(data,data.features);

})


d3.csv("capitals.csv", function(error,capitals){
		svg.selectAll(".city-circle")
		.data(capitals)
		.enter().append("circle")
		.attr("class", function(d) { return "city-circle"; })
		.attr("fill", "black")
		.attr("r", 5)
		.attr("cx", function(d) {
			var coords = xAndYCalculator([d.long,d.lat])	
			return coords[0];
		})
		.attr("cy", function(d) {
			var coords = xAndYCalculator([d.long,d.lat])
			return coords[1];
		})
		.on('mouseover', function(d) {
			svg.selectAll(".gogn")
			.data(capitals)
			.enter().append("div")
			.attr("class", function(d){ return "gogn"})
			.attr("fill", "#efefef")
			.attr("width", 200)
    		.attr("height", 200)
    		console.log("Something happend");

		})
		.on('mouseout', function(d) {
			d3.select(this).attr("r","5")
		})
});


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}