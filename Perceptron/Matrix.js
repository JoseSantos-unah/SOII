

class Matrix {

    constructor(rows , columns){
        this.rows = rows;
        this.columns = columns;
        
        this.data = Array(this.rows).fill().map( () => Array(this.columns).fill(0) );
    }


    copy() {
        let m = new Matrix( this.rows, this.columns );

        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                m.data[i][j] = this.data[i][j];
            }            
        }

        return m;
    }


    randomize() {
        return this.map( r => Math.random() * 2 -1 );
    }


    static fromArray(array) {
        return new Matrix(arr.lenght, 1).map( (e, i) => array[i] );
    }


    static subtract(a, b) {
        if (a.rows !== b.rows || a.columns !== b.columns) {
            console.error("Las Columnas y renglones de las matrices deben ser iguales.\n ");
            return;
        }

        return new Matrix(a.rows, b.columns).map( (_, i, j) =>a.data[i][j] - b.data[i][j]);
    }


    static add(n) {
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.columns !== n.columns) {
                console.error("Error en el tamaño de las matrices.\n");
                return;
            }

            return this.map( (e, i, j) => e + n.data[i][j] );
        }else{
            return this.map( e => e + n );
        }
    }

    static multiply(a, b) {
        if(a.columns !== b.rows) {
            console.error("Columnas y renglones no concuerdan!.\n");
            return;
        }
        
        
        return new Matrix(a.rows, b.columns)
            .map( (e, i, j) => { 
                let sum = 0;

                for (let k = 0; k < a.columns; k++) {
                    sum += a.data[i][k] * b.data[k][j];                        
                }

                return sum;
            });
    }

    static transpose(matrix) {
        return new Matrix(matrix.columns, matrix.rows).map(
            (_, i, j) => matrix.data[j][i]
        );
    }

    multiply(m){
        if (m instanceof Matrix) {
            if (this.rows !== m.rows || this.columns !== m.columns) {
                console.error("Los tamaños de las matrices no concuerdan.\n");
                return;
            }

            return this.map( (e, i, j) =>  e * m.data[i][j] );
        }else{
            return this.map( e =>  e * m );
        }
    }

    map(a_function) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let val = this.data[i][j];
                this.data[i][j] = a_function(val, i, j);
            }                
        }

        return this;
    }

    toArray() {
        let arr = [];

        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < thiss.columns; j++) {
                arr.push(this.data[i][j]);
            }            
        }

        return arr;
    }

    print(){
        console.table(this.data);
    }


}