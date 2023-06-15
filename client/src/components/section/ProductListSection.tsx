
'use client';
import { Product } from '@/types/generic';
import React, { useEffect, useState } from 'react'
import ProductCard from '../card/ProductCard';


function ProductListSection() {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setProducts(data)
        })
    }, [])


  return (
    <div className='pb-8'>
        <h2 className='mb-4'>Product List</h2>
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard 
                    key={product.id}
                    {...product}
                    />
                ))}
            </div>
        </section>
    </div>
  )
}

export default ProductListSection