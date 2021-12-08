import {Tests} from "./tests.js";
/**
 * Command object
 * @param _app App object
 * @constructor
 */
class Commands{
    /**
     * Commands object
     * @param app Main app class instance
     */
    constructor(app){
        this.app = app;
        this.commandsList = {
            "/debug": {"argsCount": 0, "optionalArgs": true, "description": "/debug [message]: Debug command"},
            "/testCases": {"argsCount": 0, "optionalArgs": false, "description": "/testCases: Run a series of tests"},
            "/help": {"argsCount": 0, "optionalArgs": false, "description": "/help: Send help message"},
            "/loremIpsum": {"argsCount": 0, "optionalArgs": false, "description": "/loremIpsum: Send lorem ipsum"},
            "/background": {"argsCount": 1, "optionalArgs": false, "description": "/background <color>: Change background color"},
            "/messageColor": {"argsCount": 1, "optionalArgs": false, "description": "/messageColor <color>: Change message color"},
            "/messageSize": {"argsCount": 1, "optionalArgs": false, "description": "/messageSize <size>: Change message size"},
            "/messageBackground": {"argsCount": 1, "optionalArgs": false, "description": "/messageBackground <color>: Change message background color"},
            "/clear": {"argsCount": 0, "optionalArgs": false, "description": "/clear: Clear messages"},
            "/reset": {"argsCount": 0, "optionalArgs": false, "description": "/reset: Reset page formatting"}
        };
    }

