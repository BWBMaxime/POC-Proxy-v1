window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-session');
    const endButton = document.getElementById('end-session');
  
    startButton.addEventListener('click', () => {
      fetch('http://localhost:8002/enableProxy')
        .then(response => response.text())  // Change .json() to .text()
        .then(data => {
          try {
            console.log(data);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            console.log(data);  // Log the raw response in case it's not valid JSON
          }
        })
        .catch(error => console.error('Error:', error));
    });
  
    endButton.addEventListener('click', () => {
      fetch('http://localhost:8002/disableProxy')
        .then(response => response.text())  // Change .json() to .text()
        .then(data => {
          try {
            console.log(data);
          } catch (error) {
            console.log(data);  // Log the raw response in case it's not valid JSON
          }
        })
        .catch(error => console.error('Error:', error));
    });
  });
  