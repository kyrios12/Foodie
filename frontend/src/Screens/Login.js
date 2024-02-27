import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
// Add a password show button
function Login() {
  let [credentials,setCredentials] = useState({email:'',password:''});
  let navigate = useNavigate(); 
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });
  
      const json = await response.json();
      console.log(json);
  
      if (!json.success) {
        alert('Enter valid Credentials');
      } else {
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate('/');
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
    <div>
      <div className="container">
      <form onSubmit={handleSubmit}>
       
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
        
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger">Not a user</Link>
      </form>
      </div>
    </div>
  )
}

export default Login