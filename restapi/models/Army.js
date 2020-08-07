const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId, Number } = Schema.Types;

const armySchema = new Schema({
    unitId: {
        type: ObjectId,
        ref: "Units"
    },
    quantity: {
        type: Number,
        default: 0
    },
    userId: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = new Model('Army', armySchema);