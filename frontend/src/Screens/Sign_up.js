import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sign_up() {
  // Data is not populating in database
    let [credentials,setCredentials] = useState({name:'',email:'',password:'',location:''})
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:8080/createuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            location: credentials.location,
            password: credentials.password
          })
        });
    
        const json = await response.json();
        console.log(json);
    
        if (!json.success) {
          alert('Enter valid Credentials');
        } else {
          alert('User registered successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error gracefully, such as displaying an error message to the user
        alert('An error occurred while registering. Please try again later.');
      }
    }
    
    function handleChange(e){
        setCredentials({...credentials,[e.target.name]:e.target.value})
        // To be continued
    }
  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor='name' className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={credentials.name} onChange={handleChange}></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email 
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={credentials.location}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
      </form>
      </div>
    </>
  );
}

export default Sign_up;
