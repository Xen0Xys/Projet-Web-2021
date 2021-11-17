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

// Functions
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

let sentList = [];
let currentSelected = -1;
window.sendMessage = function (){
    let element = document.getElementById("send");
    if(element.value !== ""){
        sentList.unshift(element.value);
        app.sendUserMessage(element.value);
        element.value = "";
        let div = document.getElementById("chat");
        div.scrollTop = div.scrollHeight;
    }
}

// Events
document.getElementById("send").addEventListener("keydown", function(event) {
    switch (event.key){
        case "Enter":
            currentSelected = -1
            sendMessage()
            break;
        case "ArrowUp":
            if(currentSelected + 1 < sentList.length){
                currentSelected++
                document.getElementById("send").value = sentList[currentSelected];
            }
            break;
        case "ArrowDown":
            if(currentSelected - 1 >= 0){
                currentSelected--
                document.getElementById("send").value = sentList[currentSelected];
            }else{
                currentSelected = -1
                document.getElementById("send").value = ""
            }
            break;
    }
})

window.helpClicked = function (event){
    for(const [key, value] of Object.entries(app.commands.commandsList)){
        if(value !== "" && event.target.textContent === (value["description"])){
            document.getElementById("send").value = key;
            document.getElementById("send").focus()
        }
    }
}

// Display command help:
for(const [key, value] of Object.entries(app.commands.commandsList)){
    // Create new div element
    const newDiv = document.createElement("a");
    newDiv.href = "#";
    newDiv.onclick = helpClicked;
    // Give it text content
    const newContent = document.createTextNode(value["description"]);
    newDiv.appendChild(newContent);
    // Add classes to div
    newDiv.classList.add("help");
    // Add new element to DOM
    const parentDiv = document.getElementById('help_parent');
    document.getElementById("help").insertBefore(newDiv, parentDiv);
}

useMe()