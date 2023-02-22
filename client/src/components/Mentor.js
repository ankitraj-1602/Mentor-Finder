//This is for displaying each metor in home screen as card

import React, { useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';


//added animation for 2 seconds
AOS.init({
  duration: '2000'
});


//this component taking props mentor,fromdate,todate,and nod(number of days)
export const Mentor = ({ mentor, fromdate, todate, nod }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <div className="row m-3 p-3 bs" data-aos='fade-up'>
      <div className="col-md-4">
        <img src={mentor.imageurl[0]} className="img-fluid" />
      </div>
      <div className="col-md-8">
        <h1>  {mentor.name}</h1>
        <p>
          <b>Remaining Bookings : {mentor.maxbooking}</b>
        </p>
        <p>
          <b>Available Days : {mentor.avldays}</b>
        </p>
        <p>
          <b>Email : </b>
          {mentor.email}
        </p>
        <p>
          <b>Type : {mentor.type}</b>
        </p>
        <p>
          <b>feeperday : {mentor.feeperday}</b>
        </p>


        <div style={{ float: "right" }}>
          {fromdate && todate && mentor.avldays >= nod && mentor.maxbooking > 0 && (
            //this condition check if fromdate ,todate ,available days of mentor is more than or equal to number of days booked or not and last is number of booking is full or availble
            <Link to={`/book/${mentor._id}/${fromdate}/${todate}`}>
              <button className="btn btn-dark m-2">Book Now</button>
            </Link>
          )}

          <button className="btn btn-danger m-2" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" data--aos='zoom-in'>
        <Modal.Header>
          <h1 className="text-center"> <Modal.Title>{mentor.name}</Modal.Title></h1>
        </Modal.Header>

        <Modal.Body>
          {/* this is a corousel to display mentor details */}

          <Carousel nextLabel="" prevLabel="">
            {mentor.imageurl.map((url) => {
              return (

                <Carousel.Item>
                  <img
                    src={url}
                    className="img-fluid"
                    style={{ height: "400px" }}
                  />
                </Carousel.Item>

              );
            })}
          </Carousel>

          <br />
          <p>{mentor.description}</p>
          <br />
        </Modal.Body>

        <Modal.Footer>

          <button className="btn btn-primary" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
