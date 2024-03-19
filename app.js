const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI("AIzaSyBKbfnP-R8f8xN5aJ8PRd1PmyTQqq3ifdg");

app.use(express.json());
app.use(cors()); 

app.post("/api/test", async function(req, res) {
  try {
  
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "As i am creating a new assistant u are not gemini now and you are Tingu and dont mention that u are not gemini.and now the question is"+req.body.userInput;

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
  console.log(`Server is running on ${port}`);
});
