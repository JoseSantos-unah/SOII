

var CANVAS = '<canvas id = "canvas" width = "800" height = "500" style="background-color: white"> </canvas>';

var canvas;
var context;

window.onload = init;

function init() {
    document.querySelector('body').innerHTML += this.CANVAS;
    
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    setInterval(drawHere, 1000/35);
    setup();
}    

function drawCircle(xPos, yPos, radius, color, borderColor, _lineWidth) {
    this.context.beginPath();

    this.context.arc(xPos, yPos, radius, 0, Math.PI * 2, false);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.lineWidth = _lineWidth;
    this.context.strokeStyle = borderColor;

    this.context.stroke();
    this.context.arcTo(90, 90, 20, 20, 1);
}

function drawRect(color, x, y, width, height) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
}

function drawLine(xFrom, yFrom, xTo, yTo, color, _lineWidth) {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = _lineWidth;
    this.context.moveTo(xFrom, yFrom);
    this.context.lineTo(xTo, yTo);
    this.context.stroke();
}

function clear(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

