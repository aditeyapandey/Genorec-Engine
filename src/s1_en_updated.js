// Description: This function will convert the dataspec to an array of user input
// Description: As a side we will also store the input object vector
// Input: The feature spec and attribute
// Output: Vector array and object 
function createInputVector(feature,attribute,task){
  
    // Mapping attributes 
    var inputVectorObject = {}
    var inputArray = []

  //Vector array and object
    inputArray.push(inputVectorObject["quantitative"] = attribute.dataType == "quantitative" ? 1 : 0)
    inputArray.push(inputVectorObject["categorical"] = attribute.dataType == "categorical" ? 1 : 0)
    inputArray.push(inputVectorObject["text"] = attribute.dataType == "text" ? 1 : 0)
    inputArray.push(inputVectorObject["sparse"] = feature.featureDensity == "sparse" ? 1 : 0)
    inputArray.push(inputVectorObject["continous"] = feature.featureDensity == "continous" ? 1 : 0)
    inputArray.push(inputVectorObject["point"] = feature.featureGranularity == "point" ? 1:0)
    inputArray.push(inputVectorObject["segment"] = feature.featureGranularity == "segment" ? 1:0)
    inputArray.push(inputVectorObject["comparerois"] = task? 1 : 0 )
    
  return {inputVectorObject, inputArray}
  }

function encodeAttributeUpdated(dataspec,tasks){

    const model = require('../model/stage1updated.json');
    const vectorKeys = ["quantitative","categorical","text","sparse","continous","point","segment","comparerois"]
    const globalData = require("./modelDataProcessing.js")
    const stage1Model = globalData.model1Updated
    const getProductProperties  = require("./utils.js").productProperties
    const computeSimilarity = require("./utils.js").computeSimilarity
    const recommendedProducts = require("./utils.js").recommendedProducts
    //Product vector only needs to be computed once
    const productVector = getProductProperties(stage1Model,vectorKeys)
    const cartesian = require("./utils.js").cartesian;

    var stage1Output = []; // For each attribute there should be a sub array of objects, e.g.: [[{},{}],[{},{}]]

    compareroisTask =tasks.includes('compareMultipleROI');

    for(var i = 0; i<dataspec.features.length;i++)
    {
        var currentFeature = dataspec.features[i];
        var featureId = dataspec.features[i].featureId;

        //Initiation of the partial specification
        for(j=0;j<currentFeature.attributes.length;j++)
        {
            var currentAttribute = currentFeature.attributes[j]
            var inputVectorObject = createInputVector(currentFeature,currentAttribute,compareroisTask);  
            var similarityScores = computeSimilarity(inputVectorObject,productVector)
            var recommendation = recommendedProducts(similarityScores)
            var attributeId = currentFeature.attributes[j].attrId
            var fileName = currentFeature.attributes[j].fileName
            var encodingName = currentFeature.attributes[j].encodingName
            // var tempAttributeStorage = {'featureId':featureId,'attributeId':attributeId, 'inputVectorObject':inputVectorObject, 'similarityScore': similarityScores, 'recommendation':recommendation,fileName,encodingName}
            var tempAttributeStorage = [];
            const denseInterconnection = currentFeature.attributes[j].denseInterconnection;
            const featureInterconnection = currentFeature.attributes[j].featureInterconnection;

            recommendation.forEach((val)=>{
                tempAttributeStorage.push({"encoding":val,encodingName,fileName,"encodingPredictionScore":similarityScores[val], denseInterconnection, featureInterconnection});
            })
            stage1Output.push(tempAttributeStorage);
        }
    }
    const output = cartesian(stage1Output);
    return output;
}

module.exports = encodeAttributeUpdated