import React, { useState } from 'react';
export default function Form() {
    const [data, setData] = useState({
      name: '',
      mobileNo: '',
      address: '',
      age: '',
      batch: '',
      date: '',
    });
  
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
  
    const handle = (e) => {
      const { id, value } = e.target;
      setData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          setSubmitted(true);
          setError(false);
          setData({
            name: '',
            mobileNo: '',
            address: '',
            age: '',
            batch: '',
            date: '',
          });
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };
  
    const successMessage = () => {
      return (
        <div className="success" style={{ display: submitted ? '' : 'none' }}>
          <h1>You have Successfully Registered!!</h1>
        </div>
      );
    };
  
    const errorMessage = () => {
      return (
        <div className="error" style={{ display: error ? '' : 'none' }}>
          <h1>Please enter all the fields/ Please input valid details</h1>
        </div>
      );
    };
  
    return (
      <div className="form">
       <div>
          <h1>Yoga Classes Admission Form</h1>
        </div>
        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form>
          {/* Labels and inputs for form data */}
          <label className="label" >Name</label>
          <input placeholder ="name" id="name" onChange={handle} className="input"
            value={data.name} type="text" />

          <br />

          <label className="label">MobileNo</label>
          <input  id="mobileNo" onChange={handle} className="input"
            value={data.mobileNo} placeholder="+91-xxxxxxxxxx" type="mobileNo" />

          <br />

          <label className="label">Address</label>
          <input placeholder="address" id="address" className="input"
            value={data.address} onChange={handle} type="address" />
          <br />

          <label className="label">Age</label>
          <input id="age" onChange={handle} className="input"
            value={data.age} min="18" max="65" placeholder="Age Between 18 - 65" type="number" />
          <br />

          <label className="label" >
            Select Batch:
            <select className = "dropdown" id="batch" value={data.batch} onChange={handle}>
              <option value="" selected disabled hidden >Select Batch</option>
              <option id="6-7 A.M" value="6-7 A.M">6-7 A.M</option>
              <option id="7-8 A.M" value="7-8 A.M">7-8 A.M</option>
              <option id="8-9 A.M" value="8-9 A.M">8-9 A.M</option>
              <option id="5-6 A.M" value="5-6 P.M">5-6 P.M</option>
            </select>
          </label>

          <br />

          <label className="label">Payment</label>
          <input className="input"
            value="500" type="payment" />
          <br />

          <label className="label">Date</label>
          <input id="date" onChange={handle} className="input"
            value={data.date} type="date" />
          <br />


          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      
    );
  }