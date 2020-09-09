import React,{Component} from 'react';
import {Jumbotron, Card, Form,  Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ToastMessage from './ToastMessage';

class AddState extends Component{

    constructor(props){
      super(props);
      this.state=this.initialState;
      this.state.show=false;
      this.submitState = this.submitState.bind(this);
      this.dataChanged = this.dataChanged.bind(this);
      this.state ={
        stateListData : []
      };
    }

    initialState = {
      id:'', stateName:'', capital:'', countryId:''
    }

    componentDidMount(){
      const stateId= +this.props.match.params.id;
      if(stateId){
        this.extractStateById(stateId);
      }
    };

   
    extractStateById=(stateId)=>{
      console.log("data updated");
      axios.get("http://localhost:8080/getSelectedState/"+stateId)
      .then(response =>response.data.output)
      .then((output)=>this.setState({stateListData: output}))
      .then(stateListData => this.setState({
        id: this.state.stateListData[0].state_id,
        stateName: this.state.stateListData[0].state_name, 
        capital: this.state.stateListData[0].capital, 
        countryId: this.state.stateListData[0].country_id
      }));
    };

    submitState = event =>{
      event.preventDefault();

      const state ={
        stateName: this.state.stateName,
        capital: this.state.capital,
        countryId: this.state.countryId
      };
      
      axios.post("http://localhost:8080/addNewState",state)
      .then(response => response.data.output)
      .then(output => {
        if(output != null){
          this.setState({"show": true, "linkType":"save"});
          setTimeout(() => this.setState({"show": false}), 2000);
          setTimeout(() => this.stateList(), 2000);
        }
        else{
          this.setState({"show": false});
        }
      });
      this.setState(() => this.initialState);
    };
     //update
    updateState = event =>{
      event.preventDefault();

      const state ={
        State_Name: this.state.stateName,
        Capital: this.state.capital,
        Country_id: this.state.countryId
      };
      
      axios.put("http://localhost:8080/updtateStatesById/"+this.state.id, state)
      .then(response => response.data)
      .then(data => {
        if(data != null){
          this.setState({"show": true});
          //setTimeout(() => this.setState({"show": false}), 2000);
          //setTimeout(() => this.stateList(), 0);
          this.stateList();
        }
        else{
          this.setState({"show": false});
        }
      });
      this.setState(() => this.initialState);
    };

    resetState = () =>{
      this.setState(() => this.initialState);
    };

    dataChanged = event =>{
      this.setState({
        [event.target.name]:event.target.value
      });
    }

    //Links to the state List Page.........
    stateList = () =>{
      return this.props.history.push("/list");
    };

    render=()=>{
        const{stateName, capital, countryId}=this.state;

        return <Jumbotron className="bg-dark text-white">
        <h1>{this.state.id ? "Update Entry for Old State":"Create Entry for New State"}</h1>
        <div style={{"display":this.state.show ? "block" : "none"}}>
          <ToastMessage show= {this.state.show} message= {this.state.linkType === "save" ? "State Saved Successfully.":"State Updated Successfully."} type={"success"}/>
        </div>
        <Card className="border border-dark bg-dark text-white center">
          <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update State of your State Library":"Add State to your State Library"}</Card.Header>
            <Form id="bookFormId" onSubmit={this.state.id ? this.updateState : this.submitState} onReset={this.resetBook}>
          <Card.Body> 
              <Form.Row>
                <Form.Group as={Col} controlId="formGridStateName">
                  <Form.Label>State Name</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="stateName" type="test" 
                  value={stateName}
                  onChange={this.dataChanged}
                  placeholder="Enter State Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCapital">
                  <Form.Label>Capital</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="capital" type="test" 
                  value={capital}
                  onChange={this.dataChanged}
                  placeholder="Enter Capital Name" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCountryId">
                  <Form.Label>Country Id</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="countryId" type="test" 
                  value={countryId}
                  onChange={this.dataChanged}
                  placeholder="Enter Country Id" />
                </Form.Group>
              </Form.Row>
          </Card.Body>
          <Card.Footer style={{"textAlign":"right"}}>
            <Button variant="success" type="submit">
              <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update":"Save"}
            </Button>{' '}
            <Button variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>{' '}
            <Button variant="info" type="button" onClick={this.stateList.bind()}>
              <FontAwesomeIcon icon={faList} /> State List
            </Button>
          </Card.Footer>
          </Form>
        </Card>
      </Jumbotron>
    }
}

export default AddState;