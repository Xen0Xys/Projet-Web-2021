import {getRandomHex, getRandomInt} from "./js_utils.js";

class Tests{
    /**
     * Test class, use to test app
     * @param commands Commands object
     */
    constructor(commands) {
        this.commands = commands;
    }

    /**
     * Test method, runs all app commands
     * @returns {number} State of tests, 0 is ok, other is error id (unique local command id)
     */
    test() {
        if(this.commands.debugCommand(["Test case"]) !== 0){
            return 1;
        }
        if(this.commands.helpCommand() !== 0){
            return 2;
        }
        if(this.commands.loremIpsumCommand() !== 0){
            return 3;
        }
        if(this.commands.backgroundCommand([getRandomHex()]) !== 0){
            return 4;
        }
        if(this.commands.messageColorCommand([getRandomHex()]) !== 0){
            return 5;
        }
        if(this.commands.messageSizeCommand([getRandomInt(10, 20)]) !== 0){
            return 6;
        }
        if(this.commands.messageBackgroundCommand([getRandomHex()]) !== 0){
            return 7;
        }
        return 0;
    }
}

export {Tests}