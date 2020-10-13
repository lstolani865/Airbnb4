module.exports = app => {
    const patients = require("../controllers/appointment.controller.js");
  
    app.post("/patients", patients.create);
  
    app.get("/patients", patients.findAll);
    
    app.get("/patient/:PatientId", patients.findOne);
  
    app.put("/patient/:PatientId", patients.update);
  
    app.delete("/patient/:PatientId", patients.delete);
  
    app.delete("/patients", patients.deleteAll);
  };