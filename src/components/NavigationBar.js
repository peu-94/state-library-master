import React,{Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends Component{
    render = () =>{
      return <Navbar bg="dark" variant="dark">
            <Link to={""} className="navbar-brand">
                <img src="https://www.jing.fm/clipimg/full/56-560493_books-icon-png-english-language-arts-icon.png" width="50px"/>State Record
            </Link>
            <Nav className="mr-auto">
                <Link to={"add"} className="nav-link" href="#addBook">Add State</Link>
                <Link to={"list"} className="nav-link" href="#bookList">State List</Link>
                {}<Link to={"login"} className="nav-link" href="#bookList">Login</Link> 
            </Nav>
        </Navbar>
    }
}

export default NavigationBar;