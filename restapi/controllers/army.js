const models = require('../models');
// const jwt = require('../utils/jwt');
module.exports = {
    get: {
        owner:(req, res, next) => {
        
            const id = req.params.id;
            models.Army.find({userId: id}).populate({
                path : 'army.unitId',
                populate : {
                  path : 'typeId'
                }
              })
            .then((units) => {
                
                res.send(units[0].army)
            }).catch(next);
    
        },
        all:(req, res, next) => {
            
            models.Army.find({}).populate('userId')
            .then((units) => {
                res.send(units)
            }).catch(next);
        }

    },

    post: (req, res, next) => {
        
        const { _id } = req.user;

        const { unitId, quantity } = req.body; 
        
        models.Army.find({userId: _id, army:{$elemMatch:{unitId}}})
        .then((result)=>{
            if(result.length === 0){
                return models.Army.updateOne({userId: _id}, {"$push":{army:{unitId,quantity}}} )
            }
             return models.Army.findOneAndUpdate({userId: _id, army:{$elemMatch:{unitId}}}, {$set:{"army.$":{unitId,quantity}}}, {new: true, useFindAndModify: false} )
        }).then((army)=>{
            // console.log(army)
            return res.send(army)
        }).catch(next)
    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};