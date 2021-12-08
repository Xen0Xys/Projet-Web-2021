/**
 * @module JsUtils
 * @description Module which contain diverse utils for JS
 */

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

/**
 * Get random hex value
 * @returns {string} String with random hex value
 */
function getRandomHex(){
    let hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let hex = '#';
    for(let i = 0; i < 6; i++){
        const index = Math.floor(Math.random() * hexValues.length)
        hex += hexValues[index];
    }
    return hex;
}

/**
 * Get random number between 2 numbers
 * @param min Minimal number
 * @param max Maximal number
 * @returns {number} ROutput random number
 */
function getRandomInt(min, max) {
    return Math.trunc(Math.random() * (max + 1 - min) + min);
}

export {zeroFilled, getRandomHex, getRandomInt}
