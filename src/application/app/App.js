import React from 'react';
import './App.css';
import NavigationBar from '../../components/NavigationBar';
import { Container, Row, Col } from 'react-bootstrap';
import JumbotronData from '../../components/Jumbotron';
import Footer from '../../components/Footer';
import AddState from '../../components/AddState';
import StateList from '../../components/StateList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginComponent from '../../components/Login';

function App() {
  const marginTop = {
    marginTop: "20px"
  }

  return (
    <Router>
      <NavigationBar/>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={JumbotronData}/>
              <Route path="/add" exact component={AddState}/>
              <Route path="/list" exact component={StateList}/>
              <Route path="/edit/:id" exact component={AddState}/>
              <Route path="/login" exact component={LoginComponent}/>
              <Route path="/logout" exact component={LoginComponent}/>
              
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;