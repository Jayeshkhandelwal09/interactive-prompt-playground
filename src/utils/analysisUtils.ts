export const analyzeTemperature = (temp: number): string => {
  if (temp === 0) {
    return "At temperature 0.0, the response is highly deterministic and factual. You'll notice more standard product specifications and conventional descriptions, focusing on verified features and specifications.";
  } else if (temp < 0.5) {
    return `At temperature ${temp}, the response remains quite conservative and factual, with minimal creative variation.`;
  } else if (temp <= 0.8) {
    return `At temperature ${temp}, there's a good balance between creativity and reliability. The description maintains factual accuracy while incorporating some creative elements.`;
  } else if (temp <= 1.2) {
    return `At temperature ${temp}, the response shows increased creativity and variability. Expect more unique descriptions and diverse language.`;
  } else {
    return `At this high temperature (${temp}), the response will be highly creative and unpredictable, potentially with very diverse and unexpected descriptions.`;
  }
};

export const analyzeTokens = (tokens: number): string => {
  if (tokens < 50) {
    return `With only ${tokens} tokens, the response will be very concise, possibly incomplete for complex descriptions.`;
  } else if (tokens <= 100) {
    return `With ${tokens} tokens, the response focuses on key features with minimal detail.`;
  } else if (tokens <= 200) {
    return `${tokens} tokens allows for a balanced description with moderate detail.`;
  } else if (tokens <= 500) {
    return `With ${tokens} tokens, the response can be quite comprehensive, including detailed features and context.`;
  } else {
    return `With ${tokens} tokens, expect a very detailed response that could cover extensive product details, comparisons, and use cases.`;
  }
};

export const analyzePenalties = (presence: number, frequency: number): string[] => {
  const analyses = [];
  
  // Presence Penalty Analysis
  if (presence === 0) {
    analyses.push("With no presence penalty (0.0), the model may focus on prominent aspects repeatedly.");
  } else if (presence < 1.0) {
    analyses.push(`With a moderate presence penalty (${presence}), the model will somewhat avoid repeating the same topics.`);
  } else if (presence <= 2.0) {
    analyses.push(`With a high presence penalty (${presence}), the model actively explores different aspects and characteristics.`);
  } else {
    analyses.push(`With a very high presence penalty (${presence}), the model strongly avoids topic repetition, potentially at the cost of coherence.`);
  }

  // Frequency Penalty Analysis
  if (frequency === 0) {
    analyses.push("With no frequency penalty (0.0), word choice may be more repetitive but potentially more consistent.");
  } else if (frequency < 1.0) {
    analyses.push(`With a moderate frequency penalty (${frequency}), the model will somewhat vary its word choices.`);
  } else if (frequency <= 2.0) {
    analyses.push(`With a high frequency penalty (${frequency}), expect diverse vocabulary and varied expression styles.`);
  } else {
    analyses.push(`With a very high frequency penalty (${frequency}), the model strongly avoids word repetition, potentially using unusual synonyms.`);
  }

  return analyses;
}; 