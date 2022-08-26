import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query';
import convertRupiah from 'rupiah-format'

import { Navbar } from '../components'
import { API } from '../config/api';

function DetailProduct() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [toppingPrices, setToppingPrices] = useState([])
  const [toppings, setToppings] = useState([]);
  const [toppingId, setToppingId] = useState([]);

  let { data: product } = useQuery('productCache', async () => {
    const response = await API.get(`/product/${id}`);
    return response.data.data
  });

  const getToppings = async () => {
    try {
      const response = await API.get('/toppings');
      setToppings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const id = e.target.id;
    const checked = e.target.checked;
    const price = e.target.value;

    if (checked) {
      setToppingId([...toppingId, parseInt(id)]);
      setToppingPrices([...toppingPrices, { id: parseInt(id), price: parseInt(price) }])

    } else {

      let newToppingId = toppingId.filter((toppingIdItem) => {
        return toppingIdItem != id;
      });

      let newToppingPrice = toppingPrices.filter((toppingPriceItem) => {
        return toppingPriceItem.id != id;
      });

      setToppingId(newToppingId);
      setToppingPrices(newToppingPrice)
    }
  };

  const totalPrice = (array) => {
    let sum = 0;

    array.forEach(item => {
      let price = parseInt(item.price)
      sum += price;
    });

    sum += product?.price
    return sum;
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const cartData = {
        subtotal: totalPrice(toppingPrices),
        product_id: product?.id,
        topping_id: toppingId
      }

      const body = JSON.stringify(cartData);
      await API.post('/cart', body, config);

      navigate("/cart")
    } catch (error) {
      console.log(error);
    }

  })

  useEffect(() => {
    getToppings();
  }, [])


  return (
    <div>
      <Navbar />
      <div className='container d-flex justify-content-center'>
        <div className='row' style={{ marginTop: 90, width: '90%' }}>
          <img className='col-5' src={product?.image} alt={product?.title} />
          <div className='col-7 text-red'>
            <h1 >{product?.title}</h1>
            <p>{convertRupiah.convert(product?.price)}</p>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
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
                <h5>{convertRupiah.convert(totalPrice(toppingPrices))}</h5>
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