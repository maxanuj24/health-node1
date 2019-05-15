const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    address: String,
    phone: Number,
    consultedBy: String,
    consulted: Boolean,
    complains: String,
    results: String,
    prescription: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', PatientSchema);
