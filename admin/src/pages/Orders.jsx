import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {backendUrl, currency} from '../App'
import {toast} from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({token}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if(!token){
        return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list',{},{headers:{token}});
      if(response.data.success){
        setOrders(response.data.orders.reverse())
      }
      else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async ( event , orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId , status: event.target.value} , {headers:{token}});
      if(response.data.success){
        await fetchAllOrders();
      }
    
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  }

  useEffect(() =>{
    fetchAllOrders()
  },[token])


  return (
    <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Những đơn đặt hàng</h3>
        <div>
          {
            orders.map((order,index)=>(
              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm rounded-md text-gray-700 hover:bg-gray-100 transition ease-in-out' key={index}>
                <img className='w-18 border border-gray-500' src={assets.parcel_icon} alt="" />
                <div className='flex flex-col gap-2'>
                  <div>
                    {order.items.map((item,index)=>{
                      if(index === order.items.length -1){
                        return <p className='py-1' key={index}> {item.name} x {item.quantity} <span>size {item.size}</span> </p>
                      }
                      else {
                        return <p className='py-1' key={index}> {item.name} x {item.quantity} <span>size {item.size}</span> , </p>
                      }
                    })}
                  </div>
                  <p className='mt-3 mb-2 font-medium'><strong className='mr-2'>Tên người mua: </strong>{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p><strong className='mr-2'>Địa chỉ: </strong>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  </div>
                  <p><strong className='mr-2'>Số điện thoại: </strong>{order.address.phone}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm sm:text-[15px]'><strong className='mr-2'>Sản phẩm : </strong>{order.items.length}</p>
                  <p className='mt-3'><strong className='mr-2'>Phương thức thanh toán : </strong>{order.paymentMethod} </p>
                  <p><strong className='mr-2'>Thanh toán : </strong>
                    <span className={`px-2 py-1 rounded text-sm ${order.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </p>
                  <p><strong className='mr-2'>Ngày mua : </strong>{new Date(order.createdAt).toLocaleDateString('vi-VN')} </p>
                </div>
                <p className='text-sm sm:text-[15px] '><strong className='mr-2'>Tổng tiền : </strong><span className='bg-orange-100 text-orange-800'>{order.amount.toLocaleString('vi-VN')}{currency}</span></p>
                <select onChange = {(event) => statusHandler(event , order._id)} value={order.status} className='p-2 font-semibold cursor-pointer'>
                    <option value="Đã đặt hàng">Đã đặt hàng</option>
                    <option value="Đang đóng gói">Đang đóng gói</option>
                    <option value="Đang giao hàng">Đang giao hàng</option>
                    <option value="Đã giao hàng">Đã giao hàng</option>
                </select>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Orders