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
                    return models.Base.updateOne({userId: _id}, {"$push":{units:{unitId,quantity}}} ).then((el)=>{
                        return models.User.findOneAndUpdate({"_id": _id}, {$set:{"metal":newMetal,"mineral":newMineral,"fuel":newFuel}},{new: true, useFindAndModify: false})
                    })
                    
                }

                const current = result.units.filter((el)=>{
                    
                    return unitId.localeCompare(el.unitId) === 0?true:false
                    
                })
                const newQiantity = Number(current[0].quantity)+Number(quantity)
               
                return models.Base.findOneAndUpdate({userId: _id, units:{$elemMatch:{unitId}}}, {$set:{"units.$":{unitId,"quantity":newQiantity}}}, {new: true, useFindAndModify: false} ).then((e)=>{

                    return models.User.findOneAndUpdate({"_id": _id}, {$set:{"metal":newMetal,"mineral":newMineral,"fuel":newFuel}},{new: true, useFindAndModify: false})
                })
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
        battle: async (req, res, next) => {
            const { userId, defenderId } = req.body;
           
                 let user = await models.Base.findOne({"userId":userId},{"units":[]}).populate({
                    path : 'units.unitId',
                    populate : {
                      path : 'typeId'
                    }
                  })
                let defender = await models.Base.findOne({"userId":defenderId},{"units":[]}).populate({
                    path : 'units.unitId',
                    populate : {
                        path : 'typeId'
                      }
                    })
          
                userUnits =user.units
                defenderUnits= defender.units

                const attackerInfo = []
                const defenderInfo =[]

                await userUnits.map((userUnit)=>{
                    
                    let test = round(userUnit,defenderUnits, defenderId)
                    let proba = defenderUnits.find(element => element.unitId._id === test.deffUnitId);
                    proba.quantity = test.deffQuantity
                    const {attUnitId,attDmg,attQuantity,deffUnitId,deffOldQuantity,deffQuantity,deffLose} = test
                    if(deffQuantity <=0){
                        
                        removeEl(deffUnitId, defenderId)
                    }
                    attackerInfo.push({attUnitId,attDmg,attQuantity,deffUnitId,deffOldQuantity,deffQuantity,deffLose})
                })

                await defenderUnits.map((defenderUnit)=>{
                    
                    let test = round(defenderUnit,userUnits, userId)
                    let proba = userUnits.find(element => element.unitId._id === test.deffUnitId);
                    proba.quantity = test.deffQuantity
                    const {attUnitId,attDmg,attQuantity,deffUnitId,deffOldQuantity,deffQuantity,deffLose} = test
                    if(deffQuantity <=0){
                        
                        removeEl(deffUnitId, userId)
                    }
                    defenderInfo.push({attUnitId,attDmg,attQuantity,deffUnitId,deffOldQuantity,deffQuantity,deffLose})
                })

                 
                // console.log(attackerInfo)
                //  console.log(defenderInfo)

                models.Reports.create({"attackerId":userId, defenderId, attackerInfo, defenderInfo }).then((report)=>{
                    return models.Base.findOne({"userId":userId}).populate('userId').populate({
                        path : 'units.unitId'
                        
                      })
                   
                }).then((result)=>{
                    return res.send(result)
                })
        

                function removeEl(deffUnitId,defenderRound){
                    models.Base.findOneAndUpdate({"userId":defenderRound, units:{$elemMatch:{"unitId":deffUnitId}}},{ $pull:{"units":{"unitId":deffUnitId}}}, { safe: true, useFindAndModify: false }).then((e)=>{
                       
                    })
        
                }
                function round (unit1, unit2, defenderRound){
                    let quantity = Number(unit1.quantity)
                    const target = unit1.unitId.priorityTargetsType
                    //console.log(target)
                    let defendUnits = []
                    for(let i = 0; i< target.length; i++){
                        defendUnits = unit2.filter((el)=>{
                            if(el.quantity <=0){
                                return false
                            }
                            return target[i].localeCompare(el.unitId.typeId._id)===0?true:false
                        
                        })
                        if(defendUnits.length > 0){
                            break;
                        }
                    }
                    

                    const index = getRandomInt(Number(defendUnits.length))
                    const defendUnit = defendUnits[index];
                    let attackDmg = 0;
                    if(defendUnit.unitId.typeId.name === 'helicopter'){
                        attackDmg = unit1.unitId.attackHelicopter
                    }else if(defendUnit.unitId.typeId.name === 'infantry'){
                        attackDmg = unit1.unitId.attackInfantry
                    }else if(defendUnit.unitId.typeId.name === 'armored'){
                        attackDmg = unit1.unitId.attackArmored
                    }else if(defendUnit.unitId.typeId.name === 'fighter'){
                        attackDmg = unit1.unitId.attackFighter
                    }
                    attackDmg = Number(attackDmg)*quantity
                    if(quantity< 0){
                        quantity = 0
                        attackDmg = 0;
                    }
                    let life = Number(defendUnit.unitId.life)
                    let fullLife = life*Number(defendUnit.quantity)

                    let deffQuantity = Math.round(Number(fullLife-attackDmg)/life)
                    let deffLose = Number(defendUnit.quantity)-deffQuantity
                    let attUnitId =unit1.unitId._id
                    let attDmg = attackDmg
                    let attQuantity =quantity
                    let deffUnitId = defendUnit.unitId._id
                    models.Base.findOneAndUpdate({"userId":defenderRound, units:{$elemMatch:{"unitId":deffUnitId}}},{$set:{"units.$":{"unitId":deffUnitId,"quantity":deffQuantity}}}, {new: true, useFindAndModify: false}).then((r)=>{
                        
                    })
                    return {
                        attUnitId,
                        attDmg,
                        attQuantity,
                        deffUnitId,
                        "deffOldQuantity":defendUnit.quantity,
                        deffQuantity,
                        deffLose
                    }
                    

                }

                function getRandomInt(max) {
                    return Math.floor(Math.random() * Math.floor(max));
                  }


        }

    },

    put: (req, res, next) => {
       
    },

    delete: (req, res, next) => {

    }
};