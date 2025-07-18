import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import {toast} from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name , setName] = useState("");
  const [description , setDescription] = useState("");
  const [price , setPrice] = useState("");
  const [category , setCategory] = useState("Yonex");
  const [subCategory , setSubCategory] = useState("Attack");
  const [bestseller , setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestseller",bestseller);
      formData.append("sizes",JSON.stringify(sizes));

      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}});
      
      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div>
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
              <p className='mb-2 font-bold text-gray-700'>Tải lên hình ảnh</p>

              <div className='flex gap-2'>
                <label htmlFor="image1">
                  <img className='w-20 cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                  <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                </label>
                <label htmlFor="image2">
                  <img className='w-20 cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                  <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                </label>
                <label htmlFor="image3">
                  <img className='w-20 cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                  <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                </label>
                <label htmlFor="image4">
                  <img className='w-20 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                  <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                </label>
              </div>
            </div>

            <div className='w-full'>
              <p className='mb-2 font-bold text-gray-700'>Tên sản phẩm</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Nhập tên sản phẩm' required />
            </div>

            <div className='w-full'>
              <p className='mb-2 font-bold text-gray-700'>Mô tả sản phẩm</p>
              <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Nhập nội dung mô tả sản phẩm' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

                <div>
                  <p className='mb-2 font-bold text-gray-700'>Thương hiệu</p>
                  <select onChange={(e) => setCategory(e.target.value)}  className='w-full px-3 py-2 '>
                      <option value="Yonex">Yonex</option>
                      <option value="Victor">Victor</option>
                      <option value="Lining">Lining</option>
                  </select>
                </div>

                 <div>
                  <p className='mb-2 font-bold text-gray-700'>Phong cách chơi</p>
                  <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2 '>
                      <option value="Attack">Tấn công</option>
                      <option value="Defense">Phòng thủ , phản tạt</option>
                      <option value="Balance">Công thủ toàn diện</option>
                  </select>
                </div>

                <div>
                  <p className='mb-2 font-bold text-gray-700'>Giá sản phẩm</p>
                  <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='...đ' />
                </div>

            </div>

            <div>
              <p className='mb-2 text-gray-700 font-bold'>Trọng lượng sản phẩm</p>
              <div className='flex gap-3'>
                <div onClick={() => setSizes(prev =>prev.includes("3U") ? prev.filter(item => item !== "3U") : [...prev, "3U"])}>
                  <p className={`${sizes.includes("3U") ? "bg-orange-200" : "bg-slate-200"} px-3 py-1 rounded cursor-pointer`}>3U</p>
                </div>

                <div onClick={() => setSizes(prev =>prev.includes("4U") ? prev.filter(item => item !== "4U") : [...prev, "4U"])}>
                  <p className={`${sizes.includes("4U") ? "bg-orange-200" : "bg-slate-200"} px-3 py-1 rounded cursor-pointer`}>4U</p>
                </div>

                <div onClick={() => setSizes(prev =>prev.includes("5U") ? prev.filter(item => item !== "5U") : [...prev, "5U"])}>
                  <p className={`${sizes.includes("5U") ? "bg-orange-200" : "bg-slate-200"} px-3 py-1 rounded cursor-pointer`}>5U</p>
                </div>
              </div>
            </div>

            <div className='flex gap-2 mt-2'>
              <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
              <label className='cursor-pointer' htmlFor="bestseller">Thêm vào danh sách bán chạy nhất</label>
            </div>

            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer rounded-lg hover:bg-gray-600 transition ease-in-out'>Thêm</button>

        </form>
    </div>
  )
}

export default Add