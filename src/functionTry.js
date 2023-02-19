import fetch from "node-fetch";
import connection from './database/settings.js';
import sql from "mssql";
import moment from 'moment'
import poolManager from './database/poolManager.js';
import settings from "./database/settings.js";

async function actualizarContratos (startNumber, finalNumber) {

    //Me conecto a MGFT seguro y a las otras dos bases, porque dependiendo del registro uso Mega o Fiter
const poolMGFT = await poolManager.get('MGFT', settings.MGFT);
const poolFITER = await poolManager.get('FITER', settings.FITER);
const poolMEGA = await poolManager.get('MEGA', settings.MEGA)

    //Me traigo un lote de registros de la DB AccessLogs
    let access = await poolMGFT.request().query(
        `
        SELECT 
            id,
            partner_id,
            origin,
            created,
            JSON_VALUE(data, '$.ProcessStep') AS data_ProcessStep,
            CASE
                WHEN (origin IN ('mega-ac-api.azurewebsites.net','mega-ac-api-nunez.azurewebsites.net', 'mega-accesscontrol-bkd.azurewebsites.net', 'mega-accesscontrol-bkd-center2.azurewebsites.net', 'mega-accesscontrol-bkd-nunez.azurewebsites.net')) THEN 'Megatlon'
                WHEN JSON_VALUE(data, '$.ProcessStep') = 'MigracionCaballitoAsyncStep' THEN 'MigracionCaba'
                ELSE 'Fiter'
            END DBContext
        FROM AccessLogs
        WHERE id BETWEEN ${startNumber} and ${finalNumber}
        ` 
        
    );
    access = access.recordset; 
    
    //-----------ITERO LOS ACCESOS ------------------ //

    const stepsToContract = [
        'StandardAccessValidationAsyncStep',
        'ProcessingTurnProvider',
        'MigracionCaballitoAsyncStep',
        'ConnusTurnProcessorStep', 
        'GetActiveServiceStep',
        'ProcessGymPassServicesStep'
    ];
  
    for (let i = 0; i < access.length; i++) {
        let acc = access[i];
        acc.created = moment(acc.created, 'ddd MMM D YYYY h:mm:ss ZZ').format('YYYY-MM-DD HH:mm:ss.000');
      
   
        //-----------DETERMINO A DONDE ME CONECTO POR DBCONTEXT ------------------ //        
        let poolSGC = poolMEGA

        if (acc.DBContext == 'Fiter'){
            poolSGC = poolFITER;
        }
        
        //-----------DETERMINO EL IDSUCURSALSOCIO Y EL IDSOCIO POR SEPARADO SEGUN EL PARTNER_ID------------------ //
        let index = acc.partner_id.indexOf('-');
        let socio = {
            idSucursal: acc.partner_id.slice(0, index),
            idSocio: acc.partner_id.slice(index+1)
        }       
                
        //-----------TRAIGO EL CONTRATO O EL IDSERVICIO------------------ //        
        let contractOrService = {
            contract_id: null,
            product_id: null
        }







        if (stepsToContract.includes(acc.data_ProcessStep) && socio.idSocio > 0){      
            try {
            let resFunction = await poolSGC.request().query(`SELECT TOP(1) * FROM dbo.FN_Rules_AccessControl_Contratos_Membresias (${socio.idSocio}, ${socio.idSucursal}, '${acc.created}') ORDER BY idProductoTipo DESC`);

            resFunction = await resFunction.recordset[0];  

            

            contractOrService.contract_id = `${resFunction.id_sucursal_contrato}-${resFunction.id_contrato}`
            contractOrService.product_id = resFunction.id_producto;
            
            if(resFunction.id_sucursal_contrato == null){
            contractOrService.contract_id = null;
            contractOrService.product_id = null;
            }



            } catch (error) {
                console.log(error);
            }
        
     

        //---------UPDATEO LA TABLA ----------//       

        var queryUpdate = `UPDATE accesslogs
        SET process_step = '${acc.data_ProcessStep}', contract_id= '${contractOrService.contract_id}', product_id= '${contractOrService.product_id}'
        WHERE id = ${acc.id}`

        if(contractOrService.contract_id == null ||contractOrService.product_id == null ){
           queryUpdate = `UPDATE accesslogs
            SET process_step = '${acc.data_ProcessStep}', contract_id= ${null}, product_id=  ${null}
            WHERE id = ${acc.id}`
        }      

        

        try {
            let resUpdate = await poolMGFT.request().query(queryUpdate)
            console.log(`updateado el id ${acc.id} a las ${moment().format('LTS')}`);
        } catch (error) {
            console.log(error);            
        } 
        
    }    
    } //cierre del for

    let cierre = await poolManager.closeAll();
    console.log(cierre);

}


export default actualizarContratos;
    























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


