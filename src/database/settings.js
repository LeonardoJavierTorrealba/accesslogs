import sql from "mssql";

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

    Madero:  {
            user: 'desa',
            password: 'AdMiN5811',
            server: 'BUE129SRV001',
            database: 'MegatlonSGC_Prod_29',
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

    getConnection: async (dbSetting) => {
        try {
            let pool = await sql.connect(dbSetting);                           
            return pool;        
        } catch (error) {
            console.error(error);        
        }
    }
}

export default settings;