import { ChakraProvider, Heading, Text, Stack, Flex, IconButton, useColorMode, Box } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Playground from './components/Playground';
import theme from './theme';

function AppContent() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh" w="100vw" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
      <Box  w="full" maxW="none" px={[4, 6, 8]} py={8}>
        <Stack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Stack spacing={1}>
              <Heading as="h1" size="xl" bgGradient="linear(to-r, brand.500, purple.500)" bgClip="text">
                Interactive Prompt Playground
              </Heading>
              <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'} fontSize="lg">
                Experiment with OpenAI's language models and understand how different parameters
                affect the output.
              </Text>
            </Stack>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="lg"
            />
          </Flex>
          <Playground />
        </Stack>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppContent />
    </ChakraProvider>
  );
}

export default App;