

export type RawProduct = {
  id: string,
  sku: string,
  name: string,
  type: string,
  description: string,
  color: string,
  price : number,
}


export const isPromise = (input: any): input is Promise<any> => {
  return input && (typeof input.then === 'function')
    && (typeof input.catch === 'function')
    && (typeof input.finally === 'function')
}
