
const Patient = require("../models/appointment.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      
    }
  
    // Create a appointment
    const patient = new Patient({
      PatientId: req.params.PatientId,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Address: req.body.Address,
      Postalcode: req.body.Postalcode,
      Dob: req.body.Dob,
    });
      
      
      // Save Appointment in the database

      Patient.create(patient, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Patient."
          });
        else res.send(data);
      });
    };
    

  exports.findAll = (req, res) => {
    Patient.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving patients."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Patient.findById(req.params.PatientId, (err, data) => {
      if (err) {
        if (err.kind === "Not_found") {
          res.status(404).send({
            message: `Not found patient with id ${req.params.PatientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Patient with id " + req.params.PatientId
          });
        }
      } else res.send(data);
    });
  };
  

  exports.update = (req, res) => {
    console.log("exports.update -> req", req.body)
    res.status(200).send({
      message: "test message"
    });
      return;
    
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Patient.updateById(
      req.params.PatientId,
      new Patient(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Patient with id ${req.params.PatientId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Patient with id " + req.params.PatientId
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Patient.remove(req.params.PatientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Patient with id ${req.params.PatientId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Patient with id " + req.params.PatientId
          });
        }
      } else res.send({ message: `Patient was deleted successfully!` });
    });
  };
  

  exports.deleteAll = (req, res) => {
    Patient.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all patients."
        });
      else res.send({ message: `All patients were deleted successfully!` });
    });
  };