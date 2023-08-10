import Dexie from 'dexie';

const db = new Dexie('product-data');
import data from '~/data/product-fixtures.json';
import { leafI } from '@wonderlandlabs/forest/lib/types'
import { Forest } from '@wonderlandlabs/forest'
import { RawProduct } from '~/types'
import axios from 'axios'
import { sortBy } from 'lodash';
import { c } from '@wonderlandlabs/collect'

// Declare tables, IDs and indexes
db.version(1).stores({
  items: '++id, sku, name, type, description, color, price, valid, images'
});

const productActions = {
  validate(state: leafI) {
    const { color, price, id } = state.value as RawProduct;
    let errors = [];
    if (!(color && typeof color === 'string')) {
      errors.push({
        field: 'color',
        error: 'required'
      })
    } else if (color.length >= 56) {
      errors.push({
        field: 'color',
        value: color,
        error: 'too long(' + color.length + ') - must be < 56 characters'
      })
    }

    if (!(id)) {
      errors.push({
        field: 'id',
        value: id,
        error: 'required'
      })
    }

    if ((typeof price !== 'number') || Number.isNaN(price) || price < 0) {
      errors.push({
        field: 'price',
        error: 'must be  >= 0',
        value: price
      })
    }

    state.do.set_errors(errors);
    state.do.set_validated(true);
  },
  loadImage(state: leafI) {
    //@TODO: cache in Dexie
    const { images } = state.value;
    if (images === null) {
      state.do.set_images([]); // to prevent double loading
      state.do.fetchImage();
    }
  },

  async fetchImage(state: leafI) {
    const { name, id } = state.value;
    //@TODO: load groups of images;
    state.do.set_images([]); // to prevent double loading
    if (!name) {
      return;
    }
    try {
      const { data } = await axios.get('/api/product_image/' + id);
      state.do.set_images(data);
    } catch (err) {
      console.error('error querying for ', id, name, err);
    }
  }

}

const productSelectors = {
  isValid(state: leafI) {
    const { errors, validated } = state.value;
    return validated && !errors.length
  }
}

const productManager = new Forest({
  $value: new Map(),
  actions: {
    delete(state: leafI, id: string) {
      const child = state.child(id);
      if (child){
        child.do.set_deleted(true);
      }
    },
    update(state: leafI, id: string, updates: Partial<RawProduct>) {
      const child = state.child(id);
      if (child){
        child.value = {...child.value, ...updates};

        child.do.validate();

        if (!child.$.isValid()) {
          console.error('---- errors:', child.value.errors);
          throw new Error('cannot update  - invalid data')
        }
      }
    },
    load(state: leafI) {
      data.forEach((record: RawProduct) => {
        if (!record?.id) {
          console.error('record has no id', record);
          return;
        }
        if (!state.child(record.id)) {
          // child.do.validate();
          try {
            state.addChild({
              $value: {
                ...record,
                validated: false,
                deleted: false,
                images: null,
                errors: [],
              },
              actions: productActions,
              selectors: productSelectors,
            }, record.id);
          } catch (err) {
            console.error('error adding child', data, record.id);
          }
        }
      });
    },
  },
  selectors: {

    productValueFromSku(state: leafI, sku: string) {
      let skuString = `${sku}`;
      return state.children.reduce((memo, { child }) => {
        if(memo) return memo;
        if (`${child.value.sku}` === skuString) {
          return child.value;
        }
        return memo;
      }, null)
    },
    paginate(state: leafI, fromNum: number, count = 10) {
      try {
        const products = sortBy(Array.from(state.value.values()), ['id'])
          .filter((product) =>!product.deleted);

        return products.slice(fromNum, fromNum + count);
      } catch (err) {
        console.error('pagination error:', err);
        return [];
      }
    },
    product(state: leafI, id: string) {
      const product = state.child(`${id}`);
      if (!product) {
        console.error('cannot find ', id, 'in', state.children);
      }
      return product || {
        error: 'not found',
        value: {
          id,
          sku: '?',
          name: '(not found)',
          type: '?',
          description: '?',
          color: '?',
          price: 0,
        }
      }
    }
  }
})

export default productManager
