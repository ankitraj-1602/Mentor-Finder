import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import moment from 'moment';
import Swal from 'sweetalert2'
import Error from '../components/Error';
import Loader from '../components/Loader';
import StripeCheckout from 'react-stripe-checkout'


export const BookingScreen = () => {

  const params = useParams();
  const [tamt, settamt] = useState()
  const [mentor, setmentor] = useState({});
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const todate = moment(params.todate, 'DD-MM-YYYY')
  const fromdate = moment(params.fromdate, 'DD-MM-YYYY')
  const ttldays = moment.duration(todate.diff(fromdate)).asDays() + 1

  AOS.init({ duration: '500' });

  useEffect(() => {
    async function x() {
      {
        if (!localStorage.getItem('currentUser')) {
          window.location.href = "/login"
        } else { }
        try {
          const data = await (await axios.post("http://localhost:5000/mentors/getmentorbyid", { mentorid: String(params.mentorid) })).data;
          settamt(data.feeperday * ttldays)
          setmentor(data);
          setloading(false);

        } catch (error) {
          setloading(false)
          seterror(true)
        }
      }
    }
    x();
  }, [])

  async function onToken(token, billadd) {
    const details = {
      mentor: mentor.name,
      mentorid: mentor._id,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate: fromdate._i,
      todate: todate._i,
      totalDays: ttldays,
      totalAmt: tamt,
      token: token,
      menemail: mentor.email,
      billadd: billadd
    }
    try {
      const result = await axios.post("http://localhost:5000/api/booking/bookmen", details)
      Swal.fire('Congrats', 'Mentor Booked Successfully check your mail to contact with Mentor', 'success').then(result => {
        window.location.href = '/profile'
      })
    } catch (error) {

    }
  }
  return (
    <div className='m-5' >

      {loading ? (<h1><Loader /></h1>) : mentor ? (

        <div className="row p-3 mb-5 bs" data-aos='flip-right' duration='2000' >
          <div className="col-md-6 my-auto">
            <div>
              {mentor.imageurl && mentor.imageurl.length > 0 && <img src={mentor.imageurl[0]} style={{ height: '450px', width: "100px" }} />}
            </div>
          </div>

          <div className="col-md-6 text-center">
            <div>
              <h1><b>Booking Details</b></h1>
              <hr />
              <p><b>Name</b> : {mentor.name}</p>
              <p><b>From Date :{params.fromdate}</b> </p>
              <p><b>To Date :{params.todate}</b> </p>
              <p><b>skills</b>: {mentor.skills}</p>
            </div>

            <div className='mt-5'>
              <h1><b>Amount</b></h1>
              <hr />
              <p>Total Days : <b>{ttldays}</b></p>
              <p>Rent Per Day : <b>{mentor.feeperday}</b></p>
              <h1><b>Total Amount : {tamt}</b></h1>


            </div>

            <StripeCheckout
              amount={tamt * 100}
              shippingAddress={false}
              billingAddress
              token={onToken}
              stripeKey='pk_test_51MaGopSFhCpIZmGlGyp94eWqxsSJRUa6dbShfqlSnB1iPiJrImnemizi1RBS8axCUjLIJS6YrSm0VzdvzwVDLlwY0074GakB84'
              currency='INR'
            >

              {mentor.maxbooking > 0 && <button className='btn btn-primary'>Pay Now</button>}
            </StripeCheckout>

          </div>

        </div>

      ) : (<Error />)}

    </div>
  )
}
