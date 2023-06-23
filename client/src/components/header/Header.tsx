'use client'

import React, {useState} from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import CartListSection from '../section/CartListSection'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Header() {

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


  return (
    <>
    <div className='grid grid-cols-3 place-items-center'>
        <div></div>
        <h1 className='my-8'>
            <Link  href={"/"} className='text-center py-8'>Ecommerce</Link>
        </h1>
        <div className='flex justify-end  w-full mr-4'>
            <Link href={"/checkout"} className='bg-blue-500 relative hover:bg-blue-700 text-white font-bold py-2 px-8 rounded'>
                Basket 
            </Link>
           

        </div>
    </div>

    <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                size={
                    '90%'


                }
                
            >
                <div className='flex flex-col relative h-full pb-16'>
                    <h2 className='text-center py-8'>Cart List</h2>
                    <div className='flex justify-end'>

        <button
        className='bg-red-500 mx-4 mb-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => {
            // if localost and windows
            if(localStorage && window) {
            localStorage.removeItem('cart')
            window.location.reload()
            }
        }}
        >
            Delete all items
        </button>
        </div>
                    <CartListSection />  
                    <div className='fixed bottom-0 w-full  '>
                        <button onClick={
                            // navigate to checkout page
                            () => {
                                toggleDrawer()
                                router.push('/checkout')
                            }
                        } className='bg-blue-500 w-full relative hover:bg-blue-700 text-white font-bold py-4 px-8 '>
                            Buy
                        </button>
                        </div> 
                </div>
            </Drawer>

    </>
  )
}

export default Header