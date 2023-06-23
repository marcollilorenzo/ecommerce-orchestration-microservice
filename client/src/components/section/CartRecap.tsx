'use client'

import { Checkout, Product } from '@/types/generic'
import { getCartItemCount, getCartItems, getCartTotal } from '@/utils/cart'
import React from 'react'
import { useRouter } from 'next/navigation'

type Props = {}

function CartRecap({ }: Props) {

    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [quantity, setQuantity] = React.useState(0)

    React.useEffect(() => {

        setTotal(getCartTotal())
        setQuantity(getCartItemCount())
    }, [])


    const placeOrder = async () => {



        setLoading(true)

        const order: Checkout = {
            basket: getCartItems().map((item: Product) => ({
                id: item.productId,
                quantity: item.quantity,
            })),
            shippingAddress: {
                address: 'test',
                city: 'test',
                postCode: 'test',
            },
            paymentDetails: {
                cardNumber: 'test',
                expiry: 'test',
                ccv: 'test',
                cardholderName: 'test',
            }
        }
        
        console.log(order)

        console.log('place order')

        const res = await fetch('https://gogmb2rqs6.execute-api.eu-central-1.amazonaws.com/default/PurchaseProduct',
            { method: "POST", body: JSON.stringify(order) })

        const data: any = await res.json()

        console.log(data)

        setTimeout(() => {
            setLoading(false)
            // redirect to order page
            router.push(`/order?callbackUrl=${encodeURIComponent(data.callbackUrl + '?orderId=' + data.orderId)}`)
        }, 2000)
    }

    return (
        <div>
            <h2>Recap</h2>
            <section className='my-4 bg-slate-200 p-4 rounded-md'>
                <p>Subtotal: {total}</p>
                <p>Quantity: {quantity}</p>
            </section>
            <button
                onClick={() => placeOrder()}
                disabled={loading}
                className=

                'disabled:opacity-50 disabled:animate-pulse bg-blue-500 w-full relative hover:bg-blue-700 text-white font-bold py-4 px-8 '>
                {
                    loading ? (
                        <>Loading...</>
                    ) : (
                        <>Buy</>
                    )

                }
            </button>

        </div>
    )
}



export default CartRecap