const sql = require("./db.js");

// constructor
const Patient = function(patient) {
  this.PatientId = patient.PatientId
  this.FirstName = patient.FirstName;
  this.LastName = patient.LastName;
  this.Email = patient.Email;
  this.Address = patient.Address
  this.Postalcode = patient.Postalcode;
  this.Dob = patient.Dob;
};

Patient.create = (newPatient, result) => {
  sql.query("INSERT INTO patient SET ?", newPatient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Patient: ", { id: res.insertId, ...newPatient });
    result(null, { id: res.insertId, ...newPatient });
  });
};

Patient.findById = (PatientId, result) => {
  sql.query(`SELECT * FROM patient WHERE PatientId = ${PatientId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Patient: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

Patient.getAll = result => {
  sql.query("SELECT * FROM patient", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("patients: ", res);
    result(null, res);
  });
};

Patient.updateById = (id, patient, result) => {
  sql.query(
    "UPDATE patient SET Email = ?, FirstName = ?, LastName = ?, Address = ?, Postalcode = ?, Dob = ? WHERE PatientId = ?",
    [patient.Email, patient.FirstName, patient.LastName, patient.Address, patient.Postalcode, patient.Dob, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
      
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated patient: ", { id: id, ...patient });
      result(null, { id: id, ...patient });
    }
  );
};

Patient.remove = (id, result) => {
  sql.query("DELETE FROM patient WHERE PatientId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted patient with id: ", id);
    result(null, res);
  });
};

Patient.removeAll = result => {
  sql.query("DELETE FROM patient", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} patients`);
    result(null, res);
  });
};

module.exports = Patient;
