const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, ObjectId } = Schema.Types;

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        require: true
    },

    wins: {
        type: Number,
        default: 0
        
    },
    losses: {
        type: Number,
        default: 0
    },
    metal: {
        type: Number,
        default: 10000
    },
    mineral: {
        type: Number,
        default: 5000
    },
    fuel: {
        type: Number,
        default: 500
    },
    maxPopulation:{
        type: Number,
        default: 10
    },
    currentPopulation:{
        type: Number,
        default: 0
    }
    // posts: [{ type: ObjectId, ref: "Origami" }]
    

});

userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = new Model('User', userSchema);