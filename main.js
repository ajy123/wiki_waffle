// import * as dat from 'dat.gui';
//color block with artists life color

// var w =  screen.width + 4000
// var h = screen.height + 400


// var margin = {
//   right: 40,
//   left: 40,
//   top: 50,
//   bottom: 20
// }

// var width = w - margin.right - margin.left;
// var height = h - margin.top - margin.bottom;

// var svg = d3.select("body")
//   .append("svg")
//   .attr("id", "chart")
//   .attr("width", w)
//   .attr("height", h)
//   .append("g")
//   .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

// var div = d3.select("body")
//         .append("div")
//         .attr("class", "tooltip")
//         .style("opacity", 0)



// artist();
function artist(){
  console.log("waffle chart for each artist")
  var numCols = 30;
  d3.json("last.json", function(error, data) {
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
              return "translate(" + j*750 +"," + ((-10)) + ")"
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

// //////-------- use web gl in three js for shader material

// window.addEventListener('load', init, false);

// function init() {
//   createWorld();
//   createPrimitive();
//   createGUI();
//   //---
//   animation();
// }

// //--------------------------------------------------------------------

// var scene, camera, renderer, container;
// var start = Date.now();
// var _width, _height;
// function createWorld() {
//   _width = window.innerWidth;
//   _height= window.innerHeight;
//   //--- SET SCENE
//   scene = new THREE.Scene();
//   // scene.background = new THREE.Color("rgb(0, 0, 0)");
//   scene.background = new THREE.Color();

//   //---
//   camera = new THREE.PerspectiveCamera(55, _width/_height, 1, 1000);
//   camera.position.z = 12;
//   //---
//   renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
//   renderer.setSize(_width, _height);
//   //---
//   container = document.getElementById("container");
//   container.appendChild(renderer.domElement);
//   // canvas = container
//   //---
//   window.addEventListener('resize', onWindowResize, false);
// }

// function onWindowResize() {
//   _width = window.innerWidth;
//   _height = window.innerHeight;
//   renderer.setSize(_width, _height);
//   camera.aspect = _width / _height;
//   camera.updateProjectionMatrix();
//   console.log('- resize -');
// }

// //--------------------------------------------------------------------
// var mat;
// var primitiveElement = function() {
//   this.mesh = new THREE.Object3D();
//   mat = new THREE.ShaderMaterial( {
//     // wireframe: false,
//     // fog: true,
//     uniforms: {
//       time: {
//         type: "f",
//         value: 0.0
//       },
//       pointscale: {
//         type: "f",
//         value: 0.0
//       },
//       decay: {
//         type: "f",
//         value: 0.0
//       },
//       complex: {
//         type: "f",
//         value: 0.0
//       },
//       waves: {
//         type: "f",
//         value: 0.0
//       },
//       // eqcolor: {
//       //   type: "f",
//       //   value: 0
//       // },
//       fragment: {
//         type: "i",
//         value: true
//       },
//       redhell: {
//         type: "f",
//         value: 0.0
//       }
//     },
//     vertexShader: document.getElementById( 'vertexShader' ).textContent,
//     // vertexColors: THREE.Color("rgb(255,0,0)"),
//     fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    
//   });
  
//   var geo = new THREE.IcosahedronBufferGeometry(3, 7);
//   // geo.vertexColors[0] = new THREE.Color("rgb(255,0,0)");
//   // geo.vertexColors[1] = new THREE.Color("rgb(0,255,0)");
//   // geo.vertexColors[2] = new THREE.Color("rgb(0,0,255)");
//   var mesh = new THREE.Points(geo, mat);
//   console.log(mat);
//   //---
//   this.mesh.add(mesh);
// }


// var _primitive;
// function createPrimitive() {
//   _primitive = new primitiveElement();
//   scene.add(_primitive.mesh);
// }

// //--------------------------------------------------------------------

// var options = {
//   perlin: {
//     vel: 0.02,
//     speed: 0.00050,
//     perlins: 1.0,
//     decay: 0.10,
//     complex: 0.30,
//     waves: 20.0,
//     // eqcolor: 11,
//     fragment: true,
//     redhell: 1.0
//   },
//   spin: {
//     sinVel: 0.0,
//     ampVel: 80.0,
//   }
// }

// function createGUI() {
//   var gui = new dat.GUI();
//   var perlinGUI = gui.addFolder('Setup Perlin Noise');
//   perlinGUI.add(options.perlin, 'perlins', 1.0, 5.0).name('Size').step(1);
//   perlinGUI.add(options.perlin, 'speed', 0.00000, 0.00050).name('Speed').listen();
//   perlinGUI.add(options.perlin, 'decay', 0.0, 1.00).name('Decay').listen();
//   perlinGUI.add(options.perlin, 'waves', 0.0, 20.00).name('Waves').listen();
//   perlinGUI.add(options.perlin, 'fragment', true).name('Fragment');
//   perlinGUI.add(options.perlin, 'complex', 0.1, 1.00).name('Complex').listen();
//   perlinGUI.add(options.perlin, 'redhell', 0.0).name('Electroflow');
//   // perlinGUI.add(options.perlin, 'eqcolor', 0.0, 15.0).name('Hue').listen();
//   perlinGUI.open();
// }

// //--------------------------------------------------------------------

// function animation() {
//   requestAnimationFrame(animation);
//   var performance = Date.now() * 0.003;
  
//   _primitive.mesh.rotation.y += options.perlin.vel;
//   _primitive.mesh.rotation.x = (Math.sin(performance * options.spin.sinVel) * options.spin.ampVel )* Math.PI / 180;
//   //---
//   mat.uniforms['time'].value = options.perlin.speed * (Date.now() - start);
//   mat.uniforms['pointscale'].value = options.perlin.perlins;
//   mat.uniforms['decay'].value = options.perlin.decay;
//   mat.uniforms['complex'].value = options.perlin.complex;
//   mat.uniforms['waves'].value = options.perlin.waves;
//   // mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
//   mat.uniforms['fragment'].value = options.perlin.fragment;
//   mat.uniforms['redhell'].value = options.perlin.redhell;
//   // console.log(mat.uniforms['eqcolor'].value);
//   //---
//   camera.lookAt(scene.position);
//   renderer.render(scene, camera);
// }

// //electro flow off is !redhell == true
// //black = 0.1 
// //white = 0.9 
// //try out with an array of color: 
// console.log(209/255);
// console.log(182/255);
// console.log(127/255);
// // 0.8196078431372549
// // 0.7137254901960784
// // 0.4980392156862745
// //#d1b67f --> rgb(209,182,127)
// //#2b2b2b --> rgb(43,43,43)
// console.log(43/255);
// //0.16862745098039217
// //#494d59 --> rgb(73,77,89)
// console.log(73/255);
// //0.28627450980392155 
// console.log(77/255);
// //0.30196078431372547
// console.log(89/255);
// //0.34901960784313724

// // org color for fragment shader: 
// // r = cos(qnoise + 0.5);
// // g = cos(qnoise - 0.5);
// // b = abs(qnoise);

// // https://stackoverflow.com/questions/26092600/sending-javascript-variables-to-fragment-shader
// // https://thebookofshaders.com/12/
// // https://thebookofshaders.com/07/
// // https://stackoverflow.com/questions/17537879/in-webgl-what-are-the-differences-between-an-attribute-a-uniform-and-a-varying
// // https://learnopengl.com/Getting-started/Shaders

// //////-------- end of using web gl in three js for shader material


class Noise {
  static lerp(t, a, b) {
    return a + t * (b - a);
  }
  static grad2d(i, x, y) {
    const v = (i & 1) === 0 ? x : y;
    return (i & 2) === 0 ? -v : v;
  }
  constructor(octaves = 1) {
    this.p = new Uint8Array(512);
    this.octaves = octaves;
    this.init();
  }
  init() {
    for (let i = 0; i < 512; ++i) {
      this.p[i] = Math.random() * 256;
    }
  }
  noise2d(x2d, y2d) {
    const X = Math.floor(x2d) & 255;
    const Y = Math.floor(y2d) & 255;
    const x = x2d - Math.floor(x2d);
    const y = y2d - Math.floor(y2d);
    const fx = (3 - 2 * x) * x * x;
    const fy = (3 - 2 * y) * y * y;
    const p0 = this.p[X] + Y;
    const p1 = this.p[X + 1] + Y;
    return Noise.lerp(
      fy,
      Noise.lerp(
        fx,
        Noise.grad2d(this.p[p0], x, y),
        Noise.grad2d(this.p[p1], x - 1, y)
      ),
      Noise.lerp(
        fx,
        Noise.grad2d(this.p[p0 + 1], x, y - 1),
        Noise.grad2d(this.p[p1 + 1], x - 1, y - 1)
      )
    );
  }
  noise(x, y) {
    let e = 1,
        k = 1,
        s = 0;
    for (let i = 0; i < this.octaves; ++i) {
      e *= 0.5;
      s += e * (1 + this.noise2d(k * x, k * y)) / 2;
      k *= 2;
    }
    return s;
  }
}



var width = 960,
height = 500
var canvas = d3.select("body")
.append("canvas")
.attr({width: width, height: height});

var context = canvas.node().getContext("2d");

// context.moveTo(75, 50);
// context.lineTo(100, 75);
// context.lineTo(100, 25);
// context.closePath();

const perlin = new Noise(3);
const period = 0.01
context.fillStyle = "rgb(255,255,255)";
context.fillRect(-1, -1, width, height);

const scl = 20;
const inc = 0.01 
const cols = Math.floor(width/scl);
const rows = Math.floor(height/scl);
var zoff = 0; 

for(let x = 0; x < cols; x++){
  var xoff = 0; 
  for(let y = 0; y < rows; y ++){
    var yoff = 0; 
    var index = (x+y*width)*5
    var n = perlin.noise(xoff * period, yoff * period);
    xoff += inc; 
    //  draw a line in each rect

    //https://www.youtube.com/watch?v=BjoM9oKOAKY 
    context.fillStyle = `rgb(${x * 5 + n}, ${y * 5 + n}, ${(x+y + n) * 50})`
    context.strokeRect(x*scl,y*scl,scl*2,scl*2);
    // rotate the line in the grid
  }
  yoff += inc;
  // context.beginPath();
  // context.moveTo(0,0);
  // context.lineTo(i/2*(Math.cos(n)),i/2+n);
}
// context.lineTo(width,height);
// context.stroke();
// context.strokeStyle('red');
// const perlin = new Noise(3);
// const period = 0.01
// context.fillStyle = "rgb(0, 0, 0)";
// context.fillRect(-1, -1, width, height);
// context.lineWidth = 0.5;
// context.globalAlpha = 0.05;


// for (let px = 0; px < width; ++px) {
//   for (let i = 0; i < height; ++i) {
//     let x = px;
//     let y = Math.random() * height;
//     let n = perlin.noise(x * period, y * period);
//     // console.log(n);
//     context.strokeStyle = `hsl(${-210 + n * 600}, 100%, ${800 * n * n * n}%)`;
//     // console.log(context.strokeStyle);
//     context.beginPath();
//     context.moveTo(x, y);
//     // console.log((x, y));
//     for (let m = 0; m < length && y >= 0 && y <= height; ++m) {
//       n = perlin.noise(x * period, y * period);
//       context.lineTo(x += Math.cos(n * 14), y += Math.sin(n * 14));
//     }
//   }
// }



// period = 0.01
// var width = 960,
// height = 500
// noiseScale = 0.003,
// actorStepLength = 1,
// numActors = 10000,
// step = 0,
// steps = 150;

// var canvas = d3.select("body")
// .append("canvas")
// .attr({width: width, height: height});

// var context = canvas.node().getContext("2d");
// context.fillStyle = "rgb(0, 0, 0)";
// context.fillRect(-1, -1, width, height);

// var actors = [];
// for(var i = 0; i < numActors; i++) {
// actors.push(actor(width, height, noiseScale, actorStepLength));
// }

// var opacity = easeInOut(steps);

// d3.timer(function() {
// if(++step > steps) {
//     console.log("done with animation");
//     return true;
// }
// context.lineWidth = 1;
// context.globalCompositeOperation = 'lighter';
// context.beginPath();
// for(var i in actors) {
//     var a = actors[i];
//     var ln = a.step();
//     var alpha = 0.1*opacity.get();
//     context.strokeStyle = "rgba(49, 130, 189, " + alpha + ")";
//     context.moveTo(ln.x1, ln.y1);
//     context.lineTo(ln.x2, ln.y2);
// }
// context.stroke();
// opacity.step();
// });

// function actor(width, height, noiseScale, stepLength) {

// var x = Math.random() * width,
//     y = Math.random() * height;
// console.log(noiseScale)
// // var noise = new Noise(noiseScale);
// // console.log(noise)
// return {
//     // get the last point and the next point
//     step: function() {
//         var t = Math.random(x,y) * Math.PI * 5;
//         var x1 = x,
//             y1 = y;
//         x = x + stepLength * Math.cos(t);
//         y = y + stepLength * Math.sin(t);
//         return {
//             x1: x1,
//             y1: y1,
//             x2: x,
//             y2: y
//         }
//     }
// }
// }

// function easeInOut(steps) {
// var n = 0;
// var val = 0;
// return {
//     step:
//         function() {
//             val = 0.5*(1-Math.cos(2 * Math.PI * (n++) / steps));
//         },
//     get:
//         function() {
//             return val;
//         }
// };
// }