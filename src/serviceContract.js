import fetch from "node-fetch";
import connection from './database/connection.js';
import sql from "mssql";
import moment from 'moment'
import obj from './poolManager.js';





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

const poolMGFT = await obj.get('MGFT', settings.MGFT);
const poolFITER = await obj.get('FITER', settings.FITER);
const poolMEGA = await obj.get('MEGA', settings.MEGA)


    //-----------TRAIGO LOS ACCESOS ------------------ //
    // let poolAccess = await getConnection(settings.MGFT);
      
    // let poolFITER = await getConnection(settings.FITER);
    


    
    let access = await poolMGFT.request().query(
        `
        SELECT id,
       partner_id,
       origin,
       created,
       JSON_VALUE(data, '$.ProcessStep') AS data_ProcessStep
       ,CASE WHEN (origin IN ('mega-ac-api.azurewebsites.net','mega-ac-api-nunez.azurewebsites.net', 'mega-accesscontrol-bkd.azurewebsites.net', 'mega-accesscontrol-bkd-nunez.azurewebsites.net')) THEN 'Megatlon'
            WHEN (origin IN ('fiter-ac-api-caballito2.azurewebsites.net','fiter-ac-api.azurewebsites.net') AND JSON_VALUE(data, '$.ProcessStep') = 'MigracionCaballitoAsyncStep') THEN 'MigracionCaba'
            ELSE 'Fiter'
            END DBContext
    FROM AccessLogs
    WHERE id BETWEEN 3000000 AND 3100000
        `
        // BETWEEN 3000000 AND 3002100

        //404655
        
    );
    access = access.recordset;
    
    // await poolAccess.close();


    //-----------ITERO LOS ACCESOS ------------------ //
  
    for (let i = 0; i < access.length; i++) {
        let acc = access[i];
        acc.created = moment(acc.created, 'ddd MMM D YYYY h:mm:ss ZZ').format('YYYY-MM-DD HH:mm:ss.000');
        

        if(acc.data_ProcessStep == 'GymPassValidatorAsyncStep'){         
        //-----------DETERMINO A DONDE ME CONECTO POR EL ORIGEN Y EL STEP ------------------ //        
        let poolSGC;

        if (acc.DBcontext == 'Fiter'){
            poolSGC = poolFITER;
        }
        else{
            poolSGC = poolMEGA;
        }
        

        
        //-----------DETERMINO EL IDSUCURSALSOCIO Y EL IDSOCIO POR SEPARADO SEGUN EL PARTNER_ID------------------ //
        let socio = {
            idSucursal: "",
            idSocio: ""
        }

        let index = acc.partner_id.indexOf('-');
        socio.idSucursal = acc.partner_id.slice(0, index);
        socio.idSocio = acc.partner_id.slice(index+1);
        
        
        
        //-----------TRAIGO EL CONTRATO O EL IDSERVICIO------------------ //        
        let contractOrService = {
            contract_id: null,
            product_id: null
        }

        if (acc.data_ProcessStep == 'StandardAccessValidationAsyncStep'  || acc.data_ProcessStep == 'MigracionCaballitoAsyncStep'){      
        try {
        let resFunction = await poolSGC.request().query(`SELECT TOP(1) * FROM dbo.FN_Rules_AccessControl_Contrato (${socio.idSocio}, ${socio.idSucursal}, '${acc.created}')`);
        resFunction = await resFunction.recordset[0];  

        contractOrService.contract_id = `${resFunction.id_sucursal_contrato}-${resFunction.id_contrato}`
        contractOrService.product_id = "gympass"

        } catch (error) {
            console.log(error);
        }}
        else if (acc.data_ProcessStep == 'GetActiveServiceAsyncStep' || acc.data_ProcessStep == 'GymPassValidatorAsyncStep' || acc.data_ProcessStep == 'GymPassValidatorByHookAsyncStep'){
                try {
        let resSP = await poolSGC.request().query(`EXEC SP_ServiciosSociosVigencias_Listar ${socio.idSocio}, ${socio.idSucursal},'${acc.created}'`);
        resSP = resSP.recordset[0];      
        // console.log(resSP);
        contractOrService.contract_id = `${resSP.IdSucursalServicioSocio}-${resSP.IdServicioSocio}`;
        contractOrService.product_id = resSP.Servicio;
        console.log(contractOrService);
        } catch (error){
            console.log("Falla en consulta SP Servicio");
            contractOrService.product_id = "GymPass";
        }            
        }

        // poolSGC.close();

        

        //---------UPDATEO LA TABLA ----------//        
        // let poolUpdate = await getConnection(settings.MGFT);
        try {
            let resUpdate = await poolMGFT.request().query(
                `UPDATE accesslogs
                SET process_step = '${acc.data_ProcessStep}', contract_id= '${contractOrService.contract_id}', product_id= '${contractOrService.product_id}'
                WHERE id = ${acc.id}
                `
            )
            console.log(`updateado el id ${acc.id} a las ${moment().format('LTS')}`);
        } catch (error) {
            console.log(error);
            
        }

        // await poolUpdate.close()

    }
        

    } //cierre del for

        


    
        


        
    























// for (let i = 0; i < 20; i++) {

// let poolAccess = await getConnection(settings.MGFT);
// let access = await poolAccess.request().query(`SELECT TOP(1) * FROM AccessLogs`);
// console.log(access.recordset);
// poolAccess.close()

// let poolFiter = await getConnection(settings.FITER);
// let socioFiter = await poolFiter.request().query(`SELECT TOP(1) * FROM socios`);
// console.log(socioFiter.recordset);
// poolFiter.close();
   
// let poolMega = await getConnection(settings.MEGA);
// let socioMega = await poolMega.request().query(`SELECT TOP(1) * FROM socios`);
// console.log(socioMega.recordset);
// poolMega.close();

// let poolQA = await getConnection(settings.MGFTQA);
// let accessqa = await poolQA.request().query(`SELECT TOP(1) * FROM AccessLogs`);
// console.log(accessqa.recordset);
// poolQA.close();
    
// }


