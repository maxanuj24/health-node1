const Patient = require('../model/patient.model.js');


exports.create=(req,res)=>{

    const patient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone,
        consultedBy: req.body.consultedBy,
        consulted: req.body.consulted,
        complains: req.body.complains,
        results: req.body.results,
        prescription: req.body.prescription
    });

    patient.save().
    then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Patient."
        });
    });
  };


  
exports.findAll = (req, res) => {
    Patient.find()
    .then(patients => {
        res.send(patients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving events."
        });
    });
};


exports.findOne = (req, res) => {
    Patient.findById(req.params.patientId)
    .then(Patient => {
        if(!Patient) {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.patientId
            });            
        }
        res.send(Patient);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.patientId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Patient with id " + req.params.patientId
        });
    });
};

//-------------------------------------------------------------------------------------------------------------------------


exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstName) {
        return res.status(400).send({
            message: "Patient content can not be empty"
        });
    }

    Patient.findByIdAndUpdate(req.params.patientId, {
        firstName: req.body.firstName || "Untitled patient",
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone,
        consultedBy: req.body.consultedBy,
        consulted: req.body.consulted,
        complains: req.body.complains,
        results: req.body.results,
        prescription: req.body.prescription 
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "patient not found with id " + req.params.patientId
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.patientId
            });                
        }
        return res.status(500).send({
            message: "Error updating patient with id " + req.params.patient.patientId
        });
    });
};









//-------------------------------------------------------------------------------------------------------------------------

exports.delete = (req, res) => {
    Patient.findByIdAndRemove(req.params.patientId)
    .then(patient => {
        if(!patient) {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.patientId
            });
        }
        res.send({message: "Patient deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "patient not found with id " + req.params.patientId
            });                
        }
        return res.status(500).send({
            message: "Could not delete patient with id " + req.params.patientId
        });
    });
};