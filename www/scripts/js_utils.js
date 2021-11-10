/**
 * Get string with a number filled with zeros
 * @param number Number to fill
 * @param zerosCount Total size of the returned string
 * @returns {string} String with number filled with zeros
 */
function zeroFilled(number, zerosCount){
    zerosCount -= number.toString().length;
    if ( zerosCount > 0 )
    {
        return new Array( zerosCount + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
}

export {zeroFilled}