import connection from "./connection.js";

const queriesResendObj = {

    getDocuments: (previousDays) =>{ 
                    
        return(`DECLARE @Fdesde DATE, 
        @FHasta DATE = GETDATE();
        SET @Fdesde = GETDATE()-${previousDays || 7}

        SELECT d.iddocumento, d.idSucursal, CONCAT(d.idSucursalSocio, '-' ,d.idSocio) as idSocio, d.importeTotal, d.InvoicerReference, d.tsInsert 
        FROM documentos d
        WHERE (CONVERT(DATE, D.fechaYHora)BETWEEN @Fdesde AND @FHasta) 
        AND D.idSucursal NOT IN ( 11 )
        AND D.idEstadoFactura = 23`
        )
        
    },

                
    getDocumentsBySuc: (previousDays, idSucursal) =>{ 

        let subsidiary = parseInt(idSucursal);
                    
        return(
        `DECLARE @Fdesde DATE, 
        @FHasta DATE = GETDATE();
        SET @Fdesde = GETDATE()-${previousDays || 7}
        SELECT d.iddocumento as idDocumento, d.idSucursal, s.nombre as nombreSucursal, CONCAT(d.idSucursalSocio, '-' ,d.idSocio) as idSocio, soc.numeroDoc, d.importeTotal, d.InvoicerReference as invoicerReference, CONVERT(varchar,d.tsInsert,20) as dateTime
        FROM documentos d
		INNER JOIN sucursales s ON d.idSucursal = s.idSucursal
		INNER JOIN socios soc ON soc.idSocio = d.idSocio AND soc.idSucursal = d.idSucursalSocio
        WHERE (CONVERT(DATE, D.fechaYHora)BETWEEN @Fdesde AND @FHasta) 
        AND d.idSucursal = ${subsidiary}
        AND d.idEstadoFactura = 23`
        )
        
    },
    
    getInvoicerReferences: (previousDays) =>{ 
                    
                    return(`DECLARE @Fdesde DATE, 
                    @FHasta DATE = GETDATE();
                    SET @Fdesde = GETDATE()-${previousDays || 7}
    
                    SELECT d.InvoicerReference
                    FROM documentos d
                    WHERE (CONVERT(DATE, D.fechaYHora)BETWEEN @Fdesde AND @FHasta) 
                    AND D.idSucursal NOT IN ( 11 )
                    AND D.idEstadoFactura = 23`
                    )
                    
                },

    concatResendReference: (reference) => {
        let url = connection.endPoints.resendTo + reference;
        return url;
    },

    concatUpdateReference: (reference) => {
        let url = connection.endPoints.updateVoucher + reference;
        return url;
    },

    getSucursales: (sucursal) => {
        
        if(sucursal){
            return(
                `SELECT idSucursal, nombre, SqlServerIP, dbName, SqlServerUser, SqlServerPass
                FROM sucursales
                WHERE idSucursal = ${sucursal} Activa = 1 AND dbName IS NOT NULL AND idSucursal BETWEEN 1 AND 60
                `)
        }
    },

    insertInto: (partner_id, access_control_external_id, device_serial, result, message, data_type, data, origin, app_version, request_id, created) => {      
            return(
                `INSERT INTO sociosPruebaLeonardo VALUES (${partner_id}, ${access_control_external_id}, ${device_serial}, ${result}, ${message}, ${data_type}, ${data}, ${origin}, ${app_version}, ${request_id}, ${created})`
                )
      


    }



    
    
    }
    
    export default queriesResendObj;
    
    
    