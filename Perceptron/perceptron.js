

class Perceptron 
{
    // Toma el Numero de entradas (n) y el valor de el ritmo de aprendizaje (c)
    // e inicializa los weights en un vallor aleatorio.
    constructor(n, c) {
        this.weights = new Array(n);
        
        for(let i = 0; i < this.weights.length; i++) {
            this.weights[i] = this.getRandomOnRange(-1, 1);
        }

        this.c = c;
    }

    getRandomOnRange( left, right ) {
        if( Math.random() > Math.random() ) {
            return 1 * Math.random(); 
        }else{
            return -1 * Math.random();
        }
    }


    // @inputs: Una nueva entrada para el entrenamiento del Perceptron
    // @desired es el valor esperado.
    // Y "entrenamos" el perceptron aplicando el error y el "learning rate"
    //  a cada una de las entradas (inputs)
    train(inputs, desired) {
        let guess = this.feedForward(inputs);

        // Error = desired output - guessed output

        let error = desired - guess;

        for(let i = 0; i < this.weights.length; i++) {
            this.weights[i] += this.c * error * inputs[i];
        }

    }

    /// FeedFordward() realiza el "Weighted Sum" según el cual segun 
    // nuetra función de activación se obtiene el actual valor del perceptron

    feedForward(inputs) {
        let sum = 0;

        for(let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i];
        }

        return this.activate(sum);
    }

    // función de activación. 
    activate(sum) {
        if (sum > 0) return 1;
        else return -1;
    }

    getWeights() {
        return this.weights;
    }

}