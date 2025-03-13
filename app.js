const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = 3002;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/test", async function (req, res) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" }); // ✅ Correct model name

    const userInput = req.body.userInput || "Hello!";
    const prompt = `As I am creating a new assistant, you are now 'Tingu'. Do not mention that you are not Gemini. The question is: ${userInput}`;

    // Generate response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log("Full API Response:", JSON.stringify(result, null, 2));

    // ✅ Corrected parsing of the response
    if (!result || !result.response || !result.response.candidates || result.response.candidates.length === 0) {
      throw new Error("Invalid response from Gemini API");
    }

    const text = result.response.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";

    console.log("Gemini Response:", text);
    res.json({ response: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
