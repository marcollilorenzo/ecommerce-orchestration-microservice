export const addToCart = (
    productId: number,
    name: string,
    price: number,
    imageUrl: string,
) => {

    // if quantity product is minus 


    // get the current cart from local storage
    const cart = localStorage.getItem('cart')
    // if cart is empty
    if (!cart) {
        // create a new cart with the product
        const newCart = [
            {
                productId,
                name,
                price,
                imageUrl,
                quantity: 1,
            },
        ]
        // save the new cart to local storage
        localStorage.setItem('cart', JSON.stringify(newCart))
    } else {
        // if cart is not empty
        // parse the cart to an array
        const cartArray = JSON.parse(cart)
        // check if the product is already in the cart
        const existingProductIndex = cartArray.findIndex(
            (product: { productId: number }) => product.productId === productId
        )
        // if product is already in the cart
        if (existingProductIndex !== -1) {
            // increment the quantity of the product
            cartArray[existingProductIndex].quantity++
        } else {
            // if product is not in the cart
            // add the product to the cart
            cartArray.push({
                productId,
                name,
                price,
                imageUrl,
                quantity: 1,
            })
        }
        // save the updated cart to local storage
        localStorage.setItem('cart', JSON.stringify(cartArray))
    }
}

// remove product from cart using local storage
export const removeFromCart = (id: number) => {
    // get the current cart from local storage
    const cart = localStorage.getItem('cart')
    // if cart is not empty
    if (cart) {
        // parse the cart to an array
        const cartArray = JSON.parse(cart)
        // check if the product is in the cart
        const existingProductIndex = cartArray.findIndex(
            (product: { id: number }) => product.id === id
        )
        // if product is in the cart
        if (existingProductIndex !== -1) {
            // remove the product from the cart
            cartArray.splice(existingProductIndex, 1)
            // save the updated cart to local storage
            localStorage.setItem('cart', JSON.stringify(cartArray))
        }
    }
}

// update product quantity in cart using local storage
export const updateCartQuantity = (id: number, quantity: number) => {
    // get the current cart from local storage
    const cart = localStorage.getItem('cart')
    // if cart is not empty
    if (cart) {
        // parse the cart to an array
        const cartArray = JSON.parse(cart)
        // check if the product is in the cart
        const existingProductIndex = cartArray.findIndex(
            (product: { id: number }) => product.id === id
        )
        // if product is in the cart
        if (existingProductIndex !== -1) {
            // update the product quantity
            cartArray[existingProductIndex].quantity = quantity
            // save the updated cart to local storage
            localStorage.setItem('cart', JSON.stringify(cartArray))
        }
    }
}

// get cart items from local storage
export const getCartItems = () => {
    // get the current cart from local storage
    const cart = localStorage.getItem('cart')
    // if cart is not empty
    if (cart) {
        // parse the cart to an array
        const cartArray = JSON.parse(cart)
        // return the cart array
        return cartArray
    }
    // if cart is empty
    return []
}

// get cart total from local storage
export const getCartTotal = () => {
    // get the current cart from local storage
    const cart = localStorage.getItem('cart')
    // if cart is not empty
    if (cart) {
        // parse the cart to an array
        const cartArray = JSON.parse(cart)
        // calculate the total price
        const total = cartArray.reduce(
            (acc: number, product: { price: number; quantity: number }) =>
                acc + product.price * product.quantity,
            0
        )
        // return the total price
        return total
    }
    // if cart is empty
    return 0
}

// clear cart from local storage
export const clearCart = () => {
    // remove the cart from local storage
    localStorage.removeItem('cart')
}

// get cart item count from local storage
export const getCartItemCount = () => {
    // get the current cart from local storage
    const cart = localStorage.getItem('cart')
    // if cart is not empty
    if (cart) {
        // parse the cart to an array
        const cartArray = JSON.parse(cart)
        // calculate the total quantity
        const total = cartArray.reduce(
            (acc: number, product: { quantity: number }) =>
                acc + product.quantity,
            0
        )
        // return the total quantity
        return total
    }
    // if cart is empty
    return 0
}

// get cart item quantity from local storage
export const getCartItemQuantity = (id: number) => {
    // get the current cart from local storage
    const cart = localStorage.getItem('cart')
    // if cart is not empty
    if (cart) {
        // parse the cart to an array
        const cartArray = JSON.parse(cart)
        // check if the product is in the cart
        const existingProductIndex = cartArray.findIndex(
            (product: { id: number }) => product.id === id
        )
        // if product is in the cart
        if (existingProductIndex !== -1) {
            // return the product quantity
            return cartArray[existingProductIndex].quantity
        }
    }
    // if cart is empty
    return 0
}

// get cart item from local storage
export const getCartItem = (id: number) => {
    // get the current cart from local storage
    const cart = localStorage.getItem('cart')
    // if cart is not empty
    if (cart) {
        // parse the cart to an array
        const cartArray = JSON.parse(cart)
        // check if the product is in the cart
        const existingProductIndex = cartArray.findIndex(
            (product: { id: number }) => product.id === id
        )
        // if product is in the cart
        if (existingProductIndex !== -1) {
            // return the product
            return cartArray[existingProductIndex]
        }
    }
    // if cart is empty
    return null
}