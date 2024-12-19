window.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-session');
  const endButton = document.getElementById('end-session');
  const timerElement = document.getElementById('timer');time
  const timeElement = document.getElementById('time');
  let countdownInterval;

  // Fonction pour masquer les boutons
  function hideButtons() {
    startButton.classList.add('hidden');
    endButton.classList.add('hidden');
  }

  // Fonction pour afficher les boutons
  function showButtons() {
    startButton.classList.remove('hidden');
    endButton.classList.remove('hidden');
  }

  function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    countdownInterval = setInterval(() => {
      hours = parseInt(timer / 3600, 10);
      minutes = parseInt((timer % 3600) / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = hours + ":" + minutes + ":" + seconds;

      if (--timer < 0) {
        fetchDisableProxy();
        clearInterval(countdownInterval);
        display.textContent = "03:00:00";
      }
    }, 1000);
  }

  function fetchEnableProxy() {
    fetch('http://localhost:8002/enableProxy')
      .then(response => response.text())
      .then(data => {
        try {
          console.log(data);
          const duration = 60 * 60 * 3; // 3 hours in seconds
          startTimer(duration, timerElement);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log(data);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  function fetchDisableProxy() {
    fetch('http://localhost:8002/disableProxy')
      .then(response => response.json())
      .then(data => {
        try {
          console.log(data);
          const numberLine = data.numberLine;
          clearInterval(countdownInterval); // Stop the timer
          timeElement.textContent = 'Résultat de la session'
          hideButtons()
          if (numberLine === 1 || numberLine === 2 || numberLine === 0 || numberLine === undefined ) {
               timeElement.textContent = 'Résultat de la session'
               timeElement.classList.add('text-green-300')
            timerElement.textContent = "Aucun site interdit détecté";
      
          } else {
            timeElement.textContent = 'Résultat de la session'
            timeElement.classList.add('text-red-300')
            timerElement.textContent = `Nombre d'interception de sites interdits : ${numberLine}`;
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  startButton.addEventListener('click', () => {
    fetchEnableProxy();
  });

  endButton.addEventListener('click', () => {
    fetchDisableProxy();
  });
});
