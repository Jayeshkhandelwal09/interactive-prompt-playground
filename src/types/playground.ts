export interface PlaygroundConfig {
  model: 'gpt-3.5-turbo' | 'gpt-4';
  temperature: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
  systemPrompt: string;
  userPrompt: string;
  stopSequence?: string;
}

export interface PlaygroundResult {
  config: PlaygroundConfig;
  response: string;
  error?: string;
}

export interface GridResult {
  temperature: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
  response: string;
}

export const DEFAULT_SYSTEM_PROMPT = "You are a helpful AI assistant that generates product descriptions.";

export const DEFAULT_USER_PROMPT = "Generate a product description for the latest iPhone model.";

export const DEFAULT_CONFIG: PlaygroundConfig = {
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 150,
  presencePenalty: 0.0,
  frequencyPenalty: 0.0,
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  userPrompt: DEFAULT_USER_PROMPT,
}; 