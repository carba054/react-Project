const models = require('../models');
// const jwt = require('../utils/jwt');
module.exports = {
    get: (req, res, next) => {
        
        models.Factory.find({})
            .then((factory) => {
                res.send(factory)
            }).catch(next);

    },

    post: (req, res, next) => {
        
      
    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};