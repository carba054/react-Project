const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId, Number, Array } = Schema.Types;

const armySchema = new Schema({
    army: [
        {
        unitId: {
            type: ObjectId,
            ref: "Units"
        },
        quantity: {
            type: Number
        }
        
        }],
    // industrial: [
    //     {
    //     factoryId: {
    //         type: ObjectId,
    //         ref: "Factory"
    //     },
    //     quantity: {
    //         type: Number
    //     }
        
    //     }],
    userId: {
        type: ObjectId,
        unique: true,
        ref: "User"
    }
});

module.exports = new Model('Army', armySchema);