import React,{useState,useEffect} from 'react'
import ProductCard from '../components/ProductCard'

const Home = () => {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        getProduct()
    },[])

    const getProduct = async () => {
        try{
            const response = await fetch('http://localhost:3000/products')
            const data = await response.json()
            setProductList(data)
            console.log(data)
        }catch(e){
            console.log(e)
        }
    }
  return (
    <div>
      <h2>Home Page</h2>
        <div>
        {productList.length !== 0 &&
        productList.map((product) => <ProductCard product={product} />)}
        </div>
    </div>
  )
}

export default Home
