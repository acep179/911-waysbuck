import React from 'react'
import dateFormat from 'dateformat';
import convertRupiah from 'rupiah-format'

import logo from './../assets/img/waysbuck_logo.png'
import qrDummy from './../assets/img/qr-dummy.png'

function TransactionCard(props) {

  return (
    <div key={props.id} className="card bg-pink position-relative" style={{ maxWidth: 540, marginBottom: props.mb }}>
      <div className="row g-0 pt-3 px-3">

        <div className="col-md-8">
          {props?.cart?.map((item) => {
            return (
              <div key={item?.id} className="bg-pink" style={{ maxWidth: 540 }}>
                <div className="row g-0 align-items-center mb-3">

                  <div className="col-md-4">
                    <img src={`http://localhost:5000/uploads/${item?.product?.image}`} className="img-fluid rounded-start" alt={item?.product?.title} />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body text-red p-0 ps-3">
                      <h5 className="card-title">{item?.product?.name}</h5>
                      <small className='text-small'>
                        <p className="card-text"> {dateFormat(item?.updated_at, 'dddd, d mmmm yyyy')}</p>
                        <p className='mb-2'><span className='text-brown'>Toping:</span>
                          {item?.toppings?.map((item) => {
                            return ` ${item?.title}, `
                          })}
                          .</p>
                        <p className='text-brown'>Price: {convertRupiah.convert(item?.product?.price)}</p>
                      </small>
                    </div>
                  </div>

                </div>

              </div>
            )
          })}
        </div>

        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={logo} className="img-fluid rounded-start mb-3" alt="Logo Waysbuck" />
          <img src={qrDummy} className="img-fluid rounded-start mb-3" alt="QR Code" />
          <p
            className={`
          bg-${props?.status === 'Waiting Approve' ? 'warning' :
                props?.status === 'Success' ? 'success' :
                  props?.status === 'Cancel' ? 'danger' :
                    props?.status === 'Failed' ? 'danger' : 'info'
              }
          bg-opacity-10
          px-2
          text-${props?.status === 'Waiting Approve' ? 'warning' :
                props?.status === 'Success' ? 'success' :
                  props?.status === 'Cancel' ? 'danger' :
                    props?.status === 'Failed' ? 'danger' : 'info'
              }`}>
            {props.status}
          </p>
          <p>Sub Total: {convertRupiah.convert(props?.subTotal)}</p>
        </div>

      </div>
    </div>
  )
}

export default TransactionCard
