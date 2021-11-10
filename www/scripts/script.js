
function useMe() {
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

function chat(){
    // crée un nouvel élément div
    let newDiv = document.createElement("div");
    let i = 0;
    // et lui donne un peu de contenu
    let newContent = document.createTextNode('Hi there and greetings!');
    // ajoute le nœud texte au nouveau div créé
    newDiv.appendChild(newContent);
    // ajoute une classe au nouveau div crée
    newDiv.classList.add("msg");
    // ajoute le nouvel élément créé et son contenu dans le DOM
    let currentDiv = document.getElementById('void');
    document.getElementById("chat").insertBefore(newDiv, currentDiv);
}