import { API } from '../config/api';
import { Navbar } from "./../components";
import React, { useState } from 'react';
import clip from './../assets/img/clip.png';
import { useMutation } from 'react-query';

import kopi from './../assets/img/question.png'

function AddTopingAdmin() {

  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");

  const [form, setForm] = useState({
    title: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    setForm(({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    }));

    //handle preview image
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  // Create function for handle insert product data with useMutation here ...
  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('title', form.title);
      formData.set('price', form.price);

      // Insert product data
      const response = await API.post('/topping', formData, config);
      setForm(response.data.data)

      alert('Topping berhasil ditambahkan!')

    } catch (error) {
      console.log(error);
    }
  })

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />
      <>
        <div className='row justify-content-between' style={{ marginTop: 90, width: '90%' }}>
          <div className='col-6'>
            <div className="modal fade" id="successModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div data-bs-dismiss="modal" id='modalClose'></div>
              <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content thanks-message">

                  <div className="modal-body">
                    <p>Add Topping Success</p>
                  </div>

                </div>
              </div>
            </div>
            <h2 className='text-red mb-5'>Topping</h2>
            <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
              <input className="form-control input-red mb-4" type="text" name='title' onChange={handleChange} placeholder={`Topping Name`} aria-label="default input example" />
              <input className="form-control input-red mb-4" type="number" name='price' placeholder="Price" onChange={handleChange} aria-label="default input example" />
              <div className="mb-5">
                <input type="file" className="form-control input-file-red" id="inputGroupFile02" name='image' onChange={handleChange} />
                <label className="form-control label-file" htmlFor="inputGroupFile02">
                  <p className='m-0'> {previewName === "" ? "Photo Topping" : previewName}</p>
                  <img style={{ height: 20 }} src={clip} alt="clip" />
                </label>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-red mx-auto" style={{ width: '100%' }} type="submit"
                >Add Topping</button>
              </div>
            </form>
          </div>
          <img className='col-5' src={preview || kopi} alt="Add Topping" />
        </div >
      </>
    </div>
  )
}

export default AddTopingAdmin