import React, {Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


import Addpatient from "./components/add-patient.component";
import Patient from "./components/patient.component";
import PatientsList from "./components/patients-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/patients" className="navbar-brand">
            ReactApp
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/patients"} className="nav-link">
                Patients
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/patients"]} component={PatientsList} />
            <Route exact path="/add" component={Addpatient} />
            <Route path="/patients/:id" component={Patient} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
