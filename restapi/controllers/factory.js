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
        const { name, metal, mineral, href, unlock } = req.body;
        
        models.Factory.create({ name, metal, mineral, href, unlock })
        .then((factory)=>{
                res.send(factory);
        }).catch(next);
      
    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};