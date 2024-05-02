import express from 'express';
import bodyParser from 'body-parser';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';

const app = express();
const PORT = process.env.PORT || 3000;

const chatModel = new ChatOpenAI({
  openAIApiKey: "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",
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/gensql', async (req, res) => {
    try {
        const { input } = req.body;
        const generatedPrompt = `You are a SQL query generator. 
        Whenever a question is asked you need to answer with an explanation consisting of an example.
        Here is the query ${input}. If the query does not seems to be related to SQL or Databases then just reply I don't know`;
        const response = await chatModel.invoke(generatedPrompt);

        res.json({ sqlQuery: response });

    } catch (error) {
        console.error('Error generating SQL query:', error);
        res.status(500).json({ error: 'An error occurred while generating the SQL query.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
