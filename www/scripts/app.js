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
    this.messageBackground = "";

    /**
     * Method call when user send a message
     * @param content Message sent by user
     */
    this.sendUserMessage = function(content) {
        let message = new Message(content, "user", new Date().getTime());
        this.messageList.push(message);
        this.displayMessage(message);
        switch (this.commands.parse(message.content)){
            case 0:
                break;
            case 1:
                this.sendBotMessage("Commande inconnue!")
                break;
            case 2:
                this.sendBotMessage("Pas assez d'arguments pour executer cette commande!")
                break;
            case 3:
                this.sendBotMessage("Bonjour!")
                break;
        }
    };

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
     * Display message
     * @param message Message object
     */
    this.displayMessage = function (message){
        // Create new div element
        const masterMessageDiv = document.createElement("div");
        const hourText = document.createElement("div");
        const messageText = document.createElement("div");
        const lineJump = document.createElement("br");
        // Give it text content
        const hour = document.createTextNode(message.getSendingTimeString() + ":");
        const messageContent = document.createTextNode(message.content);

        hourText.appendChild(hour)
        hourText.classList.add("message_hour")
        messageText.appendChild(messageContent)
        messageText.classList.add("message_content")

        masterMessageDiv.appendChild(hourText);
        masterMessageDiv.appendChild(lineJump);
        masterMessageDiv.appendChild(messageText);
        // Add classes to div
        masterMessageDiv.classList.add(message.sender);
        masterMessageDiv.classList.add("message");
        masterMessageDiv.classList.add("animated");
        // Set message background color
        if(this.messageBackground !== ""){
            masterMessageDiv.style.background = this.messageBackground;
        }
        // Add new element to DOM
        const parentDiv = document.getElementById('void');
        document.getElementById("chat").insertBefore(masterMessageDiv, parentDiv);
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

export {App}