import {App} from "./app.js";
import {sleep} from "./js_utils.js";

/** @module Main */

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
/**
 * Public function for hide and show help tab
 */
window.toggleHelp = function toggleHelp() {
    switch (document.getElementById("help").style.display) {
        case "none":
            // Appear
            document.getElementById("body").style.columnCount = "2";
            document.getElementById("help").style.display = "";
            document.getElementById("chatbox").style.marginLeft = "0%";
            document.getElementById("help").classList.replace("help_disappear", "help_appear")
            break;
        case "":
            // Disappear
            document.getElementById("help").classList.replace("help_appear", "help_disappear")
            // Sleep
            sleep(1000)
            document.getElementById("body").style.clear;
            document.getElementById("help").style.display = "none";
            document.getElementById("chatbox").style.marginLeft = "1%";
            break;
        default:
            document.getElementById("body").style.columnCount = "2";
            document.getElementById("help").style.display = "";
            document.getElementById("chatbox").style.marginLeft = "0%";
            document.getElementById("help").classList.replace("help_disappear", "help_appear")
    }
}

let sentList = [];
let currentSelected = -1;
/**
 * Public function when a message is send
 */
window.sendMessage = function (){
    let element = document.getElementById("send");
    if(element.value.split(" ").join("") !== ""){
        sentList.unshift(element.value);
        app.sendUserMessage(element.value);
        element.value = "";
        let div = document.getElementById("chat");
        div.scrollTop = div.scrollHeight;
    }
}

// Events
/**
 * Keyboard listener for input
 */
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

/**
 * Public function when help element is clicked
 * @param event Click event
 */
window.helpClicked = function (event){
    for(const [key, value] of Object.entries(app.commands.commandsList)){
        if(value !== "" && event.target.textContent === (value["description"])){
            document.getElementById("send").value = key;
            document.getElementById("send").focus()
            if(value["argsCount"] === 0){
                if(value["optionalArgs"] === false){
                    sendMessage()
                }
            }
        }
    }
}

// Display command help:
for(const [, value] of Object.entries(app.commands.commandsList)){
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

toggleHelp()
app.sendBotMessage("Bonjour, comment puis-je vous aider?")