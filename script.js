// public/script.js

document.getElementById('send-btn').addEventListener('click', function () {
    var userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
      addMessage('user', userInput);
      getBotResponse(userInput);
      document.getElementById('user-input').value = '';
    }
  });
  
  function addMessage(sender, text) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    var textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.textContent = text;
    messageElement.appendChild(textElement);
    document.getElementById('chat-body').appendChild(messageElement);
    document.getElementById('chat-body').scrollTop = document.getElementById('chat-body').scrollHeight;
  }
  
  async function getBotResponse(userInput) {
    // Fetch response from the server
    try {
      const response = await fetch('http://localhost:3002/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
      });
      
      const data = await response.json();
      if (data.response) {
        addMessage('bot', data.response);
      } else {
        addMessage('bot', 'Sorry, something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      addMessage('bot', 'Error connecting to the server.');
    }
  }
  