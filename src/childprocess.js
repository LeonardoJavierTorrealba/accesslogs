import {fork} from 'child_process'

let iniciaLote = 1200000
let terminaLote = 0
let cantidad = 5000;
let final = 1300000

    if (((final - iniciaLote) / cantidad) < 60){    
        while(iniciaLote < final){    
            terminaLote = iniciaLote + cantidad;
                    let sp1 = fork("process.js");
                    sp1.send({obj:{
                        starts: iniciaLote,
                        ends: terminaLote,
                    }});
            iniciaLote = iniciaLote + cantidad;
        }
    }
    





