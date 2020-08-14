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
            
            models.Base.find({}).populate('userId').populate({
                path : 'units.unitId'
                
              })
            .then((units) => {
                res.send(units)
            }).catch(next);
        }

    },

    post: {
        addUnit:(req, res, next) => {
        
            const { _id } = req.user;
    
            const { unitId, quantity } = req.body; 
            
            models.Base.findOne({userId: _id, units:{$elemMatch:{unitId}}})
            .then((result)=>{
                if(result===null || result.length === 0 ){
                    return models.Base.updateOne({userId: _id}, {"$push":{units:{unitId,quantity}}} )
                }

                const current = result.units.filter((el)=>{
                    
                    return unitId.localeCompare(el.unitId) === 0?true:false
                    
                })
                const newQiantity = Number(current[0].quantity)+Number(quantity)
               
                return models.Base.findOneAndUpdate({userId: _id, units:{$elemMatch:{unitId}}}, {$set:{"units.$":{unitId,"quantity":newQiantity}}}, {new: true, useFindAndModify: false} )
            }).then((units)=>{
                return res.send(units)
            }).catch(next)
        },
        addFactory:(req, res, next) => {//quantity trqbva da se updatva +1 a ne da se podava kato number ot vun i trqbva da se vlizma ot resursa
            const { _id} = req.user;
    
            const { factoryId, quantity } = req.body; 

            const newQuantiti = Number(quantity)+1
            models.Base.find({userId: _id, industrial:{$elemMatch:{factoryId}}})
            .then((result)=>{
                if(result.length === 0){
                    return models.Base.updateOne({userId: _id}, {"$push":{industrial:{factoryId}}} )
                }
                //return models.Base.findOne({userId: _id, industrial:{$elemMatch:{factoryId,quantity}}})
                return models.Base.findOneAndUpdate({userId: _id, industrial:{$elemMatch:{factoryId}}}, {$set:{"industrial.$":{factoryId,"quantity":newQuantiti}}}, {new: true, useFindAndModify: false} )
            }).then((industrial)=>{
                
                return res.send(industrial)
            }).catch(next)

        },
        battle:(req, res, next) => {

            return res.send(true);
        }

    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};