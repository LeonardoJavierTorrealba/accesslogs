import settings from "./database/settings.js";
import moment from 'moment'
import poolManager from './database/poolManager.js';
const poolMEGA = await poolManager.get('MEGA', settings.MEGA)




let resSP = await poolMEGA.request().query(`EXEC SP_ServiciosSociosVigencias_Listar 637447, 38, '20221229'`);
resSP = resSP.recordset[0]; 
console.log(resSP);
var vigenciaHasta;
var fechaMoment;
try{
 vigenciaHasta = moment(resSP.VigenciaHasta,'YYYY-MM-DD"T"HH:mm:ss.SSS"Z"').format('YYYY-MM-DD HH:mm:ss.000');
 fechaMoment = moment(fecha,'YYYY-MM-DD"T"HH:mm:ss.SSS"Z"').format('YYYY-MM-DD HH:mm:ss.000')
}
catch{
    console.log("no hay fecha");
     vigenciaHasta = 1;
     fechaMoment = 2;
}

if(vigenciaHasta < fechaMoment || resSP == undefined){
    console.log("hola");
}
else{
    console.log("que ase");
}




// let num = '1489-123456'

// let index = num.indexOf('-');
// let idsucursal = num.slice(0, index);
// let idsocio = num.slice(index+1);
// console.log(idsucursal);
// console.log(idsocio);






// // import queriesResendObj from './database/queriesResendObj.js'
// // import connection from './database/connection.js'
// // import fetch from 'node-fetch'

// // // let variable = await fetch('https://mgft-docmanager-qa.azurewebsites.net/Document?Id=19&FullSize=false')
// // // console.log(variable);

// // let references = [
// //     "2ad5074426c04a3bb05c80f7065ad497-MjAwMy01MzA3NDY=",
// //     "dec432fce5ae466dac1aaf34c23c79c6-MjAwMy01MzA3NDg=",
// //     "5cb53d61b8674f6488dfd3249b7d70f0-MjAwNC01MzA3Mzk=",
// //     "9ee258dbb5c248039adf2a31f43f9b02-MjAwNC01MzA3NDE=",
// //     "f4c9bdd7591b4f2083d5f54e0cd1fa7b-MjAwNi01MzA3NDQ=",
// //     "b28484c404114426ba09974123a29244-MjAxMC01MzA3Mzg=",
// //     "b745a32ce9e049e48929704cc97a62f4-MjAxMC01MzA3NDk=",
// //     "1196fee2a28b41d7a546190a29b8c85d-MjAxMi01MzA3NDI=",
// //     "d5184f37e05f4e51b243014a25c7763c-MjAxMi01MzA3NDM=",
// //     "bcd3c4c6ecd4468da975e53d76ccf1bc-MjAwNC01MzA3NDU="
// // ]



// // const configsResend = {
// //     method: "POST",
// //     headers: {
// //         "ReplyTo": 'https://fiter-sgc-api.azurewebsites.net/api/WebHook/Invoice/Single/Result',
// //         "Content-Type": "application/json"
// //     }
// // }

// // const configsUpdate = {
// //     method: "POST",
// //     headers: {                    
// //         "Content-Type": "application/json"
// //     }
// // }

// // for (const ref of references) {
// //     let urlUpdate = 'https://mgft-invoicer-api.azurewebsites.net/api/v1/UpdateVoucher/'  + ref;
// //     let urlResend = 'https://mgft-invoicer-api.azurewebsites.net/api/v1/Webhook/ReSendTo/' + ref;
// //     let update = await fetch(urlUpdate, configsUpdate)        
// //     let resUpdate = await update.json()
// //     console.log(resUpdate);
// //     let resend = await fetch(urlResend, configsResend);
// //     let resResend = await resend.json()
// //     console.log(resResend);
// // }












// // // let pool = await connection.getConnection();
// // // let result = await pool.request().query(queriesResendObj.getSucursales())
// // // result =result.recordset;
// // // pool.close();

// // // var sede = {
// // //     idSuc: 8
// // // }

// // // for (let suc of result){
// // //     if (sede.idSuc == suc.idSucursal){
// // //         sede.nombreObj = suc.nombre
// // //     }
// // // }

// // // console.log(sede);








// // // // import fetch from 'node-fetch'
// // // import sucursales from './database/sucursales.js'


// // // let array = ["01", "03", 10, 12];

// // // for (let num of array) {
// // //     let parseo = parseInt(num);
// // //     console.log(parseo);
// // // }




// // // let array = [
// // //     {
// // //     "status": {
// // //         "code": 0,
// // //         "description": "Resultado Exitoso"
// // //     },

// // // },
// // // {
// // //     "status": {
// // //         "code": 0,
// // //         "description": "Resultado Exitoso"
// // //     },
// // //     "results": '<!DOCTYPE html><html lang="en">'
// // // }]




// // // let arrayNuevo = []

// // // for (let i = 0; i < array.length; i++) {
// // //     const element = array[i];

// // //     try{
// // //     let jsonresult = JSON.parse(element.results);
// // //     console.log(jsonresult);
// // //     element.results = jsonresult;
// // //     }
// // //     catch(e){
// // //     element.results = "no se pudo"
// // //     }

// // //     if(element.results.status){
// // //         console.log(element.results.status.description);
// // //     }

// // //     arrayNuevo.push(element);
    
// // // }










// // // console.log(json);

// // // let jsonresult = JSON.parse(json.results);

// // // json.results = jsonresult;

// // // console.log(json);

// // // console.log(json.results.status.description);




// //     // let reference = [];
// //     // let pool = await getConnection();
// //     // let result = await pool.request().query(queriesResendObj.getInvoicerReferences(400));
// //     // // res.send(Object.values(result.recordset[1]));

// //     // // let configs = {
// //     // //     method: "POST",
// //     // //     headers: {
// //     // //         "ReplyTo": "https://mega-sgc-api.azurewebsites.net/api/WebHook/Invoice/Single/Result",
// //     // //         "Content-Type": "application/json"
// //     // //     }
// //     // // }

// //     // let mapResult = Object.values(result.recordset).map((reference, i) => {       
// //     //     let url = (queriesResendObj.concatResendReference(Object.values(reference)))




// //     //     // let url = "https://mgft-invoicer-api.azurewebsites.net/api/v1/Webhook/ReSendTo/" + reference;

// //     //     // fetch(url, configs)
// //     //     // .then(response => response.json())
// //     //     // .then(data => console.log(data))
// //     //     // .catch((e) => {
// //     //     //     console.log("Hubo un error: " + e)
// //     //     // })
// //     // })
    

// // // export default mapResult












// // // let sumaString = veinteString + veinteString;
// // // console.log(sumaString);


// // // let sumaNumber = veinteNumber + veinteNumber;
// // // console.log(sumaNumber);

// // // let veinteString = "20";
// // // let veinteNumber = 20;


// // // if (veinteString === veinteNumber){
// // //     console.log("Comparación simple: Son Iguales");
// // // }
// // // else{
// // //     console.log("Comparación simple: No son Iguales");
// // // }



// // // if (varibaleString === variableNumber){
// // //     console.log("Comparación Estricta: Son Iguales");
// // // }
// // // else{
// // //     console.log("Comparación Estricta: No son iguales");
// // // }