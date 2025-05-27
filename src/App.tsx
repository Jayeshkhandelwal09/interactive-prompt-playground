import { ChakraProvider, Container, Heading, Text, Stack } from '@chakra-ui/react';
import Playground from './components/Playground';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" py={8}>
        <Stack spacing={6} align="stretch">
          <Heading as="h1" size="xl">Interactive Prompt Playground</Heading>
          <Text>
            Experiment with OpenAI's language models and understand how different parameters
            affect the output. Generate product descriptions while adjusting various parameters
            to see their impact on the generated text.
          </Text>
          <Playground />
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
