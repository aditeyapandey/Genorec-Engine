//https://github.com/mljs/distance#ml-distance

var dsMetric = require("ml-distance")
var metric="tanimoto"

function getProductProperties(model,vectorKeys){
  var getProductProperties = []

  var productKeys = Object.keys(model)

  for (var i=0;i<productKeys.length;i++)
  {
    var currentProduct = productKeys[i]
    var tempgetProductProperties = {}

    tempgetProductProperties[currentProduct]=[]
    vectorKeys.map(val => {
      tempgetProductProperties[currentProduct].push(parseInt(model[currentProduct][val]))
    })
    getProductProperties.push(tempgetProductProperties)
  }
  return getProductProperties
}

// Description: Calculate the recommendation
// Input: product and input vector
// Output: similarity score corresponding to each output
function computeSimilarity(inputVectorObject,productVector){
  var inpVec = inputVectorObject["inputArray"]
  var resultSimilarity = {}
  for (var i =0;i<productVector.length;i++){
    var obj = productVector[i];
    var key = Object.keys(obj)[0]
    var proVec = obj[key]
    var similarity = dsMetric.similarity[metric](inpVec,proVec)
    resultSimilarity[key] = similarity
  }
  return resultSimilarity
}

//Input: An object with vis techniques as keys and similarity scores. Additionally, key for the similarity metric to use.
//Output: Array of recommendation. The array allows for mutiple output in the cases where the scores are exactly similar.
function recommendedProducts (similarityScores)
{
  
  let arr = Object.values(similarityScores);
  let newarr = arr.map(val =>{
    return val[metric]
  })

  let max = Math.max(...arr);
  var recommendedProducts = []

  Object.keys(similarityScores).map((val) => {
    if(similarityScores[val] == max) {recommendedProducts.push(val) }
  })

  return recommendedProducts
}

//Description: Test function to evaluate combinations of attributes
//Input: Array of arrays that have to be combined
//Output: All possible combinations of the arrays
function cartesian(args) {
  var r = [], max = args.length-1;
  function helper(arr, i) {
      for (var j=0, l=args[i].length; j<l; j++) {
          var a = arr.slice(0); // clone arr
          a.push(args[i][j]);
          if (i==max)
              r.push(a);
          else
              helper(a, i+1);
      }
  }
  helper([], 0);
  return r;
}

//Input: Object of features. Each feature consists of an array of elements. 
//Output: Merge by performing a cartesian product. 
//Output Schema: {'visid':[a:{information},b,c], 'visid2':[a,b]} 
//Information: {featureid:[] ,encoding/s:[], layoutrecommendation} 
function getVisOptions(tracks)
{
  var features = Object.keys(tracks)
  var trackPossibilitiesArray = features.map((val,i) =>{
    var index = i
    var localTrackPossilities = tracks[val]['trackPossibilities']
    localTrackPossilities.every((val1) => {
      return val1["featureId"] = "feature_"+index
    })
    return localTrackPossilities
  })

  var visOptions = cartesian(trackPossibilitiesArray)
  
  var returnVisOptions = {}

  for (var j=0;j<visOptions.length;j++){
    returnVisOptions['vis_'+j] = arrayToObject(visOptions[j],"featureId")    
  }
  
  return returnVisOptions
}

//Description -> Converts an arra [id:val, key: val] to id:{id,val} 
const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})



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



module.exports =
{
  productProperties: getProductProperties,
  computeSimilarity: computeSimilarity,
  recommendedProducts:  recommendedProducts ,
  cartesian: cartesian,
  getVisOptions: getVisOptions,
  mode:mode
}