import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer border border-gray-200 rounded-[8px] p-2 hover:text-[#288ad6] hover:shadow-lg transition-all ease-in-out' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='hover:scale-105 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='pt-3 pb=1 text-sm'>{name}</p>
        <p className='text-sm font-medium text-[#dd2f2c]'>{price.toLocaleString('vi-VN')}{currency}</p>
    </Link>
  )
}

export default ProductItem