import format from 'date-fns/format'
import { es } from 'date-fns/locale';

const formatFecha = (fecha)=>{

    let date = new Date(fecha)
    const fechaResult = format(date, 'PPPP', { locale: es }).toLocaleUpperCase()
    
    return fechaResult

}

export default formatFecha