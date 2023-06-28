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

    const [shippingAddress, setShippingAddress] = React.useState({
        address: 'Via Roma 1',
        city: 'italia',
        postCode: '21020',
    })
    const [paymentDetails, setPaymentDetails] = React.useState({
        cardNumber: '424242424242',
        expiry: '26/07',
        ccv: 123,
        cardholderName: 'Mario Rossi',
    })

    React.useEffect(() => {
        setTotal(getCartTotal())
        setQuantity(getCartItemCount())
    }, [])


    const placeOrder = async () => {

        try {

    

        setLoading(true)

        const order: Checkout = {
            basket: getCartItems().map((item: Product) => ({
                id: item.productId,
                quantity: item.quantity,
            })),
            shippingAddress: shippingAddress,
            paymentDetails: paymentDetails
        }
        
        console.log(order)


        console.log('place order')

        try {

        const res = await fetch('https://gogmb2rqs6.execute-api.eu-central-1.amazonaws.com/default/PurchaseProduct',
            { method: "POST", body: JSON.stringify(order) })

        const data: any = await res.json()

        console.log(data)

        setTimeout(() => {
            setLoading(false)
            // redirect to order page
            router.push(`/order?callbackUrl=${encodeURIComponent(data.callbackUrl + '?orderId=' + data.orderId)}`)
        }, 2000)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
    } catch (error) {
        
        console.log(error)
    }
    }

    return (
        <div>
            <h2>Recap</h2>
            <section className='my-4 bg-slate-200 p-4 rounded-md'>
                <p>Subtotal: {total} €</p>
                <p>Quantity: {quantity}</p>
            </section>

            <h2>Payment detail</h2>
            <section className='my-4 bg-slate-200 p-4 rounded-md'>
               <input
                defaultValue={paymentDetails.ccv}
               onChange={(e) => setPaymentDetails({...paymentDetails, ccv: parseInt(e.target.value)})}
               type="number" placeholder="CCV" className="w-full p-2 border border-gray-300 rounded mb-4" />
            </section>

            <h2>Shipping address</h2>
            <section className='my-4 bg-slate-200 p-4 rounded-md'>
                <select
                defaultValue={shippingAddress.city}
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded mb-4">
                    <option value="italia">Italia</option>
                    <option value="parigi">Parigi</option>
                    <option value="spagna">Spagna</option>
                    <option value="germania">Germania</option>
                </select>
            </section>


            <button
                onClick={() => placeOrder()}
                disabled={loading || quantity === 0}
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