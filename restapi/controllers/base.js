const models = require('../models');
// const jwt = require('../utils/jwt');
module.exports = {
    get: {
        ownerArmy:(req, res, next) => {
        
            const id = req.params.id;
            
            models.Base.find({userId: id}).populate({
                path : 'units.unitId',
                populate : {
                  path : 'typeId'
                }
              })
            .then((units) => {
                
                const result = units[0].units.map((el)=> {
                    return el  
                })
                //console.log(result)
               res.send(result)
            }).catch(next);
    
        },
        ownerFactory(req, res, next){
            console.log('Factory')
        },
        all:(req, res, next) => {
            
            models.Base.find({}).populate('userId')
            .then((units) => {
                res.send(units)
            }).catch(next);
        }

    },

    post: {
        addUnit:(req, res, next) => {
        
            const { _id } = req.user;
    
            const { unitId, quantity } = req.body; 
            
            models.Base.find({userId: _id, units:{$elemMatch:{unitId}}})
            .then((result)=>{
                if(result.length === 0){
                    return models.Base.updateOne({userId: _id}, {"$push":{units:{unitId,quantity}}} )
                }
                 return models.Base.findOneAndUpdate({userId: _id, units:{$elemMatch:{unitId}}}, {$set:{"units.$":{unitId,quantity}}}, {new: true, useFindAndModify: false} )
            }).then((units)=>{
                // console.log(army)
                return res.send(units)
            }).catch(next)
        }

    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};