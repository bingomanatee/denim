import { useEffect, useState } from 'react'
import { combineLatest, map } from 'rxjs'
import productManager from '~/lib/productManager'
import viewManager from '~/lib/viewManager'
import { Heading, Text, HStack } from '@chakra-ui/react'
import styles from '~/app/Home/Home.module.css'
import { ProductBox } from '~/app/Home/ProductBox'
import Image from 'next/image'
import useForestFiltered from '~/lib/utils/useForestFiltered'

export function ListProducts() {
  /**
   * ensuring the views refresh when either manager updates
   */
  const products = useForestFiltered(productManager, (value) => value);
  const selection = useForestFiltered(viewManager, (value) => value);

  return (

    <div className={styles['product-grid']}> {
      viewManager.$.currentSet().map((product) => {
        return <ProductBox key={product.sku} sku={product.sku}/>
      })
    }
    </div>
  )
}
