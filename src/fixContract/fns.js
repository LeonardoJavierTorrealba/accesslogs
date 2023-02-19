import moment from 'moment'

let funciones = {
    
    diasEnUnMes: (fecha) => {
        let YYYYM = moment.utc(fecha).format('YYYY-M')    
        let result = moment.utc(YYYYM, 'YYYY-M').daysInMonth();
        // console.log(result);
        return result;
        
    },
    
    sumarDias: (fecha, dias) => {
        let result = moment.utc(fecha).add(dias, 'day').format('YYYY-MM-DD HH:mm:ss.000');   
        // console.log(result);   
        return result;
    }


}


export default funciones;
