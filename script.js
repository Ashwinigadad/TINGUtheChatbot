function sendMessage() {
    var input = document.getElementById("user-input").value.trim();
    if (!input) {
        alert("Please enter a message.");
        return;
    }
    displayMessage("You", input);
    document.getElementById("user-input").value = "";
    sendToServer(input);
}

function displayMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.classList.add("message");
    var senderElement = document.createElement("strong");
    senderElement.textContent = sender + ": ";
    messageElement.appendChild(senderElement);
    var textElement = document.createElement("span");
    textElement.textContent = message;
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendToServer(input) {
    var obj = {
        userInput: input
    };
    fetch("http://127.0.0.1:3001/api/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (data && data.response) {
            displayMessage("Tingu", data.response);
        } else {
            throw new Error('Invalid response from server');
        }
    }).catch(error => {
        console.error("Error:", error);
        alert("Error occurred while fetching data from server.");
        console.log("hello")
        console.log("hello")

    });
}
