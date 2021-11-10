import {Commands} from "./commands.js";
import {Message} from "./message.js";

/**
 * Main app object, with all app methods
 * @constructor
 */
function App() {
    // Constructor
    console.log("Loading app...")
    this.commands = new Commands(this);
    this.messageList = [];

    /**
     * Method call when user send a message
     * @param content Message sent by user
     */
    this.sendUserMessage = function(content) {
        let message = new Message(content, "user", new Date().getTime());
        this.messageList.push(message);
        this.commands.parse(message.content);
        this.displayUserMessage(message);
    };

    /**
     * Display user message
     * @param message Given message
     */
    this.displayUserMessage = function (message){

    }

    /**
     * Method call when bot send a message
     * @param content Message sent by bot
     */
    this.sendBotMessage = function(content) {
        let message = new Message(content, "bot", new Date().getTime());
        this.messageList.push(message);
        this.displayBotMessage(message);
    };

    /**
     * Display bot message
     * @param message Given message
     */
    this.displayBotMessage = function (message){

    }

    /**
     * Get message list with filter apply
     * @param filter Filter String, can be "" for getting all messages
     * @returns {*[]} List of messages filtered
     */
    this.getMessageListWithFilter = function(filter){
        const filteredMessageList = [];
        for(let i=0; i<this.messageList.length; i++){
            if(this.messageList[i].content.includes(filter)){
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
let message = app.getMessageListWithFilter("")[0]
console.log(message.getSendingTimeString())
console.log(app.commands.parse("/background"))

/*
// Define global function
window.onClick = function onClick(){
    app.sendUserMessage("/clear")
}
*/
