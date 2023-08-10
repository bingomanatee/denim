import { useState, useEffect, useCallback } from 'react';
import styles from './ColorSelector.module.scss';
import stateFactory from './ColorSelector.state.ts';
import { HStack, Text, useBoolean, Box, VStack, Flex } from '@chakra-ui/react'
import Image from 'next/image';
import useForest from '~/lib/utils/useForest'
import viewManager, { colors } from '~/lib/viewManager'
import { startCase } from 'lodash';
import { os } from '~/app/layout'

type ColorSelectorProps = {}

function ColorChooser(props: { color: string, hider }) {
  const { color, hider } = props;

  const onClick = useCallback(() => {
    viewManager.do.chooseColor(color);
    hider();
  }, [hider, color]);

  return (
    <Box layerStyle="color-chooser-overlay"
         data-id="color-chooser-overlay"
         onClick={onClick}
    >
      <Image className={styles['color-icon']}
             src={`/img/icons/color-menu-${color}.svg`}
             width={90}
             height={38}
             alt={color}/>
      <Text textStyle="color-chooser-label"
            className={os.className}
      >{startCase(color)}</Text>
    </Box>
  )
}

export default function ColorSelector(props: ColorSelectorProps) {
  const [value, state] = useForest([stateFactory, props],
    (localState) => {
    });

  const {} = value;

  const [flag, setFlag] = useBoolean();

  return (<div className={styles.container}>
    <VStack alignItems="end">
      <VStack spacing={0.5} onClick={setFlag.toggle}>
        <Image src="/img/icons/colors-flag.svg" width={80} height={40} alt="color menu"/>
        <Text textAlign="center" size="sm"
        className={os.className}
        >Find Color </Text>
      </VStack>
      {flag ? <Box layerStyle="color-flags" data-id="color-flags">
        <Box layerStyle="color-buttons-container" data-id="color buttons container">
          <div className={styles['color-buttons']}>
            <ColorChooser color="all" hider={setFlag.off}/>
            {colors.map(
              (color) => (
                <ColorChooser key={color} color={color} hider={setFlag.off}/>
              )
            )}
          </div>
        </Box>
      </Box> : null}
    </VStack>
  </div>);
}
