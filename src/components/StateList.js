import React,{Component} from 'react';
import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import ToastMessage from './ToastMessage';
import {Link} from 'react-router-dom';
import axios from 'axios';

class StateList extends Component{
    
  constructor(props){
    super(props);
    this.state ={
      stateList : []
    };
    //state show to represent the toast on condition.
    this.state.show=false;
  }

  componentDidMount=()=>{
    axios.get("http://localhost:8080/getAllStates")
    .then(response => response.data.output)
    .then((output)=>this.setState({stateList: output}))
  }

  deleteState = (stateid) => {
      axios.delete("http://localhost:8080/deleteStatesById/"+stateid)
      .then(response =>{
        if(response.data !=null){
          this.setState({"show": true});
          setTimeout(() => this.setState({"show": false}), 2000);
          this.setState({
            stateList: this.state.stateList.filter(state => state.state_id !== stateid)
          });
        }
        else{
          this.setState({"show": false});
        }
      })
      
      }

       
    render=()=>{
        return(
         <div>
           <div style={{"display": this.state.show ? "block" : "none"}}>
             <ToastMessage show= {this.state.show} message={"Book Deleted Successfully."} type={"danger"}/>
           </div>
           <h1>Available List of States in our DataBase</h1>
        <Card className="border border-dark bg-dark text-white center">
          <Card.Header><FontAwesomeIcon icon={faList} /> State List</Card.Header>
          <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr colSpan="6"> 
                <th>Id</th>
                <th>States</th>
                <th>Capital</th>
                <th>CountryId</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stateList.length === 0 ?
                <tr align="center">
                  <td colSpan="6">No Data Available</td>
                </tr>
                :
                this.state.stateList.map((state)=>(
                  <tr key={state.state_id}>
                    <td>{state.state_id}</td>
                    <td>{state.state_name}</td>
                    <td>{state.capital}</td>
                    <td>{state.country_id}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={"edit/"+state.state_id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{''}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteState.bind(this, state.state_id)}><FontAwesomeIcon icon={faTrash} /></Button>{''}
                      </ButtonGroup>
                    </td>
                </tr>
                ))
              }
            </tbody>
          </Table>
          </Card.Body>
        </Card>
         </div>
        )
    }
  }

export default StateList;