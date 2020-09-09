import React,{Component} from 'react';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare, faEdit, faSign, faRegistered} from '@fortawesome/free-solid-svg-icons';
import ToastMessage from './ToastMessage';
import axios from 'axios';

class LoginComponent extends Component{

    constructor(props){
      super(props);
      this.state=this.initialState;
      this.state.login=false;
      this.state.loggedIn=false;
      this.state.register=false;
      this.authenticate = this.authenticate.bind(this);
      this.dataChanged = this.dataChanged.bind(this);
    }

    initialState = {
      register: false, userName:'', password:'', firstName:'', lastName:'', emailId:''
    };

    componentDidMount(){
     
    };

    //This function is used to save the Books.......
    authenticate = event =>{
      event.preventDefault();

      const auth ={
        userName: this.state.userName,
        password: this.state.password
      };
      
      axios.post("http://localhost:8080/isAuthenticated",auth)
      .then(response => response.data.data.status)
      .then(status => {
        if(status !== null && status !== "Failure"){
          this.setState({"login": true, "linkType":"save"});
          setTimeout(()=> this.setState({'login':true}), 2000);
          setTimeout(() => this.register(), 2000);
          setTimeout(() => this.stateList(), 2000);
        }
        else{
          this.setState({"login": false});
        }
      });
      this.setState(() => this.initialState);
    };

    dataChanged = event =>{
      this.setState({
        [event.target.name]:event.target.value
      });
    };

    stateList = () =>{
      return this.props.history.push("/list");
    };

    //Links to the book List Page.........
    register = () =>{
      //return this.props.history.push("/list");
      this.setState({"register":true});
    };

    registerUser =()=>{

      const auth ={
        user_name: this.state.userName,
        password: this.state.password,
        email_id: this.state.emailId,
        first_name: this.state.firstName, 
        last_name: this.state.lastName
      };
      
      axios.post("http://localhost:8080/registerUser",auth)
      .then(response => response.data.output)
      .then(output => {
        if(output !== null){
          this.setState({"login": true, "linkType":"save"});
          setTimeout(()=> this.setState({'login':true}), 2000);
          setTimeout(()=> this.setState({'login':false}), 2000);
          setTimeout(()=> this.login(), 2000);
        }
        else{
          this.setState({"login": false});
        }
      });
      this.setState(() => this.initialState);
    
    };

    login = () =>{
      this.setState({'loggedIn':true, userName: this.state.userName, password: this.state.password});
      return  this.props.history.push("/login");
    }

    logout =()=>{
      this.setState({'loggedIn':false});
      return  this.props.history.push("/login");
    }

    render=()=>{
        const{userName, password, firstName, lastName, emailId}=this.state;

        return <div className="bg-dark text-white">
        <h1>{this.state.loggedIn ? "Logout": "Login"}</h1>
        <div style={{"display":this.state.login ? "block" : "none"}}>
          <ToastMessage show= {this.state.login} message= {"Logged In Successfully."} type={"success"}/>
        </div>
        <Card className="border border-dark bg-dark text-white center">
        <div style={{"display": this.state.loggedIn ? "none" :"block"}}>
          <Card.Header><FontAwesomeIcon icon={this.state.register ? faEdit : faPlusSquare} />{this.state.login ? this.state.userName :this.state.userName +" logged In with your credentials"}</Card.Header>
          </div>
          <Form id="bookFormId" onSubmit={this.authenticate} onReset={this.register}>
          <Card.Body> 
              <div style={{"display": this.state.loggedIn ? "none" :"block"}}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridUser">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="userName" type="test" 
                  value={userName}
                  onChange={this.dataChanged}
                  placeholder="Enter User Name" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="password" type="password" 
                  value={password}
                  onChange={this.dataChanged}
                  placeholder="Enter Password" />
                </Form.Group>
              </Form.Row>

              <Form.Row style={{"display":this.state.register ? "block" : "none"}}>
                <Form.Group as={Col} controlId="fN">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="firstName" type="test" 
                  value={firstName}
                  onChange={this.dataChanged}
                  placeholder="Enter First Name" />
                </Form.Group>
              </Form.Row>

              <Form.Row style={{"display":this.state.register ? "block" : "none"}}>
                <Form.Group as={Col} controlId="lN">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="lastName" type="test" 
                  value={lastName}
                  onChange={this.dataChanged}
                  placeholder="Enter Last Name" />
                </Form.Group>
              </Form.Row>

              <Form.Row style={{"display":this.state.register ? "block" : "none"}}>
                <Form.Group as={Col} controlId="emailId">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="emailId" type="test" 
                  value={emailId}
                  onChange={this.dataChanged}
                  placeholder="Enter Email Id" />
                </Form.Group>
              </Form.Row>
              </div>
          </Card.Body>
          <Card.Footer style={{"textAlign":"center", "display":this.state.register ? "none" : "block"}}>
            <div style={{"display": this.state.loggedIn ? "none" :"block"}}>
            <Button variant="success" type="submit">
              <FontAwesomeIcon icon={faSign}/> {"Login"}
            </Button>{' '}
            <Button variant="info" type="reset" >
              <FontAwesomeIcon icon={faRegistered} /> Register
            </Button>
            </div>
            <div style={{"display": this.state.loggedIn ? "block" :"none"}}>
            <Button variant="info" type="submit" onClick={this.logout.bind()}>
              <FontAwesomeIcon icon={faSign}/> {"Logout"}
            </Button>
            </div>
          </Card.Footer>
          <Card.Footer style={{"textAlign":"center", "display":this.state.register ? "block" : "none"}}>
            <Button variant="info" type="button" onClick={this.registerUser.bind()}>
                <FontAwesomeIcon icon={faRegistered} /> Register
                </Button>
          </Card.Footer>
          </Form>
        </Card>
      </div>
    }
}

export default LoginComponent;