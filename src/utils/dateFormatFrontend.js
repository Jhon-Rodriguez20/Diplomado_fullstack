export const dateFormatFrontend = (date) => {
       var partes = date.split('-');
    
       var nuevaFecha = new Date(partes[2], partes[1] - 1, partes[0]);
       
       var nuevoDia = nuevaFecha.getDate();
       var nuevoMes = nuevaFecha.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
       var nuevoAnio = nuevaFecha.getFullYear();
       
       if (nuevoDia < 10) {
           nuevoDia = '0' + nuevoDia;
       }
       if (nuevoMes < 10) {
           nuevoMes = '0' + nuevoMes;
       }
       
       return nuevoAnio + '-' + nuevoMes + '-' + nuevoDia;
  };