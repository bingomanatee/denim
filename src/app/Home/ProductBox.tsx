import { useEffect, useMemo } from 'react'
import productManager from '~/lib/productManager'
import { Box, Heading, HStack, Text, useBreakpointValue } from '@chakra-ui/react'
import styles from './ProductBox.module.scss'
import useForestFiltered from '~/lib/utils/useForestFiltered'
import { os, pr } from '~/app/layout'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function ProductImages(props: { images: ImageData[] }) {
  const { images } = props;

  if (!images?.length) {
    return null;
  }

  return (<Box layerStyle="product-image">
    <img className={styles['product-image']} alt="product image"
         src={images[0].thumbnail}/>
  </Box>)
}

export function ProductBox(props: { sku: string }) {
  const product = useForestFiltered(productManager, (value, state) => {
    return state.child(props.sku);
  })

  // load images fro duckDuckGo if they have not been loaded
  useEffect(() => {
    if (!product?.value.images) {
      product?.do?.loadImage();
    }
  }, [product])

  const { id, sku, name, type, description, price, color, images } = product.value;
  const router = useRouter();
  const showImage = useBreakpointValue({
    sm: { display: 'none' }, md: { display: 'block' }, lg: {
      display: 'block'
    }
  }, { ssr: false });
  return (
    <Box layerStyle="product-thumb" className={styles['product-thumb']}>
      <Box layerStyle="contain">
        {product.error ? (<Heading variant="product-heading-error">Error: {sku} not found</Heading>) : (
          <HStack>
            <Box display={showImage?.display || 'none'}>
              <ProductImages images={images}/>
            </Box>
            <Box>
              <Heading variant="product-heading">{name}</Heading>

              <div className={styles['product-props']}>

                <Text textStyle="product-label" as="label"
                      className={pr.className}>
                  ID
                </Text>
                <Text textStyle="product-value">{id}</Text>

                <Text textStyle="product-label" as="label"
                      className={pr.className}>
                  Color
                </Text>
                <Text textStyle="product-value">{color}</Text>

                <Text textStyle="product-label" as="label"
                      className={pr.className}>
                  Price
                </Text>
                <Text textStyle="product-value">{formatter.format(price)}</Text>

                <Text textStyle="product-label" as="label"
                      className={pr.className}>
                  Type
                </Text>
                <Text textStyle="product-value">{type}</Text>

              </div>
            </Box>
          </HStack>
        )}
        <Text textStyle="product-description">{description}</Text>
      </Box>
      <Box layerStyle="edit-button" className={styles['pop-up']}
           onClick={() => router.push('/products/' + sku)}>
        <Image src="/img/icons/edit-icon.svg" className={styles['edit-icon']}
               alt="edit-icon" height={60} width={105}/>
        <Text as="label" className={os.className} textStyle="overlay-text">Edit</Text>
      </Box>
      <Box layerStyle="destroy-button" style={{
        filter: 'hue-rotate(120deg)'
      }} className={styles['pop-up']}
           onClick={() => productManager.do.delete(sku)}>
        <Image src="/img/icons/edit-icon.svg"
               className={styles['edit-icon']} alt="edit-icon" height={60} width={105}/>
        <Text as="label" className={os.className} textStyle="overlay-text">Delete</Text>
      </Box>
    </Box>
  )
}
