'use client'

import styles from './EditProduct.module.scss';
import stateFactory from './EditProduct.state.ts';
import useForest from '~/lib/utils/useForest'
import { ChakraProviders } from '~/components/ChakraProviders'
import { Box, Text, Input, Textarea, Heading, Button, VStack, HStack, Select } from '@chakra-ui/react'
import productManager from '~/lib/productManager'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { os } from '~/app/layout'
import { startCase } from 'lodash'
import { colors } from '~/lib/viewManager'

type EditProductProps = {}

export default function EditProduct(props: EditProductProps) {
  const router = useRouter();
  const [value, state] = useForest([stateFactory, props, router],
    async (localState) => {
      await productManager.do.load();
      localState.do.load();
    });

  const { name, description, price, type, color, sku, loaded } = value;

  return (
    <ChakraProviders>
      <VStack id="page-frame" layerStyle="layout-frame">
        <Button onClick={() => router.push('/')}
                leftIcon={<Image width={30} height={30} alt="home-icon"
                                 src="/img/icons/home.svg"/>}
                variant="home-button">Home</Button>
        <Heading as="h1" variant="page-head-with-sub">Denim</Heading>
        <Heading variant="page-head-sub">Editing Product</Heading>
        <Box layerStyle="page-frame-inner" px={8} mt={4}>
          <Heading variant="product-edit-head">{name} <span className={styles.sku}>
            (sku {sku})</span></Heading>
          <div className={styles['product-props']}>
            <Text as="label" textStyle="label">Name</Text>
            <Input name="name" value={name} backgroundColor="white"
                   onChange={(e) => {
                     if (loaded) {
                       state.do.set_name(e.target.value);
                     }
                   }}
            />

            <Text as="label" textStyle="label">Type</Text>
            <Input name="type" value={type}
                   backgroundColor="white"
                   onChange={(e) => {
                     if (loaded) {
                       state.do.set_type(e.target.value);
                     }
                   }}/>

            <Text as="label" textStyle="label">Color</Text>
            <Select name="color" value={color}
                   backgroundColor="white"
                   onChange={(e) => {
                     if (loaded) {
                       console.log('updating color to ', e.target.value);
                       state.do.set_color(e.target.value);
                     }
                   }}>
              {colors.map((color) => (
                <option key={color} value={color}>{startCase(color)}</option>
              ))}
            </Select>

            <Text as="label" textStyle="label">Price</Text>
            <Input name="type" value={price}
                   backgroundColor="white"
                   type="number"
                   min={0}
                   onChange={(e) => {
                     if (loaded) {
                       state.do.set_price(e.target.value);
                     }
                   }}/>

            <Text as="label" textStyle="label">Description</Text>
            <Textarea name="description" value={description}
                      backgroundColor="white"
                      onChange={(e) => {
                        if (loaded) {
                          state.do.set_description(e.target.value);
                        }
                      }}
            />
            <Text as="label" textStyle="label">&nbsp;</Text>
            <HStack width="100%" justify="space-between" mt={8}>
       {/*       <Button onClick={state.do.reset} className={os.className}>
                Reset
              </Button>*/}

              <Button onClick={state.do.delete} color="red"
                      className={os.className}>
                Delete
              </Button>

              <Button onClick={state.do.save} variant="submit"  className={os.className}>
                Save Changes
              </Button>

            </HStack>
          </div>

        </Box>
      </VStack>
    </ChakraProviders>
  );
}
