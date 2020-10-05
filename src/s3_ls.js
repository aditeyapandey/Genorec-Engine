const globalData = require("./modelDataProcessing.js")
const stage1Model = globalData.model1
const stage3Model = globalData.model3
const vectorKeys = ["featureinterconnection","denseinterconnection", "identify", "compare","summarize","size","hue","saturation","text"]
const getProductProperties  = require("./utils.js").productProperties
const computeSimilarity = require("./utils.js").computeSimilarity
const recommendedProducts = require("./utils.js").recommendedProducts
const getVisOptions = require("./utils.js").getVisOptions
const productVector = getProductProperties(stage3Model,vectorKeys)


//Todo: Need to figure out how to take into consideration user preferences

//Description: Use the input from stage 2 and dataspec to create an input vector.
//Input: 
//Output: 
function createInputVector(channels,tasks,interconnection){
  // Mapping attributes 
  var inputVectorObject = {}
  var inputArray = []

  inputArray.push(inputVectorObject["featureinterconnection"] = interconnection['featureInterconnection'] == 1 ? 1 : 0)
  inputArray.push(inputVectorObject["denseinterconnection"] = interconnection['denseInterconnection'] == 1 ? 1 : 0)
  inputArray.push(inputVectorObject["identify"] = tasks.has("identify") ? 1 : 0)
  inputArray.push(inputVectorObject["compare"] = tasks.has("compare") ? 1 : 0)
  inputArray.push(inputVectorObject["summarize"] = tasks.has("summarize")  ? 1 : 0)
  inputArray.push(inputVectorObject["size"] = (channels.indexOf("size") !=-1 || channels.indexOf("position") !=-1 )  ? 1 : 0)
  inputArray.push(inputVectorObject["hue"] = channels.indexOf("hue") !=-1  ? 1 : 0)
  inputArray.push(inputVectorObject["saturation"] = channels.indexOf("saturation") !=-1  ? 1 : 0)
  inputArray.push(inputVectorObject["text"] = channels.indexOf("text") !=-1  ? 1 : 0)

  return {inputVectorObject,inputArray}
}

//Description: Track combinations are designed to nest though all the combinations and find trackCombinations for all possible individual trackCombinations
//Input: Previous stage outputs
//Output: Inputvector and Inputarray for each track and all the possible combinations.
function createTrackInputVector(stage2Output,stage1Output){

    var trackPossibilities = stage2Output.trackPossibilities
    var tasks = stage2Output.tasks
    
    var interconnection = stage1Output[0]['featureConnection']
  

    var allTrackInput = []
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
        var inputVector = createInputVector(channels,tasks,interconnection)
        trackCombinationInputVector.push({inputVector,encodings:trackCombinations[k]})
      }
      allTrackInput.push(trackCombinationInputVector)
    }
    // console.log(allTrackInput)
    return allTrackInput
}

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}


// Description: For each input feature, identify the types of trackCombinations
//We need information about the 
function getLayout (stage2Output,stage1Output) {

  //Layout recommendation for each possible track  indexed by feature id
  var trackLayout = {}

  // This loop divides the features, and for individual feature set identifies the types of trackCombinations.
  for (var i = 0; i< stage2Output.length;i++)
  {
    // We want to extract the key of the feature that we are analyzing
    var key = Object.keys(stage2Output[i])[0]
    
    //Track possibilities store all the tracks that our recommendatio system predicted per feature
    var trackPossibilities = createTrackInputVector(stage2Output[i][`feature_${i}`], stage1Output[key])
    
    //Initialize the features
    trackLayout[key] = {"trackPossibilities":[]}

    // A track consists of one or more
    for(var j =0; j< trackPossibilities.length;j++)
    {
      var tracks = trackPossibilities[j]
      var trackLayoutRecommendation = []
      for (var k = 0; k< tracks.length; k++){
        var inputVectorObject = tracks[k]['inputVector']
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        trackLayoutRecommendation.push(recommendedProducts(similarityScores))
      }
      //find the most common layout in the tracklayoutrecommendation array
      var layoutRecommendation = mode(trackLayoutRecommendation)
      trackLayout[key]["trackPossibilities"].push({tracks, layoutRecommendation:layoutRecommendation[0]})
    }
  } 

//For each feature  we have an array
//Array: A possible combination of attributes for a feature representation
//Goal: Seperate unique methods to visualize the sequence. This seperation will be helpful in the feature alignment.
return getVisOptions(trackLayout)
}


module.exports = getLayout