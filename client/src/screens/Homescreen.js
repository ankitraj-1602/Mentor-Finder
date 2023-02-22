import { React, useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { DatePicker } from 'antd';
import "react-date-range/dist/styles.css";
import Loader2 from '../components/Loader2';
import { Mentor } from '../components/Mentor';
import "react-date-range/dist/theme/default.css";
const { RangePicker } = DatePicker;


export const Homescreen = () => {
  const [nod, setnod] = useState()
  const [men, setmen] = useState([]);
  const [type, settype] = useState('all')
  const [todate, settodate] = useState('')
  const [error, seterror] = useState(false);
  const [fromdate, setfromdate] = useState('');
  const [loading, setloading] = useState(false);
  const [duplicate, setduplicate] = useState([]);
  const [searchval, setsearchval] = useState('');

  useEffect(() => {
    async function x() {
      try {
        setloading(true)
        const data = await (await axios.get("http://localhost:5000/mentors/getallmentors")).data
        setmen(data)
        setduplicate(data)
        setloading(false)
      }
      catch (error) {
        seterror(true)
        seterror(false)
      }
    }
    x()
  }, [])


  function filterByDate(dates) {

    setfromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
    settodate(moment(dates[1].$d).format('DD-MM-YYYY'))
    setnod((moment(dates[1].$d).diff(moment(dates[0].$d), 'd')) + 1)

    var temp = []
    for (var m of duplicate) {
      var availability = false;
      console.log("first loop")
      console.log(m)
      for (var booking of m.currentbookings) {
        console.log("second loop")
        if (m.currentbookings.length) {
          console.log("if 1")
          if (
            !moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate) &&
            !moment(moment(dates[1].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
          ) {
            availability = true;
            console.log("if 2")
            if (
              moment(dates[0].$d).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0].$d).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1].$d).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1].$d).format('DD-MM-YYYY') !== booking.todate
            ) {
              console.log("if 3")
              availability = true;
            }
          }
        }
      }
      if (availability || m.currentbookings.length == 0) {
        temp.push(m)
      }
      setmen(temp)
    }
  }


  function filterBySearch(e) {
    const dupdate = duplicate.filter(m => m.name.toLowerCase().includes(searchval))
    setmen(dupdate)
  }


  function filterByType(e) {
    settype(e)
    if (e != 'all') {
      const dupdate = duplicate.filter(m => m.type.toLowerCase().includes(e.toLowerCase()))
      setmen(dupdate)
    } else {
      setmen(duplicate)
    }
  }

  return (
    <div className="mt-5">

      <div className="container">
        <div className="row bs p-3 m-5">
          <div className="col-md-4">
            <RangePicker style={{ height: "38px" }} onChange={filterByDate} format='DD-MM-YYYY' className='m-2' />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control i2 m-2"
              placeholder='Search Mentors'
              value={searchval}
              onChange={(e) => setsearchval(e.target.value)}
              onKeyUp={filterBySearch}
            />
          </div>

          <div className="col-md-4">
            <select className="form-control m-2"
              value={type}
              onChange={(e) => { filterByType(e.target.value) }}>
              <option value="all">All</option>
              <option value="student">student</option>
              <option value="employee">employee</option>
            </select>
          </div>

        </div>
      </div>

      <div className="row justify-content-center">
        {loading ? (
          <Loader2 />
        ) : (
          men.map((m) => {
            return (
              <div className="col-md-8" data-aos='zoom-in'>
                <Mentor mentor={m} fromdate={fromdate} todate={todate} nod={nod} />
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}
