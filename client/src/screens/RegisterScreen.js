import axios from "axios";
import React, { useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";


export function RegisterScreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false)
  const [loading, setloading] = useState(false);

  async function register() {
    if (password != cpassword) {
      alert("passwords not matched")
    }
    else {
      const user = {
        name,
        email,
        password
      }
      try {
        setloading(true)
        const result = await axios.post('http://localhost:5000/api/users/register', user)
        setloading(false)
        setsuccess(true)
        window.location.href = '/login'
        setemail('')
        setname('')
        setcpassword('')
        setpassword('')
      } catch (error) {
        setloading(false)
        seterror(true)
      }
    }
  }

  return (
    <div className='register'>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          {loading && (<Loader />)}
          {success && (<Success msg={"successfully registered"} />)}
          {error && (<Error />)}
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Register
          </h2>
          <div>
            <input required type="text" placeholder="name" className="form-control mt-1" value={name} onChange={(e) => { setname(e.target.value) }} />
            <input required type="email" placeholder="email" className="form-control mt-1" value={email} onChange={(e) => { setemail(e.target.value) }} />
            <input
              type="password"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e) => { setpassword(e.target.value) }}
            />
            <input
              type="password"
              placeholder="confirm password"
              className="form-control mt-1"
              value={cpassword}
              required
              onChange={(e) => { setcpassword(e.target.value) }}
            />
            <button onClick={register} className="btn btn-primary rounded-pill mt-3 mb-3">REGISTER</button>
            <br />
            <a style={{ color: 'black' }} href="/login">Click Here To Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}