
'use client'
import { Product } from '@/types/generic'
import { getCartItems } from '@/utils/cart'
import React from 'react'
import ProductCardCart from '../card/ProductCardCart'


function CartListSection() {

    const products:Product[]  = getCartItems()

  return (
    <div 
    className='grid grid-cols-1 gap-4 mx-4 overflow-y-scroll'
    >
      {/* delete all cart */}
       

        {
            products.length === 0 ? <div className='text-center'>No items in cart</div> :
            products.map((product) => (
                <ProductCardCart 
               
                key={product.productId}
                {...product}
                />
            ))
        }
       
    </div>
  )
}

export default CartListSection