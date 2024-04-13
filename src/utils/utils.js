export const generateCadenaAleatoria = (longitud) => {
   const letras = 'abcdefghijklmnopqrstuvwxyz';
   let cadenaAleatoria = '';

   for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * letras.length);
      cadenaAleatoria += letras.charAt(indice);
   }

   return cadenaAleatoria;
}

export const generateCodigoEnvio = () => {
   const min = 10000;
   const max = 20000;

   const cadenaAleatoria = generateCadenaAleatoria(4);
   const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
   return `${cadenaAleatoria}-${numeroAleatorio}`;
}


export const isEmptyOneAttr = (_object) => {
   for (const key in _object) {
      if (Object.hasOwnProperty.call(_object, key)) {
         const _attr = _object[key];
         if (!_attr || _attr == null || _attr == '') return true   
      }
   }

   return false;
}