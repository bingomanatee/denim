import { useEffect, useState } from 'react'
import { combineLatest, map } from 'rxjs'
import productManager from '~/lib/productManager'
import viewManager from '~/lib/viewManager'
import { Heading, Text, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import useForestFiltered from '~/lib/utils/useForestFiltered'
export function ViewManagerDisplay() {
  /**
   * ensuring the views refresh when either manager updates
   */
  const products = useForestFiltered(productManager, (value) => value);
  const selection = useForestFiltered(viewManager, (value) => value);
  return (
      <HStack justify="center">
        {(viewManager.$.atStart()) ? (
            <Image src="/img/icons/blank-go-button.svg" width={17} height={40} alt="placeholder button"/>
          )
          :
          (
            <Image src="/img/icons/back-button.svg" onClick={viewManager.do.back} width={17} height={40} alt="placeholder button"/>
          )
        }
        <Heading variant="view-manager-label">{viewManager.$.label()}</Heading>
        {(viewManager.$.atEnd()) ? (
            <Image src="/img/icons/blank-go-button.svg" width={17} height={40} alt="placeholder button"/>
          )
          :
          (
            <Image src="/img/icons/next-button.svg" onClick={viewManager.do.next} width={17} height={40} alt="placeholder button"/>
          )
        }
      </HStack>

  )
}
