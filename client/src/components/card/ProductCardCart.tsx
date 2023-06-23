

import { Product } from '@/types/generic'
import React from 'react'


function ProductCardCart({name, productId, price, description, quantity, imageUrl}: Product) {
  return (
    <div className='rounded-md shadow-md w-full h-full p-4 flex'>
        <div 
        className='rounded-md  h-32 w-32 bg-gray-200 mr-4'
        style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
        }}
        >
            
        </div>
        <div>
        <h4>{name}</h4>
        <p>{description}</p>
        <p>Price: {price}</p>
        <p>Quantity: {quantity}</p>
        </div>
    </div>
  )
}

export default ProductCardCart