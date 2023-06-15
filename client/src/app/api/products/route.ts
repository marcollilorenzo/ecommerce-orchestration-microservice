import { Product } from '@/types/generic'
import { NextResponse } from 'next/server'
 
export async function GET() {
 
    const data: Product[] = [
        { id: 1, name: 'Product 1', price: 100, description: 'This is product 1', imageUrl: 'https://source.unsplash.com/random/?ecommerce,product' },
        { id: 2, name: 'Product 2', price: 200, description: 'This is product 2', imageUrl: 'https://source.unsplash.com/random/?ecommerce,product' },
        { id: 3, name: 'Product 3', price: 300, description: 'This is product 3', imageUrl: 'https://source.unsplash.com/random/?ecommerce,product' },
        { id: 4, name: 'Product 4', price: 400, description: 'This is product 4', imageUrl: 'https://source.unsplash.com/random/?ecommerce,product' },
        { id: 5, name: 'Product 5', price: 500, description: 'This is product 5', imageUrl: 'https://source.unsplash.com/random/?ecommerce,product' },
    ]
 
  return NextResponse.json(data)
}