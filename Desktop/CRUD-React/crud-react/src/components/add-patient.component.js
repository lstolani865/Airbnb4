import React, { Component } from "react";
import PatientDataService from "../services/patient.service";

export default class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePostalcode = this.onChangePostalcode.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.savePatient = this.savePatient.bind(this);
    this.newPatient = this.newPatient.bind(this);

    this.state = {
      id: null,
      FirstName: "",
      LastName:  "",
      Email: "",
      Address: "",
      Postalcode: "",
      Dob: "",

      submitted: false
    };
  }

  onChangeFirstName(e) {
    this.setState({
      FirstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      LastName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      Email: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      Address: e.target.value
    });
  }

  onChangePostalcode(e) {
    this.setState({
      Postalcode: e.target.value
    });
  }

  onChangeDob(e) {
    this.setState({
      Dob: e.target.value
    });
  }
 savePatient() {
    var data = {
      PatientId: this.state.PatientId,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Address: this.state.Address,
      Postalcode: this.state.Postalcode,
      Dob: this.state.Dob
     };

    PatientDataService.create(data)
      .then(response => {
        this.setState({
          PatientId: response.data.PatientId,
         FirstName: response.data.FirstName,
         LastName: response.data.LastName,
         Email: response.data.Email,
         Address: response.data.Address,
         Postalcode: response.data.Postalcode,
         Dob: response.data.Dob,
        
         submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPatient() {
    this.setState({
        id: null,
        FirstName: "",
        LastName:  "",
         Email: "",
         Address: "",
         Postalcode: "",
         Dob: "",
      
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPatient}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="FirstName">FirstName</label>
              <input
                type="text"
                className="form-control"
                id="FirstName"
                required
                value={this.state.FirstName}
                onChange={this.onChangeFirstName}
                name="FirstName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="LastName">LastName</label>
              <input
                type="text"
                className="form-control"
                id="LastName"
                required
                value={this.state.LastName}
                onChange={this.onChangeLastName}
                name="LastName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                className="form-control"
                id="Email"
                required
                value={this.state.Email}
                onChange={this.onChangeEmail}
                name="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                className="form-control"
                id="Address"
                required
                value={this.state.Address}
                onChange={this.onChangeAddress}
                name="Address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Postalcode">Postalcode</label>
              <input
                type="text"
                className="form-control"
                id="Postalcode"
                required
                value={this.state.Postalcode}
                onChange={this.onChangePostalcode}
                name="Postalcode"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Dob">Dob</label>
              <input
                type="text"
                className="form-control"
                id="Dob"
                required
                value={this.state.Dob}
                onChange={this.onChangeDob}
                name="Dob"
              />
            </div>
            <button onClick={this.savePatient} className="btn btn-success">
              Submit 
            </button>
          </div>
        )}
      </div>
    );
  }
}
