import { leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'

export type ColorSelectorStateValue = {};

type leafType = typedLeaf<ColorSelectorStateValue>;

const ColorSelectorState = (props) => {
  const $value: ColorSelectorStateValue = {};
  return {
    name: "ColorSelector",
    $value,

    selectors: {},

    actions: {}
  };
};

export default ColorSelectorState;
