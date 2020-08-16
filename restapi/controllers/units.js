const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        
       //const length = req.query.length ? parseInt(req.query.length) : 20
       
        models.Units.find({}).populate('typeId')
            .then((units) => {
                units.map((el, index)=>{ // fast hardcode from now
                    
                  
                     for(let i =0; i< el.priorityTargetsType.length; i++){
                         if(el.priorityTargetsType[i] === "5f281a26ecdcbb19b4f09a3f"){
                            el.priorityTargetsType[i] = 'Infantry'
                         }else if(el.priorityTargetsType[i] === "5f281a8aecdcbb19b4f09a40"){
                            el.priorityTargetsType[i] = 'Armored'
                         }else if(el.priorityTargetsType[i] === "5f281a96ecdcbb19b4f09a41"){
                            el.priorityTargetsType[i] = 'Helicopter'
                         }else if(el.priorityTargetsType[i] === "5f281aa1ecdcbb19b4f09a42"){
                            el.priorityTargetsType[i] = 'Fighter'
                        }else if(el.priorityTargetsType[i] === "5f281aa9ecdcbb19b4f09a43"){
                            el.priorityTargetsType[i] = 'Defence'
                        }
                       
                     }  
                    return el
                })
                //console.log(units[0])
                return res.send(units)
            })
            .catch(next);
    },

    post: (req, res, next) => {
        const { name, imgUrl, attackInfantry, attackArmored, attackHelicopter, attackFighter, attackDefence, life, population, type, metal, mineral, fuel, priorityTargetsType} = req.body;

        Promise.all([
            models.UnitType.findOne({name: type}),
            models.UnitType.find({})
            ])
       .then(([unitType,types])=>{
        let newPriorityTargetsType = priorityTargetsType.map((el)=>{
                return types.find(obj => obj.name == el);
                
                //Object.values(types).find((e)=> e==el)
                
            })
        let typesIds = types.map((el)=>element = el._id+'')
        let priorityTargetsTypeId = newPriorityTargetsType.map((el)=>el._id+'')
        let prTargetIds = priorityTargetsTypeId.concat(typesIds.filter((item) => priorityTargetsTypeId.indexOf(item) < 0))

            const typeId = unitType._id
            return models.Units.create({ name, imgUrl, attackInfantry, attackArmored, attackHelicopter, attackFighter, attackDefence, life, population, typeId, metal, mineral, fuel, priorityTargetsType:prTargetIds })
        }).then((createdUnit) => {
            return models.Units.findOne({ _id: createdUnit._id })
            })
            .then((result)=>{
                res.send(result);
            })
            .catch(next);

            //models.Units.create({ name, imgUrl, attackInfantry, attackArmored, attackHelicopter, attackFighter, attackDefence, life, population, type, priorityTargetsType })
            //.then((createdUnit) => {
                // return Promise.all([
                //     models.User.updateOne({ _id }, { $push: { posts: createdOrigami } }),
                //     models.Origami.findOne({ _id: createdOrigami._id })
                // ]);
                
            //})
            // .then(([modifiedObj, origamiObj]) => {
            //     res.send(origamiObj);
            // })
    },

    put: (req, res, next) => {
        // const id = req.params.id;
        // const { description } = req.body;
        // models.Origami.updateOne({ _id: id }, { description })
        //     .then((updatedOrigami) => res.send(updatedOrigami))
        //     .catch(next)
    },

    delete: (req, res, next) => {
        // const id = req.params.id;
        // models.Origami.deleteOne({ _id: id })
        //     .then((removedOrigami) => res.send(removedOrigami))
        //     .catch(next)
    }
};