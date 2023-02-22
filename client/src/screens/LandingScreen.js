import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

AOS.init({ duration: '1000' });

export const LandingScreen = () => {
  return (
    <div className="" >
      <div className="landing row justify-content-center text-center">
        <div className="col-md-9 my-auto" >
          <h2 style={{ color: "white", fontSize: "60px" }} data-aos='zoom-in'>Mentor.io</h2>
          <h1 style={{ color: "white", fontSize: "20px" }} data-aos='zoom-out' >"You can find your Mentor here"</h1>
          {
            JSON.parse(localStorage.getItem('currentUser')) ? (
              <Link to="/home">
                <button className='btn btn-primary' style={{ fontSize: "16px", padding: "10px 20px" }}>Get Started</button>
              </Link>
            ) : (
              <Link to="/home">
                <button className='btn btn-primary' style={{ fontSize: "16px", padding: "10px 20px",fontWeight:"bold" }}>Get Started</button>
              </Link>
            )
          }
        </div>
      </div>
      <style>{`
        .landing {
          padding: 10px;
        }
        
        h2 {
          font-size: 30px;
        }
        
        h1 {
          font-size: 16px;
        }
        
        button {
          margin-top: 20px;
        }
        
        @media only screen and (min-width: 768px) {
          .landing {
            padding: 50px;
          }
          
          h2 {
            font-size: 130px;
          }
          
          h1 {
            font-size: 50px;
          }
          
          button {
            font-size: 30px;
          }
        }
      `}</style>
    </div>
  );
}