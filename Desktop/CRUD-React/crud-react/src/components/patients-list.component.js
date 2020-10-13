import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import { Link } from "react-router-dom";

export default class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFirstName = this.onChangeSearchFirstName.bind(this);
    this.retrievePatients = this.retrievePatients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePatient = this.setActivePatient.bind(this);
    this.removeAllPatients = this.removeAllPatients.bind(this);
    this.searchFirstName = this.searchFirstName.bind(this);

    this.state = {
      patients: [],
      currentPatient: null,
      currentIndex: -1,
      searchFirstName: ""
    };
  }

  componentDidMount() {
    this.retrievePatients();
  }

  onChangeSearchFirstName(e) {
    const searchFirstName = e.target.value;

    this.setState({
      searchFirstName: searchFirstName
    });
  }

  retrievePatients() {
    PatientDataService.getAll()
      .then(response => {console.log(response.data);
        this.setState({
          patients: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePatients();
    this.setState({
      currentPatient: null,
      currentIndex: -1
    });
  }
  setActivePatient(patient, index) {
    this.setState({
      currentPatient: patient,
      currentIndex: index
    });
  }

 removeAllPatients() {
    PatientDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchFirstName() {
    PatientDataService.findByFirstName(this.state.searchFirstName)
      .then(response => {
        this.setState({
          patients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchFirstName,patients, currentPatient, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by FirstName"
              value={searchFirstName}
              onChange={this.onChangeSearchFirstName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFirstName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Patients List</h4>
          <ul className="list-group">
            {patients &&
              patients.map((patient, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePatient(patient, index)}
                  key={index}
                >
                  {patient.FirstName}
                  
    
                </li>
              ))}
          </ul>

           <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPatients}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPatient ? (
            <div>
              <h4>Patient</h4>
              <div>
                <label>
                  <strong>FirstName:</strong>
                </label>{" "}
                {currentPatient.FirstName}
              </div>
              <div>
                <label>
                  <strong>LastName:</strong>
                </label>{" "}
                {currentPatient.LastName}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentPatient.Email}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentPatient.Address}
              </div>
              <div>
                <label>
                  <strong>Postalcode:</strong>
                </label>{" "}
                {currentPatient.Postalcode}
              </div>
              <div>
                <label>
                  <strong>Dob:</strong>
                </label>{" "}
                {currentPatient.Dob}
              </div>

              <Link
                to={"/patients/" + currentPatient.PatientId}
                
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Patient...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
