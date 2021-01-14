const stage1Model = require('../model/stage1.json');
const stage3Model = require('../model/stage3updated.json');

//Converting the model to objects
let stage1ModelObj = {}

stage1Model.map(val =>{
    stage1ModelObj[val["chart"]] = val
})


let stage3ModelObj = {}

stage3Model.map(val =>{
    stage3ModelObj[val["layout"]] = val
})



module.exports = {
    model1: stage1ModelObj,
    model3: stage3ModelObj
}
