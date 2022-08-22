import { React, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import convertRupiah from 'rupiah-format'

import { Navbar } from '../components'
import { CartContext } from '../context/cartContext'
import { API } from '../config/api';

const topingPrice = [0, 0, 0, 0, 0, 0, 0, 0]
function DetailProduct() {

  const { id } = useParams()

  let { data: product } = useQuery('productCache', async () => {
    const response = await API.get(`/product/${id}`);
    return response.data.data
  });

  let { data: toppings } = useQuery('toppingsCache', async () => {
    const response = await API.get('/toppings');
    return response.data.data
  });

  let [cart, setCart] = useContext(CartContext)
  let [price, setPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  let [totalPrice, setTotalPrice] = useState(product?.price)

  const total = (array) => {
    let sum = 0;

    array.forEach(item => {
      sum += item;
    });

    sum += product.price
    return sum;
  }

  const handleOnChange = (e) => {

    if (e.target.checked) {
      setPrice(price.splice(e.target.id - 1, 1, Number(e.target.value)))
    } else {
      setPrice(price.splice(e.target.id - 1, 1, 0))
    }

    setPrice(topingPrice)
    setTotalPrice(total(price))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCart(cart++)
  }


  return (
    <div>
      <Navbar />
      <div className='container d-flex justify-content-center'>
        <div className='row' style={{ marginTop: 90, width: '90%' }}>
          <img className='col-5' src={product?.image} alt={product?.title} />
          <div className='col-7 text-red'>
            <h1 >{product?.title}</h1>
            <p>{convertRupiah.convert(product?.price)}</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <h5>Toping</h5>
                <div className='row'>
                  {toppings?.map((item) => {
                    return (
                      <label className='toping-checkbox col-3 d-flex flex-column align-items-center text-center mt-4 mb-2' key={item?.id}>
                        <input type="checkbox" name={item?.title} id={item?.id} onChange={handleOnChange} value={item?.price} />
                        <img className='mb-2' src={item?.image} alt={item?.title} width={75} />
                        <p>{item?.title}
                        </p>
                        <span className='checkmark'></span>
                      </label>
                    )
                  })}
                </div>
              </div>
              <div className='d-flex justify-content-between'>
                <h5>Total</h5>
                <h5>{convertRupiah.convert(totalPrice)}</h5>
              </div>
              <div className='d-grid gap-2'>
                <button className='btn btn-red d-grid gap-2'>Add Cart</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div>
  )
}

export default DetailProduct