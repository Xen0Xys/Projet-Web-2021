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
        this.displayMessage(message);
    };

    this.displayMessage = function (message){
        // Create new div element
        const newDiv = document.createElement("div");
        // Give it text content
        const newContent = document.createTextNode(message.content);
        newDiv.appendChild(newContent);
        // Add classes to div
        newDiv.classList.add(message.sender);
        newDiv.classList.add("message");
        // Add new element to DOM
        const parentDiv = document.getElementById('void');
        document.getElementById("chat").insertBefore(newDiv, parentDiv);
    }

    /**
     * Method call when bot send a message
     * @param content Message sent by bot
     */
    this.sendBotMessage = function(content) {
        let message = new Message(content, "bot", new Date().getTime());
        this.messageList.push(message);
        this.displayMessage(message);
    };

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

const app = new App();
/*
// Debug
app.sendUserMessage("Yolo")
app.sendUserMessage("Test")
app.sendUserMessage("oe")
console.log(app.getMessageListWithFilter(""))
let message = app.getMessageListWithFilter("")[0]
console.log(message.getSendingTimeString())
console.log(app.commands.parse("/background"))
 */

window.useMe = function useMe() {
    switch (document.getElementById("help").style.display) {
        case "none":
            document.body.style.columnCount = "2";
            document.getElementById("help").style.display = "";
            document.getElementById("chatbox").style.marginLeft = "0%";
            break;
        case "":
            document.body.style.clear;
            document.getElementById("help").style.display = "none";
            document.getElementById("chatbox").style.marginLeft = "5%";
            break;
        default:
            document.body.style.columnCount = "2";
            document.getElementById("help").style.display = "";
            document.getElementById("chatbox").style.marginLeft = "0%";
    }
}

window.sendMessage = function (){
    let element = document.getElementById("send");
    app.sendUserMessage(element.value);
    element.value = "";
}