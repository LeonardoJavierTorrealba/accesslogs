import fetch from "node-fetch";
import connection from './database/connection.js';
import sql from "mssql";
import moment from 'moment'





let settings = {
    MGFT:  {
    user: 'administrador',
    password: 'AdminSql1570',
    server: 'mgft.database.windows.net',
    database: 'AccessControl',
    setTimeout: 900000,
    connectionTimeout: 900000,
    requestTimeout: 900000,
    pool:{
        idleTimeoutMillis: 90000
        },
    options:{
        encrypt: true, //pasar a true si lo llego a deployar en azure. 
        trustServerCertificate: true, //poner en true si trabajo en local
        trustedconnection: true
        }
    },

    
    FITER:  {
        user: 'desa',
        password: 'AdMiN5811',
        server: 'fiter.database.windows.net',
        database: 'Fiter',
        setTimeout: 900000,
        connectionTimeout: 900000,
        requestTimeout: 900000,
        pool:{
            idleTimeoutMillis: 90000
            },
        options:{
            encrypt: true, //pasar a true si lo llego a deployar en azure. 
            trustServerCertificate: true, //poner en true si trabajo en local
            trustedconnection: true
            }
    },


    MEGA:  {
        user: 'desa',
        password: 'AdMiN5811',
        server: 'ARBUESRV251',
        database: 'MegatlonSGC_Prod_01',
        setTimeout: 900000,
        connectionTimeout: 900000,
        requestTimeout: 900000,
        pool:{
            idleTimeoutMillis: 90000
            },
        options:{
            encrypt: false, //pasar a true si lo llego a deployar en azure. 
            trustServerCertificate: true, //poner en true si trabajo en local
            trustedconnection: true
            }
        },

    MGFTQA:  {
        user: 'administrador',
        password: 'AdminSql1570',
        server: 'mgft-qa.database.windows.net',
        database: 'AccessControl_QA',
        setTimeout: 900000,
        connectionTimeout: 900000,
        requestTimeout: 900000,
        pool:{
            idleTimeoutMillis: 90000
            },
        options:{
            encrypt: true, //pasar a true si lo llego a deployar en azure. 
            trustServerCertificate: true, //poner en true si trabajo en local
            trustedconnection: true
            }
    },
    }

    let queries = {
        getAccessLogs: () => { 
            return( `SELECT TOP(10) * FROM accesslogs
        WHERE created BETWEEN '20221001' AND '20221014'
        order by id desc, origin desc`)},

        getPartner:  (partner) => {
            `select * from socios
            WHERE CONCAT(idSucursal,'-',idSocio) = ${partner}
            `
            },

        getContract: (idSocio, idSucursalSocio, fecha) => {
            return ( 
        `SELECT TOP(1) * FROM dbo.FN_Rules_AccessControl_Contrato (${idSocio},${idSucursalSocio}, '${fecha}')`)    
        }       
    }

    let getConnection = async (dbSetting) => {
            try {
                let pool = await sql.connect(dbSetting);                           
                return pool;        
            } catch (error) {
                console.error(error);        
            }
    }

    //traigo los accesos
    let poolAccess = await getConnection(settings.MGFT);
    let access = await poolAccess.request().query(queries.getAccessLogs());
    access = access.recordset;
    // console.log(access);
    poolAccess.close();   


    // let partner = '14-527856'
    // let poolSGC = await getConnection(settings.MEGA);
    // poolSGC.connect();
    // let socio = await poolSGC.request().query(`select * from socios
    // WHERE CONCAT(idSucursal,'-',idSocio) = '${partner}'`);
    // socio = socio.recordset;
    // console.log(socio);
    // poolSGC.close();

    

    for (const acc of access) {

        let connectionDB;

        if (acc.origin == 'mega-ac-api.azurewebsites.net'){
            connectionDB = settings.MEGA;   
        }
        else if (acc.origin == 'fiter-ac-api.azurewebsites.net'){
            connectionDB = settings.FITER;
        }

        let poolSGC = await getConnection(settings.MEGA);
        let partner = acc.partner_id;
        let socio = await poolSGC.request().query(`select * from socios WHERE CONCAT(idSucursal,'-',idSocio) = '${partner}'`);
        socio = await socio.recordset[0];
        

        acc.created = moment(acc.created, 'ddd MMM D YYYY h:mm:ss ZZ').format('YYYY-MM-DD HH:mm:ss.000');        

        let contract;
        try {            
        poolSGC.request().query(`SELECT TOP(1) * FROM dbo.FN_Rules_AccessControl_Contrato (${socio.idSocio}, ${socio.idSucursal}, '${acc.created}')`)        
        .then(result => contract = result.recordset[0])
        .then(() => poolSGC.close());
        console.log(contract);
        } catch (error) {
            console.log(`es de fiter`);
        }

        try {
        let poolinsert = await getConnection(settings.MGFTQA);  
        poolinsert.request().query( `INSERT INTO AccessLogsWithContract(partner_id, contract_id, contract_subsidiary, access_control_external_id, device_serial, result, message, data_type, data, origin, app_version, request_id, created) VALUES ('${acc.partner_id}','${contract.idSucursal}-${contract.idContrato}', ${contract.idSucursal}, '${acc.access_control_external_id}', '${acc.device_serial}', ${acc.result}, '${acc.message}', '${acc.data_type}', ${acc.data}, '${acc.origin}', '${acc.app_version}', '${acc.request_id}', '${acc.created}')`)
        .then(() => poolinsert.close())
        
        } catch (error) {
            console.log("es de fiter");
        }       
            
    }

    // await poolSGC.close();  




    

    




    // let pool = await getConnection(settings.MEGA);
    // let resDB = await pool.request().query(queries.getContract(527856, 14, '20221013'));
    // // let resDB = await pool.request().query(`SELECT TOP(1) * FROM dbo.FN_Rules_AccessControl_Contrato(527856, 14, '20221013')`)
    // resDB = resDB.recordset
    // console.log(resDB);





