const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Array } = Schema.Types;

const unitsSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    imgUrl:{
        type:String,
        required: true
    },
    attackInfantry:{
        type: Number,
        default: 0
    },
    attackArmored:{
        type: Number,
        default: 0
    },
    attackHelicopter:{
        type: Number,
        default: 0
    },
    attackFighter:{
        type: Number,
        default: 0
    },
    attackDefence:{
        type: Number,
        default: 0
    },
    life:{
        type: Number,
        required: true
    },
    population:{
        type: Number,
        required: true
    },
    typeId:{
        type: ObjectId,
        ref: "UnitType"
    },
    priorityTargetsType:{
        type: Array
    }


}, { timestamps: { createdAt: 'created_at' } });

module.exports = new Model('Units', unitsSchema);