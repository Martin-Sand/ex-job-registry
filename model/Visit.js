const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var visitSchema = new Schema({
    elevatorID: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        default: "Unspecified"
    },
    coordinates: {
        type: String,
        default: "Not found"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Visit', visitSchema);