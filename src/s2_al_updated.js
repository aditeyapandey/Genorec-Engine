function createInputVector(spec){
    const inputVectorObject = {};
    const inputArray = [];

    //File Type 
    const tracksSameFile= spec.every( (val, i, arr) => val["fileName"] === arr[0]["fileName"]);  
    inputArray.push(inputVectorObject["trackssamefile"] = tracksSameFile ? 1 : 0);
    inputArray.push(inputVectorObject["tracksdifffile"] = !tracksSameFile ? 1 : 0);
    
    //Encoding Type
    const lineChartEncoding = spec.every( (val, i, arr) => val["encoding"] === "linechart");
    const barChartEncoding = spec.every( (val, i, arr) => val["encoding"] === "barchart" || val["encoding"] === "intervalBarChart");
    inputArray.push(inputVectorObject["alllinechart"] = lineChartEncoding ? 1 : 0);
    inputArray.push(inputVectorObject["allbarchart"] = barChartEncoding ? 1 : 0);
    inputArray.push(inputVectorObject["otherencoding"] = ! (lineChartEncoding || barChartEncoding) ? 1 : 0);
 
    //Tracks
    inputArray.push(inputVectorObject["singletrack"] = spec.length <= 1 ? 1 : 0);
    return{inputVectorObject,inputArray}
}

function getAlignmentUpdated(visoptions,stage1Selection,constraints)
{

    const vectorKeys = ["trackssamefile","tracksdifffile","alllinechart","allbarchart","otherencoding","singletrack"];
    const globalData = require("./modelDataProcessing.js");
    const model = globalData.model2Updated;
    const products = Object.keys(model);
    const getProductProperties  = require("./utils.js").productProperties;
    const computeSimilarity = require("./utils.js").computeSimilarity;
    const recommendedProducts = require("./utils.js").recommendedProducts;
    const createStageDecisionStorageObject = require("./utils.js").createStageDecisionStorageObject
    const productVector = getProductProperties(model,vectorKeys);
    const output = [];

    console.log(visoptions);



    visoptions.forEach(element => {
        const inputVectorObject = createInputVector(element);
        const similarityScores = computeSimilarity(inputVectorObject,productVector);
        const recommendation = recommendedProducts(similarityScores);
        var tempAttributeStorage = {};
        recommendation.forEach((val)=>{
            tempAttributeStorage = {"trackAlignment":val,"trackAlignmentPrediction":similarityScores[val],"tracks":element};
        })
        output.push(tempAttributeStorage);
    });

    const decisionStorage = [];
    if(constraints)
    {
        output.forEach(val=>{
            console.log(val)
            const recommendedEncodings = [val["trackAlignment"]];
            decisionStorage.push(createStageDecisionStorageObject(products,recommendedEncodings));
        })
        console.log(decisionStorage)
    }
    return output;
}


module.exports = getAlignmentUpdated