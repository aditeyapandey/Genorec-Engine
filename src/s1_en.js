const model = require('../model/stage1.json');
const recommendationSetting = require('../configuration/recommendationsetting.json');
var dsMetric = require("ml-distance")
var partialSpecification = {}
var vectorKeys = ["quantitative","categorical","text","sparse","continous","point","segment","identify","compare","summarize"]

//   This function will convert the dataspec to an array of user input
function convertDataspectoInput(feature,attribute){
  
  // Mapping attributes 
  var inputVectorObject = {}
  var inputArray = []

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
  
  return {inputVectorObject, inputArray}
  }

  // Function breaks down the model information into format for recommendation

  function productProperties(){
      var productProperties = []
      for(var i=0;i<model.length;i++){
        var currentProduct = model[i]["chart"];
        var tempProductProperties = {}
        tempProductProperties[currentProduct]=[]
  
        vectorKeys.map(val => {
          tempProductProperties[currentProduct].push(parseInt(model[i][val]))
        })
        productProperties.push(tempProductProperties)
      }

      return productProperties

    }

    // Calculate the recommendation
    // Input: product and input vector
    // Output: similarity score corresponding to each output
    function computeSimilarity(inputVectorObject,productVector){
      var inpVec = inputVectorObject["inputArray"]
      var resultSimilarity = {}
    
      for (var i =0;i<productVector.length;i++){
        var obj = productVector[i];
        var key = Object.keys(obj)[0]
        var proVec = obj[key]
        var similarity = dsMetric.similarity.tanimoto(inpVec,proVec)
        var similarityEC = 1/ (1+ dsMetric.distance.euclidean(inpVec,proVec))
        resultSimilarity[key] = {'tanimoto':similarity,'euclideansimilarity':similarityEC}
      }
      //console.log(result_similarity)
     return resultSimilarity
    }


    //Input: An object with vis techniques as keys and similarity scores. Additionally, key for the similarity metric to use.
    //Output: Array of recommendation. The array allows for mutiple output in the cases where the scores are exactly similar.
    function recommendProducts (similarityScores, metric)
    {
      let arr = Object.values(similarityScores);
      let newarr = arr.map(val =>{
        return val[metric]
      })

      let max = Math.max(...newarr);
      var recommendedProducts = []

      Object.keys(similarityScores).map((val) => {
        if(similarityScores[val][metric] == max) {recommendedProducts.push(val) }
      })

      return recommendedProducts
    }

//Pseudo main function to control the execution of stage 1 of encoding
function encodeAttribute(dataspec){

    // Hierarchy of the encoding specification
    // -> Feature 1
    //       -> Attr1: I/P Vector, Prediction Scores {linechart:0.9(Score),.......}
    //       -> Attr2: I/P Vector, Prediction Scores  
    
    //Step 1: Create a template for the for the partial specification from the input dataspec

    for(var i = 0; i<dataspec.features.length;i++)
    {
      var currentFeature = dataspec.features[i];

      //Initiation of the partial specification
      partialSpecification[`feature_${i}`] = []

      //Get recommendation of the input feature vector
      for(j=0;j<currentFeature.attributes.length;j++){
        var currentAttribute = currentFeature.attributes[j]
        var inputVectorObject = convertDataspectoInput(currentFeature,currentAttribute)  
        var productVector = productProperties(inputVectorObject)
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        var recommendation = recommendProducts(similarityScores,recommendationSetting['metric'])
        
        var tempAttributeStorage = {'attributeId':`attribute_${j}`, 'inputVectorObject':inputVectorObject, 'similarityScore': similarityScores, 'recommendation':recommendation}
        
        partialSpecification[`feature_${i}`].push(tempAttributeStorage)
      }
    }
    console.log("Stage1 Output:", partialSpecification)
    return partialSpecification
}

 module.exports = encodeAttribute