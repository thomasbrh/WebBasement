'use strict';
/* Importation de GSAP */
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const body = document.body;
const customCursor = document.querySelector('.custom-cursor');
const section = document.querySelector('.chatiment');
const audioScream = document.getElementById('scream');
audioScream.volume = 1; // Définit le volume à 100%
audioScream.muted = false; // Assurez-vous que l'audio n'est pas en sourdine
const titan = document.querySelector('.titan');

//CURSEUR PERSO

function moveCursor(e) {
    console.log('mousemove');
  customCursor.style.top = `${(e.clientY + window.scrollY) - 32}px`; // 32 c'est la moitié de la taille du curseur, pour le centrer, si tu veux que le "click" soit en haut à gauche, comme pour la souris, alors retire le 32
  customCursor.style.left = `${e.clientX - 32}px`;
}

section.addEventListener('mouseenter', () => {
  customCursor.style.visibility = 'visible';
  body.style.cursor = 'none';
  section.addEventListener('mousemove', moveCursor);
});

section.addEventListener('mouseleave', (e) => {
    console.log('Mouse left section');
  if (!section.contains(e.relatedTarget)) {
    customCursor.style.visibility = 'hidden';
    body.style.cursor = 'default';
    section.removeEventListener('mousemove', moveCursor);
  }
});

let audioUnlocked = false; // Variable pour vérifier si l'audio est débloqué

// Fonction pour débloquer l'audio après interaction utilisateur
function unlockAudio() {
    console.log('Audio débloqué après interaction utilisateur');
    audioUnlocked = true;
    document.removeEventListener('click', unlockAudio); // Supprime l'écouteur après le premier clic
    document.removeEventListener('mousemove', unlockAudio); // Supprime l'écouteur après le premier mouvement
}

// Ajouter un événement pour débloquer l'audio
document.addEventListener('click', unlockAudio);
document.addEventListener('mousemove', unlockAudio);

// JOUER LE SON LORS DU MOUSEMOVE SUR TITAN
titan.addEventListener('mousemove', () => {
    if (audioUnlocked) { // Vérifie si l'audio est débloqué
        console.log('Mouse moved on titan');
        audioScream.currentTime = 0; // Remet le son au début
        audioScream.play().catch((error) => {
            console.error('Erreur lors de la lecture du son :', error);
        });
    } else {
        console.log('Audio non débloqué, interaction utilisateur requise');
    }
});

titan.addEventListener('mouseleave', () => {
    console.log('Mouse left titan');
    audioScream.pause(); // Met le son en pause si nécessaire
    audioScream.currentTime = 0; // Réinitialise le son
});