/**
 * Commands object
 * @constructor
 */
function Commands() {
    /**
     * Execute right function from given message
     * @param message Given message
     */
    this.parse = function(message){
        // If message is a command
        if(message.startsWith("/") && !message.startsWith("/ ")){
            let commandName = message.split(" ")[0];
            // If command exist
            if(this.isCommandExist(commandName)){
                const commandArgs = this.getArguments(message);
                // If there is enough arguments
                if(commandArgs.length >= this.commandsList[commandName]["argsCount"]){
                    // Execute command
                    this.commandsList[commandName]["executor"](commandArgs);
                }
            }
        }
    };

    /**
     * Check if given command is declared in commandsExecutorsDict
     * @param command Command name
     * @returns {boolean} True if command exist, false if not
     */
    this.isCommandExist = function (command){
        let commandsList = this.getCommandList();
        for(let i = 0; i < commandsList.length; i++){
            if(command === commandsList[i]){
                return true;
            }
        }
        return false;
    };

    /**
     * Get arguments from given message
     * @param message Given Message
     * @returns {*|string[]} List of arguments
     */
    this.getArguments = function(message){
        const tempList = message.split(" ");
        tempList.shift();
        return tempList;
    };

    /**
     * Get command list
     * @returns {string[]} Command list (with "/")
     */
    this.getCommandList = function (){
        return Object.keys(this.commandsList);
    };

    // Commands executors
    this.backgroundCommand = function (args){
        console.log(args);
    };

    // Command list
    this.commandsList = {
        "/background": {"argsCount": 1, "executor": this.backgroundCommand}
    };
}

export {Commands};