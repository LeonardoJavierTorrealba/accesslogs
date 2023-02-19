import fetch from "node-fetch";
import settings from "./database/settings.js";
import poolManager from './database/poolManager.js';


const poolMEGA = await poolManager.get('MEGA', settings.MEGA)

let queryBins = `SELECT tb.nroBins, 
CASE
    WHEN(eet.credito = 1)
        THEN 'Credit'
    WHEN(eet.debito = 1)
        THEN 'Debit'
    END AS CardTypeId,
'Classic' as CardCategoryId,
0 as Prepaid, 
0 as Bussiness,
tb.idBanco as IssuerId,
CASE tb.idEmpresaEmisoraTarjeta
WHEN 5 THEN 4
WHEN 6 THEN 5
WHEN 7 THEN 6
WHEN 8 THEN 7
WHEN 9 THEN 8
WHEN 11 THEN 9
WHEN 12 THEN 1
WHEN 14 THEN 2
WHEN 15 THEN 7
WHEN 1000 THEN 1
WHEN 1001 THEN 7
WHEN 1002 THEN 3
WHEN 1003 THEN 4
WHEN 1005 THEN 1
WHEN 1008 THEN 2
WHEN 1006 THEN 3
WHEN 1007 THEN 4
WHEN 1008 THEN 2
WHEN 1009 THEN 8
WHEN 1010 THEN 1
WHEN 1011 THEN 1
WHEN 1014 THEN 1
WHEN 5001 THEN 7
ELSE tb.idEmpresaEmisoraTarjeta
END AS paymentMethodId	
FROM TarjetasBINS tb
inner join EmpresasEmisorasTarjetas eet ON eet.idEmpresa = tb.idEmpresaEmisoraTarjeta
INNER join bancos b ON b.idBanco = tb.idBanco
WHERE nroBins NOT IN (select top(15) nroBins from TarjetasBINS)`




let responseSQL = await poolMEGA.query(queryBins);


for (const bin of responseSQL.recordset) {
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      bin: bin.nroBins,
      cardType: bin.CardTypeId,
      cardCategory: bin.CardCategoryId,
      prepaid: false,
      business: false,
      issuer: {
        id: bin.IssuerId,
      },
      paymentMethod: {
        id: bin.paymentMethodId,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://payment-managment-qa.azurewebsites.net/Card", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(`${result} -- BIN: ${bin.nroBins}`))
      .catch((error) => console.log("error", error));




















    // const configs = {
    //     method: "POST",    
    //     headers: {
    //     "Content-Type": "application/json; charset=utf-8; version=1",
    //     "Accept": "*/*",
    //     "Connection": "keep-alive",
    //     "Accept-Encoding": "gzip, deflate, br",
    //     },
    //     body:{
    //         "bin":  bin.nroBins.toString(),
    //         "cardType": bin.CardTypeId,
    //         "cardCategory": bin.CardCategoryId,
    //         "prepaid": false,
    //         "business": false,
    //         "issuer": {
    //           "id": bin.IssuerId
    //         },
    //         "paymentMethod": {
    //           "id": bin.paymentMethodId
    //         }
    //       }
    // };
    
    // var request = await fetch("https://payment-managment-qa.azurewebsites.net/Card", configs);
    // var responseFetch = await request.json();          
    // console.log(responseFetch);

}