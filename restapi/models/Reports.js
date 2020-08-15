const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId, Array } = Schema.Types;

const reportsSchema = new Schema({
    
    attackerId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    
    defenderId:{
        type: ObjectId,
        required: true,
        ref: "User"
        
    },
    attackerInfo:{
        type: Array,
        default: [],
    },
    defenderInfo:{
        type: Array,
        default: [],
    }
    
});

module.exports = new Model('Reports', reportsSchema);