import OpenAI from 'openai';
import type { PlaygroundConfig } from '../../types/playground';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
});

export async function generateCompletion(config: PlaygroundConfig): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: config.model,
      messages: [
        {
          role: 'system',
          content: config.systemPrompt,
        },
        {
          role: 'user',
          content: config.userPrompt,
        },
      ],
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      presence_penalty: config.presencePenalty,
      frequency_penalty: config.frequencyPenalty,
      stop: config.stopSequence ? [config.stopSequence] : undefined,
    });

    return completion.choices[0]?.message?.content || 'No response generated';
  } catch (error: any) {
    console.error('Error generating completion:', error);
    throw new Error(error.message || 'Failed to generate completion');
  }
} 