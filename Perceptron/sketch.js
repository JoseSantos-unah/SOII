
let training = new Array(200);

let perceptron;

let count = 0;

function f(x) { 
    let y = (0.7 * x) ;
    return y;
}

// La función "Setup" Se ejecuta UNA VEZ dentro de "init" en el archivo Graphics.js
function setup() {

    this.perceptron = new Perceptron(3, 0.01);

    for(let i = 0; i < training.length; i++) {

        let x = this.perceptron.getRandomOnRange(-1, 1);// * canvas.width ;
        let y = this.perceptron.getRandomOnRange(-1, 1);// * canvas.height ;
        let answer = 1;

        if(y < canvas.height - f(x)) answer = -1;

        training[i] = { 
            input : [x, y, 1] ,
            desiredOutput : answer
        };
    }

    console.table([canvas.width, canvas.height]);
}


function drawHere() {
    
    drawRect("gray", 0, 0, canvas.width, canvas.height);
    
    let x1 = 0;
    let y1 = canvas.height - f(x1);

    let x2 = canvas.width;
    let y2 = canvas.height - f(x2);

    drawLine(x1, y1, x2 , y2, "red", 3);

    let weights = this.perceptron.getWeights();

    y1 = canvas.height - (-weights[2] - weights[0] * x1) / weights[1];
    y2 = canvas.height - (-weights[2] - weights[0] * x2) / weights[1];

    //console.log((-weights[2] - weights[0] * x1) / weights[1]);
    //console.log((-weights[2] - weights[0] * x2) / weights[1]);

    drawLine(x1, y1, x2 , y2, "blue", 3);


    this.perceptron.train(training[count].input, training[count].desiredOutput);
    count = (count + 1) % training.length;


    for(let i = 0; i < count; i++) {

        let guess = this.perceptron.feedForward(training[i].input);
        let col = "green";

        if(guess < 0) {
            col = "red";
        }

        drawCircle(training[i].input[0] * canvas.width , training[i].input[1] * canvas.height, 6, col, col, 2);
    }

    
}
