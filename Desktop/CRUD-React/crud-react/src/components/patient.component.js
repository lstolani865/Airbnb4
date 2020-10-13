import React, { Component } from "react";
import PatientDataService from "../services/patient.service";

export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePostalcode = this.onChangePostalcode.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this)
    this.getPatient = this.getPatient.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.deletePatient = this.deletePatient.bind(this);

    this.state = {
      currentPatient: {
        id: null,
        FirstName: "",
        LastName: "",
        Email: "",
        Address: "",
        Postalcode: "",
        Dob: "",
     },
      message: ""
    };
  }
    
     componentDidMount() {
    this.getPatient(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    const FirstName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          FirstName: FirstName
        }
      };
    });
  }

  onChangeLastName(e) {
    const LastName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          LastName: LastName
        }
      };
    });
  }

  onChangeEmail(e) {
    const Email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEmail: {
          ...prevState.currentEmail,
          Email: Email
        }
      };
    });
  }

  onChangeAddress(e) {
    const Address = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          Address: Address
        }
      };
    });
  }

  onChangePostalcode(e) {
    const Postalcode = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPostalcode: {
          ...prevState.currentPatient,
          Postalcode: Postalcode
        }
      };
    });
  }

  onChangeDob(e) {
    const Dob = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          Dob: Dob
        }
      };
    });
  }
getPatient(PatientId) {
    PatientDataService.get(PatientId)
      .then(response => {
        this.setState({
          currentPatient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
   updatePatient() {
    PatientDataService.update(
      this.state.currentPatient.PatientId,
      this.state.currentPatient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Patient was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePatient() {    
    PatientDataService.delete(this.state.currentPatient.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/patients')
      })
      .catch(e => {
        console.log(e);
      });
  }

 
  render() {
    const { currentPatient } = this.state;
    console.log(this.state.message);

    return (
      <div>
        {currentPatient ? (
          <div className="edit-form">
            <h4>Patient</h4>
            <form>
              <div className="form-group">
                <label htmlFor="FirstName">FirstName</label>
                <input
                  type="text"
                  className="form-control"
                  id="FirstName"
                  value={currentPatient.FirstName}
                  onChange={this.onChangeFirstName}
                />
              </div>
              <div className="form-group">
              <label htmlFor="LastName">LastName</label>
              <input
                type="text"
                className="form-control"
                id="LastName"
                value={currentPatient.LastName}
                onChange={this.onChangeLastName}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                className="form-control"
                id="Email"
                value={currentPatient.Email}
                onChange={this.onChangeEmail}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                className="form-control"
                id="Address"
                value={currentPatient.Address}
                onChange={this.onChangeAddress}
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="Postalcode">Postalcode</label>
              <input
                type="text"
                className="form-control"
                id="Postalcode"
                value={currentPatient.Postalcode}
                onChange={this.onChangePostalcode}
                
             />
            </div>

            <div className="form-group">
              <label htmlFor="Dob">Dob</label>
              <input
                type="text"
                className="form-control"
                id="Dob"
                value={currentPatient.Dob}
                onChange={this.onChangeDob}
              />
            </div>
     </form>
     <button
              className="badge badge-danger mr-2"
              onClick={this.deletePatient}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePatient}
              
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Patient</p>
          </div>
        )}
      </div>
    );
  }
}
