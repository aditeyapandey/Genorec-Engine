const stage1Model = require('../model/stage1.json');
const stage3Model = require('../model/stage3.json');
const stage5Model = require('../model/stage5.json');


//Converting the model to objects
let stage1ModelObj = {}

stage1Model.map(val =>{
    stage1ModelObj[val["chart"]] = val
})

let stage3ModelObj = {}
stage3Model.map(val =>{
    stage3ModelObj[val["layout"]] = val
})

let stage5ModelObj = {}
stage5Model.map(val =>{
    stage5ModelObj[val["arrangement"]] = val
})

//Updated Models
const stage1UpdatedModel = require('../model/stage1updated.json');

let stage1UpdatedModelObj = {}
stage1UpdatedModel.map(val =>{
    stage1UpdatedModelObj[val["chart"]] = val
})

module.exports = {
    model1: stage1ModelObj,
    model3: stage3ModelObj,
    model5: stage5ModelObj,
    model1Updated: stage1UpdatedModelObj
}
