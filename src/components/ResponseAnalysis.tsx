import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import { analyzeTemperature, analyzeTokens, analyzePenalties } from '../utils/analysisUtils';

interface AnalysisConfig {
  temperature: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
}

interface ResponseAnalysisProps {
  config: AnalysisConfig;
}

export const ResponseAnalysis: React.FC<ResponseAnalysisProps> = ({ config }) => {
  const temperatureAnalysis = analyzeTemperature(config.temperature);
  const tokenAnalysis = analyzeTokens(config.maxTokens);
  const penaltyAnalyses = analyzePenalties(config.presencePenalty, config.frequencyPenalty);

  return (
    <Box mt={4} p={4} bg="gray.50" borderRadius="md">
      <Text fontWeight="bold" mb={2}>Response Analysis:</Text>
      <Stack spacing={3}>
        <Text fontSize="sm">
          <Text as="span" fontWeight="semibold">Temperature Effect: </Text>
          {temperatureAnalysis}
        </Text>
        <Text fontSize="sm">
          <Text as="span" fontWeight="semibold">Token Impact: </Text>
          {tokenAnalysis}
        </Text>
        {penaltyAnalyses.map((analysis, idx) => (
          <Text key={idx} fontSize="sm">
            <Text as="span" fontWeight="semibold">Penalty Effect: </Text>
            {analysis}
          </Text>
        ))}
      </Stack>
    </Box>
  );
}; 