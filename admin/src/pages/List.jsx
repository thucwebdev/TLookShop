import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const repsonse = await axios.get(backendUrl + "/api/product/list");
      if (repsonse.data.success) {
        setList(repsonse.data.products);
      } else {
        toast.error(repsonse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">Danh sách tất cả sản phẩm</p>
      <div className="flex flex-col gap-2">
        {/* List Table Tiltle */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border border-gray-300 py-1 px-2 bg-gray-100 text-sm">
          <b>Hình ảnh</b>
          <b>Tên</b>
          <b>Hãng</b>
          <b>Giá</b>
          <b className="text-center">Thao tác</b>
        </div>
        {/* Product List */}

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border border-gray-300 text-sm gap-2 py-1 px-2"
            key={index}
          >
            <img className="w-20" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {item.price.toLocaleString('vi-VN')}
              {currency}
            </p>
            <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg flex justify-center ">
              <img className="w-6" src={assets.delete_icon} alt="" />
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
