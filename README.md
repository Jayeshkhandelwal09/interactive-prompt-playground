# Interactive Prompt Playground

A modern, intuitive interface for experimenting with OpenAI's language models. This playground allows you to understand how different parameters affect AI-generated content.

# Singe Prompt Response
<img width="1464" alt="Screenshot 2025-05-29 at 4 46 15 PM" src="https://github.com/user-attachments/assets/4a010404-4086-4f11-a99c-8920dbd6b51d" />
</br>
</br>
<img width="1458" alt="Screenshot 2025-05-29 at 4 46 34 PM" src="https://github.com/user-attachments/assets/072fa557-fff7-4df2-8fb9-c7922ed0bd05" />

# Grid Prompt Response

<img width="1465" alt="Screenshot 2025-05-29 at 5 11 22 PM" src="https://github.com/user-attachments/assets/fc0d0716-9f3c-4e4d-a7d2-4a691f9bd46a" />
</br>
</br>
<img width="1467" alt="Screenshot 2025-05-29 at 5 11 54 PM" src="https://github.com/user-attachments/assets/73347c84-2db8-4dd3-9aef-2b66bca83765" />



## ✨ Features

- 🎨 Modern, clean UI with dark/light mode support
- 🔄 Real-time response generation
- 📊 Parameter experimentation with:
  - Temperature control
  - Max tokens limit
  - Presence and frequency penalties
  - Stop sequences
- 📱 Fully responsive design
- 🌐 Support for multiple models (GPT-3.5 Turbo, GPT-4)
- 📋 One-click copy for responses
- 📈 Grid view for comparing multiple parameter combinations
- 💡 Detailed analysis of parameter effects
- ⚡️ Built with modern tech stack

## 🛠 Tech Stack

- React + TypeScript
- Vite
- Chakra UI
- Framer Motion
- Express.js backend
- OpenAI API

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interactive-prompt-playground.git
cd interactive-prompt-playground
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎮 Usage

1. **Select Model**: Choose between GPT-3.5 Turbo and GPT-4

2. **Configure Prompts**:
   - Set your system prompt to define the AI's role
   - Enter your user prompt for specific instructions

3. **Adjust Parameters**:
   - Basic tab:
     - Temperature (0-2): Controls randomness
     - Max Tokens (1-2000): Limits response length
   - Advanced tab:
     - Presence Penalty (-2 to 2): Reduces repetition
     - Frequency Penalty (-2 to 2): Controls word frequency
     - Stop Sequence: Defines where to stop generating

4. **Generate Content**:
   - Use "Generate Response" for single outputs
   - Use "Generate Grid" to compare multiple parameter combinations

5. **Analyze Results**:
   - View parameter effects analysis
   - Compare different configurations
   - Copy responses with one click

## 🙏 Acknowledgments

- Built with [Chakra UI](https://chakra-ui.com/)
- Powered by [OpenAI API](https://openai.com/api/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
