import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import convertRupiah from 'rupiah-format'

import bin from './../assets/img/bin.png'

import { API } from '../config/api';
import { Navbar } from '../components'
import { CartContext } from '../context/cartContext'

function Cart() {

  const [_, setCart] = useContext(CartContext)

  const navigate = useNavigate()

  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data
  });

  const handleModal = () => {
    const modalClose = document.getElementById('modalClose')
    setCart(0)
    modalClose.click()
    navigate('/profile')
  }

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />
      <div className='text-red' style={{ marginTop: 90, width: '90%' }}>

        <div onClick={handleModal} class="modal fade" id="thanksModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div data-bs-dismiss="modal" id='modalClose'></div>
          <div onClick={handleModal} class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content thanks-message">

              <div class="modal-body">
                <p>Thank you for ordering in us, please wait to verify your order</p>
              </div>

            </div>
          </div>
        </div>



        <h3 >My Cart</h3>
        <div className='row justify-content-between'>
          <p>Review Your Order</p>
          <div className='col-7 '>
            {transactions?.map((item) => {
              return (

                <div className='cart row pt-3 mb-4'>

                  {item?.cart?.map((cart) => {
                    return (

                      <div className='d-flex justify-content-between mb-3' key={cart?.product?.id}>
                        <div className='cart-image col-2' style={{ backgroundImage: `url(http://localhost:5000/uploads/${cart?.product?.image})` }}>
                        </div>
                        <div className='col-8 d-flex flex-column justify-content-evenly align-items-start'>
                          <p className='m-0'>{cart?.product?.title}</p>
                          <p className='m-0'>Toping:
                            {cart?.toppings?.map((topping) => {
                              return `${topping?.title}, `
                            })}
                          </p>
                        </div>
                        <div className='col-2 text-end d-flex flex-column justify-content-evenly align-items-end'>
                          <p className='m-0'>{convertRupiah.convert(cart?.product?.price)}</p>
                          <img className='cursor-pointer' src={bin} alt='erase' style={{ height: 20 }} />
                        </div>
                      </div>

                    )
                  })}

                </div>

              )
            })}
          </div>
          <div className='col-4 h-50'>
            <div >
              <div className='cart d-flex justify-content-between pt-2 mb-3'>
                <div className='d-flex flex-column'>
                  <p className='mb-2'>Subtotal</p>
                  <p className='mb-2'>Qty</p>
                </div>

                <div className='d-flex flex-column'>
                  <p className='mb-2'>{convertRupiah.convert(69000)}</p>
                  <p className='mb-2 text-end'>2</p>
                </div>
              </div>

              <div className='d-flex justify-content-between'>
                <p>Total</p>
                <p>{convertRupiah.convert(69000)}</p>
              </div>

            </div>

            <div class="d-grid gap-2 mt-5">
              <button class="btn btn-red" type="button" data-bs-toggle="modal" data-bs-target="#thanksModal">Pay</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart