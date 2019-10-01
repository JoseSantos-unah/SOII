

class ActivationFunction {
    constructor(func, dfunc) {
        this.func = func;
        this.dfunc = dfunc;
    }
}

let sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
);

let tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1 - (y * y)
);


class NeuralNetwork
{

    constructor(in_nodes, hid_nodes, out_nodes){

        if (in_nodes instanceof NeuralNetwork) {
            let a = in_nodes;
            this.input_nodes = a.input_nodes;
            this.hidden_nodes = a.hidden_nodes;
            this.output_nodes = a.output_nodes;

            this.weights_ih = a.weights_ih.copy();
            this.weights_ho = a.weights_ho.copy();

            this.bias_h = a.bias_h.copy();
            this.bias_o = a.bias_o.copy();

        }else{

            this.input_nodes = in_nodes;
            this.hidden_nodes = hid_nodes;
            this.out_nodes = out_nodes;

            this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
            this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
            this.weights_ih.randomize();
            this.weights_ho.randomize();

        }

        this.setLearningRate();
        this.setActivationFunction();

    }


    predict(input_array) {

        let inputs = Matrix.fromArray(input_array);
        let hidden = this.weights_ih.multiply(inputs);

        hidden.add(this.bias_h);

        hidden.map(this.activation_function.func);

        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);

        return output.toArray();
    }


    setLearningRate(learning_rate = 0.1) {
        this.learning_rate = learning_rate;
    }

    setActivationFunction(func = sigmoid) {
        this.activation_function = func;
    }


    train( input_array, target_array ) {

        let inputs = Matrix.fromArray(input_array);
        let hidden = Matris.multiply(this.weights_ih, inputs);
        hidden.map(this.activation_function.func);

        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(this.activation_function.func);

        let targets =  Matrix.fromArray(target_array);

        //Calculando el error
        // error = targets - outputs;
        let output_errors = Matrix.subtract(targets, outputs);

        // gradient = outputs * (1 - output)
        let gradients = Matrix.map(outputs, this.activation_function.dfunc);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);

        let hidden_T = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(gradients, hidden_T);

        this.weights_ho.add(weights_ho_deltas);
        this.bias_o.add(gradients);

        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);

        let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);

        let inputs_T = Matrix.transpose(inputs);
        let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

        this.weights_ih.add(weight_ih_deltas);
        this.bias_h.add(hidden_gradient);
    }

    copy() {
        return new NeuralNetwork(this);
    }

    mutate(func) {
        this.weights_ih.map(func);
        this.weights_ho.map(func);
        this.bias_h.map(func);
        this.bias_o.map(func);
    }


} //Fin Class NeuralNetwork