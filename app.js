// 1. Registro del Service Worker (Para Offline e Instalación)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado:', reg))
            .catch(err => console.log('Error SW:', err));
    });
}

// Detectar estado de conexión
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

function updateStatus() {
    const status = document.getElementById('status-indicator');
    status.innerText = navigator.onLine ? "Online" : "Offline (Modo Local)";
    status.style.color = navigator.onLine ? "#4cd137" : "#e1b12c";
}

// 2. Lógica de Navegación (Single Page Application)
const menu = document.getElementById('game-menu');
const container = document.getElementById('game-container');
const gameArea = document.getElementById('game-area');

function loadGame(gameType) {
    menu.classList.add('hidden');
    container.classList.remove('hidden');
    gameArea.innerHTML = ''; // Limpiar anterior

    if (gameType === 'clicker') startClickerGame();
    if (gameType === 'guess') startGuessGame();
}

function closeGame() {
    container.classList.add('hidden');
    menu.classList.remove('hidden');
    gameArea.innerHTML = ''; // Limpiar memoria
}

// --- MINI JUEGO 1: Clicker ---
function startClickerGame() {
    let score = 0;
    gameArea.innerHTML = `
        <h2>Puntuación: <span id="score">0</span></h2>
        <button class="game-btn" id="click-btn">¡TOCA!</button>
    `;
    
    document.getElementById('click-btn').onclick = () => {
        score++;
        document.getElementById('score').innerText = score;
        if(score % 10 === 0) navigator.vibrate(50); // Vibración háptica
    };
}

// --- MINI JUEGO 2: Adivina ---
function startGuessGame() {
    const target = Math.floor(Math.random() * 10) + 1;
    gameArea.innerHTML = `
        <h2>Adivina el número (1-10)</h2>
        <input type="number" id="guess-input" style="font-size:1.5rem; width:50px; text-align:center;">
        <button class="game-btn" style="border-radius:10px" onclick="checkGuess(${target})">Probar</button>
        <p id="result"></p>
    `;
}

window.checkGuess = (target) => {
    const val = parseInt(document.getElementById('guess-input').value);
    const msg = document.getElementById('result');
    if(val === target) {
        msg.innerText = "¡Ganaste! 🎉";
        msg.style.color = "#4cd137";
        navigator.vibrate([100, 50, 100]);
    } else {
        msg.innerText = "Intenta de nuevo ❌";
        msg.style.color = "#e94560";
        navigator.vibrate(200);
    }
};
