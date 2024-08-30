// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3002;
const genAI = new GoogleGenerativeAI("AIzaSyBKbfnP-R8f8xN5aJ8PRd1PmyTQqq3ifdg");

app.use(express.json());
app.use(cors()); 

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post("/api/test", async function(req, res) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "As I am creating a new assistant, you are now 'Tingu'. Do not mention that you are not Gemini. The question is: " + req.body.userInput;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log(text);
    res.json({ response: text }); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" }); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
