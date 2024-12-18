const express = require('express')
const dotenv = require('dotenv')
const Openai = require('openai')

dotenv.config()

const openai = new Openai(
    {
        apiKey:process.env.OPENAI_API_KEY
    }
)

console.log(process.env.OPENAI_API_KEY)

const app = express();

const PORT = 8000

app.use(express.json())


app.post('/message',async(req,res) => {
    console.log('in ai server')
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "developer", content: "You are a helpful assistant." },
                { role: "user", content: "please wite me a short random message" },
            ],
            model: "gpt-3.5-turbo",
          });
        const aiMessage = completion.choices[0].message.content
        console.log(aiMessage)
        res.status(200).json(aiMessage);
    } catch (error) {
        console.log('error openai: ' + error.message)
        res.status(400).json('error connection to openai: ' + error.message)
    }
   

   
})

app.listen(PORT, () => {
    console.log(`nodejs server running on http://localhost:${PORT}`);
})
