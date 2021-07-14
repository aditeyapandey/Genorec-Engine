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
const stage2UpdatedModel = require('../model/stage2updated.json');
const stage3UpdatedModel = require('../model/stage3updated.json');
const stage4UpdatedModel = require('../model/stage4updated.json');

let stage1UpdatedModelObj = {};
stage1UpdatedModel.map(val =>{
    stage1UpdatedModelObj[val["chart"]] = val;
})

let stage2UpdatedModelObj = {};
stage2UpdatedModel.map(val =>{
    stage2UpdatedModelObj[val["alignment"]] = val;
})

let stage3UpdatedModelObj = {};
stage3UpdatedModel.map(val =>{
    stage3UpdatedModelObj[val["layout"]] = val;
})

let stage4UpdatedModelObj = {};
stage4UpdatedModel.map(val =>{
    stage4UpdatedModelObj[val["partition"]] = val;
})

module.exports = {
    model1: stage1ModelObj,
    model3: stage3ModelObj,
    model5: stage5ModelObj,
    model1Updated: stage1UpdatedModelObj,
    model2Updated: stage2UpdatedModelObj,
    model3Updated: stage3UpdatedModelObj,
    model4Updated: stage4UpdatedModelObj
}
