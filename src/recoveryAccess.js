/** @format */

import fetch from "node-fetch";
import settings from "./database/settings.js";
import moment from 'moment'
import sqlite3 from 'sqlite3'
import poolManager from './database/poolManager.js';

// const poolMGFT = await poolManager.get('MGFT', settings.MGFT);
// const poolFITER = await poolManager.get('FITER', settings.FITER);
const poolMEGA = await poolManager.get('MEGA', settings.MEGA)
const poolMGFTQA = await poolManager.get('MGFTQA', settings.MGFTQA)

    let db = new sqlite3.Database('./database/dbRecuperation/Mega/dataNunez.db');

//falta pilar y!!! 

/*USE TO CLEAN DB FROM INVALID JSON
        DELETE FROM ca
    WHERE RenderedMessage NOT LIKE '%{"Action":"Ready","Message":"Ready to post:%' AND RenderedMessage NOT LIKE '%{"Action":"Zk_open","Message":%'
*/
   
    let sqlTransactions = `SELECT
        CASE
            WHEN Action = 'Zk_open' THEN
                SUBSTRING(Message,INSTR(Message, 'using ')+6,33)
                ELSE ''
            END AS transactionId
        FROM (SELECT
            json_extract(RenderedMessage, '$.Action') as Action,
            json_extract(RenderedMessage, '$.Message') as Message
            FROM ca
            WHERE Timestamp BETWEEN '2023-02-13T18:00:00' AND '2023-02-13T19:00:00')
        WHERE Action = 'Zk_open'`;

//ABASTO: 07:47:27



