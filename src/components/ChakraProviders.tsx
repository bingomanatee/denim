'use client'
import { extendTheme } from '@chakra-ui/react'
import { inputAnatomy, tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ns, pr } from '~/app/layout'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

// define the base component styles
const tabBaseStyle = definePartsStyle({
  color: 'blackAlpha.200',
  // define the part you're going to style
  tab: {
    m: 0,
    fontWeight: 600,
    size: 'sm',
    borderWidth: '0 0 3px 0 !important',
    _selected: {
      color: 'orange.500'
    },
  },
  tabpanel: {
    p: 0,
  },
})

// export the component theme
const tabsTheme = defineMultiStyleConfig({
  baseStyle: tabBaseStyle,
  defaultProps: {
    size: 'sm',
  }
});

// ---------------- input

const makeInputTheme = () => {
  const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

  const baseStyle = definePartsStyle({
    // define the part you're going to style
    backgroundColor: 'white',
    element: {
      backgroundColor: 'white',
    }
  });

  return defineMultiStyleConfig({ baseStyle })
}


export const inputTheme = makeInputTheme()

// ---------------- variants

const PAGE_HEAD = {
  as: 'h1',
  fontSize: ['xl', '4xl', '6xl'],
  fontWeight: 600,
  color: 'blackAlpha.600',
  textAlign: 'center',
  pb: 4,
  textTransform: 'uppercase'
}


const COLORS = {
  accent: 'hsl(30,100%,50%)',
  'denim-light': 'hsl(226,80%,50%)',
  'denim': 'hsl(226,100%,33%)',
  'denim-dark': 'hsl(226,80%,15%)',
  'add-green': 'hsl(170,100%,30%)',
  'edit-yellow': 'hsl(68,80%,60%)',
  'add-green-disabled': 'hsla(170,100%,30%, 33%)',
  'edit-yellow-disabled': 'hsla(68,100%,60%, 33%)',
  'delete': 'hsl(0,100%,39%)',
  'add-green-dark': 'hsl(170,100%,15%)',
  'dark-accent': 'hsl(30,100%,33%)',
  'x-dark-accent': 'hsl(30,50%,25%)',
  'light-accent': 'hsl(30,100%,75%)',
  'x-light-accent': 'hsl(30,100%,85%)',
  'form-title': 'hsl(244,50%,25%)',
  'nav-x-light': 'hsl(200,100%,75%)',
  'nav-light': 'hsl(200,86%,50%)',
  'nav': 'hsl(200,55%,33%)',
  'nav-dark': 'hsl(200,100%,15%)',
  'editLink': 'hsl(228,70%,50%)',
  'active-button-back': 'hsl(30,50%,25%)',
  'button-back': 'hsl(30,0%,85%)',
  'active-button': 'hsl(30,100%,75%)',
  'inactive-button': 'hsl(150,20%,33%)',
};

