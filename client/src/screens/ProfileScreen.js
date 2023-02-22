import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import Swal from "sweetalert2";
import { Tag, Divider } from 'antd';
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";


export const ProfileScreen = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
    }
  }, [])

  return (
    <div className="mt-5 ml-3">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Profile',
            key: '1',
            children:
              <>
                <h1>My Profile</h1>
                <br />
                <h1>Name : {user.name}</h1>
                <br />
                <h1>Email : {user.email}</h1>
                <br />
                {user.isAdmin == true ?

                  (<h1>IsAdmin :
                    <Link to="/admin">
                      <button className='btn btn-primary' style={{marginLeft:"15px"}}> Admin</button>
                    </Link>
                  </h1>)
                  : ('')}
              </>
            ,
          },
          {
            label: 'Bookings',
            key: '2',
            children:
              <>
                <Booking />
              </>,
          },
        ]}
      />
    </div>
  )
}


const Booking = () => {
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const [mybookings, setmybookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {
    async function x() {
      try {
        setloading(true);
        const data = await (
          await axios.post("http://localhost:5000/api/booking/bookingbyuserid", {
            userid: user._id,
          })
        ).data;
        setmybookings(data);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    }
    x()
  }, []);


  async function cancelBooking(bookingid, mentorid) {
    try {
      setloading(true);
      const result = await axios.post('http://localhost:5000/api/booking/cancle', { bookingid: bookingid, mentorid: mentorid });
      setloading(false);
      Swal.fire('Congrats', 'Your Mentor booking has cancelled succeessfully your money will be refunded within 5-10 days', 'success').then(result => {
        window.location.href = '/profile'
      })
    } catch (error) {
      Swal.fire('Oops', 'Something went wrong', 'error').then(result => {
        window.location.href = '/profile'
      })
      setloading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error msg={"error"} />
      ) : (
        mybookings.map(booking => {
          return <div className="row">
            <div className="col-md-6 my-auto">
              <div className='bs m-1 p-2'>
                <h1>{booking.room}</h1>
                <p>BookingId : {booking._id}</p>
                <p>TransactionId : {booking.transactionId}</p>
                <p><b>Check In : </b>{booking.fromdate}</p>
                <p><b>Check Out : </b>{booking.todate}</p>
                <p><b>Amount : </b> {booking.totalAmount}</p>
                <p><b>Status</b> : {booking.status == 'booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                <div className='text-right'>
                  {booking.status == 'booked' && (<button className='btn btn-primary' onClick={() => cancelBooking(booking._id, booking.mentorid)}>Cancel Booking</button>)}
                </div>
              </div>
            </div>
          </div>
        })
      )}
    </div>
  )
}

