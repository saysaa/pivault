const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const info = document.getElementById('info');
const scoreDisplay = document.getElementById('score');

let targetX, targetY, targetSize = 30;
let targetVisible = false;
let startTime;
let score = 0;

// Fonction pour dessiner la cible
function drawTarget(x, y) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, targetSize, 0, Math.PI * 2);
    ctx.fill();
}

// Fonction pour générer une nouvelle cible
function newTarget() {
    targetX = Math.random() * (canvas.width - targetSize * 2) + targetSize;
    targetY = Math.random() * (canvas.height - targetSize * 2) + targetSize;
    targetVisible = true;
    startTime = new Date().getTime();
    drawTarget(targetX, targetY);
}

// Fonction pour démarrer le jeu
function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    targetVisible = false;
    setTimeout(newTarget, Math.random() * 2000 + 1000); // Nouvelle cible après une durée aléatoire entre 1 et 3 secondes
}

// Fonction pour gérer les clics de souris et les touches tactiles
function handleClick(event) {
    if (!targetVisible) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const distance = Math.sqrt((x - targetX) ** 2 + (y - targetY) ** 2);
    if (distance <= targetSize) {
        const reactionTime = new Date().getTime() - startTime;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        info.textContent = `Temps de réaction: ${reactionTime} ms`;
        startGame();
    }
}

// Événements pour les clics de souris et les touches tactiles
canvas.addEventListener('mousedown', handleClick);
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    handleClick(event.touches[0]);
});

// Démarrer le jeu
startGame();