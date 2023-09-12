//Author: I4NIS

// Récupérer les éléments du DOM
let button = document.getElementById("button");
let time = document.getElementById("time");
let status = document.getElementById("status");
let etat = document.getElementById("couleur");
let container = document.getElementById("container");
let compteur = document.getElementById("compteur");
let start = document.getElementById("startButton");

let workDuration = 25
let breakDuration = 5
//Tableau des durées de travail et de pause
let durationArray = [];

let interval;

// Compteur de session
let compt = 0;

// Index du timer actuelle
let currentIndex = 0;


// Ajouter un écouteur d'événement sur le bouton de démarrage
button.addEventListener("click", () => {
    // Remettre l'index du timer actuel à 0
    currentIndex = 0;

    // Remettre le compteur de session à 0
    compt = 0;

    start.className ="fa-solid fa-rotate-right"
    if(start.className == "fa-solid fa-rotate-right"){
        start.addEventListener("click", () => {
            location.reload();
        });
    }
    // Démarrer le timer
    startTimer();
});



// Fonction pour démarrer le timer
function startTimer() {
    // Arrêter le timer actuel s'il y en a un
    clearInterval(interval); 

    // Enregistrement des durées de travail et de pause dans le tableau
    tempsArray = [workDuration * 60, breakDuration * 60];
    let currentTemps = tempsArray[currentIndex];
    
    //Affichage du compteur de session
    compteur.textContent = "Nombre de session : " +compt;

    //Affichage du status du timer et de la couleur adaptée au status
    if (currentIndex == 0) {
        status.innerHTML = "Travail";
        etat.style.background = "red";
        container.style.borderColor = "red";
    } else {
        compt++;
        status.innerHTML = "Pause";
        etat.style.background = "green";
        container.style.borderColor = "green";
    }

    // Démarrer le timer
    interval = setInterval(() => {
        // Si le timer n'est pas terminé, décrémenter
        if (currentTemps > 0) {

            // Décrémenter le timer
            currentTemps--;

            // Calculer les minutes et les secondes
            const minutes = Math.floor(currentTemps / 60);
            const secondes = currentTemps % 60;

            // Afficher les minutes et les secondes
            if (minutes == 0) {
                if (secondes < 10) {
                    time.innerHTML = "00:0" + secondes;
                } else {
                    time.innerHTML = "00:" + secondes;
                }
            } else {
                if (secondes < 10 && minutes < 10) {
                    time.innerHTML = "0" + minutes + ":0" + secondes;
                } else if (secondes < 10 && minutes >= 10) {
                    time.innerHTML = minutes + ":0" + secondes;
                } else if (secondes >= 10 && minutes < 10) {
                    time.innerHTML = "0" + minutes + ":" + secondes;
                } else {
                    time.innerHTML = minutes + ":" + secondes;
                }
            }
        } else {
            // Si le timer est terminé, passer au suivant
            clearInterval(interval);
            // Changer l'index du timer actuel
            currentIndex = (currentIndex + 1) % 2;
            // Démarrer le timer suivant
            startTimer();
        }
    }, 10);
}
