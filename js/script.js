// Auteur : I4NIS

// Récupérer les éléments du DOM
let bouton = document.getElementById("boutonDemarrer");
let temps = document.getElementById("tempsRestant");
let statut = document.getElementById("statutTimer");
let etat = document.getElementById("couleur");
let conteneur = document.getElementById("conteneur");

let dureeTravailInput = document.getElementById("dureeTravail");
let dureePauseInput = document.getElementById("dureePause");

let demarrer = document.getElementById("iconeDemarrer");

let titre = document.getElementById("titre");


// Tableau des durées de travail et de pause
let tableauDurees = [];

let intervalle;

// Compteur de session
let compteurSession = 0;

// Index du minuteur actuel
let indexActuel = 0;

// Récupérer les valeurs précédemment enregistrées dans le LocalStorage
const dureeTravailEnregistree = localStorage.getItem("dureeTravail");
const dureePauseEnregistree = localStorage.getItem("dureePause");

// Si des valeurs sont enregistrées, les utiliser
if (dureeTravailEnregistree) {
    dureeTravailInput.value = dureeTravailEnregistree;
}
if (dureePauseEnregistree) {
    dureePauseInput.value = dureePauseEnregistree;
}


// Afficher le temps de départ
dureeTravailInput.addEventListener("input", () => {
    let tempsEntier = Math.trunc(dureeTravailInput.value);

    temps.innerHTML = tempsEntier + ":00";
    titre.innerHTML = "Pomodoro Timer - " + tempsEntier + " minutes";
});

temps.innerHTML = dureeTravailInput.value + ":00";
titre.innerHTML = "Pomodoro Timer - " + dureeTravailInput.value + " minutes";

document.getElementById("supprimerLocalStorage").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});
// Ajouter un écouteur d'événement sur le bouton de démarrage
bouton.addEventListener("click", () => {
    // Réinitialiser l'index du minuteur actuel à 0
    indexActuel = 0;

    // Réinitialiser le compteur de session à 0
    compteurSession = 0;

    // Récupérer les valeurs des saisies
    const dureeTravail = parseFloat(dureeTravailInput.value);
    const dureePause = parseFloat(dureePauseInput.value);

    // Enregistrer les valeurs actuelles dans le LocalStorage
    sauvegardeLocalStorage(dureeTravail, dureePause);

    
    // Vérifier que les valeurs sont correctes
    if (isNaN(dureeTravail) || dureeTravail <= 0 || dureeTravail !== Math.floor(dureeTravail)) {
        alert("La durée de travail doit être un nombre entier positif.");
        return;
    }

    if (isNaN(dureePause) || dureePause <= 0 || dureePause !== Math.floor(dureePause)) {
        alert("La durée de pause doit être un nombre entier positif.");
        return;
    }

    // Changer l'icône du bouton de démarrage
    demarrer.className = "fa-solid fa-rotate-right"
    if (demarrer.className == "fa-solid fa-rotate-right") {
        demarrer.addEventListener("click", () => {
            location.reload();
        });
    }
    // Démarrer le minuteur
    demarrerMinuteur();
});

// Fonction pour démarrer le minuteur
function demarrerMinuteur() {
    // Arrêter le minuteur actuel s'il y en a un
    clearInterval(intervalle);

    // Récupérer les valeurs des saisies
    const dureeTravail = Math.abs(parseInt(dureeTravailInput.value));
    const dureePause = Math.abs(parseInt(dureePauseInput.value));

    // Vérifier que les valeurs sont correctes
    verificationPause (dureePause)
    verificationTravail(dureeTravail)

    // Enregistrer les durées de travail et de pause dans le tableau
    tableauDurees = [dureeTravail * 60, dureePause * 60];
    let tempsActuel = tableauDurees[indexActuel];

    // Afficher le compteur de session
    document.getElementById("compteurSession").textContent = "Nombre de sessions : " + compteurSession;

    //applique le style
    style()

    // Démarrer le minuteur
    intervalle = setInterval(() => {
        // Si le minuteur n'est pas terminé, décrémenter
        if (tempsActuel > 0) {
            
            // Décrémenter le minuteur
            tempsActuel--;

            // Calculer les minutes et les secondes
            const minutes = Math.floor(tempsActuel / 60);
            const secondes = tempsActuel % 60;
            
            // Afficher les minutes et les secondes
            afficherTemps(minutes, secondes)

        } else {
            // Si le minuteur est terminé, passer au suivant
            clearInterval(intervalle);
            // Changer l'index du minuteur actuel
            indexActuel = (indexActuel + 1) % 2;
            // Démarrer le minuteur suivant
            demarrerMinuteur();
        }
    }, 1000);
}


// Afficher le statut du minuteur et la couleur correspondante au statut
function style(){
    if (indexActuel == 0) {
        statut.innerHTML = "Travail";
        statut.style.color = "white";
        etat.style.background = "red";
        conteneur.style.borderColor = "red";
    } else {
        compteurSession++;
        statut.style.color = "white";
        statut.innerHTML = "Pause";
        etat.style.background = "green";
        conteneur.style.borderColor = "green";
    }
}

// Fonction pour enregistrer les valeurs actuelles dans le LocalStorage
function sauvegardeLocalStorage(dureeTravail, dureePause){
        localStorage.setItem("dureeTravail", dureeTravail.toString());
        localStorage.setItem("dureePause", dureePause.toString());
}

// Vérifier que les valeurs de travail entrées sont correctes

function verificationTravail(dureeTravail){
    if (isNaN(dureeTravail) || dureeTravail <= 0 || dureeTravail !== Math.floor(dureeTravail)) {
        alert("La durée de travail doit être un nombre entier positif.");
        return;
    }
}  

// Vérifier que les valeurs de pause entrées sont correctes

function verificationPause (dureePause){
    if (isNaN(dureePause) || dureePause <= 0 || dureePause !== Math.floor(dureePause)) {
        alert("La durée de pause doit être un nombre entier positif.");
        return;
    }
}

function afficherTemps(minutes, secondes){
    if (minutes == 0) {
        if (secondes < 10) {
            temps.innerHTML = "00:0" + secondes;
        } else {
            temps.innerHTML = "00:" + secondes;
        }
    } else {
        if (secondes < 10 && minutes < 10) {
            temps.innerHTML = "0" + minutes + ":0" + secondes;
        } else if (secondes < 10 && minutes >= 10) {
            temps.innerHTML = minutes + ":0" + secondes;
        } else if (secondes >= 10 && minutes < 10) {
            temps.innerHTML = "0" + minutes + ":" + secondes;
        } else {
            temps.innerHTML = minutes + ":" + secondes;
        }
    }
}