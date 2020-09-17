#### Sign Up Registration Featured

import React, { Component } from "react";
import Axios from "axios";
import "./Signup.css";
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state=this.initialState;
    this.state = {
      signUpFlag = false
    };
  }

  initialState = {
    username: '',
    password: '',
    signupMessage: '',
    emailAddress: '',
    firstname: '',
    lastname: '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  SignupHandler = (e) => {
    e.preventDefault();
    this.setState({"signUpFlag": true});
  };

  RegisterUser =(event)=>{
    event.preventDefault();
    console.log(this.state.username);
    const postData = {
      id: Math.floor(Math.random() * 100) + 1,
      username: this.state.username,
      password: this.state.password,
      emailAddress: this.state.emailAddress,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    };
    Axios.post("http://localhost:8080/countryapp/signup", postData).then(
      (res) => {
        console.log("User registered" + res.status);
        this.setState({ signupMessage: "Successfull!" });
        setTimeout(()=> this.setState({'signupMessage':'', 'signUpFlag': false}), 2000);
        setTimeout(()=> this.setState(() => this.initialState), 1);
        setTimeout(()=> this.LoginRedirect(), 2000);
      }
    );

  }

  LoginRedirect = () => {
    this.props.history.push("/");
  };

  Login = () => {
    this.props.history.push("/");
  };
  render() {
    const {emailAddress, password, username, firstname, lastname} =this.state;
    return (
      <div className="SignupForm">
        <form onSubmit={this.submitForm}>
          <br />
          <h3>Sign Up - New User</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              name="emailAddress"
              value={emailAddress}
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <div className="form-group" style={{"display": this.state.signUpFlag ? "none" :"block"}}>
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter User Name"
            name="username"
            value={username}
            onChange={this.onChange}
            required
          />
          </div>
          <br/>
          <div className="form-group" style={{"display": this.state.signUpFlag ? "none" :"block"}}>
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter First Name"
            name="firstname"
            value={firstname}
            onChange={this.onChange}
            required
          />
          </div>
          <br />
          <div className="form-group" style={{"display": this.state.signUpFlag ? "none" :"block"}}>
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            name="lastname"
            value={lastname}
            onChange={this.onChange}
            required
          />
          </div>
          <br />
          <br />
          
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={(event) => 
                {this.state.signUpFlag ? null : this.SignupHandler(event)}}
            >
              {this.state.signUpFlag ? "Register" : "Signup"}
            </button>
            <br />
            <p style={{ color: "green" }}>{this.state.signupMessage}</p>
          
          <div style={{"display": this.state.signUpFlag ? "none" :"block"}}>
            <p className="LoginButton" onClick={this.Login}>
              Login
            </p>
          </div>
        </form>
      </div>
    );
  }
}
