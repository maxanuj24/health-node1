module.exports = (app) => {
    const patient = require('../controllers/patient.controller.js');

    // Create a new Note
    app.post('/patient', patient.create);

    // Retrieve all Notes
    app.get('/patient', patient.findAll);

    // Retrieve a single Note with noteId
    app.get('/patient/:patientId', patient.findOne);

    // Update a Note with noteId
    app.put('/patient/:patientId', patient.update);

    // Delete a Note with noteId
    app.delete('/patient/:patientId', patient.delete);
}   