    /**
     * Execute right function from given message
     * @param message Given message
     * @return {number} 0: executed; 1: unknown; 2: not enough arguments; 3: not a command
     */
    parse(message){
        // If message is a command
        if(message.startsWith("/") && !message.startsWith("/ ")){
            let commandName = message.split(" ")[0];
            // If command exist
            if(this.isCommandExist(commandName)){
                const commandArgs = this.getArguments(message);
                // If there is enough arguments
                if(commandArgs.length >= this.commandsList[commandName]["argsCount"]){
                    // Execute command
                    // this.commandsList[commandName]["executor"](commandArgs);
                    switch (commandName){
                        case "/debug":
                            this.debugCommand(commandArgs);
                            break;
                        case "/testCases":
                            this.testCasesCommand();
                            break;
                        case "/help":
                            this.helpCommand();
                            break;
                        case "/loremIpsum":
                            this.loremIpsumCommand();
                            break;
                        case "/background":
                            this.backgroundCommand(commandArgs);
                            break;
                        case "/messageColor":
                            this.messageColorCommand(commandArgs);
                            break;
                        case "/messageSize":
                            this.messageSizeCommand(commandArgs);
                            break;
                        case "/messageBackground":
                            this.messageBackgroundCommand(commandArgs);
                            break;
                        case "/clear":
                            this.clearCommand();
                            break;
                        case "/reset":
                            this.resetCommand();
                            break;
                    }
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
    }

    /**
     * Check if given command is declared in commandsExecutorsDict
     * @param command Command name
     * @returns {boolean} True if command exist, false if not
     */
    isCommandExist(command){
        let commandsList = this.getCommandList();
        for(let i = 0; i < commandsList.length; i++){
            if(command.toLowerCase() === commandsList[i].toLowerCase()){
                return true;
            }
        }
        return false;
    }

    /**
     * Get arguments from given message
     * @param message Given Message
     * @returns {*|string[]} List of arguments
     */
    getArguments(message){
        const tempList = message.split(" ");
        tempList.shift();
        return tempList;
    }

    /**
     * Get command list
     * @returns {string[]} Command list (with "/")
     */
    getCommandList() {
        return Object.keys(this.commandsList);
    }

    // Commands executors
    /**
     * Debug command
     * @param args Messages to send
     */
    debugCommand(args){
        let message = "Message template!"
        if(args.length >= 1){
            message = args.join(" ")
        }
        this.app.sendBotMessage(message)
        return 0;
    }
    testCasesCommand() {
        let tests = new Tests(this);
        tests.test();
    }

    /**
     * Basic help command
     */
    helpCommand(){
        this.app.sendBotMessage("Besoin d'aide? Je suis la:\n" +
            " - Sur la gauche, vous trouverez les différentes commandes, vous pouvez cliquer dessus pour les coller dans la zone de saisie\n" +
            " - Si vous ne voyez pas ce panneau, vous pouvez cliquer sur le point d'interrogation en bas à gauche pour l'afficher\n" +
            " - La touche entrer permet d'envoyer une commande, et les flèches haut et bas permettent de naviguer dans les commandes déjà entrées\n" +
            "\n" +
            "Bon courage!");
        return 0;
    }

    /**
     * Send lorem ipsum
     */
    loremIpsumCommand(){
        this.app.sendBotMessage("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate pharetra dolor ut aliquam. Etiam dignissim diam orci, venenatis cursus ipsum vehicula in. Donec quis venenatis orci. Praesent vitae semper leo. In augue tellus, consequat sit amet interdum vel, semper non augue. Duis maximus tortor arcu, nec porttitor tellus faucibus eget. Nullam a tortor lacinia, porta velit scelerisque, imperdiet erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque tincidunt urna at ornare placerat. Quisque aliquam facilisis urna vel tincidunt.\n" +
            "\n" +
            "Pellentesque pharetra lacinia fermentum. Donec eu lacinia nibh, sed venenatis lorem. Nullam dapibus velit non est convallis pellentesque. Integer consequat tortor sit amet odio auctor, faucibus molestie justo venenatis. Vestibulum quis lectus viverra, lobortis leo id, suscipit elit. Pellentesque sed blandit arcu. Nunc imperdiet ex eget pulvinar blandit. Pellentesque in orci in dui sollicitudin aliquet.\n" +
            "\n" +
            "Suspendisse eu turpis et ex convallis interdum. Maecenas pretium erat vitae elit commodo auctor. Nullam feugiat nisi neque, sit amet porta quam ullamcorper a. Integer nec sapien leo. Mauris felis ipsum, dictum non mattis sit amet, interdum vitae neque. Sed lobortis nulla urna, eu placerat elit placerat sit amet. Nunc nisl sem, pretium tincidunt nisi at, malesuada gravida metus. Donec blandit tortor purus, eget fermentum lorem elementum condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit sagittis rhoncus. Sed iaculis magna quis suscipit volutpat. Ut vehicula maximus quam nec volutpat. Phasellus sit amet arcu in odio interdum semper.\n" +
            "\n" +
            "Morbi maximus, nibh id tincidunt varius, dolor odio posuere erat, iaculis hendrerit mi ipsum ut dolor. Aliquam eget arcu scelerisque, pellentesque nibh eu, faucibus justo. Integer velit lorem, gravida ac venenatis eu, maximus in urna. Vivamus ut sapien non dui consectetur iaculis. Mauris ultrices, erat eget ultrices auctor, nisl risus suscipit neque, et sagittis massa sem in urna. In hac habitasse platea dictumst. Aenean id massa suscipit justo dignissim laoreet. Vestibulum tristique mauris nec dolor iaculis, ac vehicula neque congue. Vivamus id pulvinar leo, nec ullamcorper lorem. Vivamus scelerisque mi sit amet dapibus vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elementum laoreet ipsum, eget sagittis libero tempus at. Phasellus maximus, ipsum nec tempor tristique, est mi dignissim mauris, vel mattis dui lectus nec sapien. Donec finibus id elit non egestas. Nulla at libero tincidunt, laoreet nisi ut, mollis enim. Donec dignissim tempus dui.\n" +
            "\n" +
            "Integer ac tincidunt mauris, ac tempus lacus. Integer convallis lorem mauris, non fringilla arcu laoreet ut. Morbi mauris lectus, vestibulum nec turpis ut, feugiat rhoncus felis. Donec euismod, orci non pulvinar varius, tellus nulla accumsan ante, at ultricies lectus enim nec dui. Donec id tempus elit. Aenean ac viverra tellus. Vestibulum vitae sapien ac diam euismod commodo. Integer consequat tincidunt nisl, ac ultricies dui pretium a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et pulvinar risus, nec accumsan ex. Morbi nisi erat, facilisis eu malesuada ultricies, maximus quis enim. Quisque ullamcorper lorem at dapibus fermentum. Quisque ligula sem, congue ac ipsum et, elementum ornare felis. Nam rutrum justo id libero malesuada sollicitudin.\n" +
            "\n" +
            "Nulla rutrum volutpat lectus ac vestibulum. Praesent sit amet aliquam urna. Praesent euismod libero ut ornare feugiat. Vivamus scelerisque diam id felis lacinia, pellentesque suscipit nisi vulputate. Duis tempus lacinia urna ac aliquet. Aenean blandit ac dui at hendrerit. Pellentesque congue nisl a mauris feugiat interdum.\n" +
            "\n" +
            "Duis ut ligula quis tellus dapibus eleifend ut in lectus. Nullam accumsan arcu et rhoncus rhoncus. Phasellus commodo mi nunc, sed feugiat enim cursus quis. Mauris sodales tempus sapien eu euismod. Mauris mattis lacus massa, nec porttitor leo mattis eget. Integer suscipit sed tortor tempus pulvinar. Duis tempor enim.")
        return 0;
    }

    /**
     * Change global background color
     * @param args Arguments
     */
    backgroundCommand(args){
        document.getElementById("help").style.background = args[0];
        document.getElementById("chatbox").style.background = args[0];
        document.getElementById("chat").style.background = args[0];
        this.app.sendBotMessage("Le background a été changé par: " + args[0])
        return 0;
    }

    /**
     * Change message color
     * @param args Arguments
     */
    messageColorCommand(args){
        document.getElementById("chat").style.color = args[0];
        this.app.sendBotMessage("La couleur des messages a été changé par: " + args[0])
        return 0;
    }

    /**
     * Change message size
     * @param args Arguments
     */
    messageSizeCommand(args){
        document.getElementById("chat").style.fontSize = args[0] + "px";
        this.app.sendBotMessage("La taille des message a été changé par: " + args[0])
        return 0;
    }

    /**
     * Change message background color
     * @param args Arguments
     */
    messageBackgroundCommand(args){
        this.app.messageBackground = args[0];
        let elements = document.getElementsByClassName("message");
        for(let i = 0; i < elements.length; i++){
            elements[i].style.background = args[0];
        }
        this.app.sendBotMessage("Le background des messages a été changé par: " + args[0])
        return 0;
    }

    /**
     * Clear all messages
     */
    clearCommand(){
        this.app.messageList = [];
        this.app.clearMessagesDisplay()
        this.app.sendBotMessage("Bonjour, comment puis-je vous aider?")
        return 0;
    }

    /**
     * Reset all changes
     */
    resetCommand(){
        document.getElementById("help").style.background = "";
        document.getElementById("chatbox").style.background = "";
        document.getElementById("chat").style.color = "";
        document.getElementById("chat").style.fontSize = "";
        document.getElementById("chat").style.background = "";

        let elements = document.getElementsByClassName("message");
        this.app.messageBackground = ""
        for(let i = 0; i < elements.length; i++){
            elements[i].style.background = "";
        }
        this.app.sendBotMessage("La mise en forme a été réinitialisé")
        return 0;
    }
}

export {Commands};