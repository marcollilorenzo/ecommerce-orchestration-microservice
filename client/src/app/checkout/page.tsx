
'use client'
import CartListSection from "@/components/section/CartListSection";
import CartRecap from "@/components/section/CartRecap";

export default function Checkout() {


  return (
    <div className="min-h-screen h-full">
      <div className='h-[15vh] bg-green-200 rounded-lg relative flex justify-center items-center'>
        <h2 className='text-center'>Checkout</h2>
    </div>
    <section className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 col-span-3">
            <CartListSection />
        </div>
        <div className="md:col-span-1 h-min col-span-3 m-4 border p-4 sticky top-4 rounded-lg text-center">
            <CartRecap />
        </div>
       
    </section>
    </div>
  )
}
