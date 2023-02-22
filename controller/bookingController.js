const mentorModel = require("../models/mentors")
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const Booking = require("../models/bookings")
const stripe = require('stripe')('sk_test_51MaGopSFhCpIZmGlhlYszYWsINAFRVWzTFO9XnjOMcf5USwvOHSHEhiHR9vbgTrAuqUO24uRvRZJsfIQ2kj4ecVv00PgFJjaNf')


//function to generate random token id for user and mentor
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//function to send mail to the user with token info
function sendmail(cust, randomNum) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nycankit@gmail.com',
      pass: 'synisiexdjclwjiu'

    }
  });
  let mailOptions = {
    from: 'nycankit@gmail.com',
    to: cust,
    subject: 'Token Info',
    html: `<h1>This is your unique token <b>${randomNum}</b>  </h1></br> <p>Gmail your mentor "Sir I am {your name} have hire you for mentoring with token number{your token number} and your basic introduction"</p> `,// html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}


//function to send mail to the mentor about a new booking
function sendmailm(cust, clie, f, t, randomNum) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nycankit@gmail.com',
      pass: 'synisiexdjclwjiu'

    }
  });
  let mailOptions = {
    from: 'nycankit@gmail.com',
    to: cust,
    subject: 'New Booking',
    html: `<p>User with email id ${clie} has make a booking with unique token <b>${randomNum}</b> </br>  from ${f} </br>to ${t}</p> `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}


//function to send mail about cancellation and refund to the user
function sendmailr(cust, randomNum) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nycankit@gmail.com',
      pass: 'synisiexdjclwjiu'

    }
  });
  let mailOptions = {
    from: 'nycankit@gmail.com',
    to: cust,
    subject: 'Refund Successful',
    html: `<h1>This is your unique token <b>${randomNum}</b>  </h1></br> <p>Your refund will be issued within 5-10 working days as your booking for mentor is cancled successfully</p> `,// html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}


//function to send mail to the mentor about booking cancellation of a particular user
function sendmailmr(cust, clie, f, t, randomNum) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nycankit@gmail.com',
      pass: 'synisiexdjclwjiu'

    }
  });
  let mailOptions = {
    from: 'nycankit@gmail.com',
    to: cust,
    subject: 'Booking Cancled',
    html: `<p>User with email id ${clie} has cancle a booking with unique token <b>${randomNum}</b> </br>  from ${f} </br>to ${t}</p> `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}


//finds all the bookings of a particular object
const bookingByUserId = async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid }).sort({ _id: -1 }); //sorts in decending order
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};


//function to book a mentor by a user 
const bookMentor = async (req, res) => {
  const { mentor, mentorid, userid, fromdate, todate, totalDays, totalAmt, token, menemail, billadd } = req.body
  try {
    let paymentIntent = null;

    let customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    var paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: 'card',
    });

    let idempotencyKey = uuidv4()

    paymentIntent = await stripe.paymentIntents.create({
      description: idempotencyKey,
      receipt_email: "nycankit@gmail.com",
      shipping: {
        name: userid,
        address: {
          line1: billadd.billing_address_line1,
          postal_code: billadd.billing_address_zip
          ,
          city: billadd.billing_address_city,
          state: billadd.billing_address_state
          ,
          country: billadd.billing_address_country_code
          ,
        },
        phone: 6200472549,
      },
      amount: totalAmt * 100,
      currency: 'inr',
      customer: customer.id,
      payment_method_types: ['card'],
      payment_method: paymentMethods.data[0].id,
      confirm: true,
      off_session: true,
    });

    if (paymentIntent) { //if payment is successful then book the mentor and save in db
      const randomNum = random(1, 100)
      //above token generated whick will send to the mentor and user
      sendmail(customer.email, randomNum)
      sendmailm(menemail, customer.email, fromdate, todate, randomNum)
      //above sent the mail to the mentor and user about booking
      try {
        const newbooking = new Booking({
          mentor: mentor,
          mentorid: mentorid,
          userid: userid,
          fromdate: fromdate,
          todate: todate,
          totalDays: totalDays,
          totalAmount: totalAmt,
          transactionId: idempotencyKey,
          status: 'booked',
          pintentid: paymentIntent.id,
          mengmail: menemail,
          usergmail: customer.email,
          tokenid: randomNum
        });
        //created a new record for booking
        await newbooking.save(async (err, booking) => {
          //after booking going to update mentor current booking array to add a new user
          const oldmentor = await mentorModel.findOne({ _id: mentorid });
          oldmentor.currentbookings.push({
            bookingid: booking._id,
            fromdate: fromdate,
            todate: todate,
            userid: userid,
            status: 'booked'
          });
          oldmentor.maxbooking = oldmentor.maxbooking - 1
          //decreasing the remaining booking capacity of mentor
          await oldmentor.save();
        });

        res.status(200).send("Mentor Booked Successfully check your mail to contact with Mentor");
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }

}


//this is to cancle a booking and refund to the user and send mail to the user and mentor
const cancle = async (req, res) => {
  const { bookingid, mentorid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid })
    bookingitem.status = 'cancelled' //making status of booking as cancelled
    await bookingitem.save();
    const metorTemp = await mentorModel.findOne({ _id: mentorid })
    const bookings = metorTemp.currentbookings
    const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
    //removing the booking history of user from mentor current booking status
    metorTemp.currentbookings = temp;
    metorTemp.maxbooking = Number(metorTemp.maxbooking) + 1
    //increasing booking capacity of mentor by 1
    await metorTemp.save()
    //code to refund money to the user using stripe payment
    const paymentIntent = await stripe.paymentIntents.retrieve(bookingitem.pintentid);
    const refund = await stripe.refunds.create({
      payment_intent: bookingitem.pintentid,
      amount: paymentIntent.amount,
      metadata: { bookingid: bookingid }
    });

    //code to send mail to the user and mentor about cancellation
    sendmailr(bookingitem.usergmail, bookingitem.tokenid)
    sendmailmr(bookingitem.mengmail, bookingitem.usergmail, bookingitem.fromdate, bookingitem.todate, bookingitem.tokenid)
    res.send('Booking cancelled successfully')
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
}


module.exports = { bookMentor, cancle, bookingByUserId }