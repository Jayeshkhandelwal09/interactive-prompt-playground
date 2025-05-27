# Interactive Prompt Playground

A powerful web application for experimenting with OpenAI's language models and understanding how different parameters affect the output. This playground allows you to generate product descriptions while adjusting various parameters to see their impact on the generated text.

## Screenshots

### Single Response Mode
[Screenshot showing single response with parameter analysis will be added here]

### Grid Analysis Mode
[Screenshot showing grid view with multiple parameter combinations will be added here]

## Features

- **Model Selection**: Choose between GPT-3.5 Turbo and GPT-4
- **Parameter Control**:
  - Temperature (0.0 - 2.0)
  - Max Tokens (1 - 2000)
  - Presence Penalty (-2.0 - 2.0)
  - Frequency Penalty (-2.0 - 2.0)
- **Custom Prompts**:
  - System prompt configuration
  - User prompt input
  - Optional stop sequence
- **Output Visualization**:
  - Single response generation with detailed analysis
  - Grid view comparing multiple parameter combinations
  - Real-time parameter effect explanations
- **Analysis Features**:
  - Temperature impact analysis
  - Token length effect analysis
  - Penalty settings analysis
  - Comparative response analysis

## Project Structure

```
src/
├── components/
│   ├── Playground.tsx      # Main playground component
│   └── ResponseAnalysis.tsx # Analysis display component
├── utils/
│   └── analysisUtils.ts    # Parameter analysis utilities
└── types/
    └── playground.ts       # TypeScript interfaces and defaults
```

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd interactive-prompt-playground
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file and add your OpenAI API key:
   ```
   # IMPORTANT: Never commit this file or share your API key
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Security Note

⚠️ **Important**: Never commit your `.env` file or expose your API keys. The `.env` file is listed in `.gitignore` to prevent accidental commits. If you accidentally commit sensitive information:

1. Immediately revoke the exposed API key
2. Generate a new API key
3. Update your local `.env` file with the new key
4. Consider using git-filter-repo to remove sensitive data from git history
