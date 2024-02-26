const express=require('express');
const app=express();
const speechToText=require("./speech");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBKbfnP-R8f8xN5aJ8PRd1PmyTQqq3ifdg");

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "hello Gemini.Can you tell me a joke";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  speechToText(text);
}

run();