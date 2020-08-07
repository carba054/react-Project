const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        
       //const length = req.query.length ? parseInt(req.query.length) : 20
       
        models.Units.find({}).populate('typeId')
            .then((units) => res.send(units))
            .catch(next);
    },

    post: (req, res, next) => {
        const { name, imgUrl, attackInfantry, attackArmored, attackHelicopter, attackFighter, attackDefence, life, population, type, priorityTargetsType} = req.body;

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
            return models.Units.create({ name, imgUrl, attackInfantry, attackArmored, attackHelicopter, attackFighter, attackDefence, life, population, typeId, priorityTargetsType:prTargetIds })
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