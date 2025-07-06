import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-4 py-5 mt-20 text-sm border-t'>
            <div >
                <a href="/"><img src={assets.logo} className='mb-5 w-32 ' alt="" /></a>
                <p className='w-full md:w-2/3 text-gray-600'>
                    TLOOK cam kết mang đến cho khách hàng những sản phẩm chính hãng, đa dạng, phù hợp với thể trạng người Việt, đồng thời tư vấn đúng – trúng – tận tâm nhằm giúp người chơi chọn được vợt phù hợp với phong cách và trình độ của mình.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>CÔNG TY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className='cursor-pointer hover:text-black'>Giới thiệu về chúng tôi</li>
                    <li className='cursor-pointer hover:text-black'>Liên hệ với chúng tôi</li>
                    <li className='cursor-pointer hover:text-black'>Vận chuyển</li>
                    <li className='cursor-pointer hover:text-black'>Chính sách bảo mật</li>
                </ul>
            </div>

            <div className=''>
                <p className='text-xl font-medium mb-5'>LIÊN HỆ</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className='cursor-pointer hover:text-black'>0394996777</li>
                    <li className='cursor-pointer hover:text-black'>xuanthuc123412@gmail.com</li>
                </ul>
            </div>

        </div>

    </div>
  )
}

export default Footer