const HEADINGS = {
  'view-manager-label': {
    fontSize: ['sm', 'md', 'md'],
    textAlign: 'center',
    p: 0,
    mt: 0,
    mb: 1,
    fontWeight: 500,
  },
  'page-head': {
    ...PAGE_HEAD
  },
  'page-head-with-sub': {
    ...PAGE_HEAD,
    pb: 0,
    lineHeight: 0.8,
    m: 0

  },
  'page-head-sub': {
    ...PAGE_HEAD,
    fontSize: ['lg', 'lg', 'xl'],
    fontWeight: 400,
    p: 0,
    m: 0,
    size: 'sm',
  },
  'product-edit-head': {
    fontSize: ['lg', '2xl', '3xl'],
    textAlign: 'center',
    mb: 4
  },
  'product-heading': {
    fontSize: 'sm',
    fontWeight: 800,
    noOfLines: 1,
    textAlign: 'center',
    mt: 2
  }
}
const COMPONENTS = {
  Tabs: tabsTheme,
  Button: {
    baseStyle: {
      textTransform: 'uppercase',
      fontWeight: 300,
      p: 0,
      minWidth: '150px',
      fontSize: ['lg', 'xl', 'xl'],
      borderRadius: '8px',
      _hover: {
        color: 'blue.700'
      }
    },

    variants: {
      'home-button': {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: "whiteAlpha.50",
        alignItems: "center",
        p: 1,
        lineHeight: 1,
        h: "auto",
      },
      'edit-type-button': {
        backgroundColor: "white",
        alignItems: "center",
        fontSize: 'lg',
        p: 1,
        lineHeight: 1,
        h: "auto",
        sx: { paddingInlineStart: 0, paddingInlineEnd: 0 }
      },

      nav: {
        borderColor: 'nav-x-light',
        background: 'white',
        _hover: {
          color: 'nav-dark',
          backgroundColor: 'nav-x-light',
        }
      },
      delete: {
        borderColor: 'red.100',
        color: 'red.500',
        background: 'white',
        _hover: {
          color: 'red.800',
          backgroundColor: 'red.50',
        }
      },
      submit: {
        borderWidth: ['2px', '3px', '3px'],
        borderColor: 'light-accent',
        backgroundColor: 'white',
        _hover: {
          color: 'x-dark-accent',
          backgroundColor: 'x-light-accent'
        }
      }
    }
  },
  FormLabel: {
    baseStyle: {
      fontStyle: 'italic',
      color: 'form-title',
      fontWeight: 400,
      fontSize: 'sm',
      mb: '2px'
    }
  },
  Input: inputTheme,
  Card: {
    variants: {
      ['form-card']: {
        container: {
          borderRadius: 0,
          boxShadow: 'lg',
          Input: {
            backgroundColor: 'white'
          }
        },
        footer: {
          justifyContent: 'flex-end',
          align: 'center',
          width: '100%',
          p: 1
        }
      },
      ['list-item']: {
        header: {
          p: [1, 1.5],
        },
        container: {
          w: "100%",
          m: [0.25, 0.5],
          p: 0,
          borderRadius: 0
        },
        body: {
          borderRadius: 0,
          px: 1.5,
          py: 0.5,

        },
        footer: {
          justifyContent: 'flex-end',
          align: 'center',
          width: '100%',
          p: 1
        }
      }
    }
  },
  Heading: {
    baseStyle: {
      className: pr.className,
    },
    variants: HEADINGS
  },
  Text: {},
  Avatar: {
    variants: {
      order: {
        position: 'absolute',
        left: '3px',
        bottom: '3px',
        size: "sm",
        backgroundColor: "blackAlpha.200",
        color: "black"
      }
    }
  }
};
const TEXT_STYLES = {
  'overlay-text': {
    fontSize: '3xl',
    color: 'white',
    shadow: 'dark',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    textAlign: 'center',
    lineHeight: '60px',
    zIndex: 10,
  },
  'color-chooser-label': {
    fontSize: 'lg',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    lineHeight: '38px',
    color: 'white',
    shadow: 'dark',
    _hover: {
      color: 'accent'
    }
  },
  'atb-title-sub': {
    m: 0,
    p: 0,
    fontSize: 'xs',
  },
  'act-order': {
    position: 'absolute',
    left: 2,
    bottom: 1,
    width: '50px',
    fontSize: 'sm',
  },
  'list-item-head': {
    as: 'section',
    px: 4,
    py: 2,
    numLines: 1,
    fontSize: 'lg',
    fontWeight: 500
  },
  'disabled-text': {
    color: 'blackAlpha.300'
  },
  'previs-id': {
    fontSize: '9px',
    position: 'absolute',
    left: '2px',
    top: '2px'
  },
  'label-v': {
    color: 'blackAlpha.700',
    fontSize: 'sm',
    textAlign: 'center',
    numLines: 1,
    textTransform: 'uppercase'
  },
  'label': {
    color: 'blackAlpha.700',
    fontSize: ['md', 'lg', 'lg'],
    px: 2,
    py: 0.5,
    numLines: 1,
    textAlign: 'right',
    textTransform: 'uppercase'
  },
  'product-label': {
    as: 'label',
    color: 'blackAlpha.700',
    display: 'flex',
    justifyContent: 'flex-end',
    numLines: 1,
    textTransform: 'uppercase',
    textAlign: 'right',
    className: pr.classname,
    pr: 2,
  },
  'previs-content': {
    p: 2,
    fontSize: '9pt',
    fontWeight: 500,
    zIndex: 10,
    position: 'relative',
    backgroundColor: 'whiteAlpha.400',
    mt: 4,
  },
  'product-description': {
    fontSize: 'xs',
    noOfLines: 2,
    p: 2
  },
  runsheet: {
    fontFamily: 'var(--font-space-mono), monospace',
    fontWeight: 400,
    fontSize: '10pt !important',
    p: 0,
    color: "blackAlpha.800",
    textTransform: 'none',
    pr: 4,
  },
  'runsheet-head': {
    fontFamily: 'var(--font-space-mono), monospace',
    fontWeight: 400,
    fontSize: '10pt !important',
    p: 0,
    color: "purple.700",
    textTransform: 'none'
  },
  par: {
    fontSize: 'md',
    mb: '8',
    mt: '4'
  },
  code: {
    fontFamily: 'var(--font-space-mono), monospace',
    fontSize: 'sm',
    lineHeight: '100%'
  },
  info: {
    fontSize: 'sm',
    color: 'gray.600',
    py: 2,
  }
};

