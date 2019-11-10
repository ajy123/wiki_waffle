

var w = window.innerWidth * 8
var h = window.innerHeight + 400


var margin = {
  right: 40,
  left: 40,
  top: 50,
  bottom: 20
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("id", "chart")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)



artist();
function artist(){
  console.log("waffle chart for each artist")
  var numCols = 30;
  d3.json("../data/allart.json", function(error, data) {
      const allData = data
      console.log(allData)
      console.log("data",data[0]['artist']);
      const nest = d3
                  .nest()
                  .key(d => d.artist)
                  .entries(data)

      console.log('nest', nest)
      console.log(nest[0])
      
      for(i= 0; i <nest.length; i++){
      svg.append("text")
        .attr("x",i*750 )
        .attr("y", 0)
        .text(nest[i].key)
        .style("font-weight", "bold")
        .style("font-size", 20)
        .style("font-family", "Helvetica")
        .attr("id", "artists")
      }


      var plots = svg.selectAll("g")
        .data(nest)
        .enter()
        .append("g")
        .attr("transform", function(d,i){
          for(j= 0; j<nest.length; j++){
            if(d.key == nest[j].key){
              return "translate(" + j*750 +"," + ((10)) + ")"
            } 
          }
        }).attr("id", "artiststag")

      plots.selectAll(".rect")
        .data(function(d){ return d.values})
        .enter()
        .append("rect")
        .attr("id", "artiststag")
        .attr("width", 22)
        .attr("height", 22)
        .attr("x", function(d, i){
          var colIndex = i % numCols
          return colIndex * 24
        })
        .attr("y", function(d, i){
          var rowIndex = Math.floor(i/numCols)
          return rowIndex * 24
        })
        .attr("r", 6)
        .style("fill", function(d){ return d.pixel})
        .style("stroke", "none")
        .on("mouseover", function(d){
          div.transition()
            .duration(100)
            .style("opacity", 1)
            var element = d3.select(this)
              element.style("fill", "Black")
              div.html("<span style = 'font-weight: bold'>" 
              + d['title'] + "<br>" + "<img src="+ d.image + "/>" +"</span>" + "<br>" 
              + "<span style = 'font-style: italic'>" 
              + d.year + " " + "(" + d.genre + ")" + "</span>")
              .style("font-family", "Helvetica")
              div.style("visibility", "visible")
              .style("left", (d3.event.pageX - 20) + "px")    
              .style("top", (d3.event.pageY - 35) + "px")
            })
            .on("mousemove", function(d){
              div.style("left", (d3.event.pageX) + "px")    
              .style("top", (d3.event.pageY - 35) + "px")
            })
            .on("mouseout", function(d){
              div.transition()
              .duration(500)
              div.style("visibility", "hidden")
              var element = d3.select(this)
              element.style("fill", d.pixel)
            });

      });
}
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================


// color of year for artist
//change cofyear.py output to obj with artist / title / year / pixel for d3 nest key
const cofyearpp = () => { 
  console.log("pixel of the year for pable picasso")
  var numCols = 30;
  d3.json('pixel_max.json',function(err,data){
    const allData = data
    console.log(allData)
    // console.log(allData['1470'][3]) // to access cof [0] is the pixel data
    
    const nest = d3.nest()
                  .key(d => d['cyear'])
                  .entries(allData)

    console.log(nest)
    for(i= 0; i <nest.length; i++){
      svg.append("text")
        .attr("x",i*250 )
        .attr("y", -30)
        .text(nest[i].key)
        .style("font-weight", "bold")
        .style("font-size", 20)
        .style("font-family", "Helvetica")
        .attr("id", "artists")
      }

    var plots = svg.selectAll("g")
      .data(nest)
      .enter()
      .append("g")
      .attr("transform", function(d,i){
        for(j= 0; j<nest.length; j++){
          if(d.key == nest[j].key){
            return "translate(" + j*250 +"," + ((-10)) + ")"
          } 
        }
      }).attr("id", "cofyear")

      plots.selectAll(".rect")
      .data(function(d){return d.values})
      .enter()
      .append("rect")
      .attr("id", "cofyear")
      .attr("width", 22)
      .attr("height", 22)
      .attr("x", function(d, i){
        var colIndex = i % numCols
        return colIndex * 24
      })
      .attr("y", function(d, i){
        var rowIndex = Math.floor(i/numCols)
        return rowIndex * 24
      })
      .attr("r", 6)
      .style("fill", function(d){return Object.keys(d.pixel)[0]})
      .style("stroke", "none")

///////*** wait for a couple of meta file to finish */
      // see if can get the largest pixel
      const mPixData = (pixData) =>{
        for(let i = 0; i < pixData.length; i++){
          // get the duplicate year
          if(pixData[i].values.length >=2){
            console.log(pixData[i].values)
            // get all the pixel in the duplicate year
            cofyear = []
            for(let j = 0; j < pixData[i].values.length; j ++){
              // cofyear.push(pixData[i].values[j]['pixel'])
              cofyear.push(pixData[i].values[j]['pixel_max_value'])
            }
            console.log(cofyear)
            console.log(Math.max.apply(null,cofyear)) // max value
          }
        }
      }
      
      mPixData(nest)

  })
  
}

