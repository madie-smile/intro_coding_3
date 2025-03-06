var canvas;
var ctx;
var w = 1000;
var h = 700;
// var allCircles = [];

var allSquares = [];
var o = {x: w, y: h/2, change: {x: randn(10), y:randn(10)}}

// circleData(10, allCircles);
squareData(1, allSquares);
setUpCanvas();
setInterval(function(){
    updateSquareData(o);
    bounce(o)
    createDataWithXY(1,allSquares,o)
}, 20)
animationLoop();

function animationLoop(){
    clear();

    for(var i=0; i<allSquares.length; i++){
        rect(allSquares[i]);
        updateSquareData(allSquares[i]);
        bounce(allSquares[i]);
        }
        
    requestAnimationFrame(animationLoop)
}

// SHAPE DATA
function createDataWithXY(num, array, oxy){
    for(var i=0; i<num; i++){
    array.push({
    x: oxy.x,
    y: oxy.y,
    w: 100,
    h: 100,
    r: 5,
    c: 200,
    a: 0.75,
    randomness: 0,
    change: {x: 0, y: 0, h: 0, w: 0, c: 0, a: -0.0051, randomness: 0}
 })
}
}

function updateSquareData(o){
    var index;
    if(o.a < 0){
    index = allSquares.indexOf(o);
    allSquares.splice(index, 1);
    }else{
        o.x+=o.change.x;
        o.y+=o.change.y;
        o.w+=o.change.w;
        o.h+=o.change.h;
        o.r+=o.change.r;
        o.c+=o.change.c;
        o.a+=o.change.a;
        o.random+=o.change.random;
}
}

function squareData(num, array){
    for(var i=0; i<num; i++){
    array.push({
    x: w,
    y: h/2,
    w: 100,
    h: 100,
    r: 5,
    c: 200,
    a: 0.75,
    randomness: 0,
    change: {x: 0, y: 0, h: 0, w: 0, c: 0, a: -0.01, randomness: 0}
})
}
}

// function circleData(num, array){
//     for(var i=0; i<num; i++){
//         //push to allShapes array
//         array.push({
//             x: w/2,
//             y: h/2,
//             r: 0,
//             c: 260,
//             a: 0.9,
//             random: 2,
//             change: {
//                 x: randn(10), 
//                 y: randn(10),
//                 r: rand(i),
//                 c: randn(i),
//                 a: -0.01,
//                 random: 0,
//                 },
//         })
//     }
// }
// OFF SCREEN CONTROLL
function torus (o){
    if(o.x>w){
        o.x=0;
    }
    if(o.x<0){
        o.x=w;
    }
    if(o.y>h){
        o.y=0;
    }
    if(o.y<0){
        o.y=h;
    }
}
function bounce(o){
    if(o.x > w || o.x < 0){
    o.x -= o.change.x;
    o.change.x *= -1;
    }else if(o.y > h || o.y < 0){
    o.y -= o.change.y;
    o.change.y *= -1;
    }
}
function remove(o){
    // use conditional to remove shapes from array when they leave the
    if(o){
    if(o.r>w || o.r<0){
        allCircles.pop()
    }
    if(o.r>h || o.r <0){
        allCircles.pop()
    }
    }
}

// CLEAR
function clear(){
    ctx.clearRect(0,0,w,h);
}
// SHAPES
function circle_arc(o){
    ctx.beginPath();
    ctx.arc(o.x,o.y,o.r,0, 2*Math.PI);
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();

}
function rect(o){
    var x = o.x;
    var y = o.y;
    o.x = o.x-o.w/2;
    o.y= o.y-o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x+rand(o.randomness),o.y+rand(o.randomness));
    ctx.lineTo(o.x+o.w+rand(o.randomness), o.y+rand(o.randomness));
    ctx.lineTo(o.x+o.w+rand(o.randomness), o.y+o.h+rand(o.randomness));
    ctx.lineTo(o.x+rand(o.randomness), o.y+o.h+rand(o.randomness));
    ctx.closePath();
    // ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.strokeStyle = "hsla("+o.c+100+", 100%, 50%, "+o.a+")";
    ctx.stroke();
    // ctx.fill()
    o.x = x;
    o.y = y;
}
// RANDOMS
function rand(range){
    var result = Math.random()*range;
    return result;
}
function randn(range){
    var result = Math.random()*range-range/2;
    return result
}
// CANVAS
function setUpCanvas(){
    canvas=document.getElementById("myCanvas");
    ctx=canvas.getContext("2d");
    canvas.width=w;
    canvas.height=h;
    canvas.style.border="3px solid blue";
}

console.log("assignment 3") 