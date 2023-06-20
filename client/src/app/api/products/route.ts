import { Product } from '@/types/generic'
import { NextResponse } from 'next/server'
 
export async function GET() {
 
    const data: Product[] = [
        { id: 1, name: 'Product 1', price: 100, description: 'This is product 1', imageUrl: 'https://source.unsplash.com/random/?ecommerce,product' },
        { id: 2, name: 'Product 2', price: 200, description: 'This is product 2', imageUrl: 'https://source.unsplash.com/random/?ecommerce,product' },
       
    ]
 
  return NextResponse.json(data)
}