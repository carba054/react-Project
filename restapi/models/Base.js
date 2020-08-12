const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId, Number, Array } = Schema.Types;

const baseSchema = new Schema({
    units: [
        {
        unitId: {
            type: ObjectId,
            ref: "Units"
        },
        quantity: {
            type: Number,
            default: 1
        }
        
        }],
    industrial: [
        {
        factoryId: {
            type: ObjectId,
            ref: "Factory"
        },
        quantity: {
            type: Number,
            default: 1
        }
        
        }],
    userId: {
        type: ObjectId,
        unique: true,
        ref: "User"
    }
});

module.exports = new Model('Base', baseSchema);