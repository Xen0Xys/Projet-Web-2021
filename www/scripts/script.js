
function useMe() {
    switch (document.getElementById("help").style.display) {
        case "none":
            document.body.style.columnCount = 2;
            document.getElementById("help").style.display = "";
            break;
        case "":
            document.body.style.clear;
            document.getElementById("help").style.display = "none";
            break;
        default:
            document.body.style.columnCount = 2;
            document.getElementById("help").style.display = "";
    }
}

function chat(){
    // crée un nouvel élément div
    var newDiv = document.createElement("div");
    // et lui donne un peu de contenu
    var newContent = document.createTextNode('Hi there and greetings!');
    // ajoute le nœud texte au nouveau div créé
    newDiv.appendChild(newContent);
    // ajoute une classe au nouveau div crée
    newDiv.classList.add("msg");
    // ajoute le nouvel élément créé et son contenu dans le DOM
    var currentDiv = document.getElementById('void');
    document.getElementById("chat").insertBefore(newDiv, currentDiv);
}