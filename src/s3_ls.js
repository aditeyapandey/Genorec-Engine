const models = require("./modelDataProcessing.js")
const stage1Model = models.model1
const stage3Model = models.model3
const vectorKeys = ['sparseinterconnection','denseinterconnection','outliers','summarize','interactivity','length','color','text']
const getProductProperties  = require("./utils.js").productProperties
const computeSimilarity = require("./utils.js").computeSimilarity
const recommendedProducts = require("./utils.js").recommendedProducts
const mode = require("./utils.js").mode
const getVisOptions = require("./utils.js").getVisOptions
const productVector = getProductProperties(stage3Model,vectorKeys)
const GLOBAL_INDEX_DATA = require('./inputspec.js')['GLOBAL_INDEX_DATA']



//Todo: Need to figure out how to take into consideration user preferences.
//Description: Use the input from stage 2 and dataspec to create an input vector.
function createInputVector(channels,featureData){
  // Mapping attributes 
  var inputVectorObject = {}
  var inputArray = []

  //Todo: No interconnection is not defined 
  inputArray.push(inputVectorObject["sparseinterconnection"] = (featureData['denseInterconnection']) ? 0:1)
  inputArray.push(inputVectorObject["denseinterconnection"] = (featureData['denseInterconnection']) ? 1:0)
  
  //Todo: Tasks have to be revisited and fixed. We may need to also fix the input format to handle the tasks.
  inputArray.push(inputVectorObject["outliers"] = featureData["intraFeatureTasks"].indexOf("outliers") !=-1 ? 1:0)
  inputArray.push(inputVectorObject["summarize"] = featureData["intraFeatureTasks"].indexOf("summarize") !=-1 ? 1:0)
  inputArray.push(inputVectorObject["interactivity"] = featureData['interactivity'] ? 1:0)

  //Data types from previous stages: Todo needs to be fixed
  inputArray.push(inputVectorObject["length"] = (channels.indexOf("y") !=-1)  ? 1 : 0)
  inputArray.push(inputVectorObject["color"] = (channels.indexOf("color(sequential)") !=-1 || channels.indexOf("color(nominal)") !=-1) ? 1 : 0)
  inputArray.push(inputVectorObject["text"] = channels.indexOf("none") !=-1  ? 1 : 0)

  // console.log(inputArray,inputVectorObject)
  return {inputVectorObject,inputArray}
}


//Description: Track combinations are designed to nest though all the combinations and find trackCombinations for all possible individual trackCombinations
//Input: Previous stage outputs
//Output: Inputvector and Inputarray for each track and all the possible combinations.
function createTrackInputVector(stage2Output,sequenceId,featureId){

    var trackPossibilities = stage2Output.trackPossibilities
    var trackInputVectors = []

    var featureData = GLOBAL_INDEX_DATA[sequenceId]["featureIndex"][featureId]
    //This loop identifies the possible combination of trackCombinations within a feature
    for(var j =0; j<trackPossibilities.length; j++){
      var trackCombinationInputVector = []
      var trackCombinations = trackPossibilities[j]
      //In this loop we check for each individual track and find its input vector.
      for(var k=0; k<trackCombinations.length;k++)
        {     
          var channels = trackCombinations[k].map(val => {
          return stage1Model[val['encoding']]['channel']
        })
        // allTrackInput.push(createInputVector(channels,tasks,interconnection))
        var inputVector = createInputVector(channels,featureData)
        trackCombinationInputVector.push({inputVector,encodings:trackCombinations[k]})
      }
      trackInputVectors.push(trackCombinationInputVector)
    }
    return trackInputVectors
}


function getLayout (stage2Output,sequenceId) {

  //Layout recommendation for each possible track  indexed by feature id
  var trackLayoutOutput = {}
  // This loop divides the features, and for individual feature set identifies the types of trackCombinations.
  for (var i = 0; i< stage2Output.length;i++)
  {
    var featureId = Object.keys(stage2Output[i])[0]
    var trackInputVectors = createTrackInputVector(stage2Output[i][featureId],sequenceId,featureId)
    var interconnection = GLOBAL_INDEX_DATA[sequenceId]["featureIndex"][featureId]['featureInterconnection']
    trackLayoutOutput[featureId] = {"trackPossibilities":[]}
    var featureGranularity =  GLOBAL_INDEX_DATA[sequenceId]["featureIndex"][featureId]['featureGranularity']
    var featureDensity = GLOBAL_INDEX_DATA[sequenceId]["featureIndex"][featureId]['featureDensity']
    
    for(var j =0; j< trackInputVectors.length;j++)
    {
      var tracks = trackInputVectors[j]
      var trackLayoutRecommendation = []
      var predictionScores = []
      for (var k = 0; k< tracks.length; k++){
        var inputVectorObject = tracks[k]['inputVector']
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        trackLayoutRecommendation.push(recommendedProducts(similarityScores))
        var tLRecommendation = recommendedProducts(similarityScores)
        predictionScores.push(similarityScores[tLRecommendation])
      }
      var layoutRecommendation = mode(trackLayoutRecommendation)
      var predictionScore =  predictionScores.map((c, i, arr) => c / arr.length).reduce((p, c) => c + p);

      trackLayoutOutput[featureId]["trackPossibilities"].push({tracks, layoutRecommendation:layoutRecommendation[0],predictionScore,interconnection,featureGranularity,featureAvailability:featureDensity})
    }
  
  } 

//  console.log("Stage 3 Output:")
// console.log(trackLayoutOutput)
  
return getVisOptions(trackLayoutOutput)
}


module.exports = getLayout