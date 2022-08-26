import React, { useContext } from 'react'
import { Navbar, TransactionCard } from '../components'
import { UserContext } from '../context/userContext'
import { useQuery } from 'react-query';
import { API } from '../config/api';

function Profile() {

  const [state] = useContext(UserContext)

  let { data: transactionData } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data
  });

  let transactions = transactionData?.filter((item) => {
    return item.buyer_id == state.user.id
  })

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />
      <div className='row' style={{ marginTop: 90, width: '90%' }}>
        <div className='col-5'>
          <h3 className='text-red mb-4'>My Profile</h3>
          <div className='row'>
            <img className='col-5' src={state.user.profile.image} alt={state.user.fullName} />
            <div className='col-6'>
              <h5 className='mb-2 text-brown'>Full Name</h5>
              <p>{state.user.fullName}</p>
              <h5 className='text-brown'>Email</h5>
              <p>{state.user.email}</p>
            </div>
          </div>
        </div>

        <div className='col-7'>
          <h3 className='text-brown mb-4'>My Transaction</h3>
          {transactions?.map((item) => {
            return <TransactionCard
              key={item?.id}
              mb='1rem'
              id={item?.id}
              date={item?.updated_at}
              status={item?.status}
              subTotal={item?.amount}
              cart={item?.cart}
            />
          })}

        </div>

      </div>
    </div>
  )
}

export default Profile