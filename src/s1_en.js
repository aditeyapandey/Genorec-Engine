// Description: This page identifies the visual encoding of each attribute avaialble in the dataset.
// Output: Featureid -> [{attrid, inputVector, similarityScore, recommendation}]
// inputVector consists an array and an object that store information about the input attribute.
// similarityScore contains the score of an inputVector with all the encoding options available for genomics visualization.
// recommendation is an array of one or more product recommendation. 
const model = require('../model/stage1.json');
const vectorKeys = ["quantitative","categorical","text","sparse","continous","point","segment","identify","compare","summarize"]
const  globalData = require("./modelDataProcessing.js")
const stage1Model = globalData.model1
const getProductProperties  = require("./utils.js").productProperties
const computeSimilarity = require("./utils.js").computeSimilarity
const recommendedProducts = require("./utils.js").recommendedProducts
//Product vector only needs to be computed once
const productVector = getProductProperties(stage1Model,vectorKeys)



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
    inputArray.push(inputVectorObject["identify"] = attribute.intraAttrTask.indexOf("identify") != -1 ? 1 : 0 
    )
    inputArray.push(inputVectorObject["compare"] = attribute.intraAttrTask.indexOf("compare") != -1 ? 1 : 0 )
    inputArray.push(inputVectorObject["summarize"] = attribute.intraAttrTask.indexOf("summarize") != -1 ? 1 : 0 
    )

  //Additional elements to add to the object
  inputVectorObject["featureInterconnection"] = feature.featureInterconnection ? 1 : 0
  inputVectorObject["denseInterconnection"] = feature.denseInterconnection  ? 1 : 0
  
  return {inputVectorObject, inputArray}
  }


// Description: Get the type of within interconnection at a feature level
// Input: Feature Specification
// Output: {interconnection:boolean, denseinterconnection:boolean}
function getInterconnectionFeature(feature){
  return { featureInterconnection: feature.featureInterconnection ? 1 : 0, denseInterconnection: feature.denseInterconnection ? 1 : 0 }
}



function encodeAttribute(dataspec){

    var partialSpecification = {}

    for(var i = 0; i<dataspec.features.length;i++)
    {
      var currentFeature = dataspec.features[i];

      //Initiation of the partial specification
      partialSpecification[`feature_${i}`] = []

      //Get recommendation of the input feature vector
      for(j=0;j<currentFeature.attributes.length;j++){
        var currentAttribute = currentFeature.attributes[j]
        var inputVectorObject = createInputVector(currentFeature,currentAttribute)  
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        var recommendation = recommendedProducts(similarityScores)
        var featureConnection = getInterconnectionFeature(currentFeature)
        var tempAttributeStorage = {'featureId':`feature_${i}`,'attributeId':`attribute_${j}`, 'inputVectorObject':inputVectorObject, 'similarityScore': similarityScores, 'recommendation':recommendation, featureConnection}
        
        partialSpecification[`feature_${i}`].push(tempAttributeStorage)
      }
    }
    console.log("Stage1 Output:", partialSpecification)
    return partialSpecification
}

 module.exports = encodeAttribute