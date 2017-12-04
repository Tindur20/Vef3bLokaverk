var width = window.innerWidth,
	height = window.innerHeight,
	centered;

var projection = d3.geoAlbers()
    .center([-1.0, 65])
    .rotate([18, 0])
    .parallels([50, 60])
    .scale(7000)
    .translate([width / 2, height / 2]);    

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#31ff2f")
    .attr("stroke","black")
    .attr("stroke-width","0.5");

var g = svg.append("g");
 

d3.json("iceland_regions.topo.json", function(error, data) {
	var subunits = topojson.feature(data, data.objects.regions);	
  svg.selectAll(".subunit")
    .data(subunits.features)
    .enter().append("path")
	.attr("class", function(d) { return "subunit"; })
	.attr("d", path)
	//breyti cursor í pointer þanning að þú vitir hvað þú getur ýtt á
	.style("cursor", "pointer")
	.style("visibility", "Visible")
	//hér er ég að vinna í því að þegar þú ýttir á einhvern hluta á mapinu þá mun það hidda alla aðra hluta á mapinu
	.on('click', function(d){
		clicked;
		console.log("test");
		});	
});
	//þetta er ekkert merkilegt sem mun vera endalaust ég mun taka þetta bráðlega
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
		.scale(6950)//lagaði scale fyrir að púnktarnir fara á réttan stað

//lagaði þetta því ég visi hvað var að eftir að sá lat long í öðru json skrá
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
		//hér er partur sem ég lét í lokaverkefninu
		//þessi partu mun byrta upplýsingar með hover á alla hringina/punktana
		.on('mouseover', function(d) {
			div.transition()
				.duration(500)	
				.style("opacity", 0.9)
			div.html("City: " + d.name + "</br> " + "Population: " + d.population)
				.style("opacity", 0.9)
				.style("left",(d3.event.pageX  - 55) + "px")
				.style("top",(d3.event.pageY - 37)  + "px")    		
		})
		//þetta hiddar allar upplýsingarnar
		.on('mouseout', function(d) {
			div.transition()
				.duration(2000)
				.style('opacity', 0)
        		
		})
});
//þetta er til að hidda upplýsingarnar sem ég mun nota til að byrta þær
var div = d3.select("body").append("div")
	.style("padding","0 10px")
	.style("opacity", 0)
	.attr("class", "tooltip")

//þetta er til að láta allt vera sínilegt þegar þú ert ekki að ýtta á neitt á mapinu
var disappear = d3.select(".subunit")
	.style("position","absolute")
	.style("visibility", "Visible")
	.attr("class", "display")

//þetta þarf ekki að vera hér en ég mun samt hafa það ef ég hef notað það eitthvað.
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
//þetta átti að geta zoomað inn og út eftir 750 mili sec
function clicked(d) {
	 var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}
//virkar ekki
/*	//þetta á að geta dragað um mapið
var zoom = d3.zoom()
  	.on("zoom",function() {
    	g.attr("transform","translate("+d3.event.translate.join(",")+")scale("+d3.event.scale+")")
  });
    
  svg.call(zoom)	*/

 //þegar ég reyni að nota þetta kemur vill að við d3.event.translate.join villan er .join

