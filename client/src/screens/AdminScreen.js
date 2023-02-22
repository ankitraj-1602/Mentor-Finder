import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Loader from "../components/Loader";


export const AdminScreen = () => {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = '/home'
    }
  }, [])

  return (
    <div className="mt-5 ml-3 bs mr-3 p-3">
      <h1 className='text-center '><b>Admin Pannel</b></h1>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Bookings',
            key: '1',
            children:
              <>
                <h1><Bookings /></h1>
              </>
            ,
          },
          {
            label: 'Mentors',
            key: '2',
            children:
              <>
                <h1><Mentors /></h1>
              </>,
          },
          {
            label: 'Add Mentor',
            key: '3',
            children:
              <>
                <h1><AddMentor /></h1>
              </>
            ,
          },
          {
            label: 'Users',
            key: '4',
            children:
              <>
                <h1><Users /></h1>
              </>,
          },
        ]}
      />
    </div>
  )
}


// export function Bookings() {
//   const [bookings, setbookings] = useState([]);
//   const [loading, setloading] = useState(false);
//   const [error, seterror] = useState(false);

//   useEffect(() => {
//     async function x() {
//       try {
//         setloading(true);
//         const data = await (
//           await axios.get("http://localhost:5000/api/admin/getallbookings")
//         ).data;

//         setbookings(data);
//         setloading(false);

//       } catch (error) {
//         setloading(false);
//         seterror(true);
//       }
//     }
//     x()
//   }, []);
//   return (
//     <div className='col-md-12'>
//       <h1>Bookings</h1>
//       {loading ? (<Loader />) : error ? (<Error msg={"error"} />) : (

//         <div>
//           <table className='table table-bordered table-dark'>
//             <thead className='bs'>
//               <tr>
//                 <th>Booking Id</th>
//                 <th>Userid</th>
//                 <th>Mentor</th>
//                 <th>From</th>
//                 <th>To</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map(booking => {
//                 return <tr>
//                   <td>{booking._id}</td>
//                   <td>{booking.userid}</td>
//                   <td>{booking.mentor}</td>
//                   <td>{booking.fromdate}</td>
//                   <td>{booking.todate}</td>
//                   <td>{booking.status}</td>
//                 </tr>
//               })}
//             </tbody>
//           </table>

//         </div>)}
//     </div>
//   )
// }




export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/admin/getallbookings');
        setBookings(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="container">
      <div className="row">
       
      </div>

      <div className="row">
        <div className="col-12 col-sm-8 offset-sm-2">
          {loading ? (
            <div className="text-center">
              
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              Error loading bookings.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Booking ID</th>
                    <th>User ID</th>
                    <th>Mentor</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking._id}</td>
                      <td>{booking.userid}</td>
                      <td>{booking.mentor}</td>
                      <td>{booking.fromdate}</td>
                      <td>{booking.todate}</td>
                      <td>{booking.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



export function Mentors() {
  const [mentors, setmentors] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    async function x() {
      try {
        setloading(true);
        const data = await (
          await axios.get("http://localhost:5000/mentors/getallmentors")
        ).data;

        setmentors(data);
        setloading(false);

      } catch (error) {
        setloading(false);
        seterror(true);
      }
    }
    x()
  }, []);
  return (
    <div className='col-md-12'>
      <h1>Mentors</h1>
      {loading ? (<Loader />) : error ? (<Error msg={"error"} />) : (<div>

        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Mentor Id</th>
              <th>Name</th>
              <th>Avl Days</th>
              <th>Email</th>
              <th>FeePerDay</th>
              <th>Type</th>

            </tr>
          </thead>
          <tbody>
            {mentors.map(m => {
              return <tr>
                <td>{m._id}</td>
                <td>{m.name}</td>
                <td>{m.avldays}</td>
                <td>{m.email}</td>
                <td>{m.feeperday}</td>
                <td>{m.type}</td>
              </tr>
            })}
          </tbody>
        </table>

      </div>)}
    </div>
  )
}





export function Users() {
  const [users, setusers] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    async function x() {
      try {
        const data = await (await axios.get('http://localhost:5000/api/users/getallusers')).data
        setusers(data)
        setloading(false)
      } catch (error) {
        setloading(false)
      }
    }
    x()
  }, [])

  return (

    <div className='row'>
      {loading && (<Loader />)}

      <div className="col-md-10">
        <table className='table table-bordered table-dark'>

          <thead className='bs'>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
            </tr>
          </thead>
          <tbody>
            {users && (users.map(user => {
              return <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
              </tr>
            }))}
          </tbody>

        </table>
      </div>
    </div>
  )
}


export function AddMentor() {
  const [men, setmen] = useState("");
  const [type, settype] = useState("");
  const [email, setemail] = useState("");
  const [image3, setimage3] = useState("");
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [skills, setskills] = useState('');
  const [avldays, setavldays] = useState();
  const [error, seterror] = useState(false);
  const [feeperday, setfeeperday] = useState();
  const [loading, setloading] = useState(false);
  const [maxbooking, setmaxbooking] = useState();
  const [description, setdescription] = useState("");

  async function addMentor() {
    const mentorobj = { men, feeperday, avldays, description, email, type, image1, image2, image3, skills, maxbooking }
    try {
      setloading(true);
      const result = await axios.post('http://localhost:5000/mentors/addmentor', mentorobj)
      setloading(false);
      Swal.fire('congrats', "Your new Mentor is added successfully", 'success').then(result => {
        window.location.href = '/admin'
      })

    } catch (error) {
      setloading(false);
      Swal.fire('oops', "something went wrong", 'error')
    }
  }
  return (
    <div className="row">
      {loading ? (<Loader />) : error ? (<Error msg={"error"} />) :
        (
          <>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control mt-1"
                placeholder="name"
                value={men}
                onChange={(e) => {
                  setmen(e.target.value);
                }}
              />

              <input
                type="text"
                className="form-control mt-1"
                placeholder="feeperday"
                value={feeperday}
                onChange={(e) => {
                  setfeeperday(e.target.value);
                }}
              />

              <input
                type="text"
                className="form-control mt-1"
                placeholder="avl days"
                value={avldays}
                onChange={(e) => {
                  setavldays(e.target.value);
                }}
              />

              <input
                type="text"
                className="form-control mt-1"
                placeholder="description"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />

              <input
                type="text"
                className="form-control mt-1"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />

            </div>

            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-1"
                placeholder="type"
                value={type}
                onChange={(e) => {
                  settype(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Image url 1"
                value={image1}
                onChange={(e) => {
                  setimage1(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Image url 2"
                value={image2}
                onChange={(e) => {
                  setimage2(e.target.value);
                }}
              />


              <input
                type="text"
                className="form-control mt-1"
                placeholder="Image url 3"
                value={image3}
                onChange={(e) => {
                  setimage3(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control mt-1"
                placeholder="skills"
                value={skills}
                onChange={(e) => {
                  setskills(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control mt-1"
                placeholder="maxbookings"
                value={maxbooking}
                onChange={(e) => {
                  setmaxbooking(e.target.value);
                }}
              />
              <div className='mt-1 text-right'>
                <button className="btn btn-primary" onClick={addMentor}>ADD Mentor</button>
              </div>
            </div>

          </>
        )}
    </div>

  )
}