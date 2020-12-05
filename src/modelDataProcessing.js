const stage1Model = require('../model/stage1.json');
const stage1bModel = require('../model/stage1b.json');
const stage3Model = require('../model/stage3.json');

//Converting the model to objects
let stage1ModelObj = {}

stage1Model.map(val =>{
    stage1ModelObj[val["chart"]] = val
})


let stage3ModelObj = {}

stage3Model.map(val =>{
    stage3ModelObj[val["layout"]] = val
})

let stage1bModelObj = {}

stage1bModel.map(val =>{
    stage1bModelObj[val["chart"]] = val
})


module.exports = {
    model1: stage1ModelObj,
    modelAttrComb: stage1bModelObj,
    model3: stage3ModelObj
}
