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
        
            const { _id, metal, mineral, fuel} = req.user;
    
            const { unitId, quantity } = req.body; 
            
            Promise.all([
                models.Units.findOne({"_id":unitId}),
                models.Base.findOne({userId: _id, units:{$elemMatch:{unitId}}})
            ])
            .then(([unit,result])=>{
                const newMetal = Number(metal)-(Number(unit.metal)*Number(quantity))
                const newMineral =  Number(mineral)-(Number(unit.mineral)*Number(quantity))
                const newFuel =  Number(fuel)-(Number(unit.fuel)*Number(quantity))
                
               
                if(result===null || result.length === 0 ){
                    return models.Base.updateOne({userId: _id}, {"$push":{units:{unitId,quantity}}} ),
                    models.User.findOneAndUpdate({"_id": _id}, {$set:{"metal":newMetal,"mineral":newMineral,"fuel":newFuel}},{new: true, useFindAndModify: false})
                }

                const current = result.units.filter((el)=>{
                    
                    return unitId.localeCompare(el.unitId) === 0?true:false
                    
                })
                const newQiantity = Number(current[0].quantity)+Number(quantity)
               
                return models.Base.findOneAndUpdate({userId: _id, units:{$elemMatch:{unitId}}}, {$set:{"units.$":{unitId,"quantity":newQiantity}}}, {new: true, useFindAndModify: false} ),
                models.User.findOneAndUpdate({"_id": _id}, {$set:{"metal":newMetal,"mineral":newMineral,"fuel":newFuel}},{new: true, useFindAndModify: false})
            }).then((user)=>{
                return res.send(user)
            }).catch(next)
        },
        addFactory:(req, res, next) => {//quantity trqbva da se updatva +1 a ne da se podava kato number ot vun i trqbva da se vlizma ot resursa
            const { _id, metal, mineral } = req.user;
    
            const { factoryId, quantity } = req.body; 

            const newQuantiti = Number(quantity)+1

            
            let newMetal = 0
            let newMineral =  0

            Promise.all([
            models.Factory.findOne({"_id":factoryId}),
            models.Base.find({userId: _id, industrial:{$elemMatch:{factoryId}}})
            ]) 
            .then(([factory,result])=>{
                
                newMetal = Number(metal)-(Number(factory.metal))
                newMineral =  Number(mineral)-(Number(factory.mineral))

                if(result.length === 0){
                    return models.Base.updateOne({userId: _id}, {"$push":{industrial:{factoryId}}} )
                }
                
                  return models.User.findOneAndUpdate({"_id": _id}, {$set:{"metal":newMetal,"mineral":newMineral}},{new: true, useFindAndModify: false}).then((e)=>{
                    return models.Base.findOneAndUpdate({userId: _id, industrial:{$elemMatch:{factoryId}}}, {$set:{"industrial.$":{factoryId,"quantity":newQuantiti}}}, {new: true, useFindAndModify: false} )
                
                  })
            }).then((industrial)=>{
                
                return res.send(industrial)
            }).catch(next)

        },
        battle:(req, res, next) => {
            console.log(req.body)
            //return res.send(true);
        }

    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};