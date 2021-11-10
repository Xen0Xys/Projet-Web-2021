/**
 * Command object
 * @param _app App object
 * @constructor
 */
function Commands(_app) {
    // Constructor
    const app = _app;

    /**
     * Execute right function from given message
     * @param message Given message
     * @return {number} 0: executed; 1: unknown; 2: not enough arguments; 3: not a command
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
                    return 0;
                }else{
                    return 2;
                }
            }else{
                return 1;
            }
        }else{
            return 3;
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
    this.debugCommand = function (args){
        let message = "Message template!"
        if(args.length >= 1){
            message = args[0]
        }
        app.sendBotMessage(message)
    }
    /**
     * Change global background color
     * @param args Arguments
     */
    this.backgroundCommand = function (args){
        document.getElementById("help").style.background = args[0];
        document.getElementById("chatbox").style.background = args[0];
    };
    /**
     * Change message color
     * @param args Arguments
     */
    this.messageColorCommand = function (args){
        document.getElementById("chat").style.color = args[0];
    };
    /**
     * Change message size
     * @param args Arguments
     */
    this.messageSizeCommand = function (args){
        document.getElementById("chat").style.fontSize = args[0] + "px";
    };
    /**
     * Change message background color
     * @param args Arguments
     */
    this.messageBackgroundCommand = function (args){
        app.messageBackground = args[0];
        let elements = document.getElementsByClassName("message");
        for(let i = 0; i < elements.length; i++){
            elements[i].style.background = args[0];
        }
    };
    /**
     * Clear all messages
     * @param args Arguments
     */
    this.clearCommand = function (args){
        app.messageList = [];
        document.querySelectorAll('.message').forEach(e => e.remove());
    };
    /**
     * Reset all changes
     * @param args Arguments
     */
    this.resetCommand = function (args){
        document.getElementById("help").style.background = "";
        document.getElementById("chatbox").style.background = "";
        document.getElementById("chat").style.color = "";
        document.getElementById("chat").style.fontSize = "";

        let elements = document.getElementsByClassName("message");
        for(let i = 0; i < elements.length; i++){
            elements[i].style.background = "";
        }
    };

    // Command list
    this.commandsList = {
        "/debug": {"argsCount": 0, "executor": this.debugCommand},
        "/background": {"argsCount": 1, "executor": this.backgroundCommand},
        "/messageColor": {"argsCount": 1, "executor": this.messageColorCommand},
        "/messageSize": {"argsCount": 1, "executor": this.messageSizeCommand},
        "/messageBackground": {"argsCount": 1, "executor": this.messageBackgroundCommand},
        "/clear": {"argsCount": 0, "executor": this.clearCommand},
        "/reset": {"argsCount": 0, "executor": this.resetCommand}
    };
}

export {Commands};