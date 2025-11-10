(() => {
  // Таблиця складностей із часом, розкидом координат і розміром квадрата
  const difficulties = {
    easy:   { time: 4000, range: 100, size: 70 }, // великий квадрат
    medium: { time: 2000, range: 300, size: 50 }, // середній
    hard:   { time: 1000, range: 500, size: 30 }  // маленький квадрат
  };

  let score = 0;
  let timeLeft = 0;
  let timeLimit = 0;
  let targetColor = '#00c2ff';
  let timer;
  let range = 100;
  let squareSize = 40;

  const $ = (id) => document.getElementById(id);
  const menu = $('menu');
  const game = $('game');
  const board = $('board');
  const scoreEl = $('score');
  const timeEl = $('time');

  $('startBtn').addEventListener('click', startGame);

  function startGame() {
    const diff = $('difficulty').value;
    const cfg = difficulties[diff];

    targetColor = $('targetColor').value;
    timeLimit = cfg.time;
    range = cfg.range;
    squareSize = cfg.size;
    score = 0;
    scoreEl.textContent = score;

    menu.style.display = 'none';
    game.style.display = 'block';

    nextRound();
  }

  function nextRound() {
    clearInterval(timer);
    timeLeft = timeLimit;
    timeEl.textContent = (timeLeft / 1000).toFixed(2);

    board.innerHTML = '';

    const square = document.createElement('div');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.background = targetColor;
    square.style.cursor = 'pointer';
    square.style.position = 'absolute';

    // Центр екрана + випадкове зміщення
    const centerX = window.innerWidth / 2 - squareSize / 2;
    const centerY = window.innerHeight / 2 - squareSize / 2 - 60;
    const offsetX = Math.floor((Math.random() - 0.5) * range);
    const offsetY = Math.floor((Math.random() - 0.5) * range);

    square.style.left = `${centerX + offsetX}px`;
    square.style.top = `${centerY + offsetY}px`;

    square.addEventListener('click', (e) => {
      e.stopPropagation();
      score++;
      scoreEl.textContent = score;
      nextRound();
    });

    board.appendChild(square);

    // Клік по тлу завершує гру
    board.onclick = (e) => {
      if (e.target === board) endGame();
    };

    timer = setInterval(() => {
      timeLeft -= 100;
      timeEl.textContent = (timeLeft / 1000).toFixed(2);
      if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
      }
    }, 100);
  }

  function endGame() {
    clearInterval(timer);
    alert(`Гру закінчено! Ваш рахунок: ${score}`);
    game.style.display = 'none';
    menu.style.display = 'block';
  }
})();