// cofyearpp();


// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================


// update();
function update(){
  cosole.log("waffle chart for year")
  // var svg = d3.select("body").transition();
  var numCols = 30;
  d3.json("last.json", function(error, data) {
    const allData = data
    console.log("data",data[0]['style']);
    const nest = d3
                .nest()
                .key(d => d.style)
                .entries(data)

    console.log(nest.length)            
    console.log('nest', nest)
    console.log(nest[0])
    

    for(i= 0; i <nest.length; i++){
      svg.append("text")
        .attr("id", "style")
        .attr("x",i* 750 )
        .attr("y", -30)
        .text(nest[i].key)
        .style("font-weight", "bold")
        .style("font-size", 20)
        .style("font-family", "Helvetica")
    }

    var plots = svg.selectAll("g")
      .data(nest)
      .enter()
      .append("g")
      .attr("transform", function(d,i){
        for(j= 0; j<nest.length; j++){
          if(d.key == nest[j].key){
            return "translate(" + j*750 +"," + ((0)) + ")"
          } 
        }
      })
      .attr("id", "style")

      // .duration(750)
    plots.selectAll(".rect")
      .data(function(d){ return d.values})
      .enter()
      .append("rect")
      .attr("id", "style")
      .attr("width", 22)
      .attr("height", 22)
      .attr("x", function(d, i){
        var colIndex = i % numCols
        return colIndex * 24
      })
      .attr("y", function(d, i){
        var rowIndex = Math.floor(i/numCols)
        return rowIndex * 24
      })
      .attr("r", 6)
      .style("fill", function(d){ return d.pixel})
      .style("stroke", "none")
      // .transition()
      // .duration(750)

      .on("mouseover", function(d){
        div.transition()
          .duration(100)
          .style("opacity", 1)
          var element = d3.select(this)
            element.style("fill", "Black")
            div.html("<span style = 'font-weight: bold'>" 
            + d['title'] + "<br>" + "<img src="+ d.image + "/>" +"</span>" + "<br>" 
            + "<span style = 'font-style: italic'>" 
            + d.year + " " + "(" + d.genre + ")" + "</span>")
            .style("font-family", "Helvetica")
            div.style("visibility", "visible")
            .style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 35) + "px")
          })
          .on("mousemove", function(d){
            div.style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 65) + "px")
          })
          .on("mouseout", function(d){
            div.transition()
            .duration(500)
            div.style("visibility", "hidden")
            var element = d3.select(this)
            element.style("fill", d.pixel)
          });

    });
}


// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================


//color of life --> fix margin and svg 

const maxcforlife = () =>{
        var margin = 100,
            width = screen.width - margin*2,
            height = 50;

        d3.json("last.json", function(error, data) {
        const nest = d3
                    .nest()
                    .key(d => d.artist)
                    .entries(data)

        for(let i = 0; i < nest.length; i ++){
          const svg = d3.select('body')
          .append('svg')
          .attr("width", width)
          .attr("height", screen.height-500)
          .append("g")
          .attr("transform", "translate(" + (margin) + "," + (margin) + ")");
          
          const space = i+1
          const colorRange = []

          function r(a){
            for(let i = 0; i < a.values.length; i ++){
              colorRange.push(a.values[i].pixel)
            }
            return colorRange
          }
          
          const color = d3.scale.linear().range(r(nest[i])).domain(Array.from(Array(r(nest[i]).length),(x,index)=> index + 1))
          // console.log(color(1))
          const x = d3.scale.linear().domain([0,r(nest[i]).length]).range([0,100]);
          const linearGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", `linear-gradient${i}`);
          
          linearGradient.selectAll("g")
              .data(nest[i].values)
              .enter()
              .append('stop')
              .attr("offset",(d,i)=>{
                return x(i)*3+"%"
              }).attr("stop-color",(d,i)=>{
                return d.pixel
              })
          // name of artist$
          svg.append('text')
              .attr("id", "style")
              .attr("x", 0)
              .attr("y", -50*(-space))
              .text(nest[i].key)
              .style("font-weight", "bold")
              .style("font-size", 20)
              .style("font-family", "Helvetica")
          // life in color
          svg.append("rect")
              .attr("x", 0)
              .attr("y", space*100)
              .attr("width", width)
              .attr("height", height)
              .style("fill", `url(#linear-gradient${i})`); 
        };
      })
    }
// maxcforlife();

