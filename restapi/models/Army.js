const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId, Number, Array } = Schema.Types;

const armySchema = new Schema({
    army: {
        type: Array,
        unitId: {
            type: ObjectId,
            ref: "Unit"
        },
        quantity: {
            type: Number
        }
        
    },
    userId: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = new Model('Army', armySchema);