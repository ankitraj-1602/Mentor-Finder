import React, { useState } from "react";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";


export function LoginScreen() {
  const [email, setemail] = useState("");
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(false)
  const [success, setsuccess] = useState(false)
  const [password, setpassword] = useState("")

  async function login() {
    const user = { email, password }
    try {
      setloading(true)
      const result = await (await axios.post('http://localhost:5000/api/users/login', user)).data
      localStorage.setItem('currentUser', JSON.stringify(result))
      setloading(false)
      setsuccess(true)
      window.location.href = '/home'
    }
    catch (error) {
      setloading(false)
      setsuccess(false)
      seterror(true)
    }
  }

  return (
    <div>
      {loading ? (<Loader />) :
        <div className='login'>
          <div className="row justify-content-center mt-5">
            <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
              {success && (<Success msg={"successfully login"} />)}
              {error && (<Error msg="Invalid Credentials" />)}
              <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
                Login
              </h2>
              <div>
                <input required type="email" placeholder="email" className="form-control mt-1" value={email} onChange={(e) => { setemail(e.target.value) }} />
                <input
                  type="password"
                  placeholder="password"
                  className="form-control mt-1"
                  value={password}
                  required
                  onChange={(e) => { setpassword(e.target.value) }}
                />
                <button onClick={login} className="btn btn-success mt-3 mb-3 rounded-pill">LOGIN</button>
                <br />
                <a style={{ color: 'black' }} href="/register" className="mt-2">Click Here To Register</a>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}