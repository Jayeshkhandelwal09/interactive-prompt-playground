import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f0f4ff',
      100: '#d9e2ff',
      200: '#b3c5ff',
      300: '#8ca8ff',
      400: '#668bff',
      500: '#4d6fff',
      600: '#3d59cc',
      700: '#2e4399',
      800: '#1f2c66',
      900: '#0f1633',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.900',
      },
    }),
  },
  components: {
    Container: {
      baseStyle: {
        maxW: '100%',
        px: { base: 4, md: 8 },
        py: { base: 4, md: 8 },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          boxShadow: 'lg',
          rounded: 'xl',
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderWidth: '1px',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          transition: 'all 0.2s',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          },
        },
      }),
    },
    Tabs: {
      variants: {
        'soft-rounded': (props: any) => ({
          tab: {
            borderRadius: 'full',
            fontWeight: 'medium',
            color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
            _selected: {
              color: props.colorMode === 'dark' ? 'white' : 'gray.800',
              bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.100',
            },
          },
          tablist: {
            gap: 3,
          },
        }),
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        rounded: 'lg',
        transition: 'all 0.2s',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.600',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.700',
            transform: 'translateY(0)',
            boxShadow: 'md',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          color: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.900' : 'brand.50',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'brand.800' : 'brand.100',
            transform: 'translateY(0)',
            boxShadow: 'md',
          },
        }),
        ghost: (props: any) => ({
          color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.50',
            color: props.colorMode === 'dark' ? 'white' : 'gray.800',
          },
        }),
      },
    },
    Input: {
      variants: {
        filled: (props: any) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.50',
            _hover: {
              bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.100',
            },
            _focus: {
              bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.100',
            },
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Textarea: {
      variants: {
        filled: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.50',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.100',
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.100',
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    FormLabel: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
        fontSize: 'sm',
        fontWeight: 'medium',
        mb: 2,
      }),
    },
  },
});

export default theme; 