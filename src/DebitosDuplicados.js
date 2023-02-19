// import fetch from "node-fetch";
import settings from "./database/settings.js";
import poolManager from './database/poolManager.js';

const poolMGFT = await poolManager.get('MGFT', settings.MGFT);
const poolFITER = await poolManager.get('FITER', settings.FITER);
const poolMEGA = await poolManager.get('MEGA', settings.MEGA)
const poolMGFTQA = await poolManager.get('MGFTQA', settings.MGFTQA)
const poolMadero = await poolManager.get('Madero', settings.Madero)


 
const documents = [{
    iddocumento: 2716868,
    idsucursal: 29
}]

let setQuery = (iddocumento, idsucursal) => {

let queryDocuments = `
DECLARE @iddocumento  INT = ${iddocumento}
DECLARE @iddocumentonvo  INT
DECLARE @idsucursal INT = ${idsucursal}
DECLARE @idTipoDoc INT = 91
DECLARE @idTipoDocAFacturar INT = 49

INSERT dbo.Documentos
(
    idSucursal,
    idEmpresa,
    idSocio,
    idSucursalSocio,
    idTipoDoc,						-- DATO MANUAL		
    idAperturaCierre,				-- DATO MANUAL
    idCaja,
    idSucursalCaja,
    idDocumentoRelacionado,			-- DATO MANUAL
    fechaYHora,						-- DATO MANUAL
    NroDocumento,					-- DATO MANUAL
    formaFacturacion,
    importeBruto,
    porcentajeDescuentos,
    importeDescuentos,
    porcentajeIncrementos,
    importeIncrementos,
    importeNeto,
    TotalIVA,
    porcentajePercepcionIIBB,
    ImportePercepcionIIBB,
    importeTotal,
    centroEmisor,
    numeroZ,
    idNotaCredito,
    idUsuario,
    idSucursalUsuario,
    idUsuarioAutoriza,
    idSucursalAutoriza,
    Contracargo,
    idUsuarioAutorizaVF,
    idsucursalAutorizaVF,
    idDatoFiscal,
    idSucursalDomicilioFiscal,
    esVentaPorAfuera,
    fechaPago,
    IdUsuarioConfirmacionPago,
    IdSucursalUsuarioConfirmacionPago,
    idDocumentoSenia,
    FechaOperacionElectronica,
    FechaComprobanteFiscal,			-- DATO MANUAL
    EnviadoA3C,
    FechaIVA,						-- DATO MANUAL
    CAE,
    VencimientoCAE,
    idCondicionPago,
    VentaExportada,
    IdMotivo,						-- DATO MANUAL
    Observacion,
    periodoFactCorpo,
    docEnviado,
    idEstadoFactura,				-- DATO MANUAL
    InvoicerReference,
    CantEnviosFE,
    tsInsert,						-- DATO MANUAL
    idTipoDocAFacturar,				-- DATO MANUAL

	idDocumentoUsoSenia,
	idsucursaldocumentousosenia,
	TsUsoSenia,

	idCanalVentaTipo,				-- Agregado 01-09-2021
	idDatoFiscalSociedad,			-- Agregado 01-09-2021
	idSucursalDatoFiscalSociedad	-- Agregado 01-09-2021
                         
)
SELECT     
	idSucursal,
    idEmpresa,
    IdSocio,
	idSucursalSocio,
    @IdTipoDoc,								-- IdTipoDoc
    0,										-- idAperturaCierre
    idCaja,
    idSucursalCaja,
    @iddocumento,					-- idDocumentoRelacionado -- IR ACTUALIZANDO X CADA DOCUMENTO
    dbo.getdatearg(),
    0,								-- NroDocumento
    formaFacturacion,
    importeBruto,
    porcentajeDescuentos,
    importeDescuentos,
    porcentajeIncrementos,
    importeIncrementos,
    importeNeto,
    TotalIVA,
    porcentajePercepcionIIBB,
    ImportePercepcionIIBB,
    importeTotal,
    centroEmisor,
    numeroZ,
    idNotaCredito,
    idUsuario,
    idSucursalUsuario,
    idUsuarioAutoriza,
    idSucursalAutoriza,
    Contracargo,
    idUsuarioAutorizaVF,
    idsucursalAutorizaVF,
    idDatoFiscal,
    idSucursalDomicilioFiscal,
    esVentaPorAfuera,
    fechaPago,
    IdUsuarioConfirmacionPago,
    IdSucursalUsuarioConfirmacionPago,
    idDocumentoSenia,
    FechaOperacionElectronica,
    dbo.GetDateArg(),				-- FechaComprobanteFiscal
    EnviadoA3C,
    dbo.GetDateArg(),				-- FechaIVA
    NULL,							-- CAE
    NULL,							-- VencimientoCAE
    idCondicionPago,
    VentaExportada,
    NULL,								-- IdMotivo -- 17 DEVOLUCION -- 18 RECHAZO -- 19 CONTRACARGO
    Observacion,
    periodoFactCorpo,
    docEnviado,
    22,								-- idEstadoFactura // 22 (PENDIENTE)
    NULL,
    1,								-- CantEnviosFE,
    dbo.GetDateArg(),				-- tsInsert
    @idTipoDocAFacturar,								-- idTipoDocAFacturar -- 83 Nota Credito B // Se netea contra 49 FB ó Nota Debito B 69 //##// 82 Nota Credito A // Se netea contra 48 FA ó Nota Debito A 68

	idDocumentoUsoSenia,			-- 
	idsucursaldocumentousosenia,	-- 
	TsUsoSenia,						-- 

	idCanalVentaTipo,				-- Agregado 01-09-2021
	idDatoFiscalSociedad,			-- Agregado 01-09-2021
	idSucursalDatoFiscalSociedad	-- Agregado 01-09-2021
	
FROM dbo.Documentos AS d2
WHERE d2.idDocumento = @iddocumento AND d2.idSucursal = @idsucursal


SET @iddocumentonvo = scope_identity() 

INSERT dbo.DocumentosDetalles
(
    idDocumento,
    idSucursalDocumento,
    descripcionDetalle,
    cantidad,
    idCorporativo,
    importeBruto,
    porcentajeDescuentos,
    importeDescuentos,
    porcentajeIncrementos,
    importeIncrementos,
    importeNeto,
    IdCuota,
    idSucursalCuota,
    TotalIVA,
    porcentajePercepcionIIBB,
    importePercepcionIIBB,
    importeTotal,
    FechaContrato,
    IdProducto,
    idListaPrecioArticulo,
    VendedoresComisionanPorcentaje,
    VendedoresComisionanCalificacion,
    idListaPrecio,
    idPromocion,
    idCupon,
    FechaCalificacion,
    idUsuarioCalificacion,
    idSucursalUsuarioCalificacion,
    calificacionAutomatica,
    observacion,
    VendedoresComisionanImporte,
    IdPromocionGlobalResultadoVenta,
    IdPromocionGlobal,
    AlicuotaIVA,
    precioUnit
)

SELECT
	@iddocumentonvo,
    idSucursalDocumento,
    descripcionDetalle,
    cantidad,
    idCorporativo,
    importeBruto,
    porcentajeDescuentos,
    importeDescuentos,
    porcentajeIncrementos,
    importeIncrementos,
    importeNeto,
    IdCuota,
    idSucursalCuota,
    TotalIVA,
    porcentajePercepcionIIBB,
    importePercepcionIIBB,
    importeTotal,
    dbo.getdatearg(),				-- FechaContrato
    IdProducto,
    idListaPrecioArticulo,
    VendedoresComisionanPorcentaje,
    VendedoresComisionanCalificacion,
    idListaPrecio,
    idPromocion,
    idCupon,
    FechaCalificacion,
    idUsuarioCalificacion,
    idSucursalUsuarioCalificacion,
    calificacionAutomatica,
    observacion,
    VendedoresComisionanImporte,
    IdPromocionGlobalResultadoVenta,
    IdPromocionGlobal,
    AlicuotaIVA,
    precioUnit
FROM dbo.DocumentosDetalles AS dd
WHERE dd.idDocumento = @iddocumento AND dd.idSucursalDocumento = @idsucursal


INSERT dbo.DocumentosPagosMediosElectronicos
(
    idSucursal,
    idMedio,
    idSucursalDocumento,
    idDocumento,
    numeroTarjeta,
    idbanco,
    idTipoTarjeta,
    cantCuotas,
    idemisorTarjeta,
    numeroCupon,
    idTarjeta,
    idSucursalTarjeta,
    monto,
    numerolote,
    IdCompra,
    IdAnulacionCompra,
    IdDevolucion,
    idSucursalCompra,
    idSucursalAnulacionCompra,
    idSucursalDevolucion,
    DatosAuxiliares,
    CodigoOperacion,
    numeroAutorizacion,
    codigoEstablecimiento,
    terminal,
    megapago_operacion_id,
    megapago_operacion_idSucursal,
    Id_Gateway,
    IdExterno_Gateway,
    Banco_Gateway,
    TipoPago_Gateway,
    MetodoPago_Gateway,
    IdentificadorCuenta_Gateway,
    JsonResult_Gateway,
    Email,
    PorcentajeComisionVendedor,
    PorcentajeComisionCalificacionVendedor
)
SELECT     idSucursal,
    idMedio,
    idSucursalDocumento,
    @iddocumentonvo,
    numeroTarjeta,
    idbanco,
    idTipoTarjeta,
    cantCuotas,
    idemisorTarjeta,
    numeroCupon,
    idTarjeta,
    idSucursalTarjeta,
    monto,
    numerolote,
    IdCompra,
    IdAnulacionCompra,
    IdDevolucion,
    idSucursalCompra,
    idSucursalAnulacionCompra,
    idSucursalDevolucion,
    DatosAuxiliares,
    CodigoOperacion,
    numeroAutorizacion,
    codigoEstablecimiento,
    terminal,
    megapago_operacion_id,
    megapago_operacion_idSucursal,
    Id_Gateway,
    IdExterno_Gateway,
    Banco_Gateway,
    TipoPago_Gateway,
    MetodoPago_Gateway,
    IdentificadorCuenta_Gateway,
    JsonResult_Gateway,
    Email,
    PorcentajeComisionVendedor,
    PorcentajeComisionCalificacionVendedor

FROM dbo.DocumentosPagosMediosElectronicos AS dpme
WHERE dpme.idDocumento = @iddocumento AND dpme.idSucursalDocumento = @idsucursal


UPDATE documentos
SET idNotaCredito = @iddocumentonvo
where iddocumento = @iddocumento AND idSucursal = @idsucursal


`
return queryDocuments;

}


for (const doc of documents) {
let execQuery  = await poolMadero.query(setQuery(doc.iddocumento, doc.idsucursal))
console.log(execQuery);
}
    
