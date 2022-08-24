import React from 'react'
import { useQuery } from 'react-query';
import { API } from '../config/api';
import convertRupiah from 'rupiah-format'

import { Navbar, TransactionCard } from '../components'

function IncomeTransactionAdmin() {

  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data
  });

  console.log(transactions)


  return (
    <div className='container d-flex justify-content-center'>

      <Navbar />

      <div className="modal fade" id="transactionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <TransactionCard
              id={transactions?.id}
              date={transactions?.updated_at}
              status={transactions?.status}
              subTotal={transactions?.amount}
              cart={transactions?.cart}
            />

          </div>
        </div>
      </div>


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
                <tr className='cursor-pointer' data-bs-toggle="modal" data-bs-target="#transactionModal" key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item?.user?.fullName}</td>
                  <td>{item?.user?.profile?.address}</td>
                  <td>{item?.user?.profile?.postCode}</td>
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