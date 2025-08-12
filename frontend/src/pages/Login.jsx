import React, { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const Login = () => {
  
  const [currentState , setCurrentState] = useState('Đăng nhập');
  const {token, setToken , navigate , backendUrl , setUser} = useContext(ShopContext)
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');


  const onSubmitHandler = async (event) =>{
    event.preventDefault(); 
    try {
      if(currentState === 'Đăng ký'){

        const response = await axios.post(backendUrl + '/api/user/register' , {name,email,password});
         if (response.data.success){
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setCurrentState('Đăng nhập');
        setName('');
        setPassword('');
        
    } else {
      toast.error(response.data.message);
    }
      }
      else {

        const response  = await axios.post(backendUrl + '/api/user/login' , {email,password});
        if(response.data.success){
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem('token' , response.data.token);
          localStorage.setItem('user' , JSON.stringify(response.data.user));
        } else {
          toast.error(response.data.message);
        }
        

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(() =>{
    if(token){
      navigate('/');
    }
  },[token])


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 mb-14 gap-4 text-gray-800 bg-white rounded-lg shadow-lg p-6'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='parata-regular text-3xl'>{currentState}</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div> 
      {currentState === 'Đăng nhập' ? '' : <input onChange={(e) =>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Tên' required />}
      <input onChange={(e) =>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) =>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Mật khẩu' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer hover:text-[#E95221]'>Quên mật khẩu?</p>
        {
          currentState === 'Đăng nhập' 
          ? <p onClick={() => setCurrentState('Đăng ký')} className='cursor-pointer hover:text-[#E95221]'>Tạo tài khoản</p>
          : <p  onClick={() => setCurrentState('Đăng nhập')} className='cursor-pointer hover:text-[#E95221]'>Đăng nhập tại đây</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Đăng nhập' ? 'Đăng nhập' : 'Đăng ký'}</button>
    </form>
  )
}

export default Login