const serialesSuc = [
    {idSucursal: 2, idSucursalControlAcceso: "2-8", serial:"21088523700515" },
    {idSucursal: 2, idSucursalControlAcceso: "2-8", serial:"21088523701357" },
    {idSucursal: 3, idSucursalControlAcceso: "3-3", serial:"21075523702675" },
    {idSucursal: 3, idSucursalControlAcceso: "3-3", serial:"21075523702701" },
    {idSucursal: 14, idSucursalControlAcceso: "14-18", serial:"21085523703105" },
    {idSucursal: 14, idSucursalControlAcceso: "14-19", serial:"21088523702033" },
    {idSucursal: 14, idSucursalControlAcceso: "14-19", serial:"21085523703742" },
    {idSucursal: 36, idSucursalControlAcceso: "36-65", serial:"21088523701425" },
    {idSucursal: 36, idSucursalControlAcceso: "36-65", serial:"21088523701307" },
    {idSucursal: 33, idSucursalControlAcceso: "33-59", serial:"21084523702452" },
    {idSucursal: 33, idSucursalControlAcceso: "33-59", serial:"21086523705214" },
    {idSucursal: 30, idSucursalControlAcceso: "30-43", serial:"21088523701459" },
    {idSucursal: 30, idSucursalControlAcceso: "30-43", serial:"21088523701318" },
    {idSucursal: 6, idSucursalControlAcceso: "6-1", serial:"21088523701994" },
    {idSucursal: 6, idSucursalControlAcceso: "6-1", serial:"21088523702057" },
    {idSucursal: 12, idSucursalControlAcceso: "12-15", serial:"21088523702027" },
    {idSucursal: 12, idSucursalControlAcceso: "12-15", serial:"21088523702035" },
    {idSucursal: 10, idSucursalControlAcceso: "10-11", serial:"21088523701169" },
    {idSucursal: 10, idSucursalControlAcceso: "10-11", serial:"21088523701360" },
    {idSucursal: 9, idSucursalControlAcceso: "9-2", serial:"21088523701287" },
    {idSucursal: 9, idSucursalControlAcceso: "9-2", serial:"21085523703417" },
    {idSucursal: 9, idSucursalControlAcceso: "9-2", serial:"21084523702267" },
    {idSucursal: 34, idSucursalControlAcceso: "34-53", serial:"21088523702031" },
    {idSucursal: 34, idSucursalControlAcceso: "34-53", serial:"21088523702006" },
    {idSucursal: 34, idSucursalControlAcceso: "34-53", serial:"17170010512837" },
    {idSucursal: 37, idSucursalControlAcceso: "37-57", serial:"21086523705312" },
    {idSucursal: 37, idSucursalControlAcceso: "37-57", serial:"21088523702054" },
    {idSucursal: 38, idSucursalControlAcceso: "38-54", serial:"21110523701812" },
    {idSucursal: 38, idSucursalControlAcceso: "38-54", serial:"21088523701306" },
    {idSucursal: 39, idSucursalControlAcceso: "39-55", serial:"21088523702024" },
    {idSucursal: 39, idSucursalControlAcceso: "39-55", serial:"21088523702017" },
    {idSucursal: 39, idSucursalControlAcceso: "39-55", serial:"21088523702017" },
    {idSucursal: 5, idSucursalControlAcceso: "5-9", serial:"21027523700232" },
    {idSucursal: 5, idSucursalControlAcceso: "5-9", serial:"21088523701364" },
    {idSucursal: 31, idSucursalControlAcceso: "31-49", serial:"21088523701285" },
    {idSucursal: 31, idSucursalControlAcceso: "31-49", serial:"21088523701369" },   
    {idSucursal: 29, idSucursalControlAcceso: "29-33", serial:"21112523700806" },
    {idSucursal: 29, idSucursalControlAcceso: "29-33", serial:"21088523701998" },
    {idSucursal: 29, idSucursalControlAcceso: "29-33", serial:"21088523701491" },
    {idSucursal: 20, idSucursalControlAcceso: "20-5", serial:"21088523701365" },
    {idSucursal: 20, idSucursalControlAcceso: "20-5", serial:"21088523701667" },
    {idSucursal: 4, idSucursalControlAcceso: "4-7", serial:"17174010510031" },
    {idSucursal: 4, idSucursalControlAcceso: "4-7", serial:"17174010509834" },
    {idSucursal: 4, idSucursalControlAcceso: "4-7", serial:"17174010510020" },
    {idSucursal: 4, idSucursalControlAcceso: "4-7", serial:"17174010510020" },
    {idSucursal: 40, idSucursalControlAcceso: "40-61", serial:"21088523701296" },
    {idSucursal: 40, idSucursalControlAcceso: "40-61", serial:"21088523701297" },
    {idSucursal: 23, idSucursalControlAcceso: "23-61", serial:"21088523701371" },
    {idSucursal: 23, idSucursalControlAcceso: "23-61", serial:"21088523701453" },
    {idSucursal: 23, idSucursalControlAcceso: "23-61", serial:"21088523701995" },
    {idSucursal: 35, idSucursalControlAcceso: "35-58", serial:"21088523702010" },
    {idSucursal: 35, idSucursalControlAcceso: "35-58", serial:"21088523702007" },
    {idSucursal: 25, idSucursalControlAcceso: "35-58", serial:"21088523701496" },
    {idSucursal: 25, idSucursalControlAcceso: "35-58", serial:"21084523702453" },
    {idSucursal: 13, idSucursalControlAcceso: "13-16", serial:"21088523701368" },
    {idSucursal: 13, idSucursalControlAcceso: "13-16", serial:"21088523701373" },
    {idSucursal: 15, idSucursalControlAcceso: "15-20", serial:"21084523702262" },
    {idSucursal: 24, idSucursalControlAcceso: "24-22", serial:"21088523701747" },
    {idSucursal: 24, idSucursalControlAcceso: "24-22", serial:"21083523704291" },
    {idSucursal: 11, idSucursalControlAcceso: "11-14", serial:"21088523702003" },
    {idSucursal: 11, idSucursalControlAcceso: "11-13", serial:"21088523702001" },
    {idSucursal: 11, idSucursalControlAcceso: "11-13", serial:"21088523701999" },
    {idSucursal: 8, idSucursalControlAcceso: "8-4", serial:"21086523705297" },
    {idSucursal: 8, idSucursalControlAcceso: "8-4", serial:"21087523702159" },



    














    {idSucursal: 2009, idSucursalControlAcceso: '2009-14', serial: '17170010512840'},
    {idSucursal: 2009, idSucursalControlAcceso: '2009-14', serial: '17181010502845'},
    {idSucursal: 2007, idSucursalControlAcceso: '2007-6', serial: '17172010515816'},
    {idSucursal: 2007, idSucursalControlAcceso: '2007-6', serial: '17170010512839'},
    {idSucursal: 2006, idSucursalControlAcceso: '2006-5', serial: '17170010512834'},
    {idSucursal: 2006, idSucursalControlAcceso: '2006-5', serial: '17009010504639'},
    {idSucursal: 2005, idSucursalControlAcceso: '2005-4', serial: '17181010503443'},
    {idSucursal: 2005, idSucursalControlAcceso: '2005-4', serial: '17181010502896'},
    {idSucursal: 2003, idSucursalControlAcceso: '2003-2', serial: '17181010502848'},
    {idSucursal: 2003, idSucursalControlAcceso: '2003-2', serial: '17181010502900'},
    {idSucursal: 2010, idSucursalControlAcceso: '2010-15', serial: '21088523702056'},
    {idSucursal: 2010, idSucursalControlAcceso: '2010-15', serial: '22090523703632'},    
    {idSucursal: 2012, idSucursalControlAcceso: '2012-17', serial: '21084523703001'},
    {idSucursal: 2012, idSucursalControlAcceso: '2012-17', serial: '22090523702630'},    
    {idSucursal: 2008, idSucursalControlAcceso: '2008-13', serial: '18185010501777'},
    {idSucursal: 2008, idSucursalControlAcceso: '2008-13', serial: '18185010501263'},
    {idSucursal: 2002, idSucursalControlAcceso: '2002-1', serial: '17118010500430'},
    {idSucursal: 2002, idSucursalControlAcceso: '2002-1', serial: '22090523702621'},
    {idSucursal: 2004, idSucursalControlAcceso: '2004-3', serial: '17181010503423'},
    {idSucursal: 2004, idSucursalControlAcceso: '2004-3', serial: '17118010501769'},
    {idSucursal: 2014, idSucursalControlAcceso: '2014-18', serial: '22090523703481'},
    {idSucursal: 2014, idSucursalControlAcceso: '2014-18', serial: '22090523700037'},
    {idSucursal: 2019, idSucursalControlAcceso: '2019-20', serial: '21080523701167'},
    {idSucursal: 2019, idSucursalControlAcceso: '2019-20', serial: '21088523701370'},
    {idSucursal: 28, idSucursalControlAcceso: "28-25", serial:"21088523702026" },
    {idSucursal: 28, idSucursalControlAcceso: "28-25", serial:"21088523702032" }

    // {idSucursal: 28, idSucursalControlAcceso: "xx", serial:"XX" }
    ]

    let sqlScans = `SELECT
    CASE
        WHEN Action = 'Ready' THEN
            json_extract(SUBSTRING(Message,INSTR(Message, ': {')+2,LENGTH(Message)),'$.transactionId')
            ELSE ''
        END AS transactionId,
    CASE
         WHEN Action = 'Ready' THEN
            json_extract(SUBSTRING(Message,INSTR(Message, ': {')+2,LENGTH(Message)),'$.Device')
            ELSE ''
        END AS device,
    CASE
     WHEN Action = 'Ready' THEN
        json_extract(SUBSTRING(Message,INSTR(Message, ': {')+2,LENGTH(Message)),'$.Data')
        ELSE ''
    END AS data, ts
    FROM (SELECT
        json_extract(RenderedMessage, '$.Action') as Action,        
        json_extract(RenderedMessage, '$.Message') as Message,
        Timestamp as ts
        FROM ca
        WHERE Timestamp  BETWEEN '2023-02-13T18:00:00' AND '2023-02-13T19:00:00')
    WHERE Action = 'Ready'`

    async function db_all(query){
            return new Promise(function(resolve,reject){
                db.all(query, function(err,rows){
                   if(err){console.log(err); return reject(err);}
                   resolve(rows);
                 });
            });
        }

    const transactions = await db_all(sqlTransactions);
    // console.log(transactions);
    const scans = await db_all(sqlScans);

    console.log(scans[0]);
    console.log(transactions[0]);   

    let transactionsArr = [];
    for (const tran of transactions) {
        transactionsArr.push(tran.transactionId.trim());
    }
    let index = 1;
    for (const scan of scans) {        
        var device = JSON.parse(scan.device);
        var data = JSON.parse(scan.data);               
        let ts = moment(scan.ts,'YYYY-MM-DD"T"HH:mm:ss.SSS"Z"').format('YYYYMMDD');
        
        
        if(data.Type == 5){            
            let resultado = 0;
            let mensaje = 'Sin Acceso'         

            

                if( transactionsArr.includes(scan.transactionId.trim()) == true){
                    resultado = 1;
                    mensaje = "OK";
                    console.log(`${index} --Scan: ${scan.transactionId.trim()}`);
                }
                else{
                    console.log(`${scan.transactionId} no existe`);
                }
                
                
                // console.log(scan.transactionId + " " + tran.transactionId);
             
                    index++      

               
         
     
            

            let serialSuc = serialesSuc.find(obj => obj.serial == device.Serial)           
        
        

            var bodyVar = {
                type: 5,
                code: data.Code
            };
            
            const configs = {
                method: "POST",
                body: JSON.stringify(bodyVar),
                headers: {
                "Content-Type": "application/json; charset=utf-8; version=1",
                "Accept": "*/*",
                "Connection": "keep-alive",
                "Accept-Encoding": "gzip, deflate, br",
                },
            };
            
            var request = await fetch("https://mega-ac-api-stage.azurewebsites.net/api/v1/Socio/decode", configs);           
          

            var decode = await request.json();          
            if(decode.status.success == true){
                var socioConcat = decode.data.toString();
                let firstSpace = socioConcat.indexOf(' ');
                let nyphen = socioConcat.indexOf('-');            
                
                let socio = {
                idSucursal: socioConcat.slice(0, nyphen),
                idSocio: socioConcat.slice(nyphen+1, firstSpace)
                }          
    
                // console.log(request);
    
                let contractOrService = {
                    contract_id: null,
                    product_id: null
                }
    
                let resSP = await poolMEGA.request().query(`EXEC SP_ServiciosSociosVigencias_Listar ${socio.idSocio}, ${socio.idSucursal},'${ts}'`);
                resSP = resSP.recordset[0]; 
                var vigenciaHasta;
                var fechaMoment;
                try{
                    vigenciaHasta = moment(resSP.VigenciaHasta,'YYYY-MM-DD"T"HH:mm:ss.SSS"Z"').format('YYYY-MM-DD HH:mm:ss.000');
                    fechaMoment = moment(scan.ts,'YYYY-MM-DD"T"HH:mm:ss.SSS"Z"').format('YYYY-MM-DD HH:mm:ss.000')
                }
                catch{               
                    vigenciaHasta = 1;
                    fechaMoment = 2;
                }
    
                if(vigenciaHasta < fechaMoment || resSP == undefined){
                    try {
                        let resFunction = await poolMEGA.request().query(`SELECT TOP(1) * FROM dbo.FN_Rules_AccessControl_Contrato (${socio.idSocio}, ${socio.idSucursal}, '${ts}')`);
            
                        resFunction = await resFunction.recordset[0];  
            
                        contractOrService.contract_id = `${resFunction.id_sucursal_contrato}-${resFunction.id_contrato}`
                        contractOrService.product_id = resFunction.id_producto;
                        } catch (error) {
                            console.log(error);
                        }
                }
                else{
                    try {                                            
                        contractOrService.contract_id = `${resSP.IdSucursalServicioSocio}-${resSP.IdServicioSocio}`;
                        contractOrService.product_id = resSP.Servicio;
                        console.log(contractOrService);
                        } catch (error){
                            console.log(error);
                        }            
                }
    
    
                
                let obj = {
                    partner_id: `${socio.idSucursal}-${socio.idSocio}`,
                    access_control_external_id: serialSuc.idSucursalControlAcceso.toString(),
                    device_serial: serialSuc.serial.toString(),
                    result: resultado,
                    message: mensaje,            
                    data_type: "PayLoad",
                    data: {},
                    origin: "mega-ac-api.azurewebsites.net",
                    app_version: '4.5.5.3',
                    request_id: scan.transactionId.toString(),
                    created: moment(scan.ts,'YYYY-MM-DD"T"HH:mm:ss.SSS"Z"').format('YYYY-MM-DD HH:mm:ss.000')
                    }                
                                        
                    // poolMGFTQA.request().query( `INSERT INTO AccessLogs 
                    // VALUES ('${obj.partner_id}','${obj.access_control_external_id}','${obj.device_serial}',${obj.result}, '${obj.message}', null, '${contractOrService.contract_id}', '${contractOrService.product_id}','PayLoad', NULL, '${obj.origin}', '${obj.app_version}', '${obj.request_id}', '${obj.created}')`);    
                    
                    console.log(obj.created);
    
                    poolMGFTQA.request().query( `INSERT INTO AccessLogs 
                    (partner_id, access_control_external_id, device_serial,  result, message, data_type, data, origin, app_version, request_id, created, contract_id, product_id) 

                    VALUES ('${obj.partner_id}','${obj.access_control_external_id}','${obj.device_serial}',${obj.result}, '${obj.message}', '1302NUNEZ', null, '${obj.origin}', '${obj.app_version}', '${obj.request_id}', '${obj.created}', '${contractOrService.contract_id}', '${contractOrService.product_id}')`);     
               
                











            }//fin del if para del fetch

        } //fin del forof
    }
    