// let pool = await getConnection(settings.MGFT);
// let accessLogs = await pool.request().query(queries.getAcessLogs());
// accessLogs = accessLogs.recordset
// await pool.close();



// let getContract = async (origin, partner, date) => {
//     let connectionDB;

//     if (origin == 'mega-ac-api.azurewebsites.net'){
//         connectionDB = settings.MEGA;   
//     }
//     else if (origin == 'fiter-ac-api.azurewebsites.net'){
//         connectionDB = settings.FITER;
//     }

//     let pool = await getConnection(connectionDB);
//     pool.connect();
//     let socio = await pool.request().query(queries.getPartner(partner));
//     socio = socio.recordset;

//     let contract = await pool.request().query(queries.getContractId(socio.idSocio, socio.idSucursalSocio, date));
//     contract = contract.recordset;
//     await pool.close();

//     return contract;    
// }



// let contrato = await getContract('fiter-ac-api.azurewebsites.net', '2004-128612', '20221310');

// console.log(contrato);





// for (const acc of accessLogs) {


//     let socio = getPartner()





    // let connectionDB;
    // console.log(acc);

    // if (acc.origin == 'mega-ac-api.azurewebsites.net'){
    //     connectionDB = settings.MEGA;   
    // }
    // else if (acc.origin == 'fiter-ac-api.azurewebsites.net'){
    //     connectionDB = settings.FITER;
    // }

    // let pool = await getConnection(connectionDB);
    // let contract = await pool.request().query(queries.getContractId(`${acc.partner_id}`));
    // contract = contract.recordset;
    // console.log(contract);
    // pool.close();


    // let poolinsert = await getConnection(settings.MGFTQA);  
    // await poolinsert.connect();

    // await poolinsert.request().query( `INSERT INTO AccessLogsWithContract(partner_id, contract_id, contract_subsidiary, access_control_external_id, device_serial, result, message, data_type, data, origin, app_version, request_id, created) VALUES ('${acc.partner_id}','${contract.idSucursal}-${contract.idContrato}', ${contract.idSucursal}, '${acc.access_control_external_id}', '${acc.device_serial}', ${acc.result}, '${acc.message}', '${acc.data_type}', ${acc.data}, '${acc.origin}', '${acc.app_version}', '${acc.request_id}', '${acc.created}')`);

    // await poolinsert.close();
    


// }


