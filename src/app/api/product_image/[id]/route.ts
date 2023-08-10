import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import products from '~/data/product-fixtures.json';

import {image_search} from '~/lib/duckduckgo-images-api-master/src/api';

export async function GET(req, { params }) {

  if (!params?.id) {
    return NextResponse.json({ apiError: 'no id parameter' })
  }

  const { id } = params;
  const idStr = `${id}`;
  try {
    let product = products.find((p) => `${p.id}` === idStr);
    if (!product) {
      return NextResponse.json({ error: 'cannot find product', id });
    }
    const { name } = product;
    const result = await image_search({ query: `${name}`, iterations: 1, retries: 2 });
    return NextResponse.json(result.slice(0, 4));
  } catch (err) {
    console.error('error querying for ', id, name, err);
  }

  return NextResponse.json({ error: 'irregular response' })
}