const LAYER_STYLES = {
  'nav-frame': {
    direction: "row",
    align: "center",
    py: 0, pt: 2, h: 8,
    px: 4,
    w: "100%",
    as: "header",
    zIndex: 100000,
  },
  'color-flags': {
    mt: 2,
    width: '770px',
    zIndex: 50,
    position: 'relative',
  },
  "color-chooser-overlay": {
    width: '90px',
    height: '40px',
    mr: '8px',
    justify: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 0,
    display: 'block',
    position: 'relative',
    overflow: 'visible',
    boxShadow: 'md',
    p: 0
  },
  'color-buttons': {
    width: '770px',
    height: '80px',
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  'color-buttons-container': {
    borderColor: 'black',
    p: 4,
    backgroundColor: 'white',
    boxShadow: 'lg',
    zIndex: 100,
    position: 'absolute',
    width: '730px',
  },
  'product-thumb': {
    borderColor: 'blackAlpha.400',
    position: 'relative',
    p: 0,
    backgroundColor: 'whiteAlpha.500',
    borderWidth: '1px',
    _hover: {
      shadow: 'xl',
      borderColor: 'blackAlpha.700',
      backgroundColor: 'whiteAlpha.800'
    }
  },
  contain: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  'edit-button': {
    position: 'absolute',
    bottom: [0, 0, -2],
    right: [0, 0, -2],
  },
  'destroy-button': {
    position: 'absolute',
    bottom: [0, 0, -2],
    left: [0, 0, -2],
  },
  'product-image': {
    display: 'block',
    objectFit: 'contain',
    backgroundColor: 'gray.300',
    objectPosition: 'center',
    flex: 0
  },
  'layout-frame': {
    direction: 'column',
    width: '100%',
    height: '100%',
    m: 0,
    p: 0,
    as: 'article',
    overflow: 'hidden',

    alignItems: 'stretch',
  },
  'text-document': {
    px: 16,
    py: 10,
    h: '100%',
    overflowY: 'auto'
  },
  acts: {
    p: 0,
  },
  'page-frame-inner': {
    width: '100%',
    overflowY: 'auto',
  },
  'page-frame': {
    width: '100%',
    height: '100%',
    m: 0,
    p: 0,
    overflowY: 'hidden'
  },
  keyHintRow: {
    alignItems: 'baseline',
    backgroundColor: 'rgba(255,255,255,0.8)',
    px: 3,
    py: 2
  },
  newFrame: {
    position: "absolute",
    zIndex: "50",
    background: "black", color: "white",
    pad: 2,
    overflow: "hidden",
  },
  keyHint: {
    px: '3px',
    py: '2px',
    borderRadius: '0.333em',
    borderColor: 'gray.500',
    borderWidth: '1px',
    mr: 4,
    backgroundColor: 'white',
    width: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  }
}

const theme = extendTheme({
  layerStyles: LAYER_STYLES,
  colors: COLORS,
  components: COMPONENTS,
  textStyles: TEXT_STYLES
});


export function ChakraProviders({ children }: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
