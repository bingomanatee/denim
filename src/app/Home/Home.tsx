'use client'

import { Box, Heading, VStack } from '@chakra-ui/react'
import { ChakraProviders } from '~/components/ChakraProviders'
import { useEffect } from 'react'
import productManager from '~/lib/productManager'
import ColorSelector from '~/components/ColorSelector/ColorSelector'
import { ListProducts } from '~/app/Home/ListProducts'
import { ViewManagerDisplay } from '~/app/Home/ViewManagerDisplay'

export default function Home() {
  useEffect(() => {
    productManager.do.load();
  }, [])

  return (
    <ChakraProviders>
      <ColorSelector/>
      <VStack id="page-frame" layerStyle="layout-frame">
        <Heading as="h1" variant="page-head-with-sub">Paige Denim</Heading>
        <Heading variant="page-head-sub">Product Catalog</Heading>
        <ViewManagerDisplay />
        <Box layerStyle="page-frame-inner">
            <ListProducts />
        </Box>
      </VStack>
    </ChakraProviders>
  )
}
