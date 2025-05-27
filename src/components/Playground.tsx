import React, { useState } from 'react';
import {
  Box,
  Stack,
  Text,
  Select,
  Textarea,
  NumberInput,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import {
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import type { PlaygroundConfig, PlaygroundResult, GridResult } from '../types/playground';
import { DEFAULT_CONFIG } from '../types/playground';
import { ResponseAnalysis } from './ResponseAnalysis';

const Playground: React.FC = () => {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);
  const [results, setResults] = useState<PlaygroundResult[]>([]);
  const [gridResults, setGridResults] = useState<GridResult[]>([]);
  const [isSingleLoading, setSingleLoading] = useState(false);
  const [isGridLoading, setGridLoading] = useState(false);
  const toast = useToast();

  const handleConfigChange = (field: keyof PlaygroundConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const generateResponse = async () => {
    setSingleLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate response');
      }

      const data = await response.json();
      setResults(prev => [...prev, { config: { ...config }, response: data.response }]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSingleLoading(false);
    }
  };

  const generateGrid = async () => {
    if (isGridLoading) return; 
    
    setGridLoading(true);
    const temperatures = [0.0, 0.7, 1.2];
    const maxTokensValues = [50, 150, 300];
    const presencePenalties = [0.0, 1.5];
    const frequencyPenalties = [0.0, 1.5];

    const results: GridResult[] = [];
    const totalCombinations = temperatures.length * maxTokensValues.length * 
                            presencePenalties.length * frequencyPenalties.length;
    let completedCombinations = 0;

    try {
      for (const temp of temperatures) {
        for (const tokens of maxTokensValues) {
          for (const presence of presencePenalties) {
            for (const frequency of frequencyPenalties) {
              const testConfig = {
                ...config,
                temperature: temp,
                maxTokens: tokens,
                presencePenalty: presence,
                frequencyPenalty: frequency,
              };

              try {
                const response = await fetch('/api/generate', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(testConfig),
                });

                if (!response.ok) {
                  const data = await response.json();
                  throw new Error(data.error || 'Failed to generate grid response');
                }

                const data = await response.json();
                results.push({
                  temperature: temp,
                  maxTokens: tokens,
                  presencePenalty: presence,
                  frequencyPenalty: frequency,
                  response: data.response,
                });

                completedCombinations++;
                // Update progress
                toast({
                  title: 'Grid Generation Progress',
                  description: `${completedCombinations}/${totalCombinations} combinations completed`,
                  status: 'info',
                  duration: 1000,
                  isClosable: true,
                });
              } catch (error: any) {
                console.error('Error generating grid item:', error);
                // Continue with other combinations even if one fails
              }
            }
          }
        }
      }

      setGridResults(results);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setGridLoading(false);
    }
  };

  return (
    <Box p={6}>
      <Stack spacing={6} align="stretch">
        <Card>
          <CardBody>
            <Stack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Model</FormLabel>
                <Select
                  value={config.model}
                  onChange={(e) => handleConfigChange('model', e.target.value)}
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>System Prompt</FormLabel>
                <Textarea
                  value={config.systemPrompt}
                  onChange={(e) => handleConfigChange('systemPrompt', e.target.value)}
                  rows={3}
                />
              </FormControl>

              <FormControl>
                <FormLabel>User Prompt</FormLabel>
                <Textarea
                  value={config.userPrompt}
                  onChange={(e) => handleConfigChange('userPrompt', e.target.value)}
                  rows={3}
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl>
                  <FormLabel>Temperature</FormLabel>
                  <NumberInput
                    value={config.temperature}
                    onChange={(_, val) => handleConfigChange('temperature', val)}
                    min={0}
                    max={2}
                    step={0.1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Max Tokens</FormLabel>
                  <NumberInput
                    value={config.maxTokens}
                    onChange={(_, val) => handleConfigChange('maxTokens', val)}
                    min={1}
                    max={2000}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Presence Penalty</FormLabel>
                  <NumberInput
                    value={config.presencePenalty}
                    onChange={(_, val) => handleConfigChange('presencePenalty', val)}
                    min={-2}
                    max={2}
                    step={0.1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Frequency Penalty</FormLabel>
                  <NumberInput
                    value={config.frequencyPenalty}
                    onChange={(_, val) => handleConfigChange('frequencyPenalty', val)}
                    min={-2}
                    max={2}
                    step={0.1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>Stop Sequence</FormLabel>
                <Textarea
                  value={config.stopSequence || ''}
                  onChange={(e) => handleConfigChange('stopSequence', e.target.value)}
                  placeholder="Optional stop sequence"
                />
              </FormControl>

              <Stack spacing={4} direction="row">
                <Button
                  colorScheme="blue"
                  onClick={generateResponse}
                  isLoading={isSingleLoading}
                  isDisabled={isGridLoading}
                >
                  Generate Single Response
                </Button>
                <Button
                  colorScheme="green"
                  onClick={generateGrid}
                  isLoading={isGridLoading}
                  isDisabled={isSingleLoading}
                >
                  Generate Grid Results
                </Button>
              </Stack>
            </Stack>
          </CardBody>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardBody>
              <Text fontSize="xl" mb={4}>Single Results</Text>
              <Stack spacing={4} align="stretch">
                {results.map((result, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius="md">
                    <Text fontWeight="bold">Configuration:</Text>
                    <Text>Temperature: {result.config.temperature}</Text>
                    <Text>Max Tokens: {result.config.maxTokens}</Text>
                    <Text>Presence Penalty: {result.config.presencePenalty}</Text>
                    <Text>Frequency Penalty: {result.config.frequencyPenalty}</Text>
                    <Text fontWeight="bold" mt={2}>Response:</Text>
                    <Text>{result.response}</Text>
                    <ResponseAnalysis config={result.config} />
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
        )}

        {gridResults.length > 0 && (
          <Card>
            <CardBody>
              <Text fontSize="xl" mb={4}>Grid Results</Text>
              <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                {gridResults.map((result, index) => (
                  <GridItem key={index}>
                    <Box p={4} borderWidth={1} borderRadius="md">
                      <Text fontWeight="bold">Configuration:</Text>
                      <Text>Temperature: {result.temperature}</Text>
                      <Text>Max Tokens: {result.maxTokens}</Text>
                      <Text>Presence Penalty: {result.presencePenalty}</Text>
                      <Text>Frequency Penalty: {result.frequencyPenalty}</Text>
                      <Text fontWeight="bold" mt={2}>Response:</Text>
                      <Text>{result.response}</Text>
                      <ResponseAnalysis config={result} />
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </CardBody>
          </Card>
        )}
      </Stack>
    </Box>
  );
};

export default Playground; 