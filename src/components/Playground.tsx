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
  CardHeader,
  FormControl,
  FormLabel,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  HStack,
  VStack,
  Badge,
  IconButton,
  Tooltip,
  Divider,
  useClipboard,
  Icon,
} from '@chakra-ui/react';
import {
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import type { PlaygroundConfig, PlaygroundResult, GridResult } from '../types/playground';
import { DEFAULT_CONFIG } from '../types/playground';
import { ResponseAnalysis } from './ResponseAnalysis';
import { RiSendPlaneFill, RiGridFill, RiAiGenerate } from 'react-icons/ri';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Playground: React.FC = () => {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);
  const [results, setResults] = useState<PlaygroundResult[]>([]);
  const [gridResults, setGridResults] = useState<GridResult[]>([]);
  const [isSingleLoading, setSingleLoading] = useState(false);
  const [isGridLoading, setGridLoading] = useState(false);
  const { colorMode } = useColorMode();
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
      setResults(prev => [{ config: { ...config }, response: data.response }, ...prev]);
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
                toast({
                  title: 'Grid Generation Progress',
                  description: `${completedCombinations}/${totalCombinations} combinations completed`,
                  status: 'info',
                  duration: 1000,
                  isClosable: true,
                });
              } catch (error: any) {
                console.error('Error generating grid item:', error);
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

  const ResultCard = ({ result, index }: { result: PlaygroundResult; index: number }) => {
    const { hasCopied, onCopy } = useClipboard(result.response);
    
    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <CardHeader>
          <HStack justify="space-between">
            <Badge colorScheme="brand" fontSize="sm">Result #{results.length - index}</Badge>
            <Tooltip label={hasCopied ? 'Copied!' : 'Copy response'}>
              <IconButton
                aria-label="Copy response"
                icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                size="sm"
                variant="ghost"
                onClick={onCopy}
              />
            </Tooltip>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Box>
              <Text fontWeight="medium" mb={2}>Configuration</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <Text fontSize="sm">Temperature: {result.config.temperature}</Text>
                <Text fontSize="sm">Max Tokens: {result.config.maxTokens}</Text>
                <Text fontSize="sm">Presence Penalty: {result.config.presencePenalty}</Text>
                <Text fontSize="sm">Frequency Penalty: {result.config.frequencyPenalty}</Text>
              </Grid>
            </Box>
            <Divider />
            <Box>
              <Text fontWeight="medium" mb={2}>Response</Text>
              <Text fontSize="sm" whiteSpace="pre-wrap">{result.response}</Text>
            </Box>
            <ResponseAnalysis config={result.config} />
          </VStack>
        </CardBody>
      </MotionCard>
    );
  };

  return (
    <Grid templateColumns={{ base: '1fr', lg: '450px 1fr' }} gap={6}>
      <GridItem>
        <Card position="sticky" top="4">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Model</FormLabel>
                <Select
                  value={config.model}
                  onChange={(e) => handleConfigChange('model', e.target.value)}
                  bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
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
                  resize="vertical"
                />
              </FormControl>

              <FormControl>
                <FormLabel>User Prompt</FormLabel>
                <Textarea
                  value={config.userPrompt}
                  onChange={(e) => handleConfigChange('userPrompt', e.target.value)}
                  rows={4}
                  resize="vertical"
                />
              </FormControl>

              <Tabs variant="soft-rounded" colorScheme="brand" size="sm">
                <TabList>
                  <Tab>Basic</Tab>
                  <Tab>Advanced</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={0}>
                    <VStack spacing={4}>
                      <FormControl>
                        <FormLabel>Temperature</FormLabel>
                        <NumberInput
                          value={config.temperature}
                          onChange={(_, val) => handleConfigChange('temperature', val)}
                          min={0}
                          max={2}
                          step={0.1}
                          precision={1}
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
                    </VStack>
                  </TabPanel>
                  <TabPanel px={0}>
                    <VStack spacing={4}>
                      <FormControl>
                        <FormLabel>Presence Penalty</FormLabel>
                        <NumberInput
                          value={config.presencePenalty}
                          onChange={(_, val) => handleConfigChange('presencePenalty', val)}
                          min={-2}
                          max={2}
                          step={0.1}
                          precision={1}
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
                          precision={1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Stop Sequence</FormLabel>
                        <Textarea
                          value={config.stopSequence || ''}
                          onChange={(e) => handleConfigChange('stopSequence', e.target.value)}
                          placeholder="Optional stop sequence"
                          size="sm"
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Stack spacing={4} direction={{ base: 'column', sm: 'row' }}>
                <Button
                  colorScheme="brand"
                  onClick={generateResponse}
                  isLoading={isSingleLoading}
                  isDisabled={isGridLoading}
                  flex="1"
                  size="lg"
                  fontSize="md"
                  leftIcon={<Icon as={RiSendPlaneFill} />}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                    boxShadow: 'md',
                  }}
                >
                  Generate Response
                </Button>
                <Button
                  colorScheme="brand"
                  variant="outline"
                  onClick={generateGrid}
                  isLoading={isGridLoading}
                  isDisabled={isSingleLoading}
                  flex="1"
                  size="lg"
                  fontSize="md"
                  leftIcon={<Icon as={RiGridFill} />}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                    boxShadow: 'md',
                  }}
                >
                  Generate Grid
                </Button>
              </Stack>
            </VStack>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem>
        <VStack spacing={6} align="stretch" h="100%">
          {results.length > 0 ? (
            <AnimatePresence>
              {results.map((result, index) => (
                <ResultCard key={index} result={result} index={index} />
              ))}
            </AnimatePresence>
          ) :  gridResults.length === 0 ? (
            <Card h="100%">
              <CardBody>
                <VStack py={12} justify="center" align="center" spacing={4} h="100%">
                  <Box
                    p={4}
                    borderRadius="full"
                    bg={colorMode === 'dark' ? 'brand.900' : 'brand.50'}
                    color={colorMode === 'dark' ? 'brand.200' : 'brand.600'}
                  >
                    <Icon as={RiAiGenerate} boxSize={8} />
                  </Box>
                  <VStack spacing={1}>
                    <Text fontSize="lg" fontWeight="medium">No Responses Yet</Text>
                    <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'} textAlign="center">
                      Configure your parameters and click "Generate Response" to see the AI-generated content appear here.
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ) : null}

          {gridResults.length > 0 && (
            <Card>
              <CardHeader>
                <Text fontSize="xl" fontWeight="medium">Grid Results</Text>
              </CardHeader>
              <CardBody>
                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                  {gridResults.map((result, index) => (
                    <GridItem key={index}>
                      <Card variant="outline" size="sm">
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <Box>
                              <Text fontWeight="medium" fontSize="sm" mb={2}>Configuration</Text>
                              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                                <Text fontSize="xs">Temperature: {result.temperature}</Text>
                                <Text fontSize="xs">Max Tokens: {result.maxTokens}</Text>
                                <Text fontSize="xs">Presence Penalty: {result.presencePenalty}</Text>
                                <Text fontSize="xs">Frequency Penalty: {result.frequencyPenalty}</Text>
                              </Grid>
                            </Box>
                            <Divider />
                            <Box>
                              <Text fontWeight="medium" fontSize="sm" mb={2}>Response</Text>
                              <Text fontSize="xs" whiteSpace="pre-wrap">{result.response}</Text>
                            </Box>
                            <ResponseAnalysis config={result} />
                          </VStack>
                        </CardBody>
                      </Card>
                    </GridItem>
                  ))}
                </Grid>
              </CardBody>
            </Card>
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Playground; 