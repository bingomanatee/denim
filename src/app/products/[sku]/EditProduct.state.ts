import { leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'
import productManager from '~/lib/productManager'
import beep from 'browser-beep';

const beeper = beep({ frequency: 830 });

export type EditProductStateValue = {
  id: string,
  name: string,
  description: string,
  type: string,
  price: number,
  loaded: boolean
};

type leafType = typedLeaf<EditProductStateValue>;

const EditProductState = (props, router) => {
  const { params } = props;

  const $value: EditProductStateValue = {
    id: '',
    name: '',
    description: '',
    type: '',
    price: 0,
    loaded: false,
  };
  return {
    name: "EditProduct",
    $value,

    selectors: {},

    actions: {
      delete(state) {
        productManager.do.delete(state.value.id);
        router.push('/');
      },
      save(state) {
        const {name, description, type, cost, price, id} = state.value;

        try {
          productManager.do.update(id, {name, price: Number(price), description, type, cost});
        } catch {
          beeper();
          return;
        }
        router.push('/');

      },
      load(state: leafType) {
        const product = productManager.$.productValueFromSku(params.sku);
        if (product) {
          state.value = { ...state.value, ...product, loaded: true }
        }
      }
    }
  };
};

export default EditProductState;

