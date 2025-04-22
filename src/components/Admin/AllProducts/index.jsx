import React from 'react'
import ProductList from './ProductList'

const AllProducts = () => {
    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <div>
                    <h2 className='text-xl font-bold text-primary'>All Products</h2>
                </div>
                <div>
                    <button className='flex gap-1 bg-primary text-white w-40 h-9 justify-center items-center rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <p className='text-sm font-semibold'>Add Products</p>
                    </button>
                </div>
            </div>
            <div className='py-4'>
                <ProductList />
            </div>
        </div>
    )
}

export default AllProducts