import {App} from "./app.js";

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
window.useMe = function useMe() {
    switch (document.getElementById("help").style.display) {
        case "none":
            document.getElementsByTagName("main")[0].style.columnCount = "2";
            document.getElementById("help").style.display = "flex";
            document.getElementById("chatbox").style.marginLeft = "0%";
            break;
        case "flex":
            document.getElementsByTagName("main")[0].style.clear
            document.getElementById("help").style.display = "none";
            document.getElementById("chatbox").style.marginLeft = "1%";
            break;
        default:
            document.getElementsByTagName("main")[0].style.columnCount = "2";
            document.getElementById("help").style.display = "flex";
            document.getElementById("chatbox").style.marginLeft = "0%";
    }
}

window.showBar = function showBar() {
    switch (document.getElementById("insearch").style.visibility) {
        case "hidden":
            document.getElementById("insearch").style.visibility = "visible";
            break;
        case "visible":
            document.getElementById("insearch").style.visibility = "hidden";
            break;
        default:
            document.getElementById("insearch").style.visibility = "visible";
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

document.getElementById("insearch").addEventListener("input", function(event) {
    let value = document.getElementById("insearch").value
    app.clearMessagesDisplay()
    let messages = app.getMessageListWithFilter(value)
    for(let i = 0; i < messages.length; i++){
        app.displayMessage(messages[i])
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
app.sendBotMessage("Bonjour, comment puis-je vous aider?")