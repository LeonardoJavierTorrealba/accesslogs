import {fork} from 'child_process'

let iniciaLote = 400000
let terminaLote = 0
let cantidad = 10000;
let final = 600000

    while(iniciaLote < final){    
    terminaLote = iniciaLote + cantidad;
            let sp1 = fork("process.js");
            sp1.send({obj:{
                starts: iniciaLote,
                ends: terminaLote,
            }});
    iniciaLote = iniciaLote + cantidad;
    }
    





