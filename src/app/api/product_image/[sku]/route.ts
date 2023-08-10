import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import products from '~/data/product-fixtures.json';

import {image_search} from '~/lib/duckduckgo-images-api-master/src/api';

export async function GET(req, { params }) {

  if (!params?.sku) {
    return NextResponse.json({ apiError: 'no sku parameter' })
  }

  const { sku } = params;
  const skuStr = `${sku}`;
  try {
    let product = products.find((p) => `${p.sku}` === skuStr);
    if (!product) {
      return NextResponse.json({ error: 'cannot find product', sku });
    }
    const { name } = product;
    const result = await image_search({ query: `Paige Denim ${name}`, iterations: 1, retries: 2 });
    return NextResponse.json(result.slice(0, 4));
  } catch (err) {
    console.error('error querying for ', sku, err);
  }

  return NextResponse.json({ error: 'irregular response' })
}
