import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { generateCompletion } from './api/generate';
import type { PlaygroundConfig } from '../types/playground';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const config: PlaygroundConfig = req.body;
    const response = await generateCompletion(config);
    res.json({ response });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 