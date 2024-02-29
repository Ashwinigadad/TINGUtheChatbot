// Function to send a message
function sendMessage() {
    // Get user input
    var input = document.getElementById("user-input").value;
    
    // Display user message in chat box
    displayMessage("You", input);
    
    // Reset input field
    document.getElementById("user-input").value = "";
    
    // Send user input to server
    sendToServer(input);
}

// Function to display a message in the chat box
function displayMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    
    // Create message element
    var messageElement = document.createElement("div");
    messageElement.classList.add("message");
    
    // Add sender name
    var senderElement = document.createElement("strong");
    senderElement.textContent = sender + ": ";
    messageElement.appendChild(senderElement);
    
    // Add message text
    var textElement = document.createElement("span");
    textElement.textContent = message;
    messageElement.appendChild(textElement);
    
    // Append message element to chat box
    chatBox.appendChild(messageElement);
    
    // Scroll chat box to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send user input to server
function sendToServer(input) {
    // Construct the object with user input
    var obj = {
        userInput: input
    };
    
    // Send user input to server using fetch API
    fetch("http://127.0.0.1:3000/api/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => {
        // Handle response from server (if needed)
    }).catch(error => {
        console.error("Error:", error);
    });
}
