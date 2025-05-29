import React from 'react';
import { Box, Stack, Text, useColorMode } from '@chakra-ui/react';
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
  const { colorMode } = useColorMode();

  return (
    <Box
      mt={4}
      p={4}
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
      borderRadius="lg"
      fontSize="sm"
    >
      <Text fontWeight="medium" mb={3} color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}>
        Analysis
      </Text>
      <Stack spacing={3}>
        <Box>
          <Text color={colorMode === 'dark' ? 'blue.200' : 'blue.600'} fontWeight="medium" mb={1}>
            Temperature Impact
          </Text>
          <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
            {temperatureAnalysis}
          </Text>
        </Box>
        <Box>
          <Text color={colorMode === 'dark' ? 'green.200' : 'green.600'} fontWeight="medium" mb={1}>
            Token Strategy
          </Text>
          <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
            {tokenAnalysis}
          </Text>
        </Box>
        {penaltyAnalyses.map((analysis, idx) => (
          <Box key={idx}>
            <Text color={colorMode === 'dark' ? 'purple.200' : 'purple.600'} fontWeight="medium" mb={1}>
              Penalty Effect {idx + 1}
            </Text>
            <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
              {analysis}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}; 