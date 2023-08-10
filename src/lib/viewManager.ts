import { Forest } from '@wonderlandlabs/forest'
import { leafI } from '@wonderlandlabs/forest/lib/types'
import { sortBy } from 'lodash'
import productManager from '~/lib/productManager'

export const colors = ['black', 'white', 'brown', 'green', 'blue', 'pink']

const viewManager = new Forest({
  $value: {
    color: 'all',
    pageStart: 0,
    pageCount: 10
  },
  actions: {
    next(state: leafI) {
      const { pageStart, pageCount } = state.value;
      const nextPageStart = pageStart + pageCount;
      state.do.set_pageStart(nextPageStart);
    },
    chooseColor(state: leafI, color: string) {
      state.value = {...state.value, color, pageStart: 0}
    },
    back(state: leafI) {
      const { pageStart, pageCount } = state.value;
      state.do.set_pageStart(Math.max(0, pageStart - pageCount));
    }
  },
  selectors: {
    label(state: leafI) {
      let total = state.$.population().length;
      const { color, pageStart, pageCount } = state.value;
      const end = Math.min(pageStart + pageCount, total)
      let count = total > 0 ? `Products ${pageStart + 1} ... ${end} of ${total}` : 'No products found'
      let filter = color !== 'all' ? `with color ${color}` : ''
      return `${count} ${filter}`;
    },
    currentSet(state: leafI) {
      const { pageStart, pageCount } = state.value;
      try {
        let products = state.$.population();
        return products.slice(pageStart, pageStart + pageCount);
      } catch (err) {
        console.error('pagination error:', err);
        return [];
      }
    },
    atStart(state: leafI) {
      const { pageStart, pageCount } = state.value;
      let total = state.$.population().length;
      return pageStart === 0;
    },
    atEnd(state: leafI) {
      const { pageStart, pageCount } = state.value;
      let total = state.$.population().length;
      let last = pageStart + pageCount;
      return total <= last;
    },
    /** products, filtered by color choice, ignoring pagination */
    population(state: leafI) {
      const { color } = state.value;
      try {
        let products = sortBy(Array.from(productManager.value.values()), ['id'])
          .filter((product) => !product.deleted);
        if (color !== 'all') {
          let colorChoice = products.filter((p) => p.color === color);
          return colorChoice;
        }
        return products;
      } catch (err) {
        console.error('pagination error:', err);
        return [];
      }
    }
  }
});

export default viewManager
