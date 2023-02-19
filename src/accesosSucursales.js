import fetch from "node-fetch";
import connection from './database/connection.js';


const pool = await connection.getConnectionProdFiter();  
pool.connect(); 
    var idcontrato = await pool.request().query(`select c.idContrato from contrato c
    where c.IdProducto IN (100056, 100057) AND c.baja = 0 AND c.idContrato NOT IN (select c.idContrato from contrato c INNER JOIN accesos a ON a.idContrato = c.idContrato where c.IdProducto IN (100056, 100057) AND c.baja = 0)`);
    var contratos = idcontrato.recordset;

console.log(contratos);