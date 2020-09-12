//https://github.com/mljs/distance#ml-distance

var dsMetric = require("ml-distance")

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
    var similarity = dsMetric.similarity.tanimoto(inpVec,proVec)
    var similarityEC = 1/ (1+ dsMetric.distance.euclidean(inpVec,proVec))
    resultSimilarity[key] = {'tanimoto':similarity,'euclideansimilarity':similarityEC}
  }
  return resultSimilarity
}

//Input: An object with vis techniques as keys and similarity scores. Additionally, key for the similarity metric to use.
//Output: Array of recommendation. The array allows for mutiple output in the cases where the scores are exactly similar.
function recommendedProducts (similarityScores)
{
  var metric="tanimoto"
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

module.exports =
{
  productProperties: getProductProperties,
  computeSimilarity: computeSimilarity,
  recommendedProducts:  recommendedProducts ,
  cartesian: cartesian
}