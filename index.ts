import express, {Application, Request, Response} from "express";
import cors from "cors";
import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const PORT: number = process.env.PORT;

const app : Application = express();
app.use(cors());
app.use(express.json())

const API_KEY: string = process.env.API_KEY;


const openai = new OpenAI({
    apiKey : API_KEY
})

app.post("/completions", async(req : Request, res : Response) =>{
    try{
        const completion = await openai.chat.completions.create({
            model : "gpt-3.5-turbo",
            messages : [{
                "role": "user",
                "content" : "Create a SQL request to " + req.body.message}],
        });
        res.send(completion.choices[0].message)
    }catch(error){
        console.log(error)
        res.status(500).send("Server error")
    }
})

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`))