const models = require("./modelDataProcessing.js")
const stage5Model = models.model5
const vectorKeys = ["layoutcircular","layoutlinear","nointerconnection","sparseinterconnection","denseinterconnection","edgeconnection","readedgevalue","conservation"]
const getProductProperties  = require("./utils.js").productProperties
const computeSimilarity = require("./utils.js").computeSimilarity
const recommendedProducts = require("./utils.js").recommendedProducts
//Product vector only needs to be computed once
const productVector = getProductProperties(stage5Model,vectorKeys)
const mode = require("./utils.js").mode



function createInputVector(layout,dense,sparse,connectedNodes,edgeValue,sequenceConservation){
  
    // Mapping attributes 
    var inputVectorObject = {}
    var inputArray = []

    inputArray.push(inputVectorObject["layoutcircular"] = layout==="circular" ? 1 : 0)
    inputArray.push(inputVectorObject["layoutlinear"] = layout==="linear" ? 1 : 0)
    inputArray.push(inputVectorObject["nointerconnection"] = dense || sparse ? 0 : 1)
    inputArray.push(inputVectorObject["sparseinterconnection"] = dense ? 1 : 0)
    inputArray.push(inputVectorObject["denseinterconnection"] = sparse ? 1 : 0)
    inputArray.push(inputVectorObject["edgeconnection"] = connectedNodes ? 1 : 0)
    inputArray.push(inputVectorObject["readedgevalue"] = edgeValue ? 1 : 0)
    inputArray.push(inputVectorObject["conservation"] = sequenceConservation ? 1 : 0)

    return {inputVectorObject, inputArray}
}

function addElementsToOuput(input,output,layout){
    if(layout=="linear"){
        output["linearStacked"]=[]
        output["linearStacked"] = [...input]
       }
       else{
        output["circleStacked"]=[]
        output["circleStacked"] = [...input]
       }
       return output
}

function getArrangement(input,tasks,dense,sparse){
    var sequencesCovered = {}
    var output = {}

    //Find the most common layout and then assign all the sequences same layout
    var layoutCollection = input.map(val=>{
        return val['layout']
    })
    var layout = mode(layoutCollection)

    //For views with 3 or more sequences
    if(input.length>=3){
        output = addElementsToOuput(input,output,layout)
    }
    else{
        var connectedNodes = tasks['connectedNodes'].length === 2 ? true : false
        var edgeValue = tasks['edgeValues'].length === 2 ? true : false
        var sequenceConservation = tasks['sequenceConservation'].length === 2 ? true : false
        var inputVectorObject = createInputVector(layout,dense,sparse,connectedNodes,edgeValue,sequenceConservation)
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        var recommendation = recommendedProducts(similarityScores)
        output[recommendation] = []
        output[recommendation] = [...input]
        output["arrangementName"] = recommendation[0]
        output['predictionScore'] = similarityScores[recommendation]
        output['sequenceConnection'] = (dense || sparse) ? true: false
        output['typeOfInterconnection'] = dense ? "dense":"sparse"
    }
    return output
}

module.exports = getArrangement