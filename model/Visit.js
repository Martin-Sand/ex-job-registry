const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var visitSchema = new Schema({
    elevatorID: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Visit', visitSchema);