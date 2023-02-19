import ejecuto from './LAFUNCION.js';

let iniciaLote = 1000
let terminaLote = 0
let cantidad = 500;
let final = 20000


while (terminaLote < final){
terminaLote = iniciaLote + cantidad;
ejecuto(iniciaLote, cantidad)
iniciaLote = iniciaLote + cantidad;

}



