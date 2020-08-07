const models = require('../models');
const jwt = require('../utils/jwt');
module.exports = {
    get: (req, res, next) => {
        
        const token = req.headers.authorization

        jwt.verifyToken(token).then(data => {
            models.Army.find({userId: data.id}).populate('unitId')
            .then((units) => {
                res.send(units)
            })
          }).catch(next);

    },

    post: (req, res, next) => {

        const { _id } = req.user;

        const { unitId, quantity} = req.body; 

        models.Army.findOneAndUpdate({userId: _id, unitId }, {quantity})
        .then((result)=>{
                result?console.log(result):models.Army.create({userId: _id, unitId, quantity}).then((unit)=>res.send(result))
            }).catch(next);
          
    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};