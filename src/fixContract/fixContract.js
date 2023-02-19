import fetch from "node-fetch";
import connection from '../database/connection.js';
import sql from "mssql";
import moment from 'moment'
import obj from '../poolManager.js';
import settings from './settingsFixContractDB.js';
import funciones from './fns.js'




// const poolMGFT = await obj.get('MGFT', settings.MGFT);
const poolFITER = await obj.get('FITER', settings.FITER);
// const poolMEGA = await obj.get('MEGA', settings.MEGA)

   
    let cuotasSocio = await poolFITER.request().query(
        `
        DECLARE	@DNI INT = 32757639
        SELECT cc.fechaInicio, cc.fechaFin, s.idsucursal as idSucursalSocio, s.idsocio AS idSocio, c.idSucursal AS idSucursalContrato, c.idContrato, s.numeroDoc FROM Socios s 
        INNER JOIN contrato c ON c.idsocio = s.idsocio AND c.idSucursalSocio = s.idSucursal 
        INNER JOIN ContratosCuotas cc  ON c.idContrato = cc.idcontrato AND c.idSucursal = cc.idSucursalContrato
        WHERE s.numeroDoc  = @DNI
        AND c.baja = 0
        AND cc.idEstadoCuota = 9
        ORDER BY cc.idCuota 
        `    
        
    );
    cuotasSocio = cuotasSocio.recordset;
    
    for (const cuota of cuotasSocio) {

        let inicioCuota = moment.utc(cuota.fechaInicio).format('YYYY-MM-DD HH:mm:ss.000');   
        let finCuota = moment.utc(cuota.fechaFin).format('YYYY-MM-DD HH:mm:ss.000');   
        console.log(`Fecha inicio cuota: ${inicioCuota}`);        
        console.log(`Fecha fin cuota: ${finCuota}`);
        console.log("RESULTADO:");
        


        let daysAdd = (funciones.diasEnUnMes(inicioCuota))-1; 
        
        let nuevaFecha = funciones.sumarDias(inicioCuota, daysAdd);

        cuota.fechaInicio = inicioCuota;
        cuota.fechaFin = nuevaFecha; 
        
        console.log(`Fecha fin cuota nueva: ${cuota.fechaFin}`);
        console.log("`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`");
    }


    
  
    
