import {Commands} from "./commands.js";

/**
 * Main app object, with all app methods
 * @param nom
 * @constructor
 */
function App(nom) {
    // Constructor
    console.log("Loading app...")
    this.commands = new Commands();
    this.messageList = [];

    /**
     * Method call when user send a message
     * @param message user message
     */
    this.sendUserMessage = function(message) {
        this.messageList.push(message);
    };

    /**
     * Method call when bot send a message
     * @param message bot message
     */
    this.sendBotMessage = function(message) {

    };

    /**
     * Get message list with filter apply
     * @param filter Filter String, can be "" for getting all messages
     * @returns {*[]} List of messages filtered
     */
    this.getMessageListWithFilter = function(filter){
        const filteredMessageList = [];
        for(let i=0; i<this.messageList.length; i++){
            if(this.messageList[i].includes(filter)){
                filteredMessageList.push(this.messageList[i]);
            }
        }
        return filteredMessageList;
    };
    console.log("App loaded!")
}

// Debug
const app = new App();
app.sendUserMessage("Yolo")
app.sendUserMessage("Test")
app.sendUserMessage("oe")
console.log(app.getMessageListWithFilter(""))
