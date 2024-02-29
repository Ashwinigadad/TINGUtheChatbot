const express=require('express');
const cors=require('cors');
// const speechToText=require("./speech");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app=express();
const port=3000;
app.use(express.json());
const genAI = new GoogleGenerativeAI("AIzaSyBKbfnP-R8f8xN5aJ8PRd1PmyTQqq3ifdg");


app.post("/api/test",async function run(req,res) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = req.body.userInput;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // speechToText(text);
  console.log(text);
  res.send("Done");
}
)
app.use(cors({
  origin:"http://127.0.0.1:5501"
}))

app.listen(port,()=>{
  console.log(`server is Running on ${port}`);
})