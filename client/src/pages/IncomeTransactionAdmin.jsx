import React from 'react'
import { API } from '../config/api';
import convertRupiah from 'rupiah-format'

import { Navbar, TransactionCard } from '../components'
import { useQuery } from 'react-query';

function IncomeTransactionAdmin() {

  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data
  });

  return (
    <div className='container d-flex justify-content-center'>

      <Navbar />

      {transactions?.map((item) => (
        <div key={item.id} className="modal fade position-absolute" id={`transactionModal${item.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered position-relative">
            <div className="modal-content position-relative">

              <TransactionCard
                key={item.id}
                id={item?.id}
                date={item?.updated_at}
                status={item?.status}
                subTotal={item?.amount}
                cart={item?.cart}
              />

            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 90, width: '90%' }}>

        <h3 className='text-red mb-4'>Income Transaction</h3>

        <table className="table table-hover">
          <thead>
            <tr className='table-secondary'>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Post Code</th>
              <th>Income</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((item, index) => {
              return (
                <tr className='cursor-pointer' data-bs-toggle="modal" data-bs-target={`#transactionModal${item.id}`} key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item?.buyer?.fullName}</td>
                  <td>{item?.buyer?.profile?.address}</td>
                  <td>{item?.buyer?.profile?.post_code}</td>
                  <td className='text-primary'>{convertRupiah.convert(item?.amount)}</td>
                  <td className={`text-${item?.status === 'Waiting Approve' ? 'warning' :
                    item?.status === 'Success' ? 'success' :
                      item?.status === 'Cancel' ? 'danger' : 'info'
                    }`}>
                    {item?.status}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default IncomeTransactionAdmin