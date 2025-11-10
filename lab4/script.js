(() => {
  const difficulties = {
    easy:   { time: 4000, range: 100, size: 70 },
    medium: { time: 2000, range: 300, size: 50 },
    hard:   { time: 1000, range: 500, size: 30 }
  };

  let score = 0;
  let timeLeft = 0;
  let timeLimit = 0;
  let targetColor = '#00c2ff';
  let timer;
  let range = 100;
  let squareSize = 40;

  // === DOM ===
  const doc = window.document; 
  const menu = doc.getElementById('menu');
  const game = doc.getElementById('game');
  const board = doc.getElementById('board');
  const scoreEl = doc.getElementById('score');
  const timeEl = doc.getElementById('time');

  const options = doc.getElementsByTagName('option');
  for (let i = 0; i < options.length; i++) {
    options[i].style.padding = '2px 6px';
  }

  doc.getElementById('startBtn').addEventListener('click', startGame);

  function startGame() {
    const diff = doc.getElementById('difficulty').value;
    const cfg = difficulties[diff];

    targetColor = doc.getElementById('targetColor').value;
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

    const square = doc.createElement('div');
    square.className = 'target'; 
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.background = targetColor;
    square.style.cursor = 'pointer';
    square.style.position = 'absolute';

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

    const firstDiv = doc.querySelector('#board div');
    if (firstDiv) firstDiv.title = 'Я ціль, клікай сюди!';

    const targets = doc.getElementsByClassName('target');
    for (let t of targets) {
      t.style.border = '1px solid #000';
    }

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
