import React,{Component} from 'react';
import {Jumbotron} from 'react-bootstrap';

class JumbotronData extends Component{

    render=()=>{
        return <Jumbotron className="bg-dark text-white">
        <h1>Welcome To State Record</h1>
        <blockquote className="blockquote mb-0">
          <p>
            This Application is DEMO project to maintain the records for the states.
          </p>
          <footer className="blockquote-footer ">
            Peu Majumder
          </footer>
        </blockquote>
      </Jumbotron>
    }
}

export default JumbotronData;