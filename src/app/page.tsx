'use client'

import styles from './page.module.css'
import { Box, Heading, VStack } from '@chakra-ui/react'
import { ChakraProviders } from '~/components/ChakraProviders'
import { useEffect } from 'react'
import productManager from '~/lib/productManager'
import useForestFiltered from '~/lib/utils/useForestFiltered'
import { ProductBox } from '~/components/pages/ProductBox'
import { RawProduct } from '~/types'

function ListProducts(props: { products: RawProduct[] }) {
  return (
    <> {
      props.products.map((product) => {
        return <ProductBox key={product.id} id={product.id}/>
      })
    }
    </>
  )
}

export default function Home() {
  useEffect(() => {
    productManager.do.load();
  }, [])

  const paginatedProducts = useForestFiltered(productManager, (_v) => {
    const pp = productManager.$.paginate(0, 10)
    console.log('value: ', _v, 'pp', pp)
    return pp;
  });

  console.log('paginated', paginatedProducts);
  return (
    <ChakraProviders>
      <VStack id="page-frame" layerStyle="layout-frame">
        <Heading as="h1" variant="page-head-with-sub">Denim</Heading>
        <Heading variant="page-head-sub">Product Catalog</Heading>
        <Box layerStyle="page-frame-inner">
          <div className={styles['product-grid']}>
            <ListProducts products={paginatedProducts}/>
          </div>
        </Box>
      </VStack>
    </ChakraProviders>
  )
}
