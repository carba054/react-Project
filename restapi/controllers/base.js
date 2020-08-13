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
            const id = req.params.id;
            
            models.Base.find({userId: id}).populate({
                path : 'industrial.factoryId',
                populate : {
                  path : 'unlock'
                }
              })
            .then((industry) => {
                const result = industry[0].industrial.map((el)=> {
                    return el  
                })
               res.send(result)
            }).catch(next);
        },
        all:(req, res, next) => {
            
            models.Base.find({}).populate('userId')
            .then((units) => {
                res.send(units)
            }).catch(next);
        }

    },

    post: {
        addUnit:(req, res, next) => {//quantity trqbva da se updatva +1 a ne da se podava kato number ot vun i trqbva da se vlizma ot resursa
        
            const { _id } = req.user;
    
            const { unitId, quantity } = req.body; 
            
            models.Base.find({userId: _id, units:{$elemMatch:{unitId}}})
            .then((result)=>{
                if(result.length === 0){
                    return models.Base.updateOne({userId: _id}, {"$push":{units:{unitId,quantity}}} )
                }
                 return models.Base.findOneAndUpdate({userId: _id, units:{$elemMatch:{unitId}}}, {$set:{"units.$":{unitId,quantity}}}, {new: true, useFindAndModify: false} )
            }).then((units)=>{
                return res.send(units)
            }).catch(next)
        },
        addFactory:(req, res, next) => {
            const { _id } = req.user;
    
            const { factoryId, quantity } = req.body; 
            
            models.Base.find({userId: _id, industrial:{$elemMatch:{factoryId}}})
            .then((result)=>{
                if(result.length === 0){
                    return models.Base.updateOne({userId: _id}, {"$push":{industrial:{factoryId,quantity}}} )
                }
                 return models.Base.findOneAndUpdate({userId: _id, industrial:{$elemMatch:{factoryId}}}, {$set:{"industrial.$":{factoryId,quantity}}}, {new: true, useFindAndModify: false} )
            }).then((industrial)=>{
            
                return res.send(industrial)
            }).catch(next)

        }

    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};