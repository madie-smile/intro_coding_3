var canvas;
var ctx;
var w = 1000;
var h = 700;
var allCircles = [];
var allSquares = [];
var o = {x: w, y: 3*(h/4), change: {x: -10, y: 0,}}
var o2 = {x: 0, y: h/4, change: {x: 10, y: 0,}}
var o3 = {x: w/4, y: 0, change: {x: 0, y: 10,}}
var o4 = {x: 3*(w/4), y: h, change: {x: 0, y: -10,}}

circleData(10, allCircles);
setUpCanvas();
setInterval(function(){
    updateSquareData(o);
    remove(o);
    createDataWithXY(1,allSquares,o);
}, 50)
setInterval(function(){
    updateSquareData(o2);
    remove(o2);
    createDataWithXY(1,allSquares,o2);
}, 50)
setInterval(function(){
    updateSquareData(o3);
    remove(o3);
    createDataWithXY(1,allSquares,o3);
}, 50)
setInterval(function(){
    updateSquareData(o4);
    remove(o4);
    createDataWithXY(1,allSquares,o4);
}, 50)
animationLoop();

function animationLoop(){
    clear();
    for(var i=0; i<allCircles.length; i++){
        circle_arc(allCircles[i]);
        updateCircleData(allCircles[i]);
        remove(allCircles[i]);
        }
    for(var i=0; i<allSquares.length; i++){
        rect(allSquares[i]);
        updateSquareData(allSquares[i]);
        }
        
    requestAnimationFrame(animationLoop)
}

// SQUARE DATA
function createDataWithXY(num, array, oxy){
    for(var i=0; i<num; i++){
    array.push({
    x: oxy.x,
    y: oxy.y,
    w: 100,
    h: 100,
    c: 260,
    a: 0.9,
    randomness: 0,
    change: {x: 0, y: 0, h: 0, w: 0, c: 0.5, a: -0.005, randomness: 0}
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
    x: w/2,
    y: i*(h/4),
    w: 50,
    h: 50,
    c: 200,
    a: 0.5,
    randomness: 0,
    change: {x: 0, y: 0, h: 0, w: 0, c: 100, a: -0.05, randomness: 0}
})
}
}

// CIRCLE DATA
function circleData(num, array){
    for(var i=0; i<num; i++){
        //push to allShapes array
        array.push({
            x: w/2,
            y: h/2,
            r: 0,
            c: 260,
            a: 0.9,
            random: 2,
            change: {
                x: randn(10), 
                y: randn(10),
                r: rand(i),
                c: randn(i),
                a: -0.01,
                random: 0,
                },
        })
    }
}
function updateCircleData(o){
    // use conditional to alter movement
    if(o.a>0.5){
    o.x+=o.change.x;
    o.y+=o.change.y;
    o.w+=o.change.w;
    o.h+=o.change.h;
    o.r+=o.change.r;
    o.c+=o.change.c;
    o.a+=o.change.a;
    o.random+=o.change.random;
    }else{
    o.x-=o.change.x;
    o.y-=o.change.y;  
    }
}

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
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.strokeStyle = "hsla("+o.c*2+", 50%, 50%, "+o.a+")";
    ctx.stroke();
    ctx.lineWidth=2;
    ctx.fill()
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