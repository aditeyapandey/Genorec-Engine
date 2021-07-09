// Description: This page identifies the visual encoding of each attribute avaialble in the dataset.
// Output: Featureid -> [{attrid, inputVector, similarityScore, recommendation}]
// inputVector consists an array and an object that store information about the input attribute.
// similarityScore contains the score of an inputVector with all the encoding options available for genomics visualization.
// recommendation is an array of one or more product recommendation. 
const model = require('../model/stage1.json');
const vectorKeys = ["quantitative","categorical","text","sparse","continous","point","segment"]
const globalData = require("./modelDataProcessing.js")
const stage1Model = globalData.model1
const getProductProperties  = require("./utils.js").productProperties
const computeSimilarity = require("./utils.js").computeSimilarity
const recommendedProducts = require("./utils.js").recommendedProducts
//Product vector only needs to be computed once
const productVector = getProductProperties(stage1Model,vectorKeys)
console.log("productvector")
console.log(productVector)


// Description: This function will convert the dataspec to an array of user input
// Description: As a side we will also store the input object vector
// Input: The feature spec and attribute
// Output: Vector array and object 
function createInputVector(feature,attribute){
  
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
    //inputArray.push(inputVectorObject["compare"] = attribute.intraAttrTask.indexOf("compare") != -1 ? 1 : 0 )
    
  return {inputVectorObject, inputArray}
  }

function encodeAttribute(dataspec){

    var stage1Output = {}

    for(var i = 0; i<dataspec.features.length;i++)
    {
      var currentFeature = dataspec.features[i];
      var featureId = dataspec.features[i].featureId;


      //Initiation of the partial specification
      stage1Output[featureId] = []

      //Get recommendation of the input feature vector
      for(j=0;j<currentFeature.attributes.length;j++){
        var currentAttribute = currentFeature.attributes[j]
        var inputVectorObject = createInputVector(currentFeature,currentAttribute)  
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        var recommendation = recommendedProducts(similarityScores)
        var attributeId = currentFeature.attributes[j].attrId
        var tempAttributeStorage = {'featureId':featureId,'attributeId':attributeId, 'inputVectorObject':inputVectorObject, 'similarityScore': similarityScores, 'recommendation':recommendation}
        stage1Output[featureId].push(tempAttributeStorage)
      }
    }
    console.log(stage1Output)
    return stage1Output
}

 module.exports = encodeAttribute