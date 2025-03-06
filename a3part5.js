var canvas;
var ctx;
var w = 1000;
var h = 700;
var allcircles = [];
// var rectangle = [];
var allSquares = [];

circleData(10, allcircles);
// rectangleData(1, rectangle);
squareData(4, allSquares);
setUpCanvas();
animationLoop();

function animationLoop(){
    clear();
    for(var i=0; i<allcircles.length; i++){
    circle_arc(allcircles[i]);
    updateData(allcircles[i]);
    remove(allcircles[i]);
    }        
    for(var i=0; i<allSquares.length; i++){
        square(allSquares[i]);
        updateData(allSquares[i]);
        torus(allSquares[i]);
        }
    requestAnimationFrame(animationLoop);
}

// SHAPE DATA
function squareData(num, array){
    for(var i=0; i<num; i++){
        //push to allShapes array
        array.push({
            x: w/2,
            y: i*(h/4),
            w: 50,
            h: 50,
            c: 0,
            a: 0.5,
            random: 0,
            change: {
                x: 2*Math.sin(2), 
                y: 2*Math.sin(2),
                w: 0,
                h: 0,
                c: randn(i),
                a: 0,
                random: 0,
                },
        })
    }
}
function rectangleData(num, array){
    for(var i=0; i<num; i++){
        //push to allShapes array
        array.push({
            x: w/2,
            y: h/2,
            w: 800,
            h: 500,
            c: 0,
            a: 0.75,
            random: 0,
            change: {
                x: 0, 
                y: 0,
                w: 0,
                h: 0,
                c: 0,
                a: 0,
                random: 0,
                },
        })
    }
}
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
    if(o){
    if(o.x>w || o.x<0){
        // console.log("bounce");
        o.change.x *= -1;
    }
    if(o.y>h || o.y <0){
        o.change.y *= -1;
    }
    }
}
function remove(o){
    // use conditional to remove shapes from array when they leave the
    if(o){
    if(o.r>w || o.r<0){
        allcircles.pop()
    }
    if(o.r>h || o.r <0){
        allcircles.pop()
    }
    }
}

// ANIMATION LOOP TOOLS
function updateData(o){
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
function square(o){
    var x =o.x;
    var y =o.y;
    o.x=o.x-o.w/2;
    o.y=o.y-o.h/2
    ctx.beginPath();
    ctx.moveTo(o.x+rand(o.random),o.y+rand(o.random))
    ctx.lineTo(o.x+o.w+rand(o.random),o.y+rand(o.random))
    ctx.lineTo(o.x+o.w+rand(o.random),o.y+o.h+rand(o.random))
    ctx.lineTo(o.x+rand(o.random),o.y+o.h+rand(o.random))
    ctx.closePath();
    ctx.fillStyle="hsla("+o.c+",100%,50%,"+o.a+")";
    ctx.lineWidth=o.lw;
    ctx.fill();
    o.x = x;
    o.y = y;
}
function rect(o){
    var x =o.x;
    var y =o.y;
    o.x=o.x-o.w/2;
    o.y=o.y-o.h/2
    ctx.beginPath();
    ctx.moveTo(o.x+rand(o.random),o.y+rand(o.random))
    ctx.lineTo(o.x+o.w+rand(o.random),o.y+rand(o.random))
    ctx.lineTo(o.x+o.w+rand(o.random),o.y+o.h+rand(o.random))
    ctx.lineTo(o.x+rand(o.random),o.y+o.h+rand(o.random))
    ctx.closePath();
    ctx.strokeStyle="hsla("+o.c+",100%,50%,"+o.a+")";
    ctx.lineWidth=o.lw;
    ctx.stroke();
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