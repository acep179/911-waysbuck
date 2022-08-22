import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import convertRupiah from 'rupiah-format'

import { AuthModal, Navbar } from '../components'

import heroBg from './../assets/img/hero-bg.jpg'
import heroImg from './../assets/img/food.png'
import { API } from '../config/api';
import { UserContext } from '../context/userContext'


function Home() {

  const [state] = useContext(UserContext)
  const navigate = useNavigate()

  //. Fetching product data from database
  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data
  });

  const detailProduct = (productId) => {
    const loginButton = document.getElementById("loginButton")
    if (state.isLogin === true) {
      navigate(`/detail-product/${productId}`)
    } else {
      loginButton.click()
    }
  }

  return (
    <div className='container'>
      <Navbar />
      <AuthModal />
      <header className='mb-5' style={{ marginTop: 90 }}>
        <div className='mx-auto position-relative' style={{ width: '90%' }}>
          <div className='hero row align-items-center' style={{ backgroundImage: `url(${heroBg})` }}>
            <div className='text-white col-7'>
              <h1>WAYSBUCKS</h1>
              <h5>Things are changing, bu we're still here for you</h5>
              <p>We have temporarily close our in-store cafes, but select grocery and drive thru location remaining open.</p>
              <p><strong>Waysbucks</strong> Drivers is also available</p>
              <p>Let's Order</p>
            </div>
            <img className='col-5 hero-img' src={heroImg} alt="Hero Food" />
          </div>
        </div>
      </header>
      <main className='mx-auto text-red' style={{ width: '92%' }}>
        <h4 className='mb-5'>Let's Order</h4>
        <div className='row'>
          {products?.map((item) => {
            return (
              <div key={item.id} className='col-3 mb-5 px-3'>
                <div className='card bg-pink p-0 cursor-pointer' onClick={() => detailProduct(item.id)}>
                  <img src={item.image} className="card-img-top w-100 mb-2" alt={item.name} />
                  <div className="card-body p-3">
                    <div>
                      <h5 className="card-title mb-2 text-red">{item.title}</h5>
                    </div>
                    <p className="card-text mb-2">{convertRupiah.convert(item.price)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div >
  )
}

export default Home