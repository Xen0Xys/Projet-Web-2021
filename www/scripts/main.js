import {App} from "./app.js";

/**
 * @module Main
 * @description Main JS file
 */

const app = new App();


// Functions

let helpShow = true
/**
 * Public function that hide or show help tab
 */
window.toggleHelp = function toggleHelp() {
    switch (helpShow) {
        case true:
            // Appear
            document.getElementById("body").style.columnCount = "2";
            document.getElementById("chatbox").style.marginLeft = "";
            document.getElementById("help").style.display = "flex";
            document.getElementById("help").classList.replace("help_disappear", "help_appear")
            helpShow = false;
            break;
        case false:
            // Disappear
            document.getElementById("help").classList.replace("help_appear", "help_disappear")
            document.getElementById("body").style.columnCount = "";
            document.getElementById("help").style.display = "none";
            document.getElementById("chatbox").style.marginLeft = "1%";
            helpShow = true;
            break;
    }
}

/**
 * Public function that hide or show search bar
 */
window.showBar = function showBar() {
    switch (document.getElementById("insearch").style.display) {
        case "none":
            document.getElementById("insearch").style.display = "";
            break;
        case "":
            document.getElementById("insearch").style.display = "none";
            break;
        default:
            document.getElementById("insearch").style.display = "";
    }
}

let sentList = [];
let currentSelected = -1;
/**
 * Public function when a message is sent
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
 * Event listener for message search
 */
document.getElementById("insearch").addEventListener("input", function() {
    let value = document.getElementById("insearch").value
    app.clearMessagesDisplay()
    let messages = app.getMessageListWithFilter(value)
    for(let i = 0; i < messages.length; i++){
        app.displayMessage(messages[i])
    }
})



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
toggleHelp();
app.sendBotMessage("Bonjour, comment puis-je vous aider?")