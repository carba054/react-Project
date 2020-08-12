const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const factorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    metal:{
        type: Number,
        default: 0,
        
    },
    mineral:{
        type: Number,
        default: 0,
    },
    href:{
        type: String,
        required: true
    },
    unlock:{
        type: ObjectId,
        required: true,
        ref: "UnitType"
    }
});

module.exports = new Model('Factory', factorySchema);