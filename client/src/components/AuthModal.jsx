import { React, useContext, useState } from 'react'
import { UserContext } from '../context/userContext';
import { useMutation } from 'react-query';
import { API } from '../config/api';

function AuthModal() {

  const [, dispatch] = useContext(UserContext)
  const [message, setMessage] = useState(null)


  //. Login 
  const [formLogin, setFormLogin] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const handleChangeLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const { loginEmail, loginPassword } = formLogin;

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      const closeModal = document.getElementById('closeModal')

      e.preventDefault()

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(formLogin);
      const response = await API.post('/login', body, config);

      if (response?.status === 200) {

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });

        closeModal.click()
      }

    } catch (error) {
      const alert = (
        <div className="alert alert-danger" role="alert">
          Login failed, {error.response.data.message}
        </div>
      );
      setMessage(alert);
    }

  })


  //. Register 

  const [formRegister, setFormRegister] = useState({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
  });

  const handleChangeRegister = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const { registerName, registerEmail, registerPassword } = formRegister

  const handleSubmitRegister = useMutation(async (e) => {
    try {
      const toggleModal = document.getElementById("toggleModal")

      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(formRegister);
      const response = await API.post('/register', body, config);

      console.log(response)

      toggleModal.click()

      setFormRegister({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
      })


    } catch (error) {
      const alert = (
        <div className="alert alert-danger" role="alert">
          Register failed, {error.response.data.message}
        </div>
      );
      setMessage(alert);
      console.log(error);
    }
  })



  return (
    <div>
      <div className="modal fade" id="login" aria-hidden="true" aria-labelledby="loginLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div data-bs-dismiss="modal" id='closeModal'></div>
              {message && message}
              <h1 className="modal-title text-red bold mb-4" id="login">Login</h1>

              <form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
                <div className="mb-3">
                  <input type="email" className="form-control input-red" id="loginEmail" name="loginEmail" value={loginEmail} onChange={handleChangeLogin} placeholder="Email" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control input-red" id="loginPassword" name="loginPassword" value={loginPassword} onChange={handleChangeLogin} placeholder="Password" />
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button className="btn btn-red">Login</button>
                </div>
              </form>

              <p className="text-center" >Don't have an account? Click <strong itemType='button' className="cursor-pointer" data-bs-target="#register" data-bs-toggle="modal">Here</strong></p>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="register" aria-hidden="true" aria-labelledby="loginLabel2" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h1 className="modal-title text-red bold mb-4" id="register">Register</h1>

              <form id="register" onSubmit={(e) => handleSubmitRegister.mutate(e)} >
                <div className="mb-3">
                  <input type="text" onChange={handleChangeRegister} className="form-control input-red" id="registerName" value={registerName} name="registerName" placeholder="Full Name" />
                </div>
                <div className="mb-3">
                  <input type="email" onChange={handleChangeRegister} className="form-control input-red" id="registerEmail" value={registerEmail} name="registerEmail" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <input type="password" onChange={handleChangeRegister} className="form-control input-red" id="registerPassword" value={registerPassword} name="registerPassword" placeholder="Password" />
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button className="btn btn-red">Register</button>
                </div>
              </form>

              <p className="text-center">Already have an account? Click <strong id='toggleModal' className="cursor-pointer" data-bs-target="#login" data-bs-toggle="modal">Here</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal