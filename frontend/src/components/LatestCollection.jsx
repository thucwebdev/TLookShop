import React , {useState, useContext, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(()=>{
    setLatestProducts (products.slice(-10));
  },[products]);


  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'Bộ sưu tập '} text2={'Mới nhất '} />
        </div>


        {/* {Rendering Products} */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            latestProducts.map((item,index)=>(
              <ProductItem key = {index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>

    </div>
  )
}

export default LatestCollection