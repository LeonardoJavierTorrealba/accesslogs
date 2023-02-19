DECLARE @Fdesde DATE, --='2021-04-06',
        @FHasta DATE = GETDATE(); --'2021-04-08'
SET @Fdesde = GETDATE()-7

select * from documentos d
where (CONVERT(DATE, D.fechaYHora)BETWEEN @Fdesde AND @FHasta) 
AND D.idSucursal NOT IN ( 11 )
AND D.idEstadoFactura = 23;


DECLARE @Fdesde DATE, --='2021-04-06',
        @FHasta DATE = GETDATE(); --'2021-04-08'
SET @Fdesde = GETDATE()-7

select COUNT(d.idDocumento) from documentos d
where (CONVERT(DATE, D.fechaYHora)BETWEEN @Fdesde AND @FHasta) 
AND D.idSucursal NOT IN ( 11 )
AND D.idEstadoFactura = 23;