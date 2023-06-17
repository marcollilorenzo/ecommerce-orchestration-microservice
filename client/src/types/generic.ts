export type Product = {
    id: number
    name: string
    price: number
    description: string
    imageUrl: string
    quantity?: number
}

export type Checkout = {
        basket: {
            id: string
            quantity: number
        }[]
        shippingAddress: {
            address: string
            city: string
            postCode: string
        }
        paymentDetails: {
            cardNumber: string
            cardholderName: string
            expiry: string
            ccv: string
        }
    }

export type OrderStatus = 'pending' | 'completed' | 'cancelled'