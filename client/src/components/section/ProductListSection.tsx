
'use client';
import { Product } from '@/types/generic';
import React, { useEffect, useState } from 'react'
import ProductCard from '../card/ProductCard';


function ProductListSection() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch('https://2jkazays2f.execute-api.eu-central-1.amazonaws.com/default/GetAllProducts', { cache: 'reload' })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    return
                }
                setProducts(data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }, [])


    return (
        <div className='pb-8'>
            <h2 className='mb-4'>Product List</h2>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        loading ? <div className='text-left'>Loading...</div> : null
                    }
                    {products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            {...product}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ProductListSection