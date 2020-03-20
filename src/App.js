import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
} from "react-router-dom";

import './App.css';

import EventList from './apps/EventList';
import EventDetails from "./apps/EventDetails";
import CreateUpdate from "./apps/EventCreateUpdate"
import { Navbar } from "reactstrap";

class App extends Component {
  render() {
    return (
      < BrowserRouter >
        <Navbar color="info" className="fixed-top"
          style={{
            position: "sticky",
            top: "0"
          }}>
          <Link to={"/"} style={{ textDecoration: 'none', color: "#fff", fontSize: "1em", padding: "5px 0" }} >FlyEvents</Link>
          <Link className="btn btn-warning" to={"/events/create/"} style={{ textDecoration: 'none', color: "#fff", fontSize: "1em", padding: "5px 10px" }} >Create event</Link>
        </Navbar>
        <div className="content mt-1" >
          <Route path="/" exact component={EventList} />
          <div>
          </div>
          <Route path="/event/:pk" component={EventDetails} />
          <Route path="/events/create/" component={CreateUpdate} />
          <Route exact path="/events/update/:pk" component={CreateUpdate} />